import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/Auth';

const UserSidebar = () => {
    const { logout } = useContext(AuthContext);
    return (
        <div className="card shadow mb-5 sidebar">
            <div className="card-body p-4">
                <ul>
                    <li>
                        <Link to="/account">Account</Link>
                    </li>
                    <li>
                        <Link to='/account/orders'>Orders</Link>
                    </li>
                    <li>
                        <Link to='/account/change-password'>Change Password</Link>
                    </li>
                    <li>
                        <a href="#"
                            onClick={(e) => {
                            e.preventDefault();
                            if (window.confirm("Bạn có chắc muốn đăng xuất không?")) {
                                logout();
                            }
                            }}
                        >
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserSidebar