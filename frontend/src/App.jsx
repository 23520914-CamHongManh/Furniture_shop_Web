import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
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

          {/* <Route path='/product' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} /> */}

        </Routes >
      </BrowserRouter >
    </>
  )
}

export default App
