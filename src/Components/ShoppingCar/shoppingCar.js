import React, {useState, useEffect } from 'react'
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import Cookies from "universal-cookie"
import './shoppingCar.css'
import { getAllProductsCar, deleteProductCar } from '../../Services/buyer.service';

function ShoppingCar() {
  const cookies = new Cookies()
  const [dataUser, setDataUser] = useState(cookies.get('userData'))
  const [productsCar, setProductsCar] = useState([])


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
    <div>
      <div className='div-title-car'>
        <h1 className='title-car'>Mi Carro De Compras</h1>
      </div>
      <div className="card">
        {
          productsCar !== undefined && productsCar.length > 0
            ? <DataView value={productsCar} itemTemplate={itemTemplate} />
            : <>
              <h3 className='div-info-carProducts'>No tiene Productos en su carrito</h3>
            </>
        }
      </div>
    </div>
  )
}

export default ShoppingCar