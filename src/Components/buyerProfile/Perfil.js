import "./Perfil.css"
import Card from '@mui/material/Card';
import { CardContent, Typography, Button} from "@mui/material";


function Perfil (props) {
return (

    <div className="perfil">

        <Card style={{backgroundColor: '#26BBB1'}}>
            <CardContent >
                <Typography sx={{ fontSize: 24 }} style={{marginLeft: 100}} >
                    Información:
                </Typography>

                <Typography sx={{ fontSize: 20 }}>
                    Nombre: {props.user.name}
                </Typography>

                <Typography sx={{ fontSize: 20 }}>
                    Apellidos: {props.user.surname}
                </Typography>

                <Typography sx={{ fontSize: 20 }}>
                    celular: {props.user.phone}
                </Typography>
            </CardContent>
        </Card>

        <Button onClick={props.onShowUserForm} style={{backgroundColor: '#1976D2', marginTop: 50, marginLeft: 500, color:'black'}} >
            Editar información
        </Button>
    </div>
)
};

export default Perfil;