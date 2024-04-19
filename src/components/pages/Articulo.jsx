import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { Global } from '../../helpers/Global'
import { Peticion } from '../../helpers/Peticion'
import { Listado } from './Listado'

export const Articulo = () => {

  const [articulo, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  useEffect(() => {

    conseguirArticulos();

  }, [])

  const conseguirArticulos = async () => {


    const { datos, cargando } = await Peticion(Global.url + "articulo/" + params.id, "GET");


    if (datos.status === "success") {

      setArticulos(datos.articulo);

    }

    // console.log(datos.articulo)

    setCargando(false);

  }


  return (
    <div className='jumbo'>
      {cargando ? "Cargando..." :
        <>
          <div className='mascara'>
            {articulo.imagen != "defaul.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}
            {articulo.imagen == "defaul.png" && <img src='https://p4.wallpaperbetter.com/wallpaper/745/67/618/jujutsu-kaisen-anime-boys-anime-hd-wallpaper-preview.jpg' />}
          </div>
          <h1>{articulo.titulo}</h1>
          <span>{articulo.fecha}</span>
          <p>{articulo.contenido}</p>
        </>

      }

    </div>

  )
}
