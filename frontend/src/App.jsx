import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './component/Home'
import Shop from './component/Shop'
function App() {


  return (
    <>
      <BrowserRouter>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/shop' element={<Shop/>}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
