import React, { useState } from "react";
import axios from "axios";
import { useContextState } from './contextState';

function FormularioSolicitud() {
  const [solicitud, setSolicitud] = useState("");
  const [solicitudEnviada, setSolicitudEnviada] = useState(false);
  const { contextState } = useContextState();

  const handleChangeSolicitud = (e) => {
    setSolicitud(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/peticiones",
        {
          idg: 1,
          idc: contextState.login.Id,
          desc: solicitud,
        },
        {
          headers: { 
            "Content-Type": "application/json" 
          },
        }
      );

      if (response.status === 200) {
        setSolicitudEnviada(true);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <div>
      {solicitudEnviada ? (
        <div>Solicitud enviada con éxito</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="peticion"
            name="peticion"
            value={solicitud}
            onChange={handleChangeSolicitud}
          />
          <br />
          <br />
          <input
            className="centrarElementos btn btn-light border border-dark"
            type="submit"
            value="Enviar"
          />
        </form>
      )}
    </div>
  );
}

export default FormularioSolicitud;
