import { Fragment } from 'react';
import modalStyles from './Modal.module.css';
import ReactDOM from 'react-dom';


function Backdrop (props){
    return <div className={modalStyles.backdrop} onClick={props.onCloseUserForm}> </div>;
};

function ModalOverlay (props){
    return ( <div className={modalStyles.modal}>
        <div className={modalStyles.content} >{props.children}</div>
    </div>
    );
};

const portalElement = document.getElementById('overlays');

function Modal (props) {
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onCloseUserForm={props.onCloseUserForm}/>, portalElement)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>

};

export default Modal;