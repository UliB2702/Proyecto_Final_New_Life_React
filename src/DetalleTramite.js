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
            console.log("no se pudo hacer la busqueda")
        }
    }, []);

    function InformacionTramite(tramite) {
        return(
        <>
            {console.log("tramite", tramite?.tramite[0])}
            <h3 className='center-name'> {tramite?.tramite[0]?.Nombre}</h3>
            <p className='center-name'> {tramite?.tramite[0]?.Descripción} </p>
            <img className='detalleImagen' src={tramite?.tramite[0]?.Imagen} ></img>
        </>
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
                                <img src={notificaciones1} alt="Foto de perfil" />
                            </Link>
                        </div>
                    }
                    {!contextState.isLoading && contextState.login && contextState.login.FotoPerfil === '' &&
                        <div>
                            <img src={profileImage} alt="Foto de perfil" className="profile-image" />
                            <Link to="/notificaciones">
                                <img src={notificaciones1} alt="Foto de perfil" />
                            </Link>
                        </div>
                    }
                </div>
            </nav>

            {
                !contextState.isLoading && contextState.login && contextState.login.Id !== tramite.IdCliente && contextState.login.Id !== tramite.IdGestor &&

                <>
                    {console.log("Puede entrar")}
                    <h3 className='center-name'><u>Tramite</u></h3>
                    <br />
                    {tramite !== undefined && <InformacionTramite tramite={tramite} />}
                    <br />
                </>
            }

            {
                !contextState.isLoading && contextState.login && tramite.IdCliente === contextState.login.Id || tramite.IdGestor === contextState.login.Id &&
                <>

                    <div className='Padre mb-3'>
                        <h3 className='center-name'>No puedes acceder a este tramite. Inicia sesión con otra cuenta para hacerlo. Si quiere usar otra cuente, entonces entre...  <Link to="/inicioSesion"> aquí.</Link></h3>
                    </div>
                    <br />
                </>
            }


        </div>
    ) : (
        <div className="Contenedor-Mayor">
            <div className='contenedorAlerta'>
            <p className='alerta center-name'>  Atención! No se le permite usar la pagina debido a que no ha iniciado sesión. Vaya a la página principal para hacerlo. Si quiere hacerlo, entre...  <Link to="/inicioSesion"> aquí.</Link></p>
            </div>
        </div>)

}

export default DetalleTramite;