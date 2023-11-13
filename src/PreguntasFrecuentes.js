import './index.css';
import './App.css';
import React, { useDebugValue } from 'react';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import profileImage from './perfil.png';
import { useContextState } from "./contextState";
import notificaciones from './bell-fill.svg'

function PreguntasFrecuentes() {
    const { contextState, setContextState } = useContextState();
    const [isLoading, setIsLoading] = useState(true);
    const [preguntas, setPreguntas] = useState(undefined)
    useEffect(() => {
        fetch("http://localhost:5000/preguntasFrecuentes/1")
            .then((response) => response.json())
            .then((gestorJson) => {
                console.log("gestor", gestorJson)
                setPreguntas(gestorJson)
                setContextState({ newValue: false, type: "SET_LOADING" });
            });
    }, []);

    function ListaDePreguntas(preguntas1) {
        let preguntas2 = preguntas1.preguntas1
        console.log(preguntas2)
        return (
            preguntas2.map((p) => {
                return (
                    <>
                        <div className='item border border-dark'>
                            <h3>{p.Titulo}</h3>

                            <hr />
                            <p>{p.Descripcion}</p>
                        </div>
                        <br />
                    </>
                )
            })
        )

    };

    return (
        <div className="Contenedor-Mayor">
            <nav className='navbar bg-body-tertiary border-header-top'>
                <div className='container-fluid Padre'>
                    <img className='navbar-brand logo' src={logo} alt="New Life" width="30" height="24" />
                    <div>
                        {!isLoading && !contextState.login === undefined &&
                            <>
                                <ul className='arreglarbotones'>
                                    <Link to="/crearCuenta"><li className="nav-item border">
                                        <a className='nav-link active' aria-current="page" href="sdfs.html">Iniciar sesión</a>
                                    </li></Link>
                                    <Link to="/inicioSesion">
                                        <li className="nav-item border">
                                            <a className='nav-link active' aria-current="page" href="sdfsdf.html">Registrarse</a>
                                        </li></Link>
                                </ul>
                                <div>
                                    <img src={profileImage} alt="Foto de perfil" className="profile-image" />
                                </div>
                            </>
                        }
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
                    (preguntas !== undefined && <ListaDePreguntas preguntas1={preguntas} />)
                }
            </div>
            <br />
        </div>
    );

}
export default PreguntasFrecuentes;