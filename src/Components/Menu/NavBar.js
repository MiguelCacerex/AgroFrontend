import './NavBar.css';
import '../Login/login.css';

import Cookies from "universal-cookie"
import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import LogoInicio from '../../Assets/logologin.svg';
import { Link as RouteLink } from 'react-router-dom';
import { singIn } from "../../Services/user.service";
import LogoSmallNav from '../../Assets/small_logo.svg';
import LogoNav from '../../Assets/LogoMarketShop.svg';

import { Message } from 'primereact/message';

import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Collapse from 'react-bootstrap/esm/Collapse';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <NavLink to={'/sobreNosotros'}> AgroMarketSHop </NavLink>
            {new Date().getFullYear()}{'.'}
        </Typography>
    );
}
const theme = createTheme();


export default function NavBar() {

    const cookies = new Cookies();
    const [show, setShow] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [showMessage, setshowMessage] = useState(false);
    const [messageError, setmessageError] = useState('');

    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });


    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [validated, setValidated] = useState(false);

    const handleShow = () => {
        setShow(true);
        setValidated(false);
        setshowMessage(false)
    };
    const handleClose = () => setShow(false);

    const handleLogin = async (event) => {

        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
        } else {
            try {
                const res = (await singIn(userEmail, userPassword)).data;
                if (res.success === true) {
                    cookies.set("userType", res.userFound.type,  { path: '/', sameSite:'strict'})
                    cookies.set("idUser", res.userFound._id, { path: '/' , sameSite:'strict'})
                    cookies.set("userSession", res.userFound, { path: '/', sameSite:'strict'})

                    let route = "";
                    if (res.userFound.type === "SELLER") {
                        cookies.set("userData", res.dataSeller, { path: '/', sameSite:'strict'})
                        route = "/mi_negocio/" + res.dataSeller._id
                    } else {
                        cookies.set("userData", res.dataBuyer, { path: '/', sameSite:'strict'})
                        route = "/mi_perfil/" + res.dataBuyer._id
                    }
                    cookies.set("token", res.token, { path: '/', sameSite:'strict'})
                    cookies.set("isAuthenticate", true, { path: '/', sameSite:'strict'})
                    window.location.href = route
                } else {
                    setmessageError(res.msg)
                    setshowMessage(true)
                }
            } catch (error) {
                setmessageError(error)
                setshowMessage(true)
            }
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <ThemeProvider theme={theme}>
                        <Container component="main">
                            <CssBaseline />
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                                <img src={LogoInicio} className="logo2" alt="AgroMarketPlace" />
                                <Form noValidate validated={validated} onSubmit={handleLogin} className='container-form'>
                                    {showMessage
                                        ? <Message sticky="true" className='container-alert' severity="error" text={"" + messageError} />
                                        : null}
                                    <Form.Group controlId="validationCustom01">
                                        <Form.Label>Correo electronico</Form.Label>
                                        <Form.Control
                                            required
                                            type="email"
                                            placeholder="Ingrese su correo"
                                            className='textfiel-login'
                                            autoComplete="email"
                                            onChange={({ target }) => setUserEmail(target.value)}
                                            value={userEmail}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Formato de correo invalido.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="validationCustom02" className='container-pass'>
                                        <Form.Label>Contraseña</Form.Label>
                                        <Form.Control
                                            required
                                            type="password"
                                            placeholder="Ingrese su contraseña"
                                            className='textfiel-login'
                                            value={userPassword}
                                            autoComplete="current-password"
                                            onChange={({ target }) => setUserPassword(target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese su contraseña.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <div className='div-enlaces'>
                                        <RouteLink to="" className='enlaces'>
                                            ¿Olvidaste tu contraseña?
                                        </RouteLink>
                                        <RouteLink onClick={handleClose} to="../registro" className='enlaces'>
                                            {"¿No tienes una cuenta? Registrate"}
                                        </RouteLink>
                                    </div>
                                    <Container fluid className='footermodel'>
                                        <Button className='btnLogin2' type="submit">Iniciar Sesion</Button>

                                    </Container>
                                </Form>
                            </Box>
                            <Copyright sx={{ mt: 2 }} />
                        </Container>
                    </ThemeProvider>
                </Modal.Body>
            </Modal>
            <Navbar className='nav' expand="xxl" collapseOnSelect={true}>
                <Container fluid>
                    <NavLink to={'/'}>
                        {windowSize.width >= 500
                            ? <img src={LogoNav} className="logo" alt="AgroMarketPlace" />
                            : <img src={LogoSmallNav} className="small-logo" alt="AgroMarketPlace" />}
                    </NavLink>
                    {windowSize.width >= 800
                        ? <>
                            <Form className="d-flex buscador2" >
                                <FloatingLabel controlId="floatingInput" label="Ingresa el nombre del producto" className="search-textField ">
                                    <Form.Control className="search-textField" type="text" placeholder="INgresa el nombre del" />
                                </FloatingLabel>
                                <Button className='btnSearch' type="submit">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </Button>
                            </Form>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll" className="btns-nav ">
                                <Nav navbarScroll className='navBar' >
                                    {windowSize.width <= 1400
                                        ? <>
                                            {cookies.get('isAuthenticate')
                                                ? cookies.get('userType') === 'SELLER'
                                                    ? <NavLink className={'btnPerfil'} to={'/mi_negocio/' + cookies.get('idUser')}><FontAwesomeIcon icon={faUser} /></NavLink>
                                                    : <NavLink className={'btnPerfil'} to={'/mi_perfil/' + cookies.get('idUser')}><FontAwesomeIcon icon={faUser} /></NavLink>
                                                : <Button onClick={handleShow} className={'btnNav'}>Iniciar Sesion</Button>
                                            }
                                            <NavLink className={'btnNav'} to={'/'}>Inicio</NavLink>
                                            <NavLink className={'btnNav'} to={'/catalogoProductos'}>Catalogo</NavLink>
                                            <NavLink className={'btnNav'} to={'/sobreNosotros'}>Conocenos</NavLink>

                                        </> : <>
                                            <NavLink className={'btnNav'} to={'/'}>Inicio</NavLink>
                                            <NavLink className={'btnNav'} to={'/catalogoProductos'}>Catalogo</NavLink>
                                            <NavLink className={'btnNav'} to={'/sobreNosotros'}>Conocenos</NavLink>
                                            {cookies.get('isAuthenticate')
                                                ? cookies.get('userType') === 'SELLER'
                                                    ? <NavLink className={'btnPerfil'} to={'/mi_negocio/' + cookies.get('idUser')}><FontAwesomeIcon icon={faUser} /></NavLink>
                                                    : <NavLink className={'btnPerfil'} to={'/mi_perfil/' + cookies.get('idUser')}><FontAwesomeIcon icon={faUser} /></NavLink>
                                                : <Button onClick={handleShow} className={'btnNav'}>Iniciar Sesion</Button>
                                            }
                                        </>
                                    }

                                </Nav>
                            </Navbar.Collapse>
                        </>
                        : <>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Navbar.Collapse id="navbarScroll" className="btns-nav">
                                <Nav navbarScroll className='navBar'>
                                    {windowSize.width <= 1400
                                        ? <>
                                            {cookies.get('isAuthenticate')
                                                ? cookies.get('userType') === 'SELLER'
                                                    ? <NavLink className={'btnPerfil'} to={'/mi_negocio/' + cookies.get('idUser')}><FontAwesomeIcon icon={faUser} /></NavLink>
                                                    : <NavLink className={'btnPerfil'} to={'/mi_perfil/' + cookies.get('idUser')}><FontAwesomeIcon icon={faUser} /></NavLink>
                                                : <Button onClick={handleShow} className={'btnNav'}>Iniciar Sesion</Button>
                                            }
                                            <NavLink className={'btnNav'} to={'/'}>Inicio</NavLink>
                                            <NavLink className={'btnNav'} to={'/catalogoProductos'}>Catalogo</NavLink>
                                            <NavLink className={'btnNav'} to={'/sobreNosotros'}>Conocenos</NavLink>
                                        </>
                                        : <>
                                            <NavLink className={'btnNav'} to={'/'}>Inicio</NavLink>
                                            <NavLink className={'btnNav'} to={'/catalogoProductos'}>Catalogo</NavLink>
                                            <NavLink className={'btnNav'} to={'/sobreNosotros'}>Conocenos</NavLink>
                                            {cookies.get('isAuthenticate')
                                                ? cookies.get('userType') === 'SELLER'
                                                    ? <NavLink className={'btnPerfil'} to={'/mi_negocio/' + cookies.get('idUser')}><FontAwesomeIcon icon={faUser} /></NavLink>
                                                    : <NavLink className={'btnPerfil'} to={'/mi_perfil/' + cookies.get('idUser')}><FontAwesomeIcon icon={faUser} /></NavLink>
                                                : <Button onClick={handleShow} className={'btnNav'}>Iniciar Sesion</Button>
                                            }
                                        </>
                                    }
                                </Nav>
                            </Navbar.Collapse>
                            <Form className="d-flex buscador">
                                <FloatingLabel controlId="floatingInput" label="Ingresa el nombre del producto" className="search-textField">
                                    <Form.Control className="search-textField" type="text" placeholder="INgresa el nombre del" />
                                </FloatingLabel>
                                <Button className='btnSearch' type="submit">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </Button>
                            </Form>

                        </>}

                </Container>
            </Navbar>
        </>
    )

}
