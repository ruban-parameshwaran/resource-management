import { FC } from "react";
import { FormikProps } from "formik";
import Card from "@src/components/card";
import CreateProduct from "./CreateOrder";
import { FormType } from "@src/interface/Fields";
import ModalBox from "@src/components/modal/Modal";
import { DropDownOption } from "@src/interface/Fields";
import DropDown from "@src/components/fields/ActionDropdown";
import DefaultButton from "@src/components/button/DefaultButton";
import { Order, OrderInitialValues } from "@src/interface/order";

type OrderListProp = {
    orderLists: Order[],
    deliveryLists: DropDownOption[],
    customerLists: DropDownOption[],
    handleDelete: (id: number) => void,
    handleEdit:(id: number) => void,
    handleModalOpen?: () => void,
    handleModalClose?: () => void,
    showModal: boolean,
    form?: FormikProps<OrderInitialValues>,
    isLoading?: boolean,
    formType: FormType
}

const OrderList: FC<OrderListProp> = ({ 
    orderLists, 
    handleDelete, 
    handleEdit, 
    isLoading,
    handleModalOpen, 
    handleModalClose, 
    showModal, 
    formType,
    deliveryLists,
    customerLists,
    form }) => {
    return (
        <Card>
            <div className="px-4 py-3 border-bottom">
               <DefaultButton 
                    message="Create Order" 
                    classes="btn-outline-primary "
                    type="button"
                    fn={handleModalOpen}/>
                <ModalBox 
                    showModal={showModal}
                    closeModeFn={handleModalClose}
                    children={<CreateProduct 
                        isLoading={isLoading}
                        form={form}
                        formType={formType} 
                        deliveryLists={deliveryLists}
                        customerLists={customerLists}/>}
                    />
            </div>
            <div className="card-body p-4">
                <div className="table-responsive mb-4 border rounded-1">
                    <table className="table text-nowrap mb-0 align-middle">
                        <thead className="text-dark fs-4">
                            <tr>
                                <th><h6 className="fs-4 fw-semibold mb-0">Order Number</h6></th>
                                <th><h6 className="fs-4 fw-semibold mb-0">Order Date</h6></th>
                                <th><h6 className="fs-4 fw-semibold mb-0">Order Amount</h6></th>
                                <th><h6 className="fs-4 fw-semibold mb-0">Payment Method</h6></th>
                                <th><h6 className="fs-4 fw-semibold mb-0">Status</h6></th>
                                <th><h6 className="fs-4 fw-semibold mb-0">Actions</h6></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderLists.map((order: Order) => (
                                <tr key={order.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="ms-3">
                                                <p className="mb-0 fw-normal fs-4">{order?.order_num ?? 'N/A'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="mb-0 fw-normal fs-4">{order?.order_date}</p>
                                    </td>
                                    <td>
                                        <p className="mb-0 fw-normal fs-4">{order?.order_amount}</p>
                                    </td>
                                    <td>
                                        <p className="mb-0 fw-normal fs-4">{order?.payment_method}</p>
                                    </td>
                                    <td>
                                        <p className="mb-0 fw-normal fs-4">{order?.status}</p>
                                    </td>
                                    <td></td>
                                    <td>
                                        <span className="badge bg-light-primary text-primary ms-auto">
                                            <DropDown
                                                onDelete={handleDelete}
                                                onEdit={handleEdit}
                                                id={order?.id ?? 0}
                                            />
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    );
}

export default OrderList;