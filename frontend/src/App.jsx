import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Shop from './components/Shop.jsx'
import Home from './components/Home.jsx'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/shop' element={<Shop />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
