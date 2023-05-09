import React from 'react'
import imageCargando from "../../Assets/Cargando.svg"
import "./catalogo.css"

export default function imgCargando() {
  return (
    <div className='div-imgCargando'>
      <img src={imageCargando} className="imgCargando" alt="Cargando..." />
    </div>
  )
}
