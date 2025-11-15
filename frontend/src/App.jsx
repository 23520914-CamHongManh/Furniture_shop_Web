import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Shop from './components/Shop.jsx'
import Home from './components/Home.jsx'
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
import Product from './components/Product'
import Cart from './components/Cart'
import Checkout from './components/Checkout'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/shop' element={<Shop />}></Route>
          <Route path='/product' element={<Product/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
