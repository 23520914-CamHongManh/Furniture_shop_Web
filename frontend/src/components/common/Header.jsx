import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/images/Logo.png';
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { apiUrl } from './http';
import { CartContext } from '../context/Cart';
import NavDropdown from 'react-bootstrap/NavDropdown';
import cartlogo from '../../assets/images/cart.png';

const Header = () => {
  const [categories, setCategories] = useState([])
  const { getQty } = useContext(CartContext);
  const fetchCategories = () => {
    fetch(`${apiUrl}/get-categories`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result.data == 200) {
          setCategories(result.data)
        } else {
          console.log("Something went wrong");
        }
      })
  }
  useEffect(() => {
    fetchCategories();
  }, [])
  return (
    <header className='shadow'>
      <div className='bg-dark text-center py-3'>
        <span className='text-white'>DXH FURNITURE WEB</span>
      </div>
      <div className='container'>
        <Navbar expand="lg" className="">
          <Navbar.Brand href="/">
            <img src={Logo} alt="Logo" width={120} ></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Store" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3.1">Living-room</NavDropdown.Item>
                <NavDropdown.Item href="#action3.2">Bathroom</NavDropdown.Item>
                <NavDropdown.Item href="#action3.3">Kitchen</NavDropdown.Item>
                <NavDropdown.Item href="#action3.4">Bedroom</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/contact">Contact</Nav.Link>
              <Nav.Link href="/about-us">About us</Nav.Link>

            </Nav>
            <div className='nav-right d-flex'>
              <Link to="/account" className='ms-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"></path></svg>
              </Link>
              <Link to="/cart" className='ms-3'>
                <span>{getQty()}</span>
                <img src={cartlogo} alt="Cart" width={28} height={28} style={{ objectFit: 'contain' }} />
              </Link>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  )
}

export default Header
