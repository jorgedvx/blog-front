import { useState } from 'react'
import { Inicio } from './components/pages/Inicio'
import { Articulos } from './components/pages/Articulos'
import { Crear } from './components/pages/Crear'
import { Rutes } from './routing/Rutes';


function App() {

  return (

    <div className='layout'>

      <Rutes/>
      
  
    </div>

  )
}

export default App
