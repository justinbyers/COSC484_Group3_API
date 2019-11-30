const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());

const config = ({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'bf967a94ff1047',
    password: '40e7fd8d',
    database: 'heroku_01f0321449bfb48'
});

var con = mysql.createConnection(config);
var users, employees, balances;
var current_orders, ingredient_status, login;
var validIds;

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

    con.end();
    console.log("Success");
}
catch (err) {
    console.log("Err: " + err);
}

//returns an all in 1 json with every table's content
app.get('/', (req, res) => {
    res.send(JSON.stringify(current_orders)
        + JSON.stringify(ingredient_status)
        + JSON.stringify(login));
});

//returns an all in 1 json but for the obsolete tables (testing purposes)
app.get('/extra', (req, res) => {
    res.send(JSON.stringify(users)
        + JSON.stringify(employees)
        + JSON.stringify(balances));
});

app.get('/balances', (req, res) => {
    con = createConnection(con);
    con.query("SELECT * FROM balances ", function (err, result, fields) {
        if (err) throw err;
        balances = result;
        console.log(balances);
        res.send(JSON.stringify(balances));
    });
    con.end();
});

app.get('/current_orders', (req, res) => {
    con = createConnection(con);
    con.query("SELECT * FROM current_orders ", function (err, result, fields) {
        if (err) throw err;
        current_orders = result;
        console.log(current_orders);
        res.send(JSON.stringify(current_orders));
    });
    con.end();
});

app.get('/employees', (req, res) => {
    con = createConnection(con);
    con.query("SELECT * FROM employees ", function (err, result, fields) {
        if (err) throw err;
        employees = result;
        console.log(employees);
        res.send(JSON.stringify(employees));
    });
    con.end();
});

app.get('/ingredient_status', (req, res) => {
    con = createConnection(con);
    con.query("SELECT * FROM ingredient_status ", function (err, result, fields) {
        if (err) throw err;
        ingredient_status = result;
        console.log(ingredient_status);
        res.send(JSON.stringify(ingredient_status));
    });
    con.end();
});

app.get('/login', (req, res) => {
    con = createConnection(con);
    con.query("SELECT * FROM login ", function (err, result, fields) {
        if (err) throw err;
        login = result;
        console.log(login);
        res.send(JSON.stringify(login));
    });
    con.end();
});

app.get('/users', (req, res) => {
    // console.log("hello: " + req.query.);
    con = createConnection(con);
    con.query("SELECT * FROM users ", function (err, result, fields) {
        if (err) throw err;
        users = result;
        console.log(users);
        res.send(JSON.stringify(users));
    });
    con.end();
});

app.get('/testids', (req, res) => {

    con = createConnection(con);
    con.query("SELECT id FROM users ", function (err, result, fields) {
        if (err) throw err;
        validIds = result;
        console.log(validIds);
        validIds = JSON.stringify(validIds);
        console.log(validIds);
        validIds = validIds.replace(/{"id":/g, '');
        validIds = validIds.replace(/},/g, ',');
        validIds = validIds.replace(/}/g, '');
        validIds = validIds.replace(/\[/g, '');
        validIds = validIds.replace(/\]/g, '');
        validIds = validIds.split(',');
        console.log(validIds);
        res.send(validIds);
    });
    con.end();
});

app.listen(process.env.PORT || 80);

function createConnection(connection) {
    connection = mysql.createConnection(config);
    connection.connect();
    console.log("Connection made");
    return connection;
}