import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function cardProduct(props) {
  return (
    <Card style={{ width: '18rem'}} className='cardColor'>
      <Card.Img  src={props.product.urlImg} className='div-img-card'/>
      <Card.Body className='div-body'>
        <Card.Title className='div-title'>{props.product.name}</Card.Title>
        <Card.Text  className='div-text'>
          Precio {props.product.price} por {props.product.unitSale}
        </Card.Text>
      </Card.Body>
      <Button className='btnCard'>Ver mas</Button>
    </Card>
  )
}

