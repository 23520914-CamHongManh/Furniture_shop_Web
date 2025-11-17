import React from 'react'

const Create = () => {
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-3">
                        <h4 className="h4 pb-0 mb-0">Your title</h4>
                        <Link className="btn btn-primary">Button</Link>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="card shadow">
                            <div className="card-body p-4">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Create