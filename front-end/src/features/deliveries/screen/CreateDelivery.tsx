import { FC } from "react";
import { FormikProps } from "formik";
import Card from "@src/components/card";
import { Col, Form, Row } from "react-bootstrap";
import { FormType } from "@src/interface/Fields";
import { Delivery } from "@src/interface/Delivery";
import InputField from "@src/components/fields/InputField";
import DefaultButton from "@src/components/button/DefaultButton";

type NewCategoryProps = {
    form?: FormikProps<Delivery>,
    isLoading?: boolean,
    formType?: FormType,
}

const CreateDelivery: FC<NewCategoryProps> = ({ form, isLoading, formType }) => {    

    return (    
        <Card>
            <div className="px-4 py-3 border-bottom">
                <h4 className="card-title mb-0">{formType?.type === 'CREATE' ? 'Create' : 'Update'} Delivery</h4>
            </div>
            <div className="card-body">
                <Form onSubmit={form?.handleSubmit}>
                    <Row>
                        <Col lg={12}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <InputField
                                    label="Delivery Name"
                                    type="text"
                                    name="deliver_name"
                                    onChange={form?.handleChange}
                                    value={form?.values.deliver_name}
                                />
                                <span className={'error-message'}>{form?.errors.deliver_name && form?.touched.deliver_name ? form?.errors.deliver_name : null}</span>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <InputField
                                    label="Email"
                                    type="text"
                                    name="email"
                                    onChange={form?.handleChange}
                                    value={form?.values.email}
                                />
                                <span className={'error-message'}>{form?.errors.email && form?.touched.email ? form?.errors.email : null}</span>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <InputField
                                    label="Address"
                                    type="text"
                                    name="address"
                                    onChange={form?.handleChange}
                                    value={form?.values.address}
                                />
                                <span className={'error-message'}>{form?.errors.address && form?.touched.address ? form?.errors.address : null}</span>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <InputField
                                    label="Delivery Date"
                                    type="date"
                                    name="dil_date"
                                    onChange={form?.handleChange}
                                    value={form?.values.dil_date}
                                />
                                <span className={'error-message'}>{form?.errors.dil_date && form?.touched.dil_date ? form?.errors.dil_date : null}</span>
                            </Form.Group>
                        </Col>
                        <Col lg={6}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <InputField
                                    label="Delivery By"
                                    type="text"
                                    name="dilivered_by"
                                    onChange={form?.handleChange}
                                    value={form?.values.dilivered_by}
                                />
                                <span className={'error-message'}>{form?.errors.dilivered_by && form?.touched.dilivered_by ? form?.errors.dilivered_by : null}</span>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <InputField
                                    label="Remark"
                                    rest={{as: 'textarea'}}
                                    name="remark"
                                    onChange={form?.handleChange}
                                    value={form?.values.remark}
                                />
                                <span className={'error-message'}>{form?.errors.remark && form?.touched.remark ? form?.errors.remark : null}</span>
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

export default CreateDelivery;