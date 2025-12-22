import React, { useEffect, useState } from 'react'
import Layout from '../../common/Layout'
import { Link } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import { adminToken, apiUrl } from '../../common/http'
import Loader from '../../common/Loader'
import Nostate from '../../common/Nostate'
import { toast } from 'react-toastify'

const Show = () => {

    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(false);

    // Pagination
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUsers = async () => {
        setLoader(true);
        const res = await fetch(`${apiUrl}/users?page=${page}&per_page=${perPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`

            }
        }).then(res => res.json())
            .then(result => {
                setLoader(false)
                if (result.status == 200) {
                    const paginator = result.data;
                    setUsers(paginator.data || []);
                    setTotalPages(paginator.last_page || 1);
                }
                else {
                    console.log('Some went wrong');
                }

            })
    }

    const deleteUser = async (id) => {

        if (confirm("Are you sure you want to delete?")) {
            const res = await fetch(`${apiUrl}/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`

                }
            })
                .then(res => res.json())
                .then(result => {
                    if (result.status == 200) {
                        const newUsers = users.filter(u => u.id != id)
                        setUsers(newUsers);
                        toast.success(result.message);
                    }
                    else {
                        console.log('Something went wrong');
                    }

                })
        }

    }
    useEffect(() => {
        fetchUsers()
    }, [page])

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-3">
                        <h4 className="h4 pb-0 mb-0">Users</h4>
                        <Link to='/admin/users/create' className="btn btn-primary">Create</Link>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="card shadow">
                            <div className="card-body p-4">
                                {
                                    loader == true && <Loader />
                                }

                                {
                                    loader == false && users.length == 0 && <Nostate text="Users not found" />
                                }

                                {
                                    users && users.length > 0 &&

                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th width="50">ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th width="100">Role</th>
                                                <th width="100">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.map(user => {
                                                    return (
                                                        <tr key={`user-${user.id}`}>
                                                            <td>{user.id}</td>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>
                                                                {user.role}
                                                            </td>
                                                            <td>
                                                                <Link to={`/admin/users/edit/${user.id}`} className='text-primary'>
                                                                    Edit
                                                                </Link>
                                                                <Link className='text-danger ms-2' onClick={() => deleteUser(user.id)}>
                                                                    Delete
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                }

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
                </div>
            </div>
        </Layout>
    )
}

export default Show