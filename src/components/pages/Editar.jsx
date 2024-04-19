import React, { useEffect } from 'react'
import { useState } from "react"
import {useParams} from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/Global';


export const Editar = () => {

  const [articulo, setArticulos] = useState([]);
  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado")
  const params = useParams();

  useEffect(() => {

    conseguirArticulos();

  }, [])

  const conseguirArticulos = async () => {


    const { datos } = await Peticion(Global.url + "articulo/"+params.id, "GET");


    if (datos.status === "success") {

      setArticulos(datos.articulo);

    }

    // console.log(datos.articulo)



  }

  const editarArticulo = async (e) => {
    e.preventDefault();


    //Recoger datos formulario
    let nuevoArticulo = formulario;

    console.log(formulario)

 

  

    // guardar Articulo en el backend
    const { datos} = await Peticion(Global.url + "articulo/"+params.id, "PUT", nuevoArticulo);


    if (datos.status === "success") {

      setResultado("guardado")

    } else {
      setResultado("error")
    }

    // Subir la imagen
    const fileInput = document.querySelector("#file");
    console.log(datos.status)
    if (datos.status === "success" && fileInput.files[0]) {
      setResultado("guardado");


      console.log(Global.url + "subir-imagen/" + datos.articulo._id)
      

      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);

      const subida = await Peticion(Global.url + "subir-imagen/" + datos.articulo._id, "POST", formData, true);



      if (subida.datos.status === "success") {
        setResultado("guardado")

      } else {
        setResultado("error")
      }


    } 


  }

  return (
    <div className='jumbo'>

      <h1>Editar articulo</h1>
      <p>Formulario para editar: {articulo.titulo}</p>
      {/* <pre>{JSON.stringify(formulario)}</pre> */}

      <strong>{resultado == "guardado" ? "Articulo guardado con éxito !!" : ""}</strong>
      <strong>{resultado == "error" ? "Los datos proporcionados son incorrectos" : ""}</strong>


      {/* montar  Formulario */}
      <form className='formulario' onSubmit={editarArticulo}>

        <div className='form-group'>
          <label htmlFor="titulo">Titulo</label>
          <input type='text' name='titulo' onChange={cambiado} defaultValue={articulo.titulo} />
        </div>

        <div className='form-group'>
          <label htmlFor="contenido">Contenido</label>
          <textarea type='text' name='contenido' onChange={cambiado} defaultValue={articulo.contenido} />
        </div>

        <div className='form-group'>
          <label htmlFor="file0" >Imagen</label>
          <div className='mascara'>
            {articulo.imagen != "defaul.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}
            {articulo.imagen == "defaul.png" && <img src='https://p4.wallpaperbetter.com/wallpaper/745/67/618/jujutsu-kaisen-anime-boys-anime-hd-wallpaper-preview.jpg' />}
          </div>
          <input type='file' name='file0' id='file' />
        </div>

        <input type="submit" value="Guardar" className='btn btn-success' />

      </form>

    </div>

  )
}
