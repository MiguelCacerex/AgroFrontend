import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

import NavBar from './Components/Menu/NavBar';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer'
import Catalog from './Components/Catalog/Catalog';
import AboutUs from './Components/AboutUs/AboutUs';
import BuyerProfile from './Components/buyerProfile/buyerProfile';
import SellerProfile from './Components/SellerProfile/sellerProfile';
import Registro from './Components/Login/registro';
import SelectedProduct from './Components/selectedProduct/selectedProduct';
import ShoppingCart from './Components/ShoppingCar/shoppingCar';
import Confirm from './Components/Confirm/confirm';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";               
import 'primeicons/primeicons.css';
        

function App() {
  return (
    <div className='body'>
      <Router>
        <NavBar />
          <Routes>
            <Route path="/user/confirm/:token" element={<Confirm/>} />
            <Route path="/" exact element={<Home />} />
            <Route path="/sobreNosotros" element={<AboutUs />} />
            <Route path="/catalogoProductos" element={<Catalog />} />
            <Route path="/mi_negocio/:idSeller" element={<SellerProfile />} />
            <Route path="/mi_perfil/:idBuyer" element={<BuyerProfile />} />
            <Route path="/product/:idProduct" element={<SelectedProduct />} />
            <Route path="/carrito/:idBuyer" element={<ShoppingCart />} />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </Router>
        <Footer />
    </div>

  );
}

export default App;

