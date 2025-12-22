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
    const roomType = searchParams.get('roomtype');
    return roomType ? roomType.split(',') : [];
  });

 // Pagination state
  const [page, setPage] = useState(() => parseInt(searchParams.get('page')) || 1);
  const [perPage, setPerPage] = useState(() => parseInt(searchParams.get('per_page')) || 12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchProducts = () => {
    let search = []
    let params = '';

    if (catChecked.length > 0) {
      search.push(['category', catChecked])
    }

    if (roomTypeChecked.length > 0) {
      // send lowercase 'roomtype' to match backend
      search.push(['roomtype', roomTypeChecked])
    }

    // include pagination params
    search.push(['page', page])
    search.push(['per_page', perPage])

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
        console.log('get-products result:', result);
        if (result.status == 200) {
          const paginator = result.data;
          console.log('paginator:', paginator);
          setProducts(paginator.data || []);
          setTotalPages(paginator.last_page || 1);
          setTotalItems(paginator.total || 0);
        } else {
          console.log("Something went wrong", result);
        }
      })
      .catch(err => console.error('Failed to fetch products:', err))
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
          setRoomTypes(result.data)
        } else {
          console.log("Something went wrong");
        }
      })
  }

  const handleCategory = (e) => {
    const { checked, value } = e.target;
    setPage(1);
    if (checked) {
      setCatChecked(pre => [...pre, value])
    } else {
      setCatChecked(catChecked.filter(id => id != value))
    }
  }

  const handleRoomType = (e) => {
    const { checked, value } = e.target;
    setPage(1);
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
  }, [catChecked, roomTypeChecked, page, perPage])

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
                            defaultChecked={searchParams.get('roomtype')
                              ? searchParams.get('roomtype').includes(roomType.id)
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
                            {product.price} VND &nbsp;

                            {
                              product.compare_price && <span className='text-decoration-line-through'>{product.compare_price} VND</span>
                            }

                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }

              {(!products || products.length === 0) && (
                <div className="text-center py-5 w-100">
                  <p className="mb-0">Không có sản phẩm nào phù hợp.</p>
                  <small className="text-muted">Query: {searchParams.toString() || 'none'}</small>
                </div>
              )}

            </div>

            {/* Pagination */}
            <div className='d-flex justify-content-center my-4'>
              <nav>
                <ul className='pagination'>
                  <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
                    <button className='page-link' onClick={() => setPage(p => Math.max(p - 1, 1))}>Previous</button>
                  </li>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                      <button className='page-link' onClick={() => setPage(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${page >= totalPages ? 'disabled' : ''}`}>
                    <button className='page-link' onClick={() => setPage(p => Math.min(p + 1, totalPages))}>Next</button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Shop
