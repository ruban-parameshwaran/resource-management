import * as Yup from 'yup';
import Card from "@src/components/card";
import { Col, Row } from "react-bootstrap";
import CustomersList from "../screen/CustomersList";
import Animate from "@src/components/animate/Animate";
import CreateCustomer from "../screen/CreateCustomer";
import { useCreateCustomerMutation, useDeleteCustomerMutation, useGetAllCustomerQuery, useUpdateCustomerMutation } from "@src/services/api/customerApi";
import { useFormik } from 'formik';
import notification from '@src/services/notification';
import { FormType } from '@src/interface/Fields';
import { useEffect, useState } from 'react';

type InitialValues = {
    name: string,
    contact: string,
    address: string,
    email: string
};

const CustomerContainer = () => {

    const {data: customers, isLoading, refetch} = useGetAllCustomerQuery();
    const [ createCustomer ] = useCreateCustomerMutation(); 
    const [ updateCustomer ] = useUpdateCustomerMutation();
    const [ deleteCustomer ] = useDeleteCustomerMutation();

    const [formType, setFormType] = useState<FormType>({ type: 'CREATE' });
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    /**
     * Initial form values
     */
    const initialValues: InitialValues = {
        name: "",
        contact: "",
        address: "",
        email: ""
    };

    
    // validation schema
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Customer name is required field'),
        contact: Yup.string().required('Contact is required field'),
        address: Yup.string().required('Address is required field'),
        email: Yup.string().email().required('Email is required field'),
    });

    // Category customer
    const customerForm = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async values => {
            try {
                const payload = { 
                    ...values,
                    id: formType.type === 'EDIT' ? selectedCategoryId : null };
                const response = formType.type === 'CREATE'
                    ? await createCustomer(payload).unwrap()
                    : await updateCustomer(payload).unwrap();

                if (response?.success) {
                    notification.successNotification(response?.message);
                    customerForm.resetForm();
                    setFormType({ type: 'CREATE' });
                    await refetch();
                }
            } catch (error: any) {
                notification.errorNotification(error?.data?.data?.name);
            }
        },
    });

    const handleEdit = (id: number) => {
        if (selectedCategoryId === id) return; // prevent selected category id
        setSelectedCategoryId(id);
        setFormType({ type: 'EDIT' });
    }

    /**
     * Delete customer
     * @param id number
     */
    const handleDelete = async (id: number) => {
        try {
            const response = await deleteCustomer(id).unwrap();
            if (response?.success) {
                await refetch();
                notification.successNotification(response?.message);
            }
        } catch (error: any) {
            notification.errorNotification(error?.data?.data?.name);
        }
    }

    // Effect to populate form values when a customer is selected for editing
    useEffect(() => {
        const selectedCategory = customers?.data.find(customer => customer.id === selectedCategoryId);
        if (selectedCategory) {
            customerForm.setValues({
                name : selectedCategory.name,
                contact: selectedCategory.contact,
                address: selectedCategory.address,
                email: selectedCategory.email
            });
        }
    }, [selectedCategoryId, customers?.data]); 

    // Reset form on form type change
    const onReset = () => {
        setFormType({ type: 'CREATE' });
        setSelectedCategoryId(null); 
        customerForm.resetForm();
    };

	return(
		<Animate>
            <Card classes={'p-4 '}>
                <Row>
                    <Col lg={7}>
                        <CustomersList 
                            customers={customers?.data ?? []}
                            isLoading={isLoading}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            />
                    </Col>
                    <Col lg={5}>
                        <CreateCustomer 
                            form={customerForm} 
                            formType={formType}
                            onReset={onReset} />
                    </Col>
                </Row>
            </Card>
        </Animate>
	)
}

export default CustomerContainer;