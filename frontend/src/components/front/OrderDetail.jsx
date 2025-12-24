import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserSidebar from "../common/UserSidebar";
import { adminToken, apiUrl, userToken } from "../common/http";
import { toast } from "react-toastify";
import Loader from "../common/Loader";
import Layout from "../common/Layout";
import { useParams } from "react-router-dom";


const OrderDetail = () => {

    const [order, setOrder] = useState([]);
    const [items, setItems] = useState([]);
    const [loader, setLoader] = useState(false);
    const params = useParams();
    
    const fecthOrder = async () => {
        setLoader(true);
        const res = await fetch(`${apiUrl}/orders/${params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken()}`
            }
        })
        .then(res => res.json())
        .then(result => {
            setLoader(false);
            console.log(result);
            if (result.status == 200) {
                setOrder(result.data);
                setItems(result.data.items);
            } else {
                console.log('Some went wrong');
            }
        })
    }

    useEffect(() => {
        fecthOrder();
    },[]);

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-3">
                        <h4 className="h4 pb-0 mb-0">My Order Detail</h4>
                        {/* <Link to="" className="btn btn-primary">Button</Link> */}
                    </div>
        
                    <div className="col-md-3">
                        <UserSidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="card shadow">
                            <div className="card-body p-4">
                                {
                                    loader == true && <Loader />
                                }
                                {
                                loader == false &&
                                <div>
                                    <div className='row'>
                                        <div className='col-md-4'>
                                            <h3>Order ID: #{order.id}</h3>
                                            {
                                                order.status == 'pending' && <span className='badge bg-warning'>Pending</span>
                                            }
                                            {
                                                order.status == 'shipped' && <span className='badge bg-warning'>Shipped</span>
                                            }
                                            {
                                                order.status == 'delivered' && <span className='badge bg-success'>Delivered</span>
                                            }
                                            {
                                                order.status == 'cancelled' && <span className='badge bg-danger'>Cancelled</span>
                                            }
                                        </div>
                                        <div className='col-md-4'>
                                            <div className='text-secondary'>Date</div>
                                            <h4 className='pt-2'>{order.created_at}</h4>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className='text-secondary'>Payment Status</div>
                                            {
                                                order.payment_status == 'paid' ?
                                                <span className = 'badge bg-success'>Paid</span> :
                                                <span className = 'badge bg-danger'>Not Paid</span>
                                            }
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-4'>
                                            <div className='py-5'>
                                                <strong>{order.name}</strong>
                                                <div>{order.email}</div>
                                                <div>{order.mobile}</div>
                                                <div>{order.address}, {order.city}, {order.state}, {order.zip}</div>
                                            </div>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className='text-secondary pt-5'>Payment Method</div>
                                            <p>
                                                {
                                                    order.payment_method == 'stripe' ? <span className='badge bg-success'>Stripe</span>
                                                        : <span className='badge bg-warning'>COD</span>
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <h3 class="pb-2 "><strong>Items</strong></h3>
                                        {
                                            items.map((item) => {
                                                return (
                                                    <div key={`${item.id}`} class="row justify-content-end">
                                                        <div class="col-lg-12">
                                                            <div class="d-flex justify-content-between border-bottom pb-2 mb-2">
                                                                <div class="d-flex">
                                                                    {
                                                                        item.product.image && <img width="70" class="me-3" src={`${item.product.image_url}`} alt=""/>
                                                                    }
                                                                </div>
                                                                <div class="d-flex">
                                                                    <div>X {item.qty}</div>
                                                                    <div class="ps-3">{item.price}đ</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div class="row justify-content-end">
                                            <div class="col-lg-12">
                                                <div class="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                    <div>Subtotal</div>
                                                    <div>{order.sub_total}đ</div>
                                                </div>
                                                <div class="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                    <div>Shipping</div>
                                                    <div>{order.shipping}đ</div>
                                                </div>
                                                <div class="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                    <div><strong>Grand Total</strong></div>
                                                    <div>{order.grand_total}đ</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default OrderDetail;