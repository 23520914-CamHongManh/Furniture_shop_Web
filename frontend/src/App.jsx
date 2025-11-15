import { useState } from 'react'
import Shop from './components/Shop.jsx'
import Home from './components/Home.jsx'
import Dashboard from './components/admin/Dashboard.jsx'
import { AdminRequireAuth } from './components/admin/AdminRequireAuth.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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


          <Route path='/admin/dashboard' element={
            <AdminRequireAuth>
              <Dashboard />
            </AdminRequireAuth>
          }></Route>

          <Route path='/product' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />

        </Routes >
      </BrowserRouter >
    </>
  )
}

export default App
