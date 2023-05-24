import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';


function CategoriaDeseada() {

    const [show, setShow] = useState(false);
    const [listCategories, setlistCategories] = useState([])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const filterProducts = (event) => {
        event.preventDefault();
        console.log(event.target.value)
        //colocar el codigo para el filtro por categorias
    };

    useEffect(() => {
        setlistCategories(['Frutas','Verduras','Granos','Frutos Secos','Especias'])
    }, []);

    return (
        <div className="categoriaDeseada" >
            <Button variant="primary" onClick={handleShow} className="btnCategoryHighlighted">
            Categorias Destacadas
            </Button>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton className='head-offCanva'>
                    <Offcanvas.Title className='head-offCanva' >Categorias Destacadas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                   {
                    listCategories.map((category, i) => (
                        <Button value={category} key={i} onClick={filterProducts} className='btnCategory'>{category}</Button>
                    ))
                   }
                </Offcanvas.Body>
            </Offcanvas>

        </div>


    )

};

export default CategoriaDeseada;