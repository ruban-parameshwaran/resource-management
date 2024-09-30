import DefaultButton from "@src/components/button/DefaultButton";
import Card from "@src/components/card";
import InputField from "@src/components/fields/InputField";
import { FormikProps } from "formik";
import { FC } from "react";
import { Form } from "react-bootstrap";
import { FormType } from "../container/CategoryContainer";


interface FormValues {
    category: string
}

type NewCategoryProps = {
    form: FormikProps<FormValues>,
    isLoading?: boolean,
    formType: FormType,
    onReset?: () => void
}

const NewCategory: FC<NewCategoryProps> = ({ form, isLoading, formType, onReset }) => {
    return (
        <Card>
            <div className="px-4 py-3 border-bottom">
                <h4 className="card-title mb-0">Create Category</h4>
            </div>
            <div className="card-body">
                <Form onSubmit={form.handleSubmit}>
                    <InputField
                        label="Name"
                        type="text"
                        name="category"
                        onChange={form.handleChange}
                        value={form.values.category}
                    />
                    <span className={'error-message'}>{form.errors.category && form.touched.category ? form.errors.category : null}</span>
                    <div className="mt-3"></div>
                    <DefaultButton
                        classes="btn-outline-primary "
                        type="submit"
                        message={formType.type === 'CREATE' ? 'Create' : 'Update'} 
                        fullWidth="d-block"
                        isLoading={isLoading}
                        disabled={isLoading}/>
                    {formType.type === 'EDIT' && 
                        <DefaultButton
                            classes="btn-outline-primary "
                            type="button"
                            fn={onReset}
                            message={'Reset'} 
                            fullWidth="d-block"/>}
                </Form>
            </div>
        </Card>
    );
}

export default NewCategory;