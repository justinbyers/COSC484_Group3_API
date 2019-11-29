const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

const config = ({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'bf967a94ff1047',
    password: '40e7fd8d',
    database: 'heroku_01f0321449bfb48'
});

var con = mysql.createConnection(config);
var users, employees, balances;
var current_orders, ingredient_status, login;

app.use(cors());

try {
    con.connect();

    con.query("SELECT * FROM users ", function (err, result, fields) {
        if (err) throw err;
        users = result;
        console.log(users);
    });

    con.query("SELECT * FROM employees ", function (err, result, fields) {
        if (err) throw err;
        employees = result;
        console.log(employees);
    });

    con.query("SELECT * FROM balances ", function (err, result, fields) {
        if (err) throw err;
        balances = result;
        console.log(balances);
    });

    con.query("SELECT * FROM current_orders ", function (err, result, fields) {
        if (err) throw err;
        current_orders = result;
        console.log(current_orders);
    });

    con.query("SELECT * FROM ingredient_status ", function (err, result, fields) {
        if (err) throw err;
        ingredient_status = result;
        console.log(ingredient_status);
    });

    con.query("SELECT * FROM login ", function (err, result, fields) {
        if (err) throw err;
        login = result;
        console.log(login);
    });

    console.log("Success");
}
catch (err) {
    console.log("Err: " + err);
}

app.get('/', (req, res) => {
    res.send(JSON.stringify(current_orders)
        + JSON.stringify(ingredient_status)
        + JSON.stringify(login));
});

app.get('/extra', (req, res) => {
    res.send(JSON.stringify(users)
        + JSON.stringify(employees)
        + JSON.stringify(balances));
});

app.listen(process.env.PORT || 80);

con.on('error', function (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST')
        console.log("Connection lost but nbd");
    else
        console.log("Other error: " + err.stack);
});
