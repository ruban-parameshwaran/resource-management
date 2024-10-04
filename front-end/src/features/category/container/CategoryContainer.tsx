import * as Yup from 'yup';
import { useFormik } from "formik";
import Card from "@src/components/card";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from 'react';
import NewCategory from '../screens/NewCategory';
import CategoryList from '../screens/CategoryList';
import Animate from '@src/components/animate/Animate';
import notification from '@src/services/notification';
import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetAllCategoryQuery, useUpdateCategoryMutation } from "@src/services/api/categoryApi";

export type FormType = {
    type: 'CREATE' | 'EDIT';
};

type InitialValues = {
    category: string;
    id?: number | null;
};

const CategoryContainer = () => {
    const [deleteCategory] = useDeleteCategoryMutation();
    const [createCategory, { isLoading }] = useCreateCategoryMutation();
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
    const { data: categoryLists, isLoading: isCategoryLoading, refetch } = useGetAllCategoryQuery();

    const [formType, setFormType] = useState<FormType>({ type: 'CREATE' });
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    /**
     * Initial form values
     */
    const initialValues: InitialValues = {
        category: "",
    };

    // validation schema
    const validationSchema = Yup.object().shape({
        category: Yup.string().required('Category is required field'),
    });

    // Category creation
    const categoryForm = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async values => {
            try {
                const payload = { name: values.category, id: formType.type === 'EDIT' ? values.id : undefined };
                const response = formType.type === 'CREATE'
                    ? await createCategory(payload).unwrap()
                    : await updateCategory(payload).unwrap();

                if (response?.success) {
                    notification.successNotification(response?.message);
                    categoryForm.resetForm();
                    setFormType({ type: 'CREATE' });
                    await refetch();
                }
            } catch (error: any) {
                notification.errorNotification(error?.data?.data?.name);
            }
        },
    });

    // Handle delete
    const handleDelete = async (id: number) => {
        try {
            const response = await deleteCategory(id).unwrap();
            if (response?.success) {
                await refetch();
                notification.successNotification(response?.message);
            }
        } catch (error: any) {
            notification.errorNotification(error?.data?.data?.name);
        }
    };

    // Handle edit
    const handleEdit = (id: number) => {
        if (selectedCategoryId === id) return; // Prevent re-setting the same category
        setSelectedCategoryId(id);
        setFormType({ type: 'EDIT' });
    };

    // Effect to populate form values when a category is selected for editing
    useEffect(() => {
        const selectedCategory = categoryLists?.data.find(category => category.id === selectedCategoryId);
        if (selectedCategory) {
            categoryForm.setValues({
                category: selectedCategory.name,
                id: selectedCategory.id,
            });
        }
    }, [selectedCategoryId, categoryLists?.data]); 

    // Reset form on form type change
    const onReset = () => {
        setFormType({ type: 'CREATE' });
        setSelectedCategoryId(null); 
        categoryForm.resetForm();
    };

    return (
        <Animate>
            <Card classes={'p-4 '}>
                <Row>
                    <Col lg={7}>
                        <CategoryList
                            categoryLists={categoryLists?.data ?? []}
                            isCategoryLoading={isCategoryLoading || isLoading}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    </Col>
                    <Col lg={5}>
                        <NewCategory
                            form={categoryForm}
                            isLoading={isLoading || isUpdating}
                            formType={formType}
                            onReset={onReset}
                        />
                    </Col>
                </Row>
            </Card>
        </Animate>
    );
};

export default CategoryContainer;
