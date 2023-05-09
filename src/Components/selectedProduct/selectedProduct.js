import React from 'react'
import { useParams } from 'react-router-dom';


 function SelectedProduct() {
  const { idProduct } = useParams();
  console.log(idProduct)
  return (
    <div>selectedProduct</div>
  )
}
export default SelectedProduct