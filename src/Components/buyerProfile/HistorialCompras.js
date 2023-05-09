import { Typography} from "@mui/material";
import Table from 'react-bootstrap/Table';
import * as React from 'react';

export default function Historial(props) {
    return (
      <div>
        <Typography
          id="idHistorialCompras"
          level="body3"
          textTransform="uppercase"
          fontWeight="lg"
          marginTop={{marginTop: '50px'}}
          style={{fontSize: '30px' }}

        >
          Historial de compras 
        </Typography>
            <Table striped>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Precio($)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {props.historial.map((value) => (
                        <tr>
                            <td>{value.codigo}</td>
                            <td>{value.nombre}</td>
                            <td>{value.cantidad}</td>
                            <td>{value.valor}</td>
                        </tr>
                        
                    ))}
              </tbody>
        </Table>
      </div>
    );
  }