import { FC } from "react";
import { FormikProps } from "formik";
import Card from "@src/components/card";
import CreateProduct from "./CreateDelivery";
import { FormType } from "@src/interface/Fields";
import ModalBox from "@src/components/modal/Modal";
import { Delivery } from "@src/interface/Delivery";
import { DropDownOption } from "@src/interface/Fields";
import DropDown from "@src/components/fields/ActionDropdown";
import DefaultButton from "@src/components/button/DefaultButton";

type ProductListProp = {
    deliveryLists: Delivery[],
    handleDelete: (id: number) => void,
    handleEdit:(id: number) => void,
    handleModalOpen?: () => void,
    handleModalClose?: () => void,
    showModal: boolean,
    categoryLists?: DropDownOption[],
    form?: FormikProps<Delivery>,
    isLoading?: boolean,
    formType: FormType
}

const DeliveryList: FC<ProductListProp> = ({ 
    deliveryLists, 
    handleDelete, 
    handleEdit, 
    isLoading,
    handleModalOpen, 
    handleModalClose, 
    showModal, 
    formType,
    form }) => {
    return (
        <Card>
            <div className="px-4 py-3 border-bottom">
               <DefaultButton 
                    message="Create Delivery" 
                    classes="btn-outline-primary "
                    type="button"
                    fn={handleModalOpen}/>
                <ModalBox 
                    showModal={showModal}
                    closeModeFn={handleModalClose}
                    children={<CreateProduct 
                        isLoading={isLoading}
                        form={form}
                        formType={formType} />}
                    />
            </div>
            <div className="card-body p-4">
                <div className="table-responsive mb-4 border rounded-1">
                    <table className="table text-nowrap mb-0 align-middle">
                        <thead className="text-dark fs-4">
                            <tr>
                                <th><h6 className="fs-4 fw-semibold mb-0">Delivery Name</h6></th>
                                <th><h6 className="fs-4 fw-semibold mb-0">Email</h6></th>
                                <th><h6 className="fs-4 fw-semibold mb-0">Address</h6></th>
                                <th><h6 className="fs-4 fw-semibold mb-0">Delivery Date</h6></th>
                                <th><h6 className="fs-4 fw-semibold mb-0">Delivery By</h6></th>
                                <th><h6 className="fs-4 fw-semibold mb-0">Remark</h6></th>
                                <th><h6 className="fs-4 fw-semibold mb-0">Order</h6></th>
                                <th><h6 className="fs-4 fw-semibold mb-0">Actions</h6></th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliveryLists.map((delivery: Delivery) => (
                                <tr key={delivery.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="ms-3">
                                                <p className="mb-0 fw-normal fs-4">{delivery?.deliver_name ?? 'N/A'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="mb-0 fw-normal fs-4">{delivery?.email}</p>
                                    </td>
                                    <td>
                                        <p className="mb-0 fw-normal fs-4">{delivery?.address}</p>
                                    </td>
                                    <td>
                                        <p className="mb-0 fw-normal fs-4">{delivery?.dil_date}</p>
                                    </td>
                                    <td>
                                        <p className="mb-0 fw-normal fs-4">{delivery?.dilivered_by}</p>
                                    </td>
                                    <td>
                                        <p className="mb-0 fw-normal fs-4">{delivery?.remark}</p>
                                    </td>
                                    <td>
                                        <p className="mb-0 fw-normal fs-4">{delivery?.orders}</p>
                                    </td>
                                    <td></td>
                                    <td>
                                        <span className="badge bg-light-primary text-primary ms-auto">
                                            <DropDown
                                                onDelete={handleDelete}
                                                onEdit={handleEdit}
                                                id={delivery?.id ?? 0}
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

export default DeliveryList;