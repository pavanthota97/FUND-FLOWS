import React from 'react'
import Login from './Components/Login'
import Home from './Components/Home'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import DataTable from './Components/DataTable'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
          
            <Route exact path="/" element={<Login/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/DataTable" element={<DataTable/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App