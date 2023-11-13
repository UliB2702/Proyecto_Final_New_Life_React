import './index.css';
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import { ActionTypes, useContextState } from './contextState';
import { useNavigate } from 'react-router-dom';

function InicioSesion() {
  const navigate = useNavigate();

  const { contextState, setContextState } = useContextState();


  /*useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setCliente(user)
    }
  }, [])*/
  
  

  async function verificacion(cliente) {
    try{  
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: cliente.email, psw: cliente.psw})
    }; 
    const response = await fetch(`http://localhost:5000/clientes/sesion`, requestOptions)
    if(response.ok) {
        const token = await response.json();
        console.log(token);
        setContextState({
          newValue: token[0],
          type: ActionTypes.setLogin,
        });
        setContextState({ newValue: false, type: "SET_LOADING" });
        navigate('/gestor')
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
    console.log('Se guardan los datos')
    const {Email , Contrasena } = event.target.elements
    const nuevoCliente = {
      email: Email.value,
      psw: Contrasena.value,
    }
    console.log(nuevoCliente)
    setContextState({ newValue: true, type: "SET_LOADING" });
    await verificacion(nuevoCliente)
    /*if (inicio !== undefined) {
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(inicio)
      )
    }*/
  }

  return (


    <div className="Contenedor-Mayor">
      <nav className='navbar bg-body-tertiary border-header-top'>
        <div className='container-fluid Padre'>
          <img className='navbar-brand logo' src={logo} alt="New Life" width="30" height="24" />
          <ul className='arreglarbotones'>
          </ul>
        </div>
      </nav>

      <div className="centro">

      </div>
      <h2 className='center-name'>Iniciar Sesión</h2>
      <div className="center-buttons">

        <form onSubmit={handleSubmit}>
          <div>
            Escribe tu email: <input className='' type='text' name='Email' required /> <br /><br />
          </div>
          <div>
            Escribe tu contraseña: <input className='' type='text' name='Contrasena' required /> <br /><br />
          </div>
          <input className='centrarElementos btn btn-light border border-dark' type='submit' value='Enviar' />
        </form>



      </div>
      <h6 className='center-name'>Todavia no tienes una cuenta hecha?</h6><h6 className='center-name'><Link to="/crearCuenta">Crea una.</Link></h6>
      <br />
    </div>
  );



}

export default InicioSesion;
