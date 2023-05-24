import React, { useRef,useState,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import './confirm.css'
import imgVerifi from '../../Assets/imgVerifiCount.svg'
import { confirmUser } from '../../Services/user.service';
import { Toast } from 'primereact/toast';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


function Confirm() {

    const toast = useRef(null);
    const { token } = useParams();

    const [verified, setVerified] = useState("");
    const [open, setOpen] = useState(false);
 


    const showMessageError = () => {
        setTimeout(function() {
            setOpen(false)
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error al verificar el usuario', life: 4000 });
            window.location.href ="/"
        }, 2000);
    }
    const showMessageSuccess = () => {
        setTimeout(function() {
            setOpen(false)
            toast.current.show({ severity: 'success', summary: 'Exito', detail: 'El correo se a verificado con exito, ¡YA PUEDES INICIAR SESION!', life: 4000 });
        }, 2000);
        setTimeout(function() {
            window.location.href ="/"
        }, 4000);
    }

    const verificarUsuario = async () => {

        const res = (await confirmUser(token)).data;
        setOpen(true)
        setVerified(res.success)

    }

    useEffect(() => {
        if (verified === true) {
            showMessageSuccess()
        }
        if(verified === false){
            showMessageError()
        }
    }, [verified])


    return (
        <div className='div-confirm'>
            <Toast ref={toast} />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <img src={imgVerifi} alt='imagen-verificacion' />
            <h4 className='div-h4'>Estas a solo un paso de ser parte de nuestra familia </h4>
            <h4 className='div-h4'>haz click en en siguiente boton y verifica tu cuenta</h4>
            <Button onClick={verificarUsuario} className='btn-confirm'>verificar cuenta</Button>
        </div>
    )
}

export default Confirm