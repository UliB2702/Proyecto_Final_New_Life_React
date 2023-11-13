import './index.css';
import './App.css';
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import profileImage from './perfil.png';
import logo from './logo.png';
import edificio from './building.svg';
import notificaciones from './bell-fill.svg'
import pregunta from './question-square-fill.svg';
import reseñas from './pencil-square.svg';
import { useContextState } from "./contextState";
import FormularioSolicitud from './FormPeticion'; 

function HubSuperior() {
  const { contextState, setContextState } = useContextState();
  const [gestor, setGestor] = useState([])
  useEffect(() => {
    fetch("http://localhost:5000/gestores/1")
      .then((response) => response.json())
      .then((gestorJson) => {
        console.log("gestor", gestorJson)
        setGestor(gestorJson[0])
        setContextState({ newValue: false, type: "SET_LOADING" });
      });
  }, []);

  return (
    <div className="Contenedor-Mayor">
      <nav className='navbar bg-body-tertiary border-header-top'>
        <div className='container-fluid Padre'>
          <img className='navbar-brand logo' src={logo} alt="New Life" width="30" height="24" />

          {!contextState.isLoading && !contextState.login &&
            <>
              <ul className='arreglarbotones'>
                <Link to="/inicioSesion">
                  <li className="nav-item border">
                    <a className='nav-link active' aria-current="page" href="sdfs.html">Iniciar sesión</a>
                  </li>
                </Link>
                <Link to="/crearCuenta">
                  <li className="nav-item border">
                    <a className='nav-link active' aria-current="page" href="sdfsdf.html">Registrarse</a>
                  </li>
                </Link>
              </ul>
              <div>
                <img src={profileImage} alt="Foto de perfil" className="profile-image" />
              </div>
            </>
          }
          {!contextState.isLoading && contextState.login &&  contextState.login.FotoPerfil !== '' &&
            <div>
              <img src={contextState.login.FotoPerfil} alt="Foto de perfil" className="profile-image" />
              <Link to="/notificaciones">
              <img src={notificaciones} alt="Foto de perfil" />
              </Link>
            </div>
          }
          {!contextState.isLoading && contextState.login &&  contextState.login.FotoPerfil === '' &&
            <div>
              <img src={profileImage} alt="Foto de perfil" className="profile-image" />
              <Link to="/notificaciones">
              <img src={notificaciones} alt="Foto de perfil" />
              </Link>
            </div>
          }
        </div>
      </nav>

      <div className="gestor">
        {!contextState.isLoading &&
          <img src={gestor.FotoPerfil} alt="Imagen de gestor" className="gestor-image" />
        }
      </div>
      <h1 className='center-name'> <u>{gestor.Nombre}</u></h1>
      <div className="center-buttons">
        <Link to="/resenas">
        <a className="reviews-button" href="sdfsdf.html">
          <img className="faq-button logos-botones" src={reseñas} alt="Reseñas" />
        </a>
        </Link>
        <Link to="/preguntas">
        <a className="faq-button" href="sdfsdf.html">
          <img className="faq-button logos-botones" src={pregunta} alt="Preguntas Frecuentes" />
        </a>
        </Link>
        <Link to="/tramite">
          <a className="citizenships-button" href="sdfsdf.html">
            <img className="faq-button logos-botones" src={edificio} alt="Ciudadanias" />
          </a>
        </Link>
      </div>
      <div className="Padre">
        <span className='border border-dark description'>
          {gestor.Descripción}
        </span>
      </div>
      <br />
      {contextState.login && !contextState.login.Descripción &&
      <>
      <h3 className='center-name'><u>Deja tu peticion aqui:</u></h3>
      <div className='Padre mb-3'>
        <FormularioSolicitud /> 
      </div>
      <br />
      </>
      }
    </div>
  );
}

export default HubSuperior;
