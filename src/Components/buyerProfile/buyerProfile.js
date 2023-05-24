import './BuyerProfile.css';
import React, {useState, useEffect } from 'react'
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import '../ShoppingCar/shoppingCar.css'
import { getAllProductsCar, deleteProductCar } from '../../Services/buyer.service';
import Cookies from "universal-cookie"
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { TabView, TabPanel } from 'primereact/tabview';


function BuyerProfile() {
  const cookies = new Cookies()
  const [user, setUser] = useState(cookies.get('userSession'))
  const [dataUser, setDataUser] = useState(cookies.get('userData'))
  const [productsCar, setProductsCar] = useState([])

  const handleLogout = async (event) => {
    cookies.remove("userSession", { path: '/' })
    cookies.remove("userData", { path: '/' })
    cookies.remove("userType", { path: '/' })
    cookies.remove("idUser", { path: '/' })
    cookies.remove("isAuthenticate", { path: '/' })
    cookies.remove("token", { path: '/' })
    window.location.href = "/";
  };


  useEffect(() => {
    obternerProductosCarroCompras();
  }, [productsCar])

  const obternerProductosCarroCompras = async () => {
    const res = (await getAllProductsCar(dataUser._id)).data
    setProductsCar(res.productsCar)
  }
  const eliminarProductoCarrito = async (idProducto) => {
    const res = (await deleteProductCar(idProducto, dataUser._id)).data
    setProductsCar(res.productsCar)
  }

  const itemTemplate = (product) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round imgProductCar" src={product.urlImg} alt={product.name} />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{product.name}</div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">Sub-Total: ${product.price}</span>
              <Button icon="pi pi-trash" className="p-button-rounded btn-delete-productCar" onClick={eliminarProductoCarrito.bind(null, product._id)} value={product._id}></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Grid container className='div-grid-c'>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4} className='div-grid-img'>
            <div className='grid-div'>
              <img className='div-img' src={user.urlImg} alt='imagenPerfil' />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={8} xl={8} className='div-grid-h1'>
            <div>
              <h1>{dataUser.storeName}</h1>
              <h1>Bienvenido!  {user.name}</h1>
              <h1 className='div-h1'>{user.email}</h1>
            </div>
          </Grid>
        </Grid>
      </Box>

      <div className="div-tabs">
        <TabView>
          <TabPanel header="Mis compras">
            <div>

            </div>
          </TabPanel>
          <TabPanel header="Mi Carrito de compras">
            <div className="card">
              {
                productsCar !== undefined && productsCar.length > 0
                  ? <DataView value={productsCar} itemTemplate={itemTemplate} />
                  : <>
                    <h3 className='div-info-carProducts'>No tiene Productos en su carrito</h3>
                  </>
              }
            </div>
          </TabPanel>
        </TabView>
      </div>

      <Button onClick={handleLogout} className='btnLogout'>Cerrar Sesion</Button>

    </>
  );
}

export default BuyerProfile;