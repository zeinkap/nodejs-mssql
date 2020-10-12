require("dotenv").config();
const express = require('express');
const app = express();
const sql = require('mssql');
const faker = require('faker');
const bodyParser  = require('body-parser');
const PORT = 3000;

//const { executeQuery } = require('./controllers');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

// connect to MSSQL DB
const config = {
    server: process.env.SQL_SERVER,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE 
};

let joinQuery = `SELECT c.first_name, c.last_name, c.email, o.order_date, o.amount, o.customer_id \
    FROM customers c JOIN orders o ON o.customer_id = c.id`;
let insertCustomersQuery = `INSERT INTO customers (first_name, last_name, email) VALUES `
let insertOrdersQuery = `INSERT INTO orders (order_date, amount) VALUES `;
let countAllCustomersQuery = `SELECT COUNT(*) AS count FROM customers`;

let customer = {
    firstName: faker.company.suffixes(),
    lastName: faker.address.state(),
    email: faker.internet.email()
}

// let order = {
//     firstName: faker.date.past(),
//     lastName: faker.commerce.price(),
//     email: faker.random.number()
// }

// to add customers to DB
for (let i = 0; i < 5; i++) {
    insertCustomersQuery += `('${customer.firstName}','${customer.lastName}',
    '${customer.email}'),`
}
insertCustomersQuery = insertCustomersQuery.replace(new RegExp(',$'), ';');
sql.connect(config, err => {
    if(err) console.log(`Error connecting to DB: ${err}`);
    // create Request object and run sql query
    new sql.Request().query(insertCustomersQuery, (err, result) => {
        if (err) console.log(`Error executing query: ${err}`);
        console.log(result);
    });
});


app.get('/', (req, res) => {
    sql.close();
    sql.connect(config, err => {
        if(err) console.log(`Error connecting to DB: ${err}`);
        // create Request object and run sql query
        new sql.Request().query(countAllCustomersQuery, (err, result) => {
            if (err) console.log(`Error executing query: ${err}`);
            //console.log(result);
            let count = result.recordset[0].count;
            res.render('home', { count });

        });
    });  
    
});

app.post('/register', (req, res) => {
    let email = req.body.email;
    console.log(email);
    let insertCustomerEmailQuery = `INSERT INTO customers (email) VALUES ('${email}');`;
    sql.close();
    sql.connect(config, err => {
        if(err) console.log(`Error connecting to DB: ${err}`);
        new sql.Request().query(insertCustomerEmailQuery, (err, result) => {
            if (err) throw err;
            res.redirect('/');
            console.log(result);

        });
    });
});

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});