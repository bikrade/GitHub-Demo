import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link, useNavigate } from "react-router-dom";
import "./AddEdit.css"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEdit = () => {

    const [cname, setCname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    // get navigate function
    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetchProductData = async () => {
            const response = await axios.get(`http://localhost:5000/api/getid/${id}`);

            setCname(response.data.cname);
            setEmail(response.data.email);
            setPhone(response.data.phone);
        }
        fetchProductData();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // check if any field is empty and show error
        if (!cname || !email || !phone) {
            toast.error("Please fill all the fields");
            return;
        }

        /* 
        1. Use axios to make a POST request to the server
        2. Send the data from the form in the request body
        3. If the request is successful, show the user a success message
        4. If the request fails, show the user an error message
        5. Clear the form
        6. Redirect the user to the home page after 3 seconds 
        */
        const res = axios
            .post('http://localhost:5000/api/post', { cname, email, phone })
            .then
            ((Response) => {
                console.log("Axios response: ", Response.data);
            })
            .catch((err) => toast.error(err.message));

        toast.success("Product added successfully");

        setCname("");
        setEmail("");
        setPhone("");

        setTimeout(() => {
            navigate("/");
        }
            , 3000
        );

       
    }

    return (
        <div style={{ marginTop: "100px" }}>
            <h2>Product Details</h2>
            <form
                style={{
                    margin: "auto",
                    padding: "15px",
                    maxWidth: "400px",
                    alignContent: "center"
                }}
                onSubmit={handleSubmit}>

                <label htmlFor="cname">Product Name</label>
                <input type="text"
                    placeholder="Product name ..."
                    value={cname || ""}
                    onChange={(e) => setCname(e.target.value)}
                />

                <label htmlFor="email">Model Number</label>
                <input type="text"
                    placeholder="Model Number ..."
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="phone">Price</label>
                <input type="number"
                    placeholder="Product Price ..."
                    value={phone || ""}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input type="submit" value="Save" />
                <Link to="/">
                    <input type="button" value="Go Back" />
                </Link>
            </form>
        </div>
    );
};

export default AddEdit;