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

function Notificaciones() {
    const { contextState, setContextState } = useContextState();
    const [isLoading, setIsLoading] = useState(true);
    const [notificaciones, setNotificaciones] = useState([])
    useEffect(() => {
        if (!contextState.login.descripcion) {
            fetch(`http://localhost:5000/notificaciones/${contextState.login.id}`)
                .then((response) => response.json())
                .then((gestorJson) => {
                    console.log("gestor", gestorJson)
                    setNotificaciones(gestorJson)
                    setContextState({ newValue: false, type: "SET_LOADING" });
                });
        }
        else {
            fetch(`http://localhost:5000/peticiones/${contextState.login.id}`)
                .then((response) => response.json())
                .then((gestorJson) => {
                    console.log("gestor", gestorJson)
                    setNotificaciones(gestorJson)
                    setContextState({ newValue: false, type: "SET_LOADING" });
                })
        }

    }, []);
    
    function ListaDeNotificaciones({ notificaciones }) {
        return (
            notificaciones.map((n) => {
                return (
                    <div className='item'>
                        <h3>{n.mensaje}</h3> <br/><br/>
                        <p>{n.descripcion}</p>
                    </div>
                )
            }
            )
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
                                <Link to="/crearCuenta">
                                    <img src={notificaciones} alt="Foto de perfil" />
                                </Link>
                            </div>
                        }
                        {!contextState.isLoading && contextState.login && contextState.login.FotoPerfil === '' &&
                            <div>
                                <img src={profileImage} alt="Foto de perfil" className="profile-image" />
                                <Link to="/crearCuenta">
                                    <img src={notificaciones} alt="Foto de perfil" />
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </nav>



            <div className="gestor">
                {

                    (!isLoading && <ListaDeNotificaciones notificaciones={notificaciones} />)
                }
            </div>
            <br />
        </div>
    ) : (
        <div className="Contenedor-Mayor">
            <div className='contenedorAlerta'>
                <p className='alerta'>  Atención! No se le permite usar la pagina debido a que no ha iniciado sesión. Vaya a la página principal para hacerlo.</p>
            </div>
        </div>
    );

}
export default Notificaciones;