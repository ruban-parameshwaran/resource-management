import { Spinner } from "react-bootstrap";
import styles from './loader.module.scss';
import { ReactNode } from "react";

interface LoadingProps {
    isLoading: boolean,
    message?: string, 
    children: ReactNode
}

const LoadingIndicator = ({isLoading, children, message}: LoadingProps) => {
    return(
        <>
            {isLoading ? 
            <div className={styles['spinner-loader']}>
                <Spinner animation="border" variant="primary"/>
                 <span>{message}</span>
             </div>
            :
            <>{children}</>
            }
        </>
    )
}

export default LoadingIndicator;