import { FC } from "react";
import { FormikProps } from "formik";
import Card from "@src/components/card";
import { Col, Form, Row } from "react-bootstrap";
import { DropDownOption, FormType } from "@src/interface/Fields";
import InputField from "@src/components/fields/InputField";
import DefaultButton from "@src/components/button/DefaultButton";
import { OrderInitialValues } from "@src/interface/order";
import DropDown from "@src/components/fields/DropDown";
import { AppConst } from "@src/const/AppConst";

type NewCategoryProps = {
    form?: FormikProps<OrderInitialValues>;
    isLoading?: boolean;
    formType?: FormType;
    deliveryLists: DropDownOption[];
    customerLists: DropDownOption[]
}

const CreateOrder: FC<NewCategoryProps> = ({ form, isLoading, formType, deliveryLists, customerLists }) => {        
    return (        
        <Card>
            <div className="px-4 py-3 border-bottom">
                <h4 className="card-title mb-0">{formType?.type === 'CREATE' ? 'Create' : 'Update'} Order</h4>
            </div>
            <div className="card-body">
                <Form onSubmit={form?.handleSubmit}>
                    <Row>
                        <Col lg={12}>
                            <Form.Group className="mb-3">
                                <InputField
                                    label="Order Number"
                                    type="text"
                                    name="order_num"
                                    onChange={form?.handleChange}
                                    value={form?.values.order_num}
                                />
                                <span className={'error-message'}>{form?.errors.order_num && form?.touched.order_num ? form?.errors.order_num : null}</span>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <DropDown 
                                    label="Customer"
                                    name={'customer_id'}
                                    options={customerLists}
                                    onChange={form?.handleChange}/>
                                <span className={'error-message'}>{form?.errors.customer_id && form?.touched.customer_id ? form?.errors.customer_id : null}</span>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <InputField
                                    label="Order Date"
                                    type="date"
                                    name="order_date"
                                    onChange={form?.handleChange}
                                    value={form?.values.order_date}
                                />
                                <span className={'error-message'}>{form?.errors.order_date && form?.touched.order_date ? form?.errors.order_date : null}</span>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <InputField
                                    label="Order Amount"
                                    type="number"
                                    name="order_amount"
                                    onChange={form?.handleChange}
                                    value={form?.values.order_amount}
                                />
                                <span className={'error-message'}>{form?.errors.order_amount && form?.touched.order_amount ? form?.errors.order_amount : null}</span>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <DropDown 
                                    label="Payment Method"
                                    name={'payment_method'}
                                    options={AppConst.payment_method}
                                    onChange={form?.handleChange}/>
                                <span className={'error-message'}>{form?.errors.payment_method && form?.touched.payment_method ? form?.errors.payment_method : null}</span>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <DropDown 
                                    label="Status"
                                    name={'status'}
                                    options={AppConst.payment_status}
                                    onChange={form?.handleChange}/>
                                <span className={'error-message'}>{form?.errors.status && form?.touched.status ? form?.errors.status : null}</span>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3">
                                <DropDown 
                                    label="Delivery"
                                    name={'delivery_id'}
                                    options={deliveryLists}
                                    onChange={form?.handleChange}/>
                                <span className={'error-message'}>{form?.errors.delivery_id && form?.touched.delivery_id ? form?.errors.delivery_id : null}</span>
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

export default CreateOrder;