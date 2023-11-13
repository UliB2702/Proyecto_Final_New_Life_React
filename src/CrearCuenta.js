import './index.css';
import './App.css';
import React from 'react';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.png';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ActionTypes, useContextState } from "./contextState";

function CrearCuenta() {
    const navigate = useNavigate();
    const { contextState, setContextState } = useContextState();
    const [userInfo, setUserInfo] =  useState([])
    const [cliente, setCliente] = useState([])
    
    

    async function verificacion(userInfo){
      console.log("entra a verificacion")
      try{
        console.log(userInfo)
        const requestOptions = {                                                                                                                                                                          
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre: (userInfo.nombre) , dni: (userInfo.dni), email: (userInfo.email), psw: (userInfo.contraseña), foto: (userInfo.fotoPerfil)})
      };
      console.log(requestOptions)
        const response = await fetch('http://localhost:5000/clientes', requestOptions)
        if(response.ok){
          const token = await response.json();
          console.log(token)
          setContextState({
            newValue: token[0],
            type: ActionTypes.setLogin,
          });
          setContextState({ newValue: false, type: "SET_LOADING" });
          alert("La cuenta fue creada. Inicie sesion para poder utilizarla");
          navigate('/inicioSesion')
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
            nombre: datos.get("Nombre"),
            email: datos.get("Email"),
            contraseña: datos.get("Contraseña"),
            dni: datos.get("DNI"),
            fotoPerfil: datos.get("LinkFoto"),
        }
        verificacion(nuevoCliente)
        
        /*
        if(userInfo !== undefined){
            verificacion(nuevoCliente)
            window.localStorage.setItem(
              'loggedNoteAppUser', JSON.stringify(userInfo)
            ) */
            setContextState({
              newValue: nuevoCliente,
              type: ActionTypes.setLogin,
            });
          }
        
    
    /*useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if(loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setCliente(user)
        } 
      })*/
    

   
    
    return (

        
        <div className="Contenedor-Mayor">
        <nav className='navbar bg-body-tertiary border-header-top'>
        <div className='container-fluid Padre'>
        <img className='navbar-brand logo' src={logo} alt="New Life" width="30" height="24"/>
        <ul className='arreglarbotones'>
        </ul>
        </div>
        </nav>
    
    
    <div className="centro">
   
    </div>
    <h2 className='center-name'>Crea tu cuenta</h2>
    <div className="center-buttons">

    <form  onSubmit={handleSubmit}> 
            Escribe tu nombre y apellido: <input className='' type='text'name='Nombre' required/> <br/><br/>
            Escribe tu email: <input className='' type='text'name='Email' required/> <br/><br/>
            Escribe tu contraseña: <input className='' type='text'name='Contraseña' required/> <br/><br/>
            Escribe tu DNI: <input className='' type='text'name='DNI' required/> <br/><br/>
            Agregar Foto de Perfil: <input className='' type='text' name='LinkFoto'/> <br/><br/>

            
             <br/>
             <div className='Padre mb-3'>
             <br/>
               <input className='centrarElementos btn btn-light border border-dark' type='submit' value='Enviar'/> 
              
             </div>
             
          </form>
 
          
    
    </div>
    <h6 className='center-name'>¿Ya tienes un cuenta hecha?</h6><h6 className='center-name'> <Link to="/inicioSesion">Inicia Sesion</Link> </h6>
      <br/>
    </div>
    );
    
    

}

export default CrearCuenta;
