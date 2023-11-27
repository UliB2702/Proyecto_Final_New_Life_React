import './index.css';
import './App.css';
import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

function NoEncontrado() {
  
  return(
    <div className="Contenedor-Mayor">
        <div className='contenedorAlerta'>
        <p className='alerta center-name'>  Atención! Estas entrando a una direccion que no existe. Si quiere iniciar sesion, entre a...  <Link to="/inicioSesion"> aquí.</Link></p>
        </div>
    </div>  )
}

export default NoEncontrado;
