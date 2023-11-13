import './index.css';
import './App.css';
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import profileImage from './perfil.png';
import logo from './logo.png';
import { useContextState } from "./contextState";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import notificaciones from './bell-fill.svg'

function AgregarTramite() {
  const navigate = useNavigate();
  const { contextState, setContextState } = useContextState();

  async function verificacion(userInfo){
    console.log("entra a verificacion")
    try{
      console.log(userInfo)
      const requestOptions = {                                                                                                                                                                          
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idg: (contextState?.login?.Id) , idc: (userInfo.IDC), idp: (userInfo.IDP), nombre: (userInfo.nombre), desc: (userInfo.descripcion), idTipo: (userInfo.IDT), imagen: (userInfo.Imagen)})
    };
    console.log(requestOptions)
      const response = await fetch('http://localhost:5000/tramites', requestOptions)
      if(response.ok){
        setContextState({ newValue: false, type: "SET_LOADING" });
        alert("El tramite fue creado. Vuelva a la seccion de tramites");
        navigate('/tramite')
      }
      await console.log(response.status)
      return response;  
 
    }
    catch(error){
      console.error("Error:", error);
      alert("Los datos no son correctos, vuelva a intentarlo");
          setContextState({ newValue: false, type: "SET_LOADING" });
          return;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
      const datos = new FormData(event.target)
      const nuevoCliente = {
          IDC: datos.get("Idc"),
          nombre: datos.get("Nombre"),
          descripcion: datos.get("Descripcion"),
          IDP: datos.get("Idp"),
          IDT: datos.get("idt"),
          Imagen: datos.get("LinkFoto"),
      }
      verificacion(nuevoCliente)
  }
  return contextState.login ? (
    <div className="Contenedor-Mayor">
      <nav className='navbar bg-body-tertiary border-header-top'>
        <div className='container-fluid Padre'>
          <img className='navbar-brand logo' src={logo} alt="New Life" width="30" height="24" />
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



      <h3 className='center-name'>Crear Tramite</h3>
      <div className="center-buttons">
      <form onSubmit={handleSubmit}> 
            Escribe el id del cliente: <input className='' type='number'name='Idc' required/> <br/><br/>
            Escribe el nombre del tramite: <input className='' type='text'name='Nombre' required/> <br/><br/>
            Escribe la descripcion del tramite: <input className='' type='text'name='Descripcion' required/> <br/><br/>
            Escribe el id del pais: <input className='' type='number'name='Idp' required/> <br/><br/>
            Escribe el id del tipo del tramite: <input className='' type='number'name='idt' required/> <br/><br/>
            Agrega una foto para el tramite: <input className='' type='text'name='LinkFoto' required/> <br/><br/>

            
             <br/>
             <div className='Padre mb-3'>
             <br/>
               <input className='centrarElementos btn btn-light border border-dark' type='submit' value='Enviar'/> 
              
             </div>
             
          </form>


      </div>
    </div>
  ):(
    <div className="Contenedor-Mayor">
        <div className='contenedorAlerta'>
        <p className='alerta center-name'>  Atención! No se le permite usar la pagina debido a que no ha iniciado sesión. Vaya a la página principal para hacerlo. Si quiere hacerlo, entre...  <Link to="/inicioSesion"> aquí.</Link></p>
        </div>
    </div>  )
}

export default AgregarTramite;
