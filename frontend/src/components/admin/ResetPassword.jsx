import React, { useState, useEffect } from 'react'
import Layout from '../common/Layout'
import Sidebar from '../common/Sidebar'
import { apiUrl } from '../common/http'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ResetPassword = () => {
    const query = useQuery();
    const navigate = useNavigate();
    const [token, setToken] = useState('')
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setToken(query.get('token') || '')
        setEmail(query.get('email') || '')
    }, [])

    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await fetch(`${apiUrl}/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email, token, new_password: newPassword, new_password_confirmation: confirmPassword })
        }).then(res => res.json())
            .then(result => {
                setLoading(false)
                if (result.status == 200) {
                    toast.success(result.message)
                    navigate('/admin/login')
                } else if (result.status == 400 && result.errors) {
                    const firstError = Object.values(result.errors)[0][0]
                    toast.error(firstError)
                } else {
                    toast.error(result.message || 'Failed to reset password')
                }
            }).catch(() => {
                setLoading(false)
                toast.error('Request failed')
            })
    }

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-3">
                        <h4 className="h4 pb-0 mb-0">Reset Password</h4>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="card shadow">
                            <div className="card-body p-4">
                                <form onSubmit={submit}>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">New Password</label>
                                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Confirm New Password</label>
                                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control" />
                                    </div>
                                    <div>
                                        <button disabled={loading} className="btn btn-primary">Reset Password</button>
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

export default ResetPassword