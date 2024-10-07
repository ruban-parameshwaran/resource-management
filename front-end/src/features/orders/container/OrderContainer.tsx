import * as Yup from 'yup';
import { useFormik } from "formik";
import Card from "@src/components/card";
import { useEffect, useState } from "react";
import { FormType } from "@src/interface/Fields";
import Animate from "@src/components/animate/Animate";
import notification from '@src/services/notification';
import LoadingIndicator from "@src/components/loader/LoadingIndicator";
import { useCreateOrderMutation, useDeleteOrderMutation, useGetAllOrderQuery, useUpdateOrderMutation } from '@src/services/api/orderApi';
import OrderList from '../screen/OrderList';
import { Order, OrderInitialValues } from '@src/interface/order';
import { useGetAllCustomerQuery } from '@src/services/api/customerApi';
import { useGetAllDeliveryQuery } from '@src/services/api/deliveryApi';

const OrderContainer = () => {

    /**
     * Order Mutations
     */
    const { data: orderLists, isLoading, refetch } = useGetAllOrderQuery();
    const [ createOrder, {isLoading: creatingOrder} ] = useCreateOrderMutation();
    const [ updateOrder, {isLoading: updatingOrder} ] = useUpdateOrderMutation();
    const [ deleteOrder ] = useDeleteOrderMutation();

    /**
     * Customer mutation
     */
    const { data: customerLists } = useGetAllCustomerQuery();

    /**
     * Delivery Mutation
     */
    const { data: deliveryLists } = useGetAllDeliveryQuery();

    const [showModal, setShowModal] = useState<boolean>(false);
    const [formType, setFormType] = useState<FormType>({ type: 'CREATE' });
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

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
    const initialValues: OrderInitialValues = {
        order_num: '',
        customer_id: null,
        order_date: '',
        order_amount: 0,
        payment_method: '',
        status: '',
        delivery_id: null
    };

    /**
     * prepare category and delivery lists for dropdown
     */
    const deliveryListOptions = deliveryLists?.data?.map((item) => {
        return {label: item?.deliver_name, value: item?.id}
    });

    const customerListOptions = customerLists?.data?.map((item) => {
        return {label: item?.name, value: item?.id}
    });

    // validation schema
    const validationSchema = Yup.object().shape({
        order_num: Yup.string().required('Order Number is required field'),
        customer_id: Yup.number().required('Customer is required field'),
        order_date: Yup.string().required('Order Date is required field'),
        order_amount: Yup.number().required('Order Amount is required field'),
        payment_method: Yup.string().required('Payment Method is required field'),
        status: Yup.string().required('Status is required field'),
        delivery_id: Yup.string().required('Delivery is required field'),
    });

    const orderFrom = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async value => {
            try{
                const payload = {
                    ...value,
                    id: formType.type === 'EDIT' ? selectedOrderId : null
                }    
                const response = formType.type === 'CREATE' 
                    ? await createOrder(payload).unwrap()
                    : await updateOrder(payload).unwrap();

                if (response?.success) {
                    notification.successNotification(response.message);
                    await refetch();
                    orderFrom.resetForm();
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
            const response = await deleteOrder(id).unwrap();
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
        if (selectedOrderId === id) return;
        setSelectedOrderId(id ?? null);
        setFormType({type: 'EDIT'})
        handleModalOpen();
    };

    useEffect(() => {
        const selectedOrder = orderLists?.data.find((item: Order) => item.id === selectedOrderId);
        if (selectedOrder) {
            orderFrom.setValues({
                order_num: selectedOrder?.order_num,
                customer_id: selectedOrder?.customer?.id ?? null,
                order_date: selectedOrder?.order_date,
                order_amount: selectedOrder?.order_amount,
                payment_method: selectedOrder?.payment_method,
                status: selectedOrder?.status,
                delivery_id: selectedOrder?.delivery.id ?? 0
            });
        }                
    }, [selectedOrderId, orderLists?.data])

    const onReset = () => {
        setFormType({type: 'CREATE'}); 
        setSelectedOrderId(null);
        orderFrom.resetForm();
    }

    return (
        <Animate>
            <LoadingIndicator isLoading={isLoading}>
                <Card classes={'p-4 '}>
                    <OrderList 
                        orderLists={orderLists?.data ?? []}
                        customerLists={customerListOptions ?? []}
                        deliveryLists={deliveryListOptions ?? []}
                        handleModalOpen={handleModalOpen}
                        handleModalClose={handleModalClose}
                        showModal={showModal}
                        form={orderFrom}
                        isLoading={creatingOrder || updatingOrder}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        formType={formType}
                    />
                </Card>
            </LoadingIndicator>
        </Animate>
    );
}

export default OrderContainer;