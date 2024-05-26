import React from 'react'
import { Global } from '../../helpers/Global'
import { Link } from 'react-router-dom'
import { Peticion } from '../../helpers/Peticion'



export const Listado = ({ articulos, setArticulos }) => {

  const eliminar = async (id) => {
    let { datos } = await Peticion(Global.url + "articulo/" + id, "DELETE");


    // console.log(datos.status+" aun no entras su...")

    if (datos.status === "success") {

      console.log("Pasaste sucess")

      let articulosActualizados = articulos.filter(articulo => articulo._id !== id);
      setArticulos(articulosActualizados);
    }
  }

  return (

    articulos.map(articulo => {
      // {console.log(articulo.image.public_id)}

      return (
        <article key={articulo._id} className="articulo-item">
          <div className='mascara'>
            {articulo.imagen  != "defaul.png" && <img src={articulo.secure_url} />}
            {articulo.imagen == "defaul.png" && <img src='https://p4.wallpaperbetter.com/wallpaper/339/752/26/nature-trees-forest-green-wallpaper-preview.jpg' />}
          </div>
          <div className='datos'>
            <h3 className="title" ><Link to={"/articulo/" + articulo._id}>{articulo.titulo}</Link></h3>
            <p className="description" > {articulo.contenido}</p>
            <div className='boton-article'>
              <Link to={"/editar/" + articulo._id} className='edit'>Editar</Link>
              <button className="delete" onClick={() => {
                eliminar(articulo._id)
              }}>Borrar</button>
            </div>
          </div>

        </article>

      )

    })
  )
}
