import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
import Product from './components/Product'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Login from './components/admin/Login'
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from './components/admin/Dashboard'
import { AdminRequireAuth } from './components/admin/AdminRequireAuth'

import { default as ShowCategories } from './components/admin/category/Show.jsx'
import { default as CreateCategory } from './components/admin/category/Create.jsx'
import { default as EditCategory } from './components/admin/category/Edit.jsx'

import Register from './components/Register'
import { default as UserLogin } from './components/Login'
import Profile from './components/front/Profile'
import MyOrders from './components/front/MyOrders'
import { RequireAuth } from './components/RequireAuth'
import Confirmation from './components/Confirmation'
import ShowOrders from './components/admin/orders/ShowOrders'
import OrderDetail from './components/admin/orders/OrderDetail'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import ChangePassword from './components/front/ChangePassword'
import ForgotPassword from './components/front/ForgotPassword'
import ResetPassword from './components/front/ResetPassword'

import { default as UserOrderDetail } from './components/front/OrderDetail'
import Shipping from './components/admin/shipping/Shipping'
import ChangePasswordAdmin from './components/admin/ChangePassword'
import AdminForgotPassword from './components/admin/ForgotPassword'
import AdminResetPassword from './components/admin/ResetPassword'

import { default as ShowRoomTypes } from './components/admin/roomtype/Show.jsx'
import { default as CreateRoomType } from './components/admin/roomtype/Create.jsx'
import { default as EditRoomType } from './components/admin/roomtype/Edit.jsx'

import { default as ShowProducts } from './components/admin/product/Show.jsx'
import { default as CreateProduct } from './components/admin/product/Create.jsx'
import { default as EditProduct } from './components/admin/product/Edit.jsx'

import { default as ShowUsers } from './components/admin/user/Show.jsx'
import { default as CreateUser } from './components/admin/user/Create.jsx'
import { default as EditUser } from './components/admin/user/Edit.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/about-us' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/account/register' element={<Register />} />
          <Route path='/account/login' element={<UserLogin />} />
          <Route path='/admin/login' element={<Login />} />

          <Route path='/checkout' element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          } />

          <Route path='/account' element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          } />

          <Route path='/account/change-password' element={
            <RequireAuth>
              <ChangePassword />
            </RequireAuth>
          } />

          <Route path='/account/forgot-password' element={<ForgotPassword />} />
          <Route path='/account/reset-password' element={<ResetPassword />} />

          <Route path='/account/orders' element={
            <RequireAuth>
              <MyOrders />
            </RequireAuth>
          } />

          <Route path='/checkout' element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          } />


          <Route path='/order/confirmation/:id' element={
            <RequireAuth>
              <Confirmation />
            </RequireAuth>
          } />


          <Route path='/account/orders/details/:id' element={
            <RequireAuth>
              <UserOrderDetail />
            </RequireAuth>
          } />

          {/* Admin Routes */}
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

          <Route path='/admin/roomtypes' element={
            <AdminRequireAuth>
              <ShowRoomTypes />
            </AdminRequireAuth>
          } />

          <Route path='/admin/roomtypes/create' element={
            <AdminRequireAuth>
              <CreateRoomType />
            </AdminRequireAuth>
          } />

          <Route path='/admin/roomtypes/edit/:id' element={
            <AdminRequireAuth>
              <EditRoomType />
            </AdminRequireAuth>
          } />

          <Route path='/admin/products' element={
            <AdminRequireAuth>
              <ShowProducts />
            </AdminRequireAuth>
          } />

          <Route path='/admin/users' element={
            <AdminRequireAuth>
              <ShowUsers />
            </AdminRequireAuth>
          } />

          <Route path='/admin/users/create' element={
            <AdminRequireAuth>
              <CreateUser />
            </AdminRequireAuth>
          } />

          <Route path='/admin/users/edit/:id' element={
            <AdminRequireAuth>
              <EditUser />
            </AdminRequireAuth>
          } />



          <Route path='/admin/products/create' element={
            <AdminRequireAuth>
              <CreateProduct />
            </AdminRequireAuth>
          } />

          <Route path='/admin/products/edit/:id' element={
            <AdminRequireAuth>
              <EditProduct />
            </AdminRequireAuth>
          } />

          <Route path='admin/orders' element={
            <AdminRequireAuth>
              <ShowOrders />
            </AdminRequireAuth>
          } />

          <Route path='admin/orders/:id' element={
            <AdminRequireAuth>
              <OrderDetail />
            </AdminRequireAuth>
          } />

          <Route path='/admin/shipping' element={
            <AdminRequireAuth>
              <Shipping />
            </AdminRequireAuth>
          } />

          <Route path='/admin/change-password' element={
            <AdminRequireAuth>
              <ChangePasswordAdmin />
            </AdminRequireAuth>
          } />

          <Route path='/admin/forgot-password' element={<AdminForgotPassword />} />
          <Route path='/admin/reset-password' element={<AdminResetPassword />} />

        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App