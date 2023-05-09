import { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../Login/registro.css'
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Checkbox from '@mui/material/Checkbox';
import { singUp } from '../../Services/user.service';
import { Toast } from 'primereact/toast';


const theme = createTheme();

export default function Registro() {
  const toast = useRef(null);
  const maxsize = 20;
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [urlImage, setUrlImage] = useState(undefined);
  const [loading, setLoading] = useState("");
  const [location, setLocation] = useState("");
  const [telephone, setTelephone] = useState("");
  const [direction, setDirection] = useState("");
  const [nameStore, setNameStore] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [storeDescription, setStoreDescription] = useState("");

  const [selectedOption, setSelectedOption] = useState('BUYER');
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const showMessageError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Ya existe un usuario con el correo ingresado', life: 8000 });
  }
  const showMessageSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success', detail: '¡Registro exitoso! Recuerda verificar tu cuenta', life: 8000 });
  }
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    uploadImage();
  }, [image])

  const uploadImage = async () => {
    setUrlImage(undefined)
    if (image !== "" && image !== undefined) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "mediaImages");
      setLoading(true);
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dymmwpkdg/image/upload",
        {
          method: "POST",
          body: data,
        }
      )
      const file = await res.json();
      setUrlImage(file.secure_url)
      setLoading(false)
    }
  }

  const registro = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      console.log(urlImage)
      if (selectedOption === "SELLER") {
        const newUser = {
          type: selectedOption,
          name: name + " " + apellido,
          email: email,
          password: password,
          telephone: telephone,
          location: location,
          urlImg: urlImage,
          storeName: nameStore,
          storeDescription: storeDescription,
          accountNumber: accountNumber
        }
        try {
          const res = await (await singUp(newUser)).data
          if (res.success === false) {
            showMessageError();
          } else {
            showMessageSuccess()
            window.location.href ="/"
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        const newUser = {
          type: selectedOption,
          name: name + " " + apellido,
          email: email,
          password: password,
          telephone: telephone,
          location: location,
          urlImg: urlImage,
          address: direction
        }
        try {
          const res = await (await singUp(newUser)).data
          if (res.success === false) {
            showMessageError();
          } else {
            showMessageSuccess()
            window.location.href ="/"
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="s" className="containerRegistro">
        <Toast ref={toast} />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: "100%"
          }}        >
          <Typography component="h1" variant="h5">
            Formulario de Registro
          </Typography>
          <Form noValidate className='container-form' validated={validated} onSubmit={registro}>
            <Grid container spacing={3}>
              <Grid item xs={12}  >
                <Typography >
                  Seleccione el Tipo de usuario:
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={4} xl={2}>
                <FormControlLabel control={<Checkbox value="BUYER" checked={selectedOption === "BUYER"} onChange={handleOptionChange} />
                } label="Comprador" />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={4} xl={5}>
                <FormControlLabel control={<Checkbox value="SELLER" checked={selectedOption === "SELLER"} onChange={handleOptionChange} />
                } label="Vendedor" />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Form.Group controlId="validationCustom01">
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    className='textfield-form'
                    placeholder="Ingrese su nombre"
                    onChange={({ target }) => setName(target.value)}
                    value={name}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingrese su nombre.
                  </Form.Control.Feedback>
                </Form.Group>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Form.Group controlId="validationCustom02">
                  <Form.Label>Apellidos:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    className='textfield-form'
                    placeholder="Ingrese sus apellidos"
                    onChange={({ target }) => setApellido(target.value)}
                    value={apellido}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingrese sus apellidos.
                  </Form.Control.Feedback>
                </Form.Group>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Form.Group controlId="validationCustom03">
                  <Form.Label>Correo:</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    className='textfield-form'
                    placeholder="Ingrese su correo"
                    onChange={({ target }) => setEmail(target.value)}
                    value={email}
                  />
                  <Form.Control.Feedback type="invalid">
                    Formato de correo invalido.
                  </Form.Control.Feedback>
                </Form.Group>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Form.Group controlId="validationCustom04">
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    className='textfield-form'
                    placeholder="Ingrese su contraseña"
                    onChange={({ target }) => setPassword(target.value)}
                    value={password}
                    minLength={6}
                    maxLength={10}
                  />
                  <Form.Control.Feedback type="invalid">
                    La contraseña debe de tener entre 6 y 10 caracteres.
                  </Form.Control.Feedback>
                </Form.Group>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                <Form.Group controlId="validationCustom05">
                  <Form.Label>Ubicacion:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    className='textfield-form'
                    placeholder="Ingrese su correo"
                    onChange={({ target }) => setLocation(target.value)}
                    value={location}
                  />
                  <Form.Control.Feedback type="invalid">
                    Formato de correo invalido.
                  </Form.Control.Feedback>
                </Form.Group>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                <Form.Group controlId="validationCustom06">
                  <Form.Label>Celular:</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    className='textfield-form'
                    placeholder="Ingrese su numero de celular"
                    onChange={({ target }) => setTelephone(target.value)}
                    value={telephone}
                    maxLength={10}
                    minLength={10}
                  />
                  <Form.Control.Feedback type="invalid">
                    El celular debe de tener 10 caracteres.
                  </Form.Control.Feedback>
                </Form.Group>
              </Grid>
              {selectedOption === "BUYER"
                ? <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                  <Form.Group controlId="validationCustom07">
                    <Form.Label>Direccion:</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      className='textfield-form'
                      placeholder="Ingrese su direccion"
                      onChange={({ target }) => setDirection(target.value)}
                      value={direction}

                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor ingrese su direccion.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Grid>
                : null}
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control type="file" onChange={({ target }) => setImage(target.files[0])}
                  />
                </Form.Group>
              </Grid>
              {selectedOption === "SELLER"
                ? <>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Form.Group controlId="validationCustom08">
                      <Form.Label>Nombre Empresa:</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        className='textfield-form'
                        placeholder="Ingrese el nombre se su empresa"
                        onChange={({ target }) => setNameStore(target.value)}
                        value={nameStore}
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese el nombre de su empresa.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <Form.Group controlId="validationCustom09">
                      <Form.Label>Numero de cuenta:</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        maxLength="20"
                        minLength="20"
                        className='textfield-form'
                        placeholder="Ingrese su numero de cuenta bancaria"
                        onChange={({ target }) => setAccountNumber(target.value)}
                        value={accountNumber}
                      />
                      <Form.Control.Feedback type="invalid">
                        El numero de cuenta debe de tener 20 digitos.
                      </Form.Control.Feedback>
                    </Form.Group>

                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Group controlId="validationCustom10">
                      <Form.Label>Descripcion de la empresa:</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        className='textfield-form'
                        placeholder="Ingrese la descripcion de la empresa"
                        onChange={({ target }) => setStoreDescription(target.value)}
                        value={storeDescription}
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingrese la descripcion de la empresa.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Grid>
                </> : <></>}
            </Grid>
            <Button
              className='btnRegistro'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrate
            </Button>
            <RouteLink to="/" className='enlaces'>
              ¿Ya tienes una cuenta? Inicia Sesion.
            </RouteLink>
          </Form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}