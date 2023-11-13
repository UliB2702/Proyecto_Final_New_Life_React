import './index.css';
import './App.css';
import React from 'react';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import profileImage from './perfil.png';
import logo from './logo.png';
import { useContextState } from "./contextState";
import notificaciones from './bell-fill.svg'
//import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';




function AdministradorDeDocumentos() {

  const { contextState, setContextState } = useContextState();
  const [clientes, setClientes] = useState([])
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {

    fetch("http://localhost:5000/gestores/clientes/1")
      .then((response) => response.json())
      .then((clienteJson) => {
        
        setClientes(clienteJson)
        setContextState({ newValue: false, type: "SET_LOADING" });
      });
  }, []);

  function ListaTramites(cliente) {


    if (cliente !== undefined) {
      let lista = JSON.parse(cliente.cliente)
      return (
        lista.map((tramite) => {
          return (
            <div className='col-3'>
              <div className="card">
                <img class="card-img-top" src={tramite.Imagen} alt="Imagen del tramite" />
                <div className="card-body">
                  <h5 className="card-title">{tramite.Nombre}</h5>
                  <p className="card-text">{tramite.Descripción}</p>
                  <Link to={`/detalleTramite/${tramite.id}`}><button className="btn btn-primary">Ver información</button></Link> <Link to="/editorTramites"><button className="btn btn-primary">Editar trámite</button></Link>
                </div>
              </div>
            </div>
          )
        })
      )
    }
  }


  function ListaDeClientes2(login) {
    return (
      clientes.map((c) => {
        if (c.ListaTramites !== null && c.id === login.login.Id) {
          return (
            <div>
              <div className='row'>
                <ListaTramites cliente={c.ListaTramites} />
              </div>
            </div>
          )
        }
      })

    )
  }

  const ListaDeClientes = () => {
    return (
      clientes.map((c) => {
        if (c.ListaTramites !== null) {
          return (
            <div>
              <h4>{c.nombre}</h4>
              <hr className='separadorTramites'></hr>
              <div className='container'>
                <div className='row'>
                  <ListaTramites cliente={c.ListaTramites} />
                </div>
              </div>
            </div>
          )
        }
      })

    )
  }


  return contextState.login ? (

    <div className="Contenedor-Mayor">

      <nav className='navbar bg-body-tertiary border-header-top'>
        <div className='container-fluid Padre'>
          <img className='navbar-brand logo' src={logo} alt="New Life" width="30" height="24" />
          {!contextState.isLoading && contextState.login && contextState.login.FotoPerfil !== '' &&
            <div>
              <img src={contextState.login.FotoPerfil} alt="Foto de perfil" className="profile-image" />
              <Link to="/notificaciones">
                <img src={notificaciones} alt="Foto de perfil" />
              </Link>
            </div>
          }
          {!contextState.isLoading && contextState.login && contextState.login.FotoPerfil === '' &&
            <div>
              <img src={profileImage} alt="Foto de perfil" className="profile-image" />
              <Link to="/notificaciones">
                <img src={notificaciones} alt="Foto de perfil" />
              </Link>
            </div>
          }
        </div>
      </nav>
      {contextState.login.Descripción &&
        <>
          <br className='separador'></br>
          <div className="tramites">
            <h2> Lista de Tramites </h2>
            <hr></hr>
            <Link to="/agregarTramite"><button type="button" className='btn btn-light derecha border botonesDeAgregacion'> + Agregar Tramite </button></Link> <br /><br />
          </div>

          {
            (isLoading !== undefined && clientes !== undefined && <ListaDeClientes />)
          }
        </>
      }
      {!contextState.login.Descripción &&
        <>
          <br className='separador'></br>
          <div className="tramites">
            <h2> Lista de Tramites </h2>
            <hr></hr>
          </div>
          <div>
            <h4>Tus Tramites</h4>
            <hr className='separadorTramites'></hr>
            <div className='container'>
              <ListaDeClientes2 login={contextState.login} />
            </div>
          </div>
        </>
      }
    </div>


  ) : (
    <div className="Contenedor-Mayor">
      <div className='contenedorAlerta'>
      <p className='alerta center-name'>  Atención! No se le permite usar la pagina debido a que no ha iniciado sesión. Vaya a la página principal para hacerlo. Si quiere hacerlo, entre...  <Link to="/inicioSesion"> aquí.</Link></p>
      </div>
    </div>
  );
}

export default AdministradorDeDocumentos;