import {ReactNode} from "react";
import { Spinner } from "react-bootstrap";

interface DefaultButtonProps {
    classes?: 'primary-btn' | 'success-btn' | 'warning-btn' | 'ghost-btn' | 'yellow-btn' | 'transparent-btn', 
    fn?: (values: any) => void,
    icon?: ReactNode,
    message?: string,
    type?: "submit" | "button" | "reset";
    disabled?: boolean,
    isLoading?: boolean,
    loaderText?: string
}

const DefaultButton = ({classes, fn, icon, message, type, disabled, isLoading, loaderText}: DefaultButtonProps) => {
    return (
        <button type={type} className={'btn '+ classes + ' btn btn-outline-primary mx-3 mt-2 d-block'} onClick={fn} disabled={disabled}>
            <div className="flex-container">
                {icon}
                {isLoading ? <span>{isLoading ? <Spinner animation="border" className="btn-spinner-icon" style={{width:'1rem',height:'1rem'}}/> : loaderText}</span> :  <span>{message}</span>}
            </div>
        </button>
    );
}

export default DefaultButton;

