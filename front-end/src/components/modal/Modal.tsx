import { FC, ReactNode } from 'react';
import styles from './modal.module.scss';
import Modal from 'react-bootstrap/Modal';
import { ModalBody, ModalHeader } from 'react-bootstrap';

interface ModalProps {
    children?: ReactNode,
    size?: 'sm' | 'lg' | 'xl',
    showModal: boolean,
    openModelFn?: () => void,
    closeModeFn?: () => void,
}

const ModalBox: FC<ModalProps> = ({ showModal, closeModeFn, children}) => {
    return (
        <Modal 
            show={showModal}
            onHide={closeModeFn}>
            <ModalHeader>
                <div className="d-flex justify-content-end align-items-center" style={{ width: '100%' }}>
                    <span className={styles['model-close-btn']} onClick={closeModeFn}>&times;</span>
                </div>
            </ModalHeader>
            <ModalBody>
                {children}
            </ModalBody>
        </Modal>
    )

}

export default ModalBox;