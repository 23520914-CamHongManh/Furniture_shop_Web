import React, { useState } from 'react'
import Layout from '../common/Layout'
import { apiUrl } from '../common/http'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await fetch(`${apiUrl}/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email })
        }).then(res => res.json())
            .then(result => {
                setLoading(false)
                if (result.status == 200) {
                    toast.success(result.message)
                } else {
                    toast.error(result.message || 'Failed to send reset link')
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
                        <h4 className="h4 pb-0 mb-0">Forgot Password</h4>
                    </div>
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow">
                            <div className="card-body p-4">
                                <form onSubmit={submit}>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                                    </div>
                                    <div>
                                        <button disabled={loading} className="btn btn-primary">Send Reset Link</button>
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

export default ForgotPassword