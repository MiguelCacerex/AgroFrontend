import React from 'react'
import CardProduct from "../Catalog/cardProduct"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import "./catalogo.css"

export default function listCardsProducts(props) {

  return (
    <Box sx={{ width: '100%', marginTop:'20px' }}>
      <Grid container  rowSpacing={3} >
        {
          props.products.map((product, i) => (
            <Grid key={i} className='conteiner-card' item xs={12} sm={6} md={4} lg={3} xl={2}>
              <CardProduct  key={product._id} product={product} />
            </Grid>))
        }
      </Grid>
    </Box>
  )
}
