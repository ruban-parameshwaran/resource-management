import { Form } from "react-bootstrap";
import styles from './auth-form.module.scss';
import InputField from "@src/components/fields/InputField";
import DefaultButton from "@src/components/button/DefaultButton";

type AuthFormProps = {
    loginForm: any,
    isLoading: boolean
}

const AuthForm = ({ loginForm, isLoading }:AuthFormProps) => {
    return (
        <Form onSubmit={loginForm.handleSubmit}>
            <div className="mb-3">
                <InputField
                    type="email"
                    name="email"
                    label="Username"
                    onChange={loginForm.handleChange}
                    onBlur={loginForm.handleBlur}
                    value={loginForm.values.email}
                />
                <span className={styles['error-message']}>{loginForm.errors.email && loginForm.touched.email ? loginForm.errors.email : null}</span>
            </div>
            <div className="mb-4">
                <InputField
                    type="password"
                    label="Password"
                    name="password"
                    onChange={loginForm.handleChange}
                    value={loginForm.values.password}
                />
            </div>
            <DefaultButton 
                message="Sign In" 
                isLoading={isLoading}
                disabled={isLoading}
                type="submit"
            />
        </Form>
    )
}

export default AuthForm;