import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { getProductSelected } from '../../Services/product.service';
import './SelecProduct.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Divider } from 'primereact/divider';
import { addProductCar } from '../../Services/buyer.service';
import Cookies from "universal-cookie"
import { Toast } from 'primereact/toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { getAllProductsCar } from '../../Services/buyer.service';


function SelectedProduct() {

  const cookies = new Cookies()
  const toast = useRef(null);

  const { idProduct } = useParams();
  const [product, setProduct] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState(cookies.get('userSession'))
  const [dataUser, setDataUser] = useState(cookies.get('userData'))
  const [productsCar, setProductsCar] = useState([])

  useEffect(() => {
    productSelected();
  })

  const productSelected = async () => {
    const res1 = (await getProductSelected(idProduct)).data;
    setProduct(res1.dataProduct)
    const res2 = (await getAllProductsCar(dataUser._id)).data
    setProductsCar(res2.productsCar)

  }

  const addTheCar = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      if (user !== undefined) {
        if (user.type === 'BUYER') {
          const res = await (await addProductCar(idProduct, dataUser._id, cantidad)).data
          toast.current.show({ severity: 'success', summary: 'Notificacion', detail: res.msg, life: 8000 });
          setCantidad(0)
          let dataUserAux = dataUser;
          console.log(dataUserAux.cartProducts)
          console.log(res)
          dataUserAux.cartProducts = res.productsCar
          console.log(dataUserAux.cartProducts)

          setDataUser(dataUserAux)
          cookies.set("userData", dataUserAux, { path: '/', sameSite: 'strict' })

        } else {
          toast.current.show({ severity: 'error', summary: 'Notificacion', detail: 'Debes iniciar sesion con una cuenta de comprador', life: 8000 });
        }
      } else {
        toast.current.show({ severity: 'error', summary: 'Notificacion', detail: 'Debes iniciar sesion con una cuenta de comprador', life: 8000 });
      }
    }
  }

  return (
    <div>
      <Toast ref={toast} />
      {
        dataUser !== undefined && user.type === 'BUYER' && dataUser.cartProducts.length > 0
          ? <a href={'/carrito/'+dataUser._id}>
            <div className="carrito" >
            <FontAwesomeIcon icon={faShoppingCart} className='icon-shopinCar'/>
          </div>
          </a>
          : <></>
      }


      <Grid container spacing={3} className='grid-product'>
        <Grid className='div-img' item xs={12} sm={12} md={6} lg={6} xl={6}>
          <div >
            <img className='div-img-product' src={product.urlImg} alt='imagen producto' />
          </div>
        </Grid>
        <Grid className='div-detail-product' item xs={12} sm={12} md={6} lg={6} xl={6}>
          <div className='div-info'>
            <div className='div-infoProduct'>
              <p className='p-div'>   Nombre: {product.name}</p>
              <p className='p-div'>Categoria: {product.category}</p>
              <p className='p-div'>   Precio: {product.price} por {product.unitSale}</p>
            </div>
            <Divider />

            <div className='div-form-product'>
              <Form noValidate className='container-form' validated={validated} onSubmit={addTheCar}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <p className='p-cantidad'>Cantidad:</p>
                  <Form.Control
                    style={{ textAlign: 'center' }}
                    className='input-cantidad'
                    type="number"
                    onChange={({ target }) => setCantidad(target.value)}
                    value={cantidad}
                    min={1}
                    minLength={1}
                    placeholder="Ingrese la cantidad" />
                  <p className='p-cantidad'>{product.unitSale}(s) </p>
                  <Form.Control.Feedback type="invalid">
                    Debe comprar minimo un {product.unitSale}.
                  </Form.Control.Feedback>

                </Form.Group>
                <Button className='btn-añadirProduct' type="submit">
                  Agregar al Carrito
                </Button>
              </Form>

            </div>
          </div>
        </Grid>
      </Grid>
     
    </div>
  )
}
export default SelectedProduct