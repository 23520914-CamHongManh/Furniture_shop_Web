import React, { useEffect, useState } from 'react'
import Layout from '../../common/Layout'
import Sidebar from '../../common/Sidebar'
import { adminToken, apiUrl } from '../../common/http'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const Edit = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchUser = async () => {
        setLoading(true);
        const res = await fetch(`${apiUrl}/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            }
        }).then(res => res.json())
            .then(result => {
                setLoading(false);
                if (result.status == 200) {
                    setName(result.data.name);
                    setEmail(result.data.email);
                    setRole(result.data.role || 'customer');
                } else {
                    toast.error('User not found');
                }
            })
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch(`${apiUrl}/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: JSON.stringify({ name, email, password, role })
        }).then(res => res.json())
            .then(result => {
                setLoading(false);
                if (result.status == 200) {
                    toast.success(result.message);
                    navigate('/admin/users');
                } else {
                    toast.error('Failed to update user');
                }
            })
    }

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-3">
                        <h4 className="h4 pb-0 mb-0">Edit User</h4>
                        <a className="btn btn-primary" href='/admin/users'>Back</a>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="card shadow">
                            <div className="card-body p-4">
                                <form onSubmit={submit}>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password <small className='text-muted'>(leave blank to keep current)</small></label>
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Role</label>
                                        <select value={role} onChange={(e) => setRole(e.target.value)} className="form-select">
                                            <option value="customer">Customer</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>

                                    <div>
                                        <button disabled={loading} className="btn btn-primary">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Edit