import React, { useEffect, useState } from 'react'
import { Peticion } from '../../helpers/Peticion'
import { Global } from '../../helpers/Global'
import { useParams } from 'react-router-dom'
import { SerializeForm } from '../../helpers/SerializeForm';

export const Editar = () => {


  const [articulo, setArticulos] = useState([])
  const [resultado, setResultado] = useState("no_enviado")
  const params = useParams()

  useEffect(() => {

    conseguirDatos();

  }, [])

  const conseguirDatos = async () => {

    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "GET");

    if (datos.status === "success") {

      setArticulos(datos.articulo)

      // console.log(datos.articulo)

    }


  }


  const editarArticulo = async (e) => {

    e.preventDefault()

    //Recoger datos formulario
    let newDataArticulo = SerializeForm(e.target);

    delete newDataArticulo.image

    // console.log(newDataArticulo)




    // guardar Articulo en el backend
    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "PUT", newDataArticulo);


    if (datos.status === "success") {

      setResultado("guardado")

    } else {
      setResultado("error")
    }

    // const changeUploadImage = (e)=>{
    //   e.preventDefault()

    //   const file = e.target.files[0]
    // }

    // //Subir la imagen
    const fileInput = document.querySelector("#file");
    // console.log(datos.status)
    if (datos.status === "success" && fileInput.files[0]) {

      setResultado("guardado");

      // console.log(fileInput.files[0])

      const formData = new FormData();
      
      formData.append("image", fileInput.files[0]);

      

      // console.log(Global.url + "subir-imagen/" + datos.articulo._id)
      const subida = await Peticion(Global.url + "subir-imagen/" + datos.articulo._id, "POST", formData, true);

      if (subida.datos.status === "success") {
        setResultado("guardado")

      } else {
        setResultado("error")
      }

    }
  }

  const changeUploadImage = async(e) =>{

    const file =document.getElementById('file');
    const img =document.getElementById('img');

    const defaultFile = 'https://p4.wallpaperbetter.com/wallpaper/339/752/26/nature-trees-forest-green-wallpaper-preview.jpg';

    


    if(e.target.files[0]){
      const reader = new FileReader()
      reader.onload = function(e){
        img.src = e.target.result;
      }

      reader.readAsDataURL(e.target.files[0])

    }


  }

  return (
    <>

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
            <input type='text' name='titulo' defaultValue={articulo.titulo} />
          </div>

          <div className='form-group'>
            <label htmlFor="contenido">Contenido</label>
            <textarea type='text' name='contenido' defaultValue={articulo.contenido} />
          </div>

          <div className='form-group'>
            <label htmlFor="image" >Imagen</label>

            <div className='mascara'>

              {articulo.imagen  != "defaul.png" && <img id='img' src={articulo.secure_url} />}
              {articulo.imagen == "defaul.png" && <img id='img' src='https://p4.wallpaperbetter.com/wallpaper/339/752/26/nature-trees-forest-green-wallpaper-preview.jpg' />}

            </div>

          </div>
        
           <input type='file' name='image' className='fancy-file' id='file'  onChange={changeUploadImage} /><br />
           <label  htmlFor='file'>
             <span className='fancy-file-one'>Select file</span>
           </label>
          <input type="submit" value="Guardar" className='btn btn-success' />
        </form>

      </div>




    </>

  )



}
