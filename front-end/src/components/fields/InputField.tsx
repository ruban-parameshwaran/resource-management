

import { Form } from 'react-bootstrap';
import styles from './fields.module.scss';

type FormFieldProps = {
    isShow?: boolean,
    type?: string,
    label?: string;
    rest?: any;
    name?: string,
    id?: string,
    required?: boolean
    placeholder?: string,
    defaultValue?: string,
    value?: number | string | undefined | any;
    ref?: any | undefined;
    onChange?: (e?: React.ChangeEvent<HTMLInputElement> | any) => void
    onBlur?: (e?: React.ChangeEvent<HTMLInputElement> | any) => void
    onClick?: () => void,
}

const InputField = ({ type, label, value, rest, onChange,onBlur, name, id, isShow = true, defaultValue, onClick, placeholder, required = false}: FormFieldProps) => {
    return (
        <>
            {label ? <Form.Label>{label}</Form.Label> : ''}
            {required && <span className={'error-message'}>*</span>}
            {type === 'text' || type === 'number' || type === 'email' || type === 'password' || type === 'date' ? 

                <Form.Control 
                  type={type} 
                  min={1}
                  {...rest} 
                  name={name} 
                  id={id} 
                  value={value} 
                  onChange={onChange} 
                  onBlur={onBlur} 
                  defaultValue={defaultValue}
                  className={styles['custom-fields']} 
                  disabled={!isShow}
                  onClick={onClick}
                  placeholder={placeholder}
                  autoFocus/>
                :
                <Form.Control 
                    as={type} 
                    {...rest} 
                    autoFocus
                    name={name} 
                    id={id} 
                    value={value || ''} 
                    onChange={onChange} 
                    onBlur={onBlur} 
                    defaultValue={defaultValue}
                    className={styles['custom-area']}  disabled={!isShow}
                    onClick={onClick}/>
            }
        </>
    );
}

export default InputField;