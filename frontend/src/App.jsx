import { useState } from 'react'
<<<<<<< HEAD
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './component/Home'
import Shop from './component/Shop'
function App() {

=======
import Shop from './components/Shop.jsx'
import Home from './components/Home.jsx'
import Dashboard from './components/admin/Dashboard.jsx'
import { AdminRequireAuth } from './components/admin/AdminRequireAuth.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Product from './components/Product'
// import Cart from './components/Cart'
// import Checkout from './components/Checkout'


function App() {
>>>>>>> f4166da3f51566c6c36a267f18c08df3e3e2058a

  return (
    <>
      <BrowserRouter>
<<<<<<< HEAD
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/shop' element={<Shop/>}/>
          </Routes>
      </BrowserRouter>
=======
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Shop />} />


          <Route path='/admin/dashboard' element={
            <AdminRequireAuth>
              <Dashboard />
            </AdminRequireAuth>
          } />

          {/* <Route path='/product' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} /> */}

        </Routes >
      </BrowserRouter >
>>>>>>> f4166da3f51566c6c36a267f18c08df3e3e2058a
    </>
  )
}

export default App
