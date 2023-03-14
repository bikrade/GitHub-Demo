import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast, Toast } from "react-toastify";
import axios from "axios";

const Home = () => {
    const [data, setData] = useState([]);
    
    const loadData = async () => {
        const result = await axios.get("http://localhost:5000/api/get");
        setData(result.data);
    }

    const deleteContact = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("Product deleted successfully");
            setTimeout(() => loadData(), 500);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div style={{ marginTop: "150px" }}>
            <Link to="/add">
                <button className="btn btn-add">Add New Product</button>
            </Link>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>Seq</th>
                        <th style={{ textAlign: "center" }}>Item #</th>
                        <th style={{ textAlign: "center" }}>Product Name</th>
                        <th style={{ textAlign: "center" }}>Model Number</th>
                        <th style={{ textAlign: "center" }}>Price</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.id}</td>
                                <td>{item.cname}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>
                                <Link to={{
                                    pathname: "/update/"+ item.id,
                                    state: {id: item.id }
                                }}>                                
                                    <button className="btn btn-edit">Edit</button>
                                </Link>
                                <button className="btn btn-delete" onClick={() => deleteContact(item.id)}>Delete</button>
                                <Link to={{
                                    pathname: "/view/"+ item.id,
                                    state: {id: item.id }
                                }}> 
                                    <button className="btn btn-view">View</button>
                                </Link>
                            </td>
                            </tr>
                )
                    })}
            </tbody>
        </table>

        </div >
    );
};

export default Home;