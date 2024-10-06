import * as Yup from 'yup';
import { useFormik } from "formik";
import Card from "@src/components/card";
import { useEffect, useState } from "react";
import { FormType } from "@src/interface/Fields";
import DeliveryList from '../screen/DeliveryList';
import { Delivery } from '@src/interface/Delivery';
import Animate from "@src/components/animate/Animate";
import notification from '@src/services/notification';
import LoadingIndicator from "@src/components/loader/LoadingIndicator";
import { 
    useCreateDeliveryMutation, 
    useDeleteDeliveryMutation, 
    useGetAllDeliveryQuery, 
    useUpdateDeliveryMutation } 
from '@src/services/api/deliveryApi';

const DeliveryContainer = () => {

    const { data: deliveryLists, isLoading, refetch } = useGetAllDeliveryQuery();
    const [ createDelivery, {isLoading: creatingDelivery} ] = useCreateDeliveryMutation();
    const [ updateDelivery, {isLoading: updatingDelivery} ] = useUpdateDeliveryMutation();
    const [ deleteDelivery ] = useDeleteDeliveryMutation();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [formType, setFormType] = useState<FormType>({ type: 'CREATE' });
    const [selectedDeliveryId, setSelectedDeliveryId] = useState<number | null>(null);

    /**
     * modal functions
     * @returns {void}
     */
    const handleModalOpen = () => setShowModal(true);
    const handleModalClose = () => {
        setShowModal(false);
        setFormType({type: 'CREATE'});
        onReset();
    };

    /**
     * Initial form values
     */
    const initialValues: Delivery = {
        deliver_name: '',
        email: '',
        address: '',
        dil_date: '',
        dilivered_by: '',
        remark: ''
    };

    // validation schema
    const validationSchema = Yup.object().shape({
        deliver_name: Yup.string().required('Delivery Name is required field'),
        email: Yup.string().email().required('Email is required field'),
        address: Yup.string().required('Address is required field'),
        dil_date: Yup.string().required('Delivery Date is required field'),
        dilivered_by: Yup.string().required('Delivery By is required field'),
        remark: Yup.string(),
    });

    const deliveryFrom = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async value => {
            try{
                const payload = {
                    ...value,
                    id: formType.type === 'EDIT' ? selectedDeliveryId : null
                }    
                const response = formType.type === 'CREATE' 
                    ? await createDelivery(payload).unwrap()
                    : await updateDelivery(payload).unwrap();

                if (response?.success) {
                    notification.successNotification(response.message);
                    await refetch();
                    deliveryFrom.resetForm();
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
            const response = await deleteDelivery(id).unwrap();
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
        // if (selectedProductId === id) return;
        setSelectedDeliveryId(id);
        setFormType({type: 'EDIT'})
        handleModalOpen();
    };

    useEffect(() => {
        const selectedDelivery = deliveryLists?.data.find((item: Delivery) => item.id === selectedDeliveryId);
        if (selectedDelivery) {
            deliveryFrom.setValues({
                deliver_name: selectedDelivery?.deliver_name ?? '',
                email :  selectedDelivery?.email,
                address:  selectedDelivery?.address,
                dil_date :  selectedDelivery?.dil_date,
                dilivered_by : selectedDelivery?.dilivered_by,
                remark: selectedDelivery?.remark
            });
        }        
    }, [selectedDeliveryId, deliveryLists?.data])

    const onReset = () => {
        setFormType({type: 'CREATE'});
        setSelectedDeliveryId(null);
        deliveryFrom.resetForm();
    }

    return (
        <Animate>
            <LoadingIndicator isLoading={isLoading}>
                <Card classes={'p-4 '}>
                    <DeliveryList 
                        deliveryLists={deliveryLists?.data ?? []}
                        handleModalOpen={handleModalOpen}
                        handleModalClose={handleModalClose}
                        showModal={showModal}
                        form={deliveryFrom}
                        isLoading={creatingDelivery || updatingDelivery}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        formType={formType}
                    />
                </Card>
            </LoadingIndicator>
        </Animate>
    );
}

export default DeliveryContainer;