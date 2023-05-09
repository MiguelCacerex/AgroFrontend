import { Box } from "@mui/material";
import VendedorImg from '../../Assets/infoVendedor.svg';
import Grid from '@mui/material/Grid';

function InformacionVendedor() {
    return (
        <div className="informacionVendedor" >
            <h1 className="div-titulo">¿QUIERES CONVERTIRTE EN VENDEDOR?</h1>
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={3} >
                    <Grid className="grid-container" item xs={12} sm={12} md={12} lg={8} xl={8}>
                        <div className="div-infoNuevovendedor color-text" >
                            <p >
                                Si estás interesado en convertirte en vendedor en AgroMarketPlace,
                                estás en el lugar correcto. Aquí te explicamos los pasos necesarios para que
                                puedas empezar a vender tus productos en nuestra plataforma:
                            </p>
                            <ol>
                                <li>Lo primero que debes hacer es registrarte en nuestra página web y crear una cuenta de vendedor. Si ya tienes una cuenta pero de cliente, deberas crearte una nueva.</li>
                                <li>Una vez que hayas iniciado sesión, completa tu perfil de vendedor. Asegúrate de proporcionar información detallada sobre tu empresa.</li>
                                <li>
                                    Crea tus anuncios de productos en nuestra plataforma. Asegúrate de incluir descripciones detalladas de tus productos y de agregar imágenes de alta calidad.
                                </li>
                                <li>
                                    Configura tus opciones de pago y envío. Puedes elegir entre varias opciones de pago y envío para adaptarte a las necesidades de tus clientes.
                                </li>
                                <li>
                                    Comienza a vender tus productos a través de nuestra plataforma. ¡Listo! Ya eres un vendedor de AgroMarketPlace.
                                </li>
                            </ol>
                            <p>
                                Si necesitas ayuda en cualquier momento durante el proceso, nuestro equipo de soporte está disponible para ayudarte.
                            </p>
                            <p className="p-info">
                                ¡Buena suerte en tu nueva aventura como vendedor en AgroMarketPlace!
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4} className="grid-container">
                        <img src={VendedorImg} className="vendedorImg" alt="imagen-agricultor"/>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )

};

export default InformacionVendedor;