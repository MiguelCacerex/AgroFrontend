import './BuyerProfile.css';
import UserForm from './UserForm';
import Perfil from './Perfil';
import HistorialCompras from './HistorialCompras';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useState } from 'react';
import Cookies from "universal-cookie"
import Button from 'react-bootstrap/Button';


const usuario = {
  userName: "Xime",
  name: "Laura Ximena",
  surname: "Montoya Murillo",
  phone: "985978989",
};

const historialCompras = [{
  codigo: "1",
  nombre: "Arroz",
  cantidad: "2",
  valor: "10000"
},
{
  codigo: "2",
  nombre: "Arroz",
  cantidad: "2",
  valor: "10000"
}
];



function BuyerProfile() {
  const [showUserFormIsShown, setUserFormIsShown] = useState(false);
  const cookies = new Cookies()

  const handleLogout = async (event) => {
    cookies.remove("userSession", { path: '/' })
    cookies.remove("userData", { path: '/' })
    cookies.remove("userType", { path: '/' })
    cookies.remove("idUser", { path: '/' })
    cookies.remove("isAuthenticate", { path: '/' })
    cookies.remove("token", { path: '/' })
    window.location.href = "/";
  };
  function showUserFormHandler() {
    setUserFormIsShown(true);
  };

  function hideUserFormHandler() {
    setUserFormIsShown(false);
  };

  const [key, setKey] = useState('detalles');

  const [image, setImage] = useState();

  return (
    <div className='BuyerProfile'  >
      <Button onClick={handleLogout} className='btnNav'>Logout</Button>

      {showUserFormIsShown && <UserForm onSetImage={setImage} onCloseUserForm={hideUserFormHandler} />}

      {image}

      <h3 className="saludoPerfil">Hola {usuario.name}!</h3>


      <Tabs
        defaultActiveKey="profileBuyer"
        id="profileBuyer"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        style={{ backgroundColor: 'white', marginTop: '30px' }}

      >
        <Tab eventKey="detalles" title="DETALLES">
          <Perfil
            user={usuario}
            onShowUserForm={showUserFormHandler}
          />

        </Tab>
        <Tab eventKey="carrito" title="CARRITO DE COMPRAS" >

        </Tab>
        <Tab eventKey="historial" title="HISTORIAL DE COMPRAS">
          <HistorialCompras
            historial={historialCompras}
          />

        </Tab>
        <Tab eventKey="producto" title="PRODUCTOS FAVORITOS">

        </Tab>
      </Tabs>
    </div>
  );
}

export default BuyerProfile;