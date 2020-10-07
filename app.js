require("dotenv").config();
const express = require('express');
const app = express();
const sql = require("mssql");
const faker = require('faker');

// config DB
const config = {
    server: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: 'Learning'
};

function generateCustomer() {
    console.log(faker.name.firstName());
    console.log(faker.name.lastName());
    console.log(faker.internet.email());
}

function generateOrder() {
    console.log(faker.date.past());
    console.log(faker.commerce.price());
    console.log(faker.random.number());
}

generateOrder();
generateCustomer();

app.get('/', (req, res) => {
    // connect to MSSQL DB
    let connection = new sql.ConnectionPool(config, (err) => {
        if(err) {
            console.log("Error connecting to DB see msg below");
            console.log(err);
        }
        // create Request object so we can send sql queries 
        let request = new sql.Request(connection);
        // query to DB
        request.query("SELECT c.first_name, c.last_name, c.email, o.order_date, o.amount FROM customers c JOIN orders o ON o.customer_id = c.id", (err, recordset) => {
            if (err) {
                console.log(err);
            } else {
                res.send(recordset);
            }
        });
    });
});


app.listen(3000, () => {
    console.log('listening on port 3000');
});