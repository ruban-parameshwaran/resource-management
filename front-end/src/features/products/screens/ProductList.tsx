import { FC } from "react";
import Card from "@src/components/card";
import CreateProduct from "./CreateProduct";
import { InitialValuesProducts, Product } from "@src/interface/Product";
import ModalBox from "@src/components/modal/Modal";
import { DropDownOption } from "@src/interface/Fields";
import DropDown from "@src/components/fields/ActionDropdown";
import { FormikProps } from "formik";
import { FormType } from "@src/features/category/container/CategoryContainer";
import DefaultButton from "@src/components/button/DefaultButton";

type ProductListProp = {
    productLists: Product[],
    handleDelete: (id: number) => void,
    handleEdit:(id: number) => void,
    handleModalOpen?: () => void,
    handleModalClose?: () => void,
    showModal: boolean,
    categoryLists?: DropDownOption[],
    form?: FormikProps<InitialValuesProducts>,
    isLoading?: boolean,
    formType: FormType
}

const ProductList: FC<ProductListProp> = ({ 
    productLists, 
    handleDelete, 
    handleEdit, 
    isLoading,
    handleModalOpen, 
    handleModalClose, 
    showModal, 
    categoryLists, 
    formType,
    form }) => {
    return (
        <Card>
            <div className="px-4 py-3 border-bottom">
               <DefaultButton 
                    message="Create Product" 
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
                        categoryLists={categoryLists}/>}
                    />
            </div>
            <div className="card-body p-4">
                <div className="table-responsive mb-4 border rounded-1">
                    <table className="table text-nowrap mb-0 align-middle">
                        <thead className="text-dark fs-4">
                            <tr>
                                <th><h6 className="fs-4 fw-semibold mb-0">Name</h6></th>
                                <th><h6 className="fs-4 fw-semibold mb-0">Unit</h6></th>
                                <th><h6 className="fs-4 fw-semibold mb-0">Retail Price</h6></th>
                                <th><h6 className="fs-4 fw-semibold mb-0">Whole Sale Price</h6></th>
                                <th><h6 className="fs-4 fw-semibold mb-0">Status</h6></th>
                                <th><h6 className="fs-4 fw-semibold mb-0">Category</h6></th>
                                <th><h6 className="fs-4 fw-semibold mb-0">Actions</h6></th>
                            </tr>
                        </thead>
                        <tbody>
                            {productLists.map((product: Product) => (
                                <tr key={product.id}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="ms-3">
                                                <h6 className="fs-4 fw-semibold mb-0">{product?.name}</h6>
                                                <span className="fw-normal">Product code: {product?.product_code}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="mb-0 fw-normal fs-4">{product?.unit}</p>
                                    </td>
                                    <td>
                                        <p className="mb-0 fw-normal fs-4">{product?.retail_price}</p>
                                    </td>
                                    <td>
                                        <p className="mb-0 fw-normal fs-4">{product?.whole_sale}</p>
                                    </td>
                                    <td>
                                        <span className="badge bg-success-subtle text-success">Active</span>
                                    </td>
                                    <td>
                                        <p className="mb-0 fw-normal fs-4">{product?.category?.name}</p>
                                    </td>
                                    <td>
                                        <span className="badge bg-light-primary text-primary ms-auto">
                                            <DropDown
                                                onDelete={handleDelete}
                                                onEdit={handleEdit}
                                                id={product?.id ?? 0}
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

export default ProductList;