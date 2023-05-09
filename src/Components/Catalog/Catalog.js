import React, { useEffect, useState } from 'react'
import { getAllProducts } from "../../Services/product.service";
import ImgCargando  from "../Catalog/imgCargando"
import ListCardsProducts from "../Catalog/listCardsProducts"

export default function Proveedores() {

  const [products, setListProducts] = useState([]);

  useEffect(() => {
    const getAllProductsDB = async () => {

      const productsDB = await getAllProducts();
      setListProducts(productsDB.data.result);
  }
  getAllProductsDB();
  }, []) 
   
  return (
    <div>
      <h1>Lista de productos</h1>
      {products.length !== 0 ? <ListCardsProducts  products={products}/>:<ImgCargando/>}
    </div>
  )
}
