import './index.css';
import './App.css';
import React from 'react';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import profileImage from './perfil.png';
import { ActionTypes, useContextState } from "./contextState";
import notificacionesLogo from './bell-fill.svg'

function Notificaciones() {
    const { contextState, setContextState } = useContextState();
    const [isLoading, setIsLoading] = useState(true);
    const [notificaciones, setNotificaciones] = useState([])
    useEffect(() => {
        console.log(contextState?.login?.Descripción)
        if (!contextState?.login?.Descripción) {
            fetch(`http://localhost:5000/notificaciones/${contextState?.login?.Id}`)
                .then((response) => response.json())
                .then((gestorJson) => {
                    console.log("gestor", gestorJson)
                    setNotificaciones(gestorJson)
                    setContextState({ newValue: false, type: "SET_LOADING" });
                });
        }
        else {
            fetch(`http://localhost:5000/peticiones/${contextState?.login?.Id}`)
                .then((response) => response.json())
                .then((gestorJson) => {
                    console.log("Son peticiones")
                    console.log("gestor", gestorJson)
                    setNotificaciones(gestorJson)
                    setContextState({ newValue: false, type: "SET_LOADING" });
                })
        }

    }, []);
    
    function ListaDeNotificaciones() {
        console.log("Llego aqui")
        console.log(notificaciones)
        return notificaciones.length !== 0 ?(
            notificaciones?.map((n) => {
                return (
                    <div className='item border border-dark'>
                        <h3>{n?.Mensaje}</h3>
                        <hr/>
                        <p>{n?.Descripcion}</p>
                    </div>
                )
            }
            )
        ) : (
            <p className='alerta center-name font-weight-bold'> No tienes ninguna notificacion</p> 
        )

    };

    return contextState.login ? (
        <div className="Contenedor-Mayor">
            <nav className='navbar bg-body-tertiary border-header-top'>
                <div className='container-fluid Padre'>
                    <img className='navbar-brand logo' src={logo} alt="New Life" width="30" height="24" />
                    <div>
                        {!contextState.isLoading && contextState.login && contextState.login.FotoPerfil !== '' &&
                            <div>
                                <img src={contextState.login.FotoPerfil} alt="Foto de perfil" className="profile-image" />
                                <Link to="/notificaciones">
                                    <img src={notificacionesLogo} alt="Foto de perfil" />
                                </Link>
                            </div>
                        }
                        {!contextState.isLoading && contextState.login && contextState.login.FotoPerfil === '' &&
                            <div>
                                <img src={profileImage} alt="Foto de perfil" className="profile-image" />
                                <Link to="/notificaciones">
                                    <img src={notificacionesLogo} alt="Foto de perfil" />
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </nav>



            <div className="gestor">
                {

                    (notificaciones !== undefined && <ListaDeNotificaciones />)
                }
            </div>
            <br />
        </div>
    ) : (
        <div className="Contenedor-Mayor">
            <div className='contenedorAlerta'>
                <p className='alerta center-name'>  Atención! No se le permite usar la pagina debido a que no ha iniciado sesión. Vaya a la página principal para hacerlo. Si quiere hacerlo, entre...  <Link to="/inicioSesion"> aquí.</Link></p>
            </div>
        </div>
    );

}
export default Notificaciones;