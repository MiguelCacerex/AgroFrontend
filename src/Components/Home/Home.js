import React from 'react'
import CategoriaDestacada from './CategoriaDestacada';
import InformacionVendedor from './InformacionVendedor';
import CarruselProductosDestacados from './CarruselProductosDestacados'
import CarruselOfertasEspeciales from './CarruselOfertasEspeciales';
import './Home.css'

export default function PageHome() {
    return (
      <div>
        <div className='div-categoriaDestacada' >
          <CategoriaDestacada />
        </div>
        <div className='container-carrusel'>
          <h2 className='divider'>Productos Destacados</h2>
          <CarruselProductosDestacados></CarruselProductosDestacados>
        </div>
        <div className='container-carrusel'>
          <h2 className='divider'>Ofertas Especiales</h2>
          <CarruselOfertasEspeciales></CarruselOfertasEspeciales>
        </div>
        <div >

          <InformacionVendedor />
        </div>
      </div>
    )
}
