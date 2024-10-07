import * as Yup from 'yup';
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Card from "@src/components/card";
import ProductList from "../screens/ProductList";
import Animate from "@src/components/animate/Animate";
import { InitialValuesProducts, Product } from "@src/interface/Product";
import LoadingIndicator from "@src/components/loader/LoadingIndicator";
import { useGetAllCategoryQuery } from "@src/services/api/categoryApi";
import { useCreateProductMutation, useDeleteProductMutation, useGetAllProductListQuery, useUpdateProductMutation } from "@src/services/api/productApi";
import notification from '@src/services/notification';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/app/store';
import { setFormType } from '@src/features/slices/formTypeSlice';


const ProductContainer = () => {

    const { data: categoryLists } = useGetAllCategoryQuery();
    const { data: productLists, isLoading, refetch } = useGetAllProductListQuery();
    const [ createProduct, {isLoading: creatingProduct} ] = useCreateProductMutation();
    const [ updateProduct, {isLoading: updatingProduct} ] = useUpdateProductMutation();
    const [ deleteProduct ] = useDeleteProductMutation();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    const dispatch = useDispatch();
    const { formType } = useSelector((state: RootState) => state.formType);

    /**
     * modal functions
     * @returns {void}
     */
    const handleModalOpen = () => {
        setShowModal(true)
    };
    const handleModalClose = () => {
        setShowModal(false);
        dispatch(setFormType({type: 'CREATE'}))
        onReset();
    };

    const categoryListOptions = categoryLists?.data?.map((item) => {
        return {label: item?.name, value: item?.id}
    });

    /**
     * Initial form values
     */
    const initialValues: InitialValuesProducts = {
        product_code: "",
        name: "",
        unit: "",
        retail_price: 0,
        whole_sale: 0,
        is_active: false,
        category_id: 0
    };

    // validation schema
    const validationSchema = Yup.object().shape({
        product_code: Yup.string().required('Product Code is required field'),
        name: Yup.string().required('Product Name is required field'),
        unit: Yup.string().required('Product Unit is required field'),
        retail_price: Yup.number().min(1).required('Retail Price is required field'),
        whole_sale: Yup.number().min(1).required('Whole Sale Price is required field'),
        is_active: Yup.boolean(),
        category_id: Yup.number().required('Category is required field'),
    });

    const productForm = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async value => {
            try{
                const payload = {
                    ...value,
                    is_active: Boolean(value.is_active),
                    id: formType.type === 'EDIT' ? selectedProductId : null
                }    
                
                const response = formType.type === 'CREATE' 
                    ? await createProduct(payload).unwrap()
                    : await updateProduct(payload).unwrap();

                if (response?.success) {
                    notification.successNotification(response.message);
                    await refetch();
                    productForm.resetForm();
                    handleModalClose();
                }
            } catch(error: any) {
                const errorData = error?.data?.data;
                
                if (errorData) {
                    Object.keys(errorData).forEach((key) => {
                        errorData[key].forEach((message: string) => {
                            notification.errorNotification(message);
                        })
                    })
                } else {
                    notification.errorNotification('Failed to create product');
                }
            }
        }
    });

    const handleDelete = async (id: number) => {
        try {
            const response = await deleteProduct(id).unwrap();
            if (response?.success) {
                await refetch();
                notification.successNotification(response?.message);
            }
        } catch (error: any) {
            notification.errorNotification(error?.data?.data?.name);
        }
    }

    // Handle edit
    const handleEdit = (id: number) => {
        if (selectedProductId === id) return;
        setSelectedProductId(id);
        dispatch(setFormType({type: 'EDIT'}))
        handleModalOpen();        
    };

    useEffect(() => {
        const selectedProduct = productLists?.data.find((item: Product) => item.id === selectedProductId);
        if (selectedProduct) {
            productForm.setValues({
                product_code    : selectedProduct.product_code,
                name            : selectedProduct.name,
                unit            : selectedProduct.unit,
                retail_price    : selectedProduct.retail_price,
                whole_sale      : selectedProduct.whole_sale,
                is_active       : selectedProduct.is_active,
                category_id     : selectedProduct.category?.id
            });
        }        
    }, [selectedProductId, categoryLists?.data, productLists?.data])

    const onReset = () => {
        dispatch(setFormType({type: 'CREATE'}))
        setSelectedProductId(null);
        productForm.resetForm();
    }

    return (
        <Animate>
            <LoadingIndicator isLoading={isLoading}>
                <Card classes={'p-4 '}>
                    <ProductList 
                        productLists={productLists?.data ?? []}
                        handleModalOpen={handleModalOpen}
                        handleModalClose={handleModalClose}
                        showModal={showModal}
                        categoryLists={categoryListOptions}
                        form={productForm}
                        isLoading={creatingProduct || updatingProduct}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        formType={formType}
                    />
                </Card>
            </LoadingIndicator>
        </Animate>
    );
}

export default ProductContainer;