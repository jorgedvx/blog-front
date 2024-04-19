import React from 'react'

export const Contacto = () => {

    const cambio = (e) =>{
        e.preventDefault();
    }
  
  
    return (
    <div className='jumbo-contacto jumbo '>
        <h1>Correo</h1>
        <form className='contacto' onSubmit={cambio}>
            <input type='text' placeholder='Nombre'/>
            <input type='text' placeholder='Apellido'/>
            <input type='text' placeholder='Email'/>
            <textarea placeholder='Comentario'></textarea>
            <input type='submit' />
        </form>

    </div>
  )
}
