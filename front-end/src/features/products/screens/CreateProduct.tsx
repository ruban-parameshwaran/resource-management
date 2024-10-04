import DefaultButton from "@src/components/button/DefaultButton";
import Card from "@src/components/card";
import DropDown from "@src/components/fields/DropDown";
import InputField from "@src/components/fields/InputField";
import { AppConst } from "@src/const/AppConst";
import { FormType } from "@src/features/category/container/CategoryContainer";
import { DropDownOption } from "@src/interface/Fields";
import { InitialValuesProducts } from "@src/interface/Product";
import { FormikProps } from "formik";
import { FC } from "react";
import { Col, Form, Row } from "react-bootstrap";

type NewCategoryProps = {
    form?: FormikProps<InitialValuesProducts>,
    isLoading?: boolean,
    formType?: FormType,
    categoryLists?: DropDownOption[]
}

const CreateProduct: FC<NewCategoryProps> = ({ form, isLoading, categoryLists, formType }) => {    

    return (    
        <Card>
            <div className="px-4 py-3 border-bottom">
                <h4 className="card-title mb-0">{formType?.type === 'CREATE' ? 'Create' : 'Update'} Product</h4>
            </div>
            <div className="card-body">
                <Form onSubmit={form?.handleSubmit}>
                    <Row>
                        <Col lg={12}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <InputField
                                    label="Product Name"
                                    type="text"
                                    name="name"
                                    onChange={form?.handleChange}
                                    value={form?.values.name}
                                />
                                <span className={'error-message'}>{form?.errors.name && form?.touched.name ? form?.errors.name : null}</span>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <InputField
                                    label="Product Code"
                                    type="text"
                                    name="product_code"
                                    onChange={form?.handleChange}
                                    value={form?.values.product_code}
                                />
                                <span className={'error-message'}>{form?.errors.product_code && form?.touched.product_code ? form?.errors.product_code : null}</span>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <DropDown 
                                    label="Product Unit"
                                    name={'unit'}
                                    options={AppConst.product_unit}
                                    onChange={form?.handleChange}/>
                                <span className={'error-message'}>{form?.errors.unit && form?.touched.unit ? form?.errors.unit : null}</span>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <InputField
                                    label="Retail Price"
                                    type="text"
                                    name="retail_price"
                                    onChange={form?.handleChange}
                                    value={form?.values.retail_price}
                                />
                                <span className={'error-message'}>{form?.errors.retail_price && form?.touched.retail_price ? form?.errors.retail_price : null}</span>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <InputField
                                    label="Whole Sale Price"
                                    type="text"
                                    name="whole_sale"
                                    onChange={form?.handleChange}
                                    value={form?.values.whole_sale}
                                />
                                <span className={'error-message'}>{form?.errors.whole_sale && form?.touched.whole_sale ? form?.errors.whole_sale : null}</span>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <DropDown 
                                    label="Status"
                                    options={AppConst.product_status}
                                    name="is_active"
                                    onChange={form?.handleChange}/>
                                <span className={'error-message'}>{form?.errors.is_active && form?.touched.is_active ? form?.errors.is_active : null}</span>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <DropDown 
                                    label="Category"
                                    options={categoryLists}
                                    name="category_id"
                                    onChange={form?.handleChange}/>
                                <span className={'error-message'}>{form?.errors.category_id && form?.touched.category_id ? form?.errors.category_id : null}</span>
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <DefaultButton
                        classes="btn-outline-primary "
                        type="submit"
                        message={formType?.type === 'CREATE' ? 'Create' : 'Update'}
                        fullWidth="d-block"
                        isLoading={isLoading}
                        disabled={isLoading} />
                </Form>
            </div>
        </Card>
    );
}

export default CreateProduct;