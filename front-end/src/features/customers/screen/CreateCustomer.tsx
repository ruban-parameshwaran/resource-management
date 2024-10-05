import DefaultButton from "@src/components/button/DefaultButton";
import Card from "@src/components/card";
import InputField from "@src/components/fields/InputField";
import { FormikProps } from "formik";
import { FC } from "react";
import { Form } from "react-bootstrap";

interface FormValues {
	name: string,
	contact: string,
	address: string,
	email: string
}

type CreateCustomerProps = {
	form: FormikProps<FormValues>,
	isLoading?: boolean,
	formType: any,
	onReset?: () => void
}

const CreateCustomer: FC<CreateCustomerProps> = ({ form, isLoading, formType, onReset }) => {
	return (
		<Card>
			<div className="px-4 py-3 border-bottom">
				<h4 className="card-title mb-0">Create Customer</h4>
			</div>
			<div className="card-body">
				<Form onSubmit={form.handleSubmit}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<InputField
							label="Customer Name"
							type="text"
							name="name"
							onChange={form?.handleChange}
							value={form?.values.name}
						/>
						<span className={'error-message'}>{form?.errors.name && form?.touched.name ? form?.errors.name : null}</span>
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<InputField
							label="Contact"
							type="text"
							name="contact"
							onChange={form?.handleChange}
							value={form?.values.contact}
						/>
						<span className={'error-message'}>{form?.errors.contact && form?.touched.contact ? form?.errors.contact : null}</span>
					</Form.Group>
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
					<DefaultButton
						classes="btn-outline-primary "
						type="submit"
						message={formType.type === 'CREATE' ? 'Create' : 'Update'}
						fullWidth="d-block"
						isLoading={isLoading}
						disabled={isLoading} />
					{formType.type === 'EDIT' &&
						<DefaultButton
							classes="btn-outline-primary "
							type="button"
							fn={onReset}
							message={'Reset'}
							fullWidth="d-block" />}
				</Form>
			</div>
		</Card>
	);
}

export default CreateCustomer;