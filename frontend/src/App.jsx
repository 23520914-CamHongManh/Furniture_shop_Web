import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Shop from './components/Shop.jsx'
import Home from './components/Home.jsx'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/admin/Dashboard.jsx'
import { AdminRequireAuth } from './components/admin/AdminRequireAuth.jsx'

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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
