import './index.css';
import './App.css';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import profileImage from './perfil.png';
import logo from './logo.png';
import { useContextState } from "./contextState";
import { Link } from 'react-router-dom';
import notificaciones from './bell-fill.svg'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

function EditorDeTramites() {
  const navigate = useNavigate();
  const { contextState, setContextState } = useContextState();
  const [tramite, setTramite] = useState([])
  const [etiquetas, setEtiquetas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let { idTramite } = useParams();
  const [tramiteData, setTramiteData] = useState({
    nombre: "",
    descripcion: "",
    estadoTramites: "",
    archivos: [],
  });
  const [radioValue, setRadioValue] = useState('1');

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

  useEffect(() => {
    fetch("http://localhost:5000/etiquetas")
      .then((response) => response.json())
      .then((etiquetaJson) => {
        console.log("etiqueta", etiquetaJson);
        setEtiquetas(etiquetaJson);
        setIsLoading(false);
      });
  }, []);


  function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            document.getElementById('status').innerHTML = 'File uploaded successfully.';
          } else {
            document.getElementById('status').innerHTML = 'Error: ' + xhr.statusText;
          }
        }
      };
      xhr.open('POST', '/your-upload-endpoint', true);
      xhr.send(formData);
    } else {
      document.getElementById('status').innerHTML = 'Please select a file to upload.';
    }
  }
  
  async function verificacion(userInfo){
    console.log("entra a verificacion")
    try{
      console.log(userInfo)
      const requestOptions = {                                                                                                                                                                          
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idt: (userInfo.IDT), idp: (userInfo.IDP), nombre: (userInfo.nombre), desc: (userInfo.descripcion), imagen: (userInfo.Imagen), idE: (userInfo.IdEstado), obs: (userInfo.Observaciones)})
    };
    console.log(requestOptions)
      const response = await fetch('http://localhost:5000/tramites/actualizar', requestOptions)
      if(response.ok){
        setContextState({ newValue: false, type: "SET_LOADING" });
        alert("El tramite fue actualizado. Vuelva a la seccion de tramites");
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
          nombre: datos.get("Nombre"),
          descripcion: datos.get("Descripcion"),
          IDP: datos.get("IdPais"),
          IDT: datos.get("IdT"),
          Imagen: datos.get("Imagen"),
          IdEstado: radioValue,
          Observaciones: datos.get("Observaciones")
      }
      verificacion(nuevoCliente)
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



      <h3 className='center-name'>Editor de Tramite</h3>
      <div className="center-buttons">
        <form onSubmit={handleSubmit}> <br />
          <input type="hidden" id="IdT" name="IdT" value={idTramite} />
          Nombre del tramite: <input className='' type='text' name='Nombre' defaultValue={tramite[(tramite.length - 1)]?.Nombre} a required/> <br /><br />
          Descripción del tramite: <input className='' type='text' name='Descripcion' defaultValue={tramite[tramite.length - 1]?.Descripción} required/> <br /><br />
          Id del Pais: <input className='' type='text' name='IdPais' defaultValue={tramite[tramite.length - 1]?.IdPais} required/> <br /><br />
          Imagen: <input className='' type='text' name='Imagen' defaultValue={tramite[tramite.length - 1]?.Imagen} required/> <br /><br />
          Estado Actual : <b>{tramite[tramite.length - 1]?.NombreEtiqueta}</b> <br />
          
          <br/>
          SELECCION {radioValue}
          <ButtonGroup>
            {etiquetas.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${radio.Id}`}
                type="radio"
                variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                name="radio"
                value={radio.Id}
                checked={radioValue === radio.Id}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.NombreEtiqueta}
              </ToggleButton>
            ))}
          </ButtonGroup> <br/><br/>
          Observaciones: <input className='' type='text' name='Observaciones' defaultValue={tramite[tramite.length - 1]?.Observaciones} required/> <br /><br />
          <input type="file" id="fileInput" />
          <button onClick="uploadFile()">Subir Archivo</button>
          <div id="status"></div>
          <a href="AdministradorDeDocumentos.js"><input className='centrarElementos btn btn-light border border-dark' type='submit' value='Lista de Tramites' /></a> <br /><br />

          <br className='separador' />
          <div className="tramites">
            <hr />
          </div>


          <br /><br />
          <input className='centrarElementos btn btn-light border border-dark' type='submit' value='Guardar cambios' />
    

        </form>


      </div>

    </div>
  ) : (
    <div className="Contenedor-Mayor">
      <div className='contenedorAlerta'>
        <p className='alerta center-name'>  Atención! No se le permite usar la pagina debido a que no ha iniciado sesión. Vaya a la página principal para hacerlo. Si quiere hacerlo, entre...  <Link to="/inicioSesion"> aquí.</Link></p>
      </div>
    </div>)
}

export default EditorDeTramites;
