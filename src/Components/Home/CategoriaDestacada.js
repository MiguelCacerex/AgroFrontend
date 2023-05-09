import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';


import { CardContent, Card } from "@mui/material";
import { GiPineapple, GiTargetArrows, GiTomato } from "react-icons/gi";


function CategoriaDeseada() {

    const [show, setShow] = useState(false);
    const [listCategories, setlistCategories] = useState(['Verdura','Granos'])
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const filterProducts = (event) => {
        event.preventDefault();
        console.log(event.target.value)
        //colocar el codigo para el filtro por categorias
    };


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
            {/* <Card style={{backgroundColor: '#26BBB1',width:'1300px', marginLeft:'27px', marginTop:'20px'}}>
                <CardContent >
                    <Card style={{backgroundColor: '#CBEAE2', width:'980px', marginLeft: '290px', marginTop:'10px', height:'152px'}}>
                        <CardContent>
                            <h1 style={{fontSize:'80px', marginLeft:'50px'}}><GiPineapple /> <GiTomato/>
                                                            <h5>Frutas            Verduras</h5></h1>
                            

                        </CardContent>
                    </Card>
                </CardContent>
            </Card> */}

        </div>


    )

};

export default CategoriaDeseada;