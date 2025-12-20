import React, { useState, useEffect } from 'react'
import Layout from './common/Layout'
import Hero from './common/Hero'
import ProductImg from '../assets/images/eight.jpg'
import { Link, useSearchParams } from 'react-router-dom';
import { apiUrl } from '../components/common/http'

const Shop = () => {

  const [categories, setCategories] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [catChecked, setCatChecked] = useState(() => {
    const category = searchParams.get('category');
    return category ? category.split(',') : [];
  });
  const [roomTypeChecked, setRoomTypeChecked] = useState(() => {
    const roomType = searchParams.get('roomType');
    return roomType ? roomType.split(',') : [];
  });

  const fetchProducts = () => {
    let search = []
    let params = '';

    if (catChecked.length > 0) {
      search.push(['category', catChecked])
    }

    if (roomTypeChecked.length > 0) {
      search.push(['roomType', roomTypeChecked])
    }

    if (search.length > 0) {
      params = new URLSearchParams(search)
      setSearchParams(params)
    } else {
      setSearchParams([])
    }

    fetch(`${apiUrl}/get-products?${params}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result)
        if (result.status == 200) {
          setProducts(result.data)
        } else {
          console.log("Something went wrong");
        }
      })
  }

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
        if (result.status == 200) {
          setCategories(result.data)
        } else {
          console.log("Something went wrong");
        }
      })
  }

  const fetchRoomTypes = () => {
    fetch(`${apiUrl}/get-roomtypes`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result.status == 200) {
          setBrands(result.data)
        } else {
          console.log("Something went wrong");
        }
      })
  }

  const handleCategory = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setCatChecked(pre => [...pre, value])
    } else {
      setCatChecked(catChecked.filter(id => id != value))
    }
  }

  const handleRoomType = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setRoomTypeChecked(pre => [...pre, value])
    } else {
      setRoomTypeChecked(roomTypeChecked.filter(id => id != value))
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchRoomTypes()
    fetchProducts()
  }, [catChecked, roomTypeChecked])

  return (
    <Layout>
      <div className='container'>
        <nav aria-label='breadcrumb' className='py-4'>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>
              <a href="#">Home</a>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>
              Shop
            </li>
          </ol>
        </nav>

        <div className='row'>
          <div className='col-md-3'>
            <div className='card shadow border-0 mb-3'>
              <div className='card-body p-4'>
                <h3 className='mb-3'>Categories</h3>
                <ul>
                  {
                    categories && categories.map(category => {
                      return (
                        <li key={`cat-${category.id}`} className='mb-2'>
                          <input
                            defaultChecked={searchParams.get('category')
                              ? searchParams.get('category').includes(category.id)
                              : false}
                            type="checkbox"
                            value={category.id}
                            onClick={handleCategory}
                          />
                          <label htmlFor="" className='ps-2'>{category.name}</label>
                        </li>
                      )
                    })
                  }

                </ul>
              </div>
            </div>
            <div className='card shadow border-0 mb-3'>
              <div className='card-body p-4'>
                <h3>Room Types</h3>
                <ul>
                  {
                    roomTypes && roomTypes.map(roomType => {
                      return (
                        <li key={`roomType-${roomType.id}`} className='mb-2'>
                          <input
                            defaultChecked={searchParams.get('roomType')
                              ? searchParams.get('roomType').includes(roomType.id)
                              : false}
                            type="checkbox"
                            value={roomType.id}
                            onClick={handleRoomType}
                          />
                          <label htmlFor="" className='ps-2'>{roomType.name}</label>
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>

          </div>
          <div className='col-md-9'>
            <div className='row pd-5'>
              {
                products && products.map(product => {
                  return (
                    <div className='col-md-4 col-6' key={`product-${product.id}`}>
                      <div className='product card border-0'>
                        <div className='card-img'>
                          <Link to={`/product/${product.id}`}>
                            <img src={product.image_url} alt="" className='w-100' />
                          </Link>
                        </div>
                        <div className='card-body pt-3'>
                          <Link to={`/product/${product.id}`}>{product.title}</Link>
                          <div className='price'>
                            ${product.price} &nbsp;

                            {
                              product.compare_price && <span className='text-decoration-line-through'>&{product.compare_price}</span>
                            }

                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }




            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Shop
