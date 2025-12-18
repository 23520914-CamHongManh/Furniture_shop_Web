import React, { useContext } from 'react'
import { AdminAuthContext } from '../context/AdminAuth';
import { Link } from 'react-router-dom';


const Sidebar = () => {
    const { logout } = useContext(AdminAuthContext);
    return (
        <div className="card shadow mb-5 sidebar">
            <div className="card-body p-4">
                <ul>
                    <li>
                        <Link to="/admin/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/admin/categories">Categories</Link>
                    </li>
                    <li>
                        <Link to='/admin/roomtypes'>Room Types</Link>
                    </li>
                    <li>
<<<<<<< HEAD
                        {/* <a href="">Products</a> */}
                        <Link to="/admin/products">Products</Link>
                    </li>
                    <li>
                        <Link to="/admin/orders">Orders</Link>
                    </li>
                    <li>
                        <a href="">Products</a>
=======
                        <Link to='/admin/products'>Products</Link>
>>>>>>> dc20af48ea1e44491ad9ed3a73d26b6ab8a48b27
                    </li>
                    <li>
                        <a href="">Orders</a>
                    </li>
                    <li>
                        <a href="">Users</a>
                    </li>
                    <li>
                        <Link to="/admin/shipping">Shipping</Link>
                    </li>
                    <li>
                        <a href="">Change Password</a>
                    </li>
                    <li>
                        <a href="" onClick={logout}>Log out</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar