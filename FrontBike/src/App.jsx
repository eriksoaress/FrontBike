import { useState } from 'react'
import logo from './assets/logo.jpeg'
import './App.css'

import {Link} from 'react-router-dom'
import { NavBar } from './components/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar/>
      <div className="page">
        <div>
            <img src={logo} className="logo" />
        </div>
        <h1 style={{color:"#f2cb05"}} >Zambalhetes</h1>
        <div className="card">
         

          <Link to='/' ><button color="inherit" className='bi'>Home </button></Link>
          <Link to='/new' ><button color="inherit"className='bi'>Create Bike </button></Link>
          <Link to='/list' ><button color="inherit"className='bi'>List Bikes </button></Link>
          <Link to='/hello'><button color="inherit"className='bi'>Hello</button></Link>
          
        </div>
       
      </div>
    </>
  )
}

export default App
