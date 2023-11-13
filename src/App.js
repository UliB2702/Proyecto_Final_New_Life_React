
import AdministradorDeDocumentos from './AdministradorDeDocumentos.js';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditorDeTramites from './EditorDeTramites'
import CrearCuenta from './CrearCuenta';
import HubSuperior from './HubSuperior.js';
import InicioSesion from './InicioSesion.js';
import Reseñas from './Reseñas.js';
import DetalleTramite from './DetalleTramite.js';
import Notificaciones from './Notificaciones.js'
import AgregarTramite from './AgregarTramite.js';

import { ContextProvider } from './contextState';
import PreguntasFrecuentes from './PreguntasFrecuentes.js';

function App() {
  return (
    <ContextProvider>
    <BrowserRouter>
    <Routes>
     <Route  path='/inicioSesion' index element={<InicioSesion />}></Route>
      <Route path="/editorTramites" element={<EditorDeTramites/>}></Route>
      <Route path="/crearCuenta" element={<CrearCuenta/>}></Route>
      <Route path="/gestor" element={<HubSuperior />}></Route>
      <Route path="/tramite" element={<AdministradorDeDocumentos />}></Route>
      <Route path='/preguntas' element={<PreguntasFrecuentes/>}></Route>
      <Route path='/resenas' element={<Reseñas/>}></Route>
      <Route path='/detalleTramite/:idTramite' element={<DetalleTramite/>}></Route>
      <Route path='/notificaciones' element={<Notificaciones/>}></Route>
      <Route path='/agregarTramite' element={<AgregarTramite/>}/>
    </Routes>
    </BrowserRouter> 
    </ContextProvider>
  );
}

export default App;
 /*
console.log("Hagoconsulta-axios"); 
(async()=>{ 
  console.log("Hagoasyncconsulta-axios")
  await axios({ 
  method:'get',
  url:'http://localhost:5000/', 
}) 
.then(res=>{ console.log("res",res) 
valores=document.getElementById("valores"); 
res.data.forEach(actual=>{ 
  if(actual.compra&&actual.venta)
  { 
    dolar=document.createElement("li") 
    dolar.innerHTML=`Nombre:${actual.nombre}-compra: ${actual.compra}-venta:${actual.venta}` 
    valores.appendChild(dolar) 
  } 
}) }) 
.catch(err=>console.error("error",err)) 
console.log("Finasyncconsulta-axios") })(); 
console.log("Finconsulta-axios")*/
