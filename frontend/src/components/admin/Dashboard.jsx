import React, {useContext} from 'react'
import Layout from '../common/Layout'
import Sidebar from '../common/Sidebar'
import {AdminAuthContext} from '../context/AdminAuth'
import {Link} from 'react-router-dom'
import { apiUrl, adminToken } from "../common/http";
import { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);


const Dashboard = () => {
    const [chartData, setChartData] = useState({
    months: [],
    orders: [],
    users: [],
    products: []
});

    const [stats, setStats] = useState({
        users: 0,
        orders: 0,
        products: 0
    });

    useEffect(() => {
    fetch(`${apiUrl}/admin/dashboard-stats`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${adminToken()}`
        }
    })
    .then(res => res.json())
    .then(result => {
        if(result.status === 200){
            setStats(result);
            if(result.chart){
                setChartData(result.chart);
            }
        }
        else{
            console.log("Something went wrong");
        }
    })
    }, []);

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between mt-5 pb-3">
                        <h4 className="h4 pb-0 mb-0">Dashboard</h4>
                    </div>
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <h2>{stats.users}</h2>

                                        <span>Users</span>
                                    </div>
                                    <div className="card-footer">
                                        <Link to="/admin/users">View Users</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <h2>{stats.orders}</h2>

                                        <span>Orders</span>
                                    </div>
                                    <div className="card-footer">
                                        <Link to="/admin/orders">View Orders</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <h2>{stats.products}</h2>
                                        <span>Products</span>
                                    </div>
                                    <div className="card-footer">
                                        <Link to="/admin/products">View Products</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mt-4">
  <div className="card-body">
    <h5>Users, Orders and Products (Line Chart)</h5>

    <Line
      data={{
        labels: chartData.months,
        datasets: [
          {
            label: "Users",
            data: chartData.users,
            borderColor: "blue",
            tension: 0.4
          },
          {
            label: "Orders",
            data: chartData.orders,
            borderColor: "green",
            tension: 0.4
          },
          {
            label: "Products",
            data: chartData.products,
            borderColor: "red",
            tension: 0.4
          }
        ]
      }}
    />
  </div>
</div>

<div className="card mt-4">
  <div className="card-body">
    <h5>Users (Bar Chart)</h5>

    <Bar
      data={{
        labels: chartData.months,
        datasets: [
          {
            label: "Users",
            data: chartData.users,
            backgroundColor: "blue"
          }
        ]
      }}
    />
  </div>
</div>

<div className="card mt-4">
  <div className="card-body">
    <h5>Orders (Bar Chart)</h5>

    <Bar
      data={{
        labels: chartData.months,
        datasets: [
          {
            label: "Orders",
            data: chartData.orders,
            backgroundColor: "orange"
          }
        ]
      }}
    />
  </div>
</div>
<div className="card mt-4">
  <div className="card-body">
    <h5>Products (Bar Chart)</h5>
<Bar 
  data={{
    labels: chartData.months,
    datasets: [
      {
        label: "Products Created",
        data: chartData.products,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }}
/>
  </div>
</div>



                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard