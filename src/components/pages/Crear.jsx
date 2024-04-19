import React from 'react'
import { useState } from "react"
import { useForm } from '../../hooks/useForm'
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';

export const Crear = () => {

  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado")

  const guardarArticulo = async (e) => {
    e.preventDefault();

    //Recoger datos formulario
    let nuevoArticulo = formulario;

    // guardar Articulo en el backend
    const { datos} = await Peticion(Global.url + "crear", "POST", nuevoArticulo);

    if (datos.status === "success") {
      setResultado("guardado")

    } else {
      setResultado("error")
    }

    // Subir la imagen
    const fileInput = document.querySelector("#file");

    if (datos.status === "success" && fileInput.files[0]) {
      setResultado("guardado");

      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);

      const subida = await Peticion(Global.url + "subir-imagen/" + datos.articulo._id, "POST", formData, true);

      // console.log(subida.datos)

      if (subida.datos.status === "success") {
        setResultado("guardado")

      } else {
        setResultado("error")
      }


    } 


  }

  return (
    <div className='jumbo'>

      <h1>Crear articulo</h1>
      <p>Formulario para crear un articulo</p>
      {/* <pre>{JSON.stringify(formulario)}</pre> */}

      <strong>{resultado == "guardado" ? "Articulo guardado con éxito !!" : ""}</strong>
      <strong>{resultado == "error" ? "Los datos proporcionados son incorrectos" : ""}</strong>


      {/* montar  Formulario */}
      <form className='formulario' onSubmit={guardarArticulo}>

        <div className='form-group'>
          <label htmlFor="titulo">Titulo</label>
          <input type='text' name='titulo' onChange={cambiado} required />
        </div>

        <div className='form-group'>
          <label htmlFor="contenido">Contenido</label>
          <textarea type='text' name='contenido' onChange={cambiado} required />
        </div>

        <div className='form-group'>
          <label htmlFor="file0" >Imagen</label>
          <input type='file' name='file0' id='file' />
        </div>

        <input type="submit" value="Guardar" className='btn btn-success' />

      </form>

    </div>

  )
}
