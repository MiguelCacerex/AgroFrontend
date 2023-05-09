import React, { useState, useEffect, useRef } from 'react'
import Cookies from "universal-cookie"
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { createNewProduct, deleteProduct, getProductsSeller, updateProduct } from '../../Services/seller.service';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Toast } from 'primereact/toast';


import './sellerProfile.css'


function SellerProfile() {

  const cookies = new Cookies()
  const [show, setShow] = useState(false);
  const [idProductSelect, setidProductSelect] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState("");
  const [showMessage, setshowMessage] = useState("Bienvenido");
  const [nameProduct, setNameProduct] = useState("");
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [descriptionProduct, setDescriptionProduct] = useState("");
  const [imageProduct, setImageProduct] = useState("");
  const [urlImageProduct, setUrlImageProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [unitSaleProduct, setUnitSaleProduct] = useState("Selecciona una");
  const [user, setUser] = useState(cookies.get('userSession'))
  const [dataUser, setDataUser] = useState(cookies.get('userData'))
  const [productsSeller, setProductsSeller] = useState()
  const toast = useRef(null);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    setNameProduct("")
    setCategoryProduct("Selecciona una")
    setDescriptionProduct("")
    setUnitSaleProduct("Selecciona una")
    setPriceProduct(0);
    setUrlImageProduct("")
    setImageProduct("")
  };

  const handleCloseEdit = () => {
    setShowEdit(false)
  };
  const handleShowEdit = () => {setShowEdit(true)};

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  useEffect(() => {
    getProductsSellerDB();
  }, [])
  
  useEffect(() => {
    uploadImage();
  }, [imageProduct])
  
  
  const getProductsSellerDB = async () => {
    const productsDB = await getProductsSeller(dataUser._id);
    setProductsSeller(productsDB.data.auxProducts);
  }
  
  const uploadImage = async () => {
    setUrlImageProduct(undefined)
    if (imageProduct !== "" && imageProduct !== undefined) {
      const data = new FormData();
      data.append("file", imageProduct);
      data.append("upload_preset", "mediaImages");
      setLoading(true);
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dymmwpkdg/image/upload",
        {
          method: "POST",
          body: data,
        }
      )
      const file = await res.json();
      setUrlImageProduct(file.secure_url)
      setLoading(false)
    }
  }

  const handleLogout = async (event) => {
    cookies.remove("userSession", { path: '/' })
    cookies.remove("userData", { path: '/' })
    cookies.remove("userType", { path: '/' })
    cookies.remove("idUser", { path: '/' })
    cookies.remove("isAuthenticate", { path: '/' })
    cookies.remove("token", { path: '/' })
    window.location.href = "/";
  };

  const header = (
    <div className="div-header flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Lista de productos</span>
      <Button className="btn-table-header" onClick={handleShow}>
        Crear producto
      </Button>
    </div>
  );

  const createProduct = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      const newProduct = {
        name: nameProduct,
        category: categoryProduct,
        unitSale: unitSaleProduct,
        price: priceProduct,
        urlImg: urlImageProduct,
        description: descriptionProduct
      }
      try {
        const res = await (await createNewProduct(dataUser._id, newProduct)).data
        handleClose();
        getProductsSellerDB();
        toast.current.show({ severity: 'success', summary: 'Notificacion', detail: res.msg, life: 8000 });
        setNameProduct("")
        setCategoryProduct("Selecciona una")
        setDescriptionProduct("")
        setUnitSaleProduct("Selecciona una")
        setPriceProduct(0);
        setUrlImageProduct("")
        setImageProduct("")
      } catch (error) {
        console.log(error)
      }

    }
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment >
        <div className='btns-table'>
          <Button rounded outlined className="mr-2 btn-table-edit" onClick={() => editProduct(rowData)}>
            Editar
          </Button>
          <Button rounded outlined className="btn-table-delete" severity="danger" onClick={() => confirmDeleteProduct(rowData)}>
            Eliminar
          </Button>
        </div>
      </React.Fragment>
    );
  };
  const editProduct = (product) => {
    setNameProduct(product.name)
    setCategoryProduct(product.category)
    setDescriptionProduct(product.description)
    setUnitSaleProduct(product.unitSale)
    setPriceProduct(product.price);
    setUrlImageProduct(product.urlImg)
    setImageProduct("")
    setidProductSelect(product._id)
    handleShowEdit();
  };

  const confirmDeleteProduct = (product) => {
    setNameProduct(product.name)
    setUrlImageProduct(product.urlImg)
    setidProductSelect(product._id)
    handleShowDelete();
  };

  const handleDeleteProduct = async () => {
    try {

      const res = await (await deleteProduct(dataUser._id, idProductSelect)).data
      getProductsSellerDB();
      handleCloseDelete();
      toast.current.show({ severity: 'success', summary: 'Notificacion', detail: res.msg, life: 8000 });
    } catch (error) {
      console.log(error)
    }
  }

  const editSelectProduct = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      const updateDataProduct = {
        name: nameProduct,
        category: categoryProduct,
        unitSale: unitSaleProduct,
        price: priceProduct,
        urlImg: urlImageProduct,
        description: descriptionProduct
      }
      try {
        const res = await (await updateProduct(idProductSelect, updateDataProduct)).data
        toast.current.show({ severity: 'success', summary: 'Notificacion', detail: res.msg, life: 8000 });
        getProductsSellerDB();
        handleCloseEdit();
        setNameProduct("")
        setCategoryProduct("Selecciona una")
        setDescriptionProduct("")
        setUnitSaleProduct("Selecciona una")
        setPriceProduct(0);
        setUrlImageProduct("")
        setImageProduct("")
      } catch (error) {
        console.log(error)
      }

    }
  }
  return (
    <>
      <Toast ref={toast} />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Creacion de producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <Form noValidate validated={validated} onSubmit={createProduct} className='modal-form'>
              <Form.Group>
                <Form.Label>Nombre del producto:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese el nombre del producto"
                  onChange={({ target }) => setNameProduct(target.value)}
                  value={nameProduct}
                />
                <Form.Control.Feedback type="invalid">
                  El nombre del producto es necesario.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Categoria del producto:</Form.Label>
                <Form.Select
                  required
                  onChange={({ target }) => setCategoryProduct(target.value)}
                >
                  <option>Selecciona una</option>
                  <option>Frutas</option>
                  <option>Verduras</option>
                  <option>Granos</option>
                  <option>Frutos Secos</option>
                  <option>Especias</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Por favor selecciona una opcion.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group >
                <Form.Label>Unidad de venta:</Form.Label>
                <Form.Select
                  required
                  onChange={({ target }) => setUnitSaleProduct(target.value !== "Selecciona una" ? target.value : undefined)}
                >
                  <option>Selecciona una</option>
                  <option>Libra</option>
                  <option>Kilo</option>
                  <option>Arroba</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Por favor selecciona una opcion.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Precio del producto:</Form.Label>
                <Form.Control
                  required
                  type="number"
                  min={1}
                  placeholder="Ingrese el precion del producto"
                  onChange={({ target }) => setPriceProduct(target.value)}
                  value={priceProduct}
                />
                <Form.Control.Feedback type="invalid">
                  El precio del producto es obligatorio.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Imagen del producto:</Form.Label>
                <Form.Control
                  type="file"
                  required
                  onChange={({ target }) => setImageProduct(target.files[0])}
                />
                <Form.Control.Feedback type="invalid">
                  La imagen del producto es necesaria.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Descripcion del producto:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese la descripcion del producto"
                  onChange={({ target }) => setDescriptionProduct(target.value)}
                  value={descriptionProduct}
                />
                <Form.Control.Feedback type="invalid">
                  La descripcion del producto es obligatoria.
                </Form.Control.Feedback>
              </Form.Group>
              <Container fluid className='container-butons'>
                <Button className='form-buttons' onClick={handleClose}>
                  Cancelar
                </Button>
                <Button type='submit' className='form-buttons'>Publicar</Button>
              </Container>
            </Form>
          </Box>
        </Modal.Body>
      </Modal>

      <Modal
        show={showEdit}
        onHide={handleCloseEdit}
        backdrop="static"
        keyboard={false}
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Edicion de producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <Form noValidate validated={validated} onSubmit={editSelectProduct} className='modal-form'>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Imagen del producto:</Form.Label>
              <div className='div-img-edit'>
                <img src={urlImageProduct} alt='imagenProducto' className='img-edit' />

              </div>
                <Form.Control
                  type="file"
                  onChange={({ target }) => setImageProduct(target.files[0])}
                />
                <Form.Control.Feedback type="invalid">
                  La imagen del producto es necesaria.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Nombre del producto:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese el nombre del producto"
                  onChange={({ target }) => setNameProduct(target.value)}
                  value={nameProduct}
                />
                <Form.Control.Feedback type="invalid">
                  El nombre del producto es necesario.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Categoria del producto:</Form.Label>
                <Form.Select
                  required
                  defaultValue={categoryProduct}
                  onChange={({ target }) => setCategoryProduct(target.value)}
                >
                  <option>Selecciona una</option>
                  <option>Frutas</option>
                  <option>Verduras</option>
                  <option>Granos</option>
                  <option>Frutos Secos</option>
                  <option>Especias</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Por favor selecciona una opcion.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group >
                <Form.Label>Unidad de venta:</Form.Label>
                <Form.Select
                  required
                  defaultValue={unitSaleProduct}
                  onChange={({ target }) => setUnitSaleProduct(target.value !== "Selecciona una" ? target.value : undefined)}
                >
                  <option>Selecciona una</option>
                  <option>Libra</option>
                  <option>Kilo</option>
                  <option>Arroba</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Por favor selecciona una opcion.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Precio del producto:</Form.Label>
                <Form.Control
                  required
                  type="number"
                  min={1}
                  placeholder="Ingrese el precion del producto"
                  onChange={({ target }) => setPriceProduct(target.value)}
                  value={priceProduct}
                />
                <Form.Control.Feedback type="invalid">
                  El precio del producto es obligatorio.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label>Descripcion del producto:</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ingrese la descripcion del producto"
                  onChange={({ target }) => setDescriptionProduct(target.value)}
                  value={descriptionProduct}
                />
                <Form.Control.Feedback type="invalid">
                  La descripcion del producto es obligatoria.
                </Form.Control.Feedback>
              </Form.Group>
              <Container fluid className='container-butons'>
                <Button className='form-buttons' type='button' onClick={handleCloseEdit}>
                  Cancelar
                </Button>
                <Button type='submit' className='form-buttons'>Actualizar</Button>
              </Container>
            </Form>
          </Box>
        </Modal.Body>
      </Modal>

      <Modal
        show={showDelete}
        onHide={handleCloseDelete}
        backdrop="static"
        keyboard={false}
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminacion de producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <img src={urlImageProduct} alt='imagenProducto' className='img-delete' />
            <h1>{nameProduct}</h1>
            <p className='p-delete-product'>¿Estas seguro quieres eliminar este producto?</p>
            <Container fluid className='container-butons'>
              <Button className='form-button-cancelar' onClick={handleCloseDelete}>
                Cancelar
              </Button>
              <Button onClick={handleDeleteProduct} className='form-button-delete'>Eliminar</Button>
            </Container>
          </Box>
        </Modal.Body>
      </Modal>

      <Box sx={{ width: '100%' }}>
        <Grid container className='div-grid-c'>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4} className='div-grid-img'>
            <div className='grid-div'>
              <img className='div-img' src={user.urlImg} alt='imagenPerfil' />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={8} xl={8} className='div-grid-h1'>
            <div>
              <h1>{dataUser.storeName}</h1>
              <h1>Bienvenido!  {user.name}</h1>
              <h1 className='div-h1'>{user.email}</h1>
            </div>
          </Grid>
        </Grid>
      </Box>

      <div className="div-tabs">
        <TabView>
          <TabPanel header="Mis productos">
            <div>
              <DataTable value={productsSeller} scrollable sortMode="multiple" paginator rows={5} rowsPerPageOptions={[5, 10, 15]} header={header} tableStyle={{ width: '100%' }}>

                <Column field="name" sortable frozen header="Nombre"></Column>
                <Column field="price" sortable header="Precio"></Column>
                <Column field="category" sortable header="Categoria"></Column>
                <Column field="unitSale" sortable header="Unidad de venta"></Column>
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>

              </DataTable>
            </div>
          </TabPanel>
          <TabPanel header="Mis pedidos">

          </TabPanel>
        </TabView>
      </div>

      <Button onClick={handleLogout} className='btnLogout'>Logout</Button>

    </>
  )
}

export default SellerProfile;


