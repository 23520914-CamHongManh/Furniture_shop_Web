import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
import Dashboard from './components/admin/Dashboard'
import AdminRequireAuth from './components/admin/AdminRequireAuth'
import Product from './components/Product'
import Cart from './components/Cart'
import Checkout from './components/Checkout'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/admin/dashboard' element={
            <AdminRequireAuth>
              <Dashboard />
            </AdminRequireAuth>
          } />

          {/* Các route tạm ẩn thì không cần import */}
          <Route path='/product' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />

        </Routes >
      </BrowserRouter >
    </>
  )
}

export default App