import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
import Dashboard from './components/admin/Dashboard'
import AdminRequireAuth from './components/admin/AdminRequireAuth'
import Product from './components/Product'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import { default as Login } from './components/admin/Login.jsx'
import { default as ShowCategories } from './components/admin/category/Show.jsx'
import { default as CreateCategory } from './components/admin/category/Create.jsx'
import { default as EditCategory } from './components/admin/category/Edit.jsx'
import { ToastContainer, toast } from 'react-toastify';

import { default as ShowBrand } from './components/admin/brand/Show.jsx'
import { default as CreateBrand } from './components/admin/brand/Create.jsx'
import { default as EditBrand } from './components/admin/brand/Edit.jsx'

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
          <Route path='/admin/login' element={<Login />} />


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

          <Route path='/admin/categories/edit/:id' element={
            <AdminRequireAuth>
              <EditCategory />
            </AdminRequireAuth>
          } />

          <Route path='/admin/brands' element={
            <AdminRequireAuth>
              <ShowBrand/>
            </AdminRequireAuth>
          } />

          <Route path='/admin/brands/create' element={
            <AdminRequireAuth>
              <CreateBrand/>
            </AdminRequireAuth>
          } />

          <Route path='/admin/brands/edit/:id' element={
            <AdminRequireAuth>
              <EditBrand/>
            </AdminRequireAuth>
          } />

        </Routes >
      </BrowserRouter >
      <ToastContainer />
    </>
  )
}

export default App