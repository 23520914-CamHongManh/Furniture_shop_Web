import React, { useContext } from 'react'
import { AdminAuthContext } from '../context/AdminAuth';


const Sidebar = () => {
    // const { logout } = useContext(AdminAuthContext);
    return (
        <div className="card shadow mb-5 sidebar">
            <div className="card-body p-4">
                <ul>
                    <li>
                        <a href="">Dashboard</a>
                    </li>
                    <li>
                        <a href="">Categories</a>
                    </li>
                    <li>
                        <a href="">Brands</a>
                    </li>
                    <li>
                        <a href="">Products</a>
                    </li>
                    <li>
                        <a href="">Orders</a>
                    </li>
                    <li>
                        <a href="">Users</a>
                    </li>
                    <li>
                        <a href="">Change Password</a>
                    </li>
                    <li>
                        {/* <a href="" onClick={logout}>Log out</a> */}
                        <a href="" >Log out</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar