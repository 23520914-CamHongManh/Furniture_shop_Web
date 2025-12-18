import React from 'react'
import Layout from '../../common/Layout.jsx'
import Sidebar from '../../common/Sidebar.jsx'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';
import { apiUrl, adminToken } from '../../common/http.jsx';
import { useForm } from 'react-hook-form';
import JoditEditor from "jodit-react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';



const Edit = ({placeholder}) => {

     const editor = useRef(null);
    const [content, setContent] = useState('');
    const [disable, setDisable] = useState(false)
    const [categories, setCategories] = useState([])
    const [roomtypes, setRoomTypes] = useState([])
    const [gallery, setGallery] = useState([])
    const [galleryImages, setGalleryImages] = useState([])
    const navigate = useNavigate();
    const params = useParams();

    const config = useMemo(() => ({
        readonly: false,
        placeholder: placeholder || '',
    }), [placeholder]);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setError, 
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            const res = await fetch(`${apiUrl}/products/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`

                },
            })
            .then(res => res.json())
            .then(result => {
                reset({
                    title: result.data.title,
                    category: result.data.category_id,
                    room_type: result.data.room_type_id,
                    short_description: result.data.short_description,
                    price: result.data.price,
                    compare_price: result.data.compare_price,
                    sku: result.data.sku,
                    barcode: result.data.barcode,
                    qty: result.data.qty,
                    status: result.data.status,
                    is_featured: result.data.is_featured
                })
                //console.log(result)
                //setCategories(result.data);
            })
        }
    });

    const saveProduct = async (data) => {
        const formData = { ...data, "description": content, "gallery": gallery };
        setDisable(true);
        console.log(formData);

        const res = await fetch(`${apiUrl}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`

            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(result => {
                setDisable(false);
                if (result.status == 200) {
                    toast.success(result.message);
                    navigate('/admin/products')
                }
                else {
                    const formErrors = result.errors;
                    Object.keys(formErrors).forEach((field) => {
                        setError(field,{message: formErrors[field][0]});
                    })
                }

            })
    }

    const fetchCategories = async () => {
        const res = await fetch(`${apiUrl}/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`

            },
        })
        .then(res => res.json())
        .then(result => {
            setCategories(result.data);
        })
    }
    
    const fetchRoomTypes = async () => {
        const res = await fetch(`${apiUrl}/roomtypes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`

            },
        })
        .then(res => res.json())
        .then(result => {
            setRoomTypes(result.data);
        })
    }

    const handleFile = async(e) => {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append("image", file);
        setDisable(true);
        const res = await fetch(`${apiUrl}/temp-images`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`

            },
            body: formData
        })
        .then(res => res.json())
        .then(result => {
            gallery.push(result.data.id);
            setGallery(gallery);

            galleryImages.push(result.data.image_url);
            setGalleryImages(galleryImages);
            setDisable(false);
            e.target.value = ""
        })
    }

    useEffect(() => {
        fetchCategories();
        fetchRoomTypes();
    }, [])
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-3">
                        <h4 className="h4 pb-0 mb-0">Products / Edit</h4>
                        <Link to="/admin/products" className="btn btn-primary">Back</Link>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <form onSubmit={handleSubmit(saveProduct)}>
                            <div className="card shadow">
                                <div className="card-body p-4">
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">
                                            Title
                                        </label>
                                        <input
                                            {
                                            ...register('title', {
                                                required: 'The title field is required'
                                            })
                                            }
                                            type="text"
                                            className={`form-control ${errors.title && 'is-invalid'}`}
                                            placeholder="Title" />
                                        {
                                            errors.title &&
                                            <p className="invalid-feedback">{errors.title?.message}</p>
                                        }
                                    </div>
                                        
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='mb-3'>
                                                <label className='form-label' htmlFor="" >Category</label>
                                                <select
                                                    {
                                                        ...register('category', {
                                                            required: 'Please select a Category'
                                                        })
                                                    } 
                                                    className={`form-control ${errors.category && 'is-invalid'}`}>
                                                    <option value="">Select a Category</option>
                                                    {
                                                        categories && categories.map((category) => {
                                                            return(<option key={`category-${category.id}`} value={category.id}>{category.name}</option>)
                                                        })
                                                    }
                                                </select>
                                                {
                                                    errors.category &&
                                                    <p className="invalid-feedback">{errors.category?.message}</p>
                                                }
                                            </div>
                                        </div>
                                        
                                        <div className='col-md-6'>
                                            <div className='mb-3'>
                                                <label className='form-label' htmlFor="" >RoomType</label>
                                                <select 
                                                    {
                                                        ...register('room_type')
                                                    } 
                                                className='form-control'>
                                                    <option value="">Select a RoomType</option>
                                                    {
                                                    roomtypes && roomtypes.map((roomtype) => {
                                                            return(<option key={`roomtype-${roomtype.id}`} value={roomtype.id}>{roomtype.name}</option>)
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className='mb-3'>
                                        <label htmlFor="" className="form-label">
                                            Short Description
                                        </label>

                                        <textarea
                                        {
                                            ...register('short_description')
                                        } 
                                        className='form-control' placeholder='Short Description' rows={3}></textarea>
                                    </div>

                                    <div className='mb-3'>
                                        <label htmlFor="" className="form-label">
                                            Description
                                        </label>
                                        <JoditEditor
                                            ref={editor}
                                            value={content}
                                            config={config}
                                            tabIndex={1}
                                            onBlur={newContent => setContent(newContent)}
                                        />
                                    </div>

                                    <h3 className='py-3 border-bottom mb-3'>Pricing</h3>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className='mb-3'>
                                                <label htmlFor="" className='form-label'>Price</label>
                                                <input 
                                                    {
                                                        ...register('price', {
                                                            required: 'The price field is required'
                                                        })
                                                    }
                                                type="text" placeholder='Price' 
                                                className={`form-control ${errors.price && 'is-invalid'}`}/>
                                                {
                                                    errors.price &&
                                                    <p className="invalid-feedback">{errors.price?.message}</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                             <div className='mb-3'>
                                                <label htmlFor="" className='form-label'>Dicounted Price</label>
                                                <input 
                                                {
                                                    ...register('compare_price')
                                                } 
                                                type="text" placeholder='Dicounted Price' className='form-control'/>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className='py-3 border-bottom mb-3'>Inventory</h3>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className='mb-3'>
                                                <label htmlFor="" className='form-label'>SKU</label>
                                                <input
                                                    {
                                                        ...register('sku', {
                                                            required: 'The sku field is required'
                                                        })
                                                    } 
                                                type="text" placeholder='Sku' 
                                                className={`form-control ${errors.sku && 'is-invalid'}`}/>
                                                {
                                                    errors.sku &&
                                                    <p className="invalid-feedback">{errors.sku?.message}</p>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                             <div className='mb-3'>
                                                <label htmlFor="" className='form-label'>Barcode</label>
                                                <input
                                                {
                                                    ...register('barcode')
                                                }  
                                                type="text" placeholder='Barcode' className='form-control'/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className='mb-3'>
                                                <label htmlFor="" className='form-label'>Qty</label>
                                                <input 
                                                {
                                                    ...register('qty')
                                                } 
                                                type="text" placeholder='Qty' className='form-control'/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                             <div className="mb-3">
                                                <label htmlFor="" className="form-label">Status</label>
                                                <select
                                                    {
                                                    ...register('status', {
                                                        required: 'Please select a status'
                                                    })
                                                    }
                                                    className={`form-control ${errors.status && 'is-invalid'}`}>
                                                    <option value="">Select a Status</option>
                                                    <option value="1">Active</option>
                                                    <option value="0">Block</option>
                                                </select>
                                                {
                                                    errors.status &&
                                                    <p className="invalid-feedback">{errors.status?.message}</p>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Featured</label>
                                        <select
                                            {
                                            ...register('is_featured', {
                                                required: 'This field is required'
                                            })
                                            }
                                            className={`form-control ${errors.is_featured && 'is-invalid'}`}>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                        {
                                            errors.is_featured &&
                                            <p className="invalid-feedback">{errors.is_featured?.message}</p>
                                        }
                                    </div>

                                    <h3 className='py-3 border-bottom mb-3'>Gallery</h3>
                                    
                                    <div className='mb-3'>
                                            <label htmlFor="" className='form-label'>Image</label>
                                            <input
                                            onChange={handleFile} 
                                            type="file" className='form-control'/>
                                    </div>

                                    <div className='mb-3'>
                                        <div className='row'>
                                            {
                                                galleryImages && galleryImages.map((image, index) => {
                                                    return (
                                                        <div className='col-md-3' key={`image-${index}`}>
                                                            <div className='card shadow'>
                                                                <img src={image} alt=""className='w-100'/>
                                                                <button className='btn btn-danger' onClick={() => deleteImage(image)}>Delete</button>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                                    
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                disabled={disable}
                                type='submit' className="btn btn-primary mt-3 mb-5">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Edit; 