require("dotenv").config();
const express = require('express');
const app = express();
const sql = require("mssql");

// config DB
const config = {
    server: 'localhost',
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: "Learning"
};

app.get('/', (req, res) => {
    // connect to DB
    sql.connect(config, (err) => {
        if(err) {
            console.log("Error connecting to DB see msg below");
            console.log(err);
        }
        // create Request object
        let request = new sql.Request();
        // query to DB
        request.query("SELECT * FROM customers", (err, recordset) => {
            if (err) {
                console.log(err);
            } else {
                res.send(recordset);
                console.log("Result: " + recordset);
            }
        });
    });
});


app.listen(3000, () => {
    console.log('listening on port 3000');
});