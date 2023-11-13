import './index.css';
import './App.css';
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import profileImage from './perfil.png';
import logo from './logo.png';
import { useContextState } from "./contextState";
import { Link, useParams } from 'react-router-dom';
import notificaciones1 from './bell-fill.svg'

function DetalleTramite() {
    const { contextState, setContextState } = useContextState();
    const [tramite, setTramite] = useState([])
    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    let { idTramite } = useParams();


    useEffect(() => {
        console.log(idTramite)
        try {
            fetch(`http://localhost:5000/tramites/detalle/${idTramite}`)
                .then((response) => response.json())
                .then((clienteJson) => {
                    console.log("cliente", clienteJson)
                    setTramite(clienteJson)
                    setContextState({ newValue: false, type: "SET_LOADING" });
                });
        }
        catch {
            console.log("no se puedo hacer la busquedas")
        }
    }, []);

    return contextState.login ? (
        <div className="Contenedor-Mayor">
            <nav className='navbar bg-body-tertiary border-header-top'>
                <div className='container-fluid Padre'>
                    <img className='navbar-brand logo' src={logo} alt="New Life" width="30" height="24" />
                    {!contextState.isLoading && contextState.login && contextState.login.FotoPerfil !== '' &&
                        <div>
                            <img src={contextState.login.FotoPerfil} alt="Foto de perfil" className="profile-image" />
                            <Link to="/crearCuenta">
                                <img src={notificaciones1} alt="Foto de perfil" />
                            </Link>
                        </div>
                    }
                    {!contextState.isLoading && contextState.login && contextState.login.FotoPerfil === '' &&
                        <div>
                            <img src={profileImage} alt="Foto de perfil" className="profile-image" />
                            <Link to="/crearCuenta">
                                <img src={notificaciones1} alt="Foto de perfil" />
                            </Link>
                        </div>
                    }
                </div>
            </nav>

            {console.log(contextState.login)}

            {
                !contextState.isLoading && contextState.login && tramite.IdCliente === contextState.login.Id || tramite.IdGestor === contextState.login.Id &&
                <>
                    {console.log("Puede entrar")}
                    <h3 className='center-name'>Tramite</h3>
                    <br />
                    <div className='Padre mb-3'>
                        <h3 className='center-name'> Tienes acceso al tramite</h3>
                    </div>
                    <br />
                </>
            }

            {
                !contextState.isLoading && contextState.login && contextState.login.Id !== tramite.IdCliente && contextState.login.Id !== tramite.IdGestor &&
                <>

                    <div className='Padre mb-3'>
                        <h3 className='center-name'>No puedes acceder a este tramite. Inicia sesión con otra cuenta para hacerlo</h3>
                    </div>
                    <br />
                </>
            }


        </div>
    ) : (
        <div className="Contenedor-Mayor">
            <div className='contenedorAlerta'>
                <p className='alerta'>  Atención! No se le permite usar la pagina debido a que no ha iniciado sesión. Vaya a la página principal para hacerlo.</p>
            </div>
        </div>)

}

export default DetalleTramite;