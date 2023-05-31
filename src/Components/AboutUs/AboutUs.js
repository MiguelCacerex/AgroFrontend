import React, { Component } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './aboutUs.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import imgMiguel from '../../Assets/imgMiguel.jpeg'
import imgDayana from '../../Assets/imgDayana.jpeg'
import imgXimena from '../../Assets/imgXimena.jpeg'


export default class AboutUs extends Component {
  render() {
    return (
      <div>
        <div className='div-title-aboutUs'>
          <h1 className='title-aboutUs'>Acerca Del Proyecto</h1>
        </div>
        <div className='div-p-aboutUs'>
          <p className='p-aboutUs'>
            AgroMarketPlace es un proyecto innovador que tiene como objetivo mejorar la vida de los agricultores colombianos, que a menudo luchan por vender sus productos a precios justos debido a la falta de canales de venta directa. En lugar de depender de intermediarios que se llevan una parte significativa de las ganancias, AgroMarketPlace permite a los agricultores vender directamente sus productos a los consumidores, lo que les permite obtener un beneficio justo por su arduo trabajo y esfuerzo.
          </p>
          <p className='p-aboutUs'>
            Además de ayudar a los agricultores, AgroMarketPlace también tiene un impacto positivo en los consumidores que buscan alimentos frescos y de alta calidad a precios justos. Al comprar directamente del agricultor, los consumidores pueden estar seguros de que están obteniendo productos frescos y de alta calidad, y también pueden aprender más sobre los procesos de cultivo y producción de los alimentos que consumen.
          </p>
        </div>
        <div className='div-title2-aboutUs'>
          <h3 className='title-aboutUs'>Equipo De Desarrollo</h3>
        </div>
        <div>
          <Box sx={{ width: '100%', marginBottom: '10px' }}>
            <Grid container rowSpacing={3} >
            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className='card-pefil'>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={imgXimena}
                    alt="imagen de persona"
                  />
                  <CardContent className='container-cardbody'>
                    <Typography gutterBottom variant="h5" component="div">
                    Laura Ximena Montoya
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Estudiante de Ing en sistemas y computacion
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <a href='https://www.linkedin.com/in/miguelcacerex/' rel="noreferrer" style={{ textDecoration: 'none', color: '#265073' }} target="_blank">Visitar perfil de linkedin</a>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className='card-pefil'>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={imgDayana}
                    alt="imagen de persona"
                  />
                  <CardContent className='container-cardbody'>
                    <Typography gutterBottom variant="h5" component="div">
                      Laura Dahiana Ramos
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Estudiante de Ing en sistemas y computacion
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <a href='https://www.linkedin.com/in/miguelcacerex/' rel="noreferrer" style={{ textDecoration: 'none', color: '#265073' }} target="_blank">Visitar perfil de linkedin</a>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4} className='card-pefil'>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={imgMiguel}
                    alt="imagen de persona"
                  />
                  <CardContent className='container-cardbody'>
                    <Typography gutterBottom variant="h5" component="div">
                      Miguel Alexis Caceres
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Estudiante de Ing en sistemas y computacion
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <a href='https://www.linkedin.com/in/miguelcacerex/' rel="noreferrer" style={{ textDecoration: 'none', color: '#265073' }} target="_blank">Visitar perfil de linkedin</a>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
    )
  }
}
