import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
import Dashboard from './components/admin/Dashboard'
import AdminRequireAuth from './components/admin/AdminRequireAuth'
import Product from './components/Product'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import { default as ShowCategories } from './components/admin/category/Show.jsx'
import { default as CreateCategory } from './components/admin/category/Create.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/product' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />

          <Route path='/admin/dashboard' element={
            <AdminRequireAuth>
              <Dashboard />
            </AdminRequireAuth>
          } />



          <Route path='/admin/categories' element={
            <AdminRequireAuth>
              <ShowCategories />
            </AdminRequireAuth>
          } />

          <Route path='/admin/categories/create' element={
            <AdminRequireAuth>
              <CreateCategory />
            </AdminRequireAuth>
          } />

        </Routes >
      </BrowserRouter >
    </>
  )
}

export default App