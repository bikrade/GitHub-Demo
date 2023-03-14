const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createPool({
    host: 'localhost',
    user: "ms1user",
    password: "mySQL@123",
    database: "crud_contact"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
    console.log("Inside api/get");
    const sqlSelect = "SELECT * FROM crud_contact.contact_db";
    db.query(sqlSelect, (err, result) => {
        //console.log("error: ", err);
        //console.log("result: ", result);
        res.send(result);
    });
});

// Get the ID parameter from the URL and store it in the variable id.
// The parameter is stored in the req.params object.
// Send the ID to the client in the response object.
// The response object is a JSON object.

app.get("/api/getid/:id", (req, res) => {
    const { id } = req.params;
    console.log("Inside api/getid/id:" + id + ", Timestamp: " + new Date().toLocaleString());
    const sqlSelect = "SELECT * FROM crud_contact.contact_db WHERE id = ?";
    db.query(sqlSelect, [id], (err, result) => {
        if (err)
            console.log("error: ", err);
        else if (result.length > 0)
            res.send(result);
        else
            res.status(404).send("Contact with id " + id + " not found");
        console.log("result: ", result);
    });
});

// write a SQL query to join two tables and find the contact details
app.get("/api/getjoin", (req, res) => {
    console.log("Inside api/getjoin");
    const sqlSelect = "SELECT * FROM crud_contact.contact_db INNER JOIN crud_contact.contact_address ON crud_contact.contact_db.id = crud_contact.contact_address.id";
})

app.post("/api/post", (req, res) => {
    const cname = req.body.cname;
    const email = req.body.email;
    const phone = req.body.phone;
    const sqlInsert = "INSERT INTO contact_db (cname, email, phone) VALUES (?,?,?)";

    db.query(sqlInsert, [cname, email, phone], (err, result) => {
        console.log("error: ", err);
        console.log("result: ", result);
        res.send("Product Added Successfully");
    });

    // write function to send an email about the new product that was added
        const sendEmail = () => {
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bikrade@microsoft.com',
                pass: 'xxx'
            }
        });

        const mailOptions = {
            from: 'abc@microsoft.com',
            to: 'bikrade@microsoft.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };
    };

    // write hello world function
    
})

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    const sqlRemove = "DELETE FROM crud_contact.contact_db WHERE id = ?";

    db.query(sqlRemove, id, (err, result) => {
        console.log("error: ", err);
        console.log("result: ", result);
        //res.send("Contact Removed Successfully");
    });

    // write a function to send SMS using Twilio REST API
    function sendSMS() {
        const accountSid = 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
        const authToken = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
        const client = require('twilio')(accountSid, authToken);

        client.messages
            .create({
                body: 'This is the product that was',
                from: '+15017122661',
                to: '+15558675310'
            })
    }
})

// write get API to update the contact
app.put("/api/put/:id", (req, res) => {
    const { id } = req.params;
    const { cname, email, phone } = req.body;
    console.log(id);
    const sqlUpdate = "UPDATE crud_contact.contact_db SET cname = ?, email = ?, phone = ? WHERE id = ?";
    db.query(sqlUpdate, { cname, email, phone, id }, (err, result) => {
        if (err)
            console.log("error: ", err);
        console.log("result: ", result);
        res.send("Product Updated Successfully");
    });
})


app.listen(5000, () => {
    console.log('Server is running on port 5000');
})