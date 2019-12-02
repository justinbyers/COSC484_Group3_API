const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const url = require('url');
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
    con.query("SELECT Status FROM ingredient_status", function (err, result, fields) {
        if (err) throw err;
        ingredient_status = result;
        ingredient_status = JSON.stringify(ingredient_status);
        ingredient_status = ingredient_status.replace(/{"Status":/g, '');
        ingredient_status = ingredient_status.replace(/\"/g, '');
        ingredient_status = ingredient_status.replace(/},/g, ',');
        ingredient_status = ingredient_status.replace(/}/g, '');
        ingredient_status = ingredient_status.replace(/\[/g, '');
        ingredient_status = ingredient_status.replace(/\]/g, '');
        ingredient_status = ingredient_status.replace(/"/g, '');
        ingredient_status = ingredient_status.split(',');
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
//fetch('https://wv-food-order-api.herokuapp.com/users?)
app.get('/users', (req, res) => {
    var urlcontents = url.parse(req.url, true);
    console.log("query is: " + urlcontents.query.aaaa);
    con = createConnection(con);
    con.query("SELECT * FROM users ", function (err, result, fields) {
        if (err) throw err;
        users = result;
        console.log(users);
        res.send(JSON.stringify(users));
    });
    con.end();
});

// app.get('/testids', (req, res) => {

//     con = createConnection(con);
//     con.query("SELECT ID FROM login ", function (err, result, fields) {
//         if (err) throw err;
//         validIds = result;
//         console.log(validIds);
//         validIds = JSON.stringify(validIds);
//         console.log(validIds);
//         validIds = validIds.replace(/{"ID":/g, '');
//         validIds = validIds.replace(/},/g, ',');
//         validIds = validIds.replace(/}/g, '');
//         validIds = validIds.replace(/\[/g, '');
//         validIds = validIds.replace(/\]/g, '');
//         validIds = validIds.split(',');
//         console.log(validIds);
//         res.send(validIds);
//     });
//     con.end();
// });

app.get('/testCustids', (req, res) => {

    con = createConnection(con);
    con.query("SELECT ID FROM login WHERE type = 1 ", function (err, result, fields) {
        if (err) throw err;
        validIds = result;
        console.log(validIds);
        validIds = JSON.stringify(validIds);
        console.log(validIds);

        validIds = validIds.replace(/{"ID":/g, '');
        validIds = validIds.replace(/"Type":/g, '');
        validIds = validIds.replace(/\"T/g, 'T');
        validIds = validIds.replace(/\"/g, '');
        validIds = validIds.replace(/},/g, ',');
        validIds = validIds.replace(/}/g, '');
        validIds = validIds.replace(/\[/g, '');
        validIds = validIds.replace(/\]/g, '');
        validIds = validIds.replace(/"/g, '');
        validIds = validIds.split(',');

        console.log(validIds);
        res.send(validIds);
    });
    con.end();
});

app.get('/testEmpids', (req, res) => {

    con = createConnection(con);
    con.query("SELECT ID FROM login WHERE type = 0 ", function (err, result, fields) {
        if (err) throw err;
        validIds = result;
        console.log(validIds);
        validIds = JSON.stringify(validIds);
        console.log(validIds);

        validIds = validIds.replace(/{"ID":/g, '');
        validIds = validIds.replace(/"Type":/g, '');
        validIds = validIds.replace(/\"T/g, 'T');
        validIds = validIds.replace(/\"/g, '');
        validIds = validIds.replace(/},/g, ',');
        validIds = validIds.replace(/}/g, '');
        validIds = validIds.replace(/\[/g, '');
        validIds = validIds.replace(/\]/g, '');
        validIds = validIds.replace(/"/g, '');
        validIds = validIds.split(',');

        console.log(validIds);
        res.send(validIds);
    });
    con.end();
});

/* the arrays are stored as such:
Sauces - pesto, marinara, alfredo
Protein - Chicken, shrimp, meatball, sausage, crab
Topping - onion, tomato, broccoli, mushroom, corn
Seasoning - salt/pep, old bay, cajun, italian, garlic
Pasta - just string format for 'bowtie' or 'penne', *no array used*
ID - id
*/
/*INSERT INTO `Current_Orders` (`Order_Num`, `Customer_ID`, `Pasta_Type`, `Sauce`,
 `Pasta_Ingredients`, `Pancake_Quantity`, `Fried_Egg_Quantity`, `Omlette`, `Scrambled_Egg`,
  `Egg_Ingredients`, `Bacon_Quantity`, `Sausage_Quantity`) VALUES ('133', 'NULL', 'Penne', 'Marinara', 'Mushroom, Onion', '4', '8', '0', '1', 'Mushroom', '2', '3' );
*/
//https://wv-food-order-api.herokuapp.com/pastaOrder?sauces=1_1_1&protein=1_1_1_1_1&topping=1_1_1_1_1&seasoning=1_1_1_1_1&pasta=bowtie&id=635111
app.get('/pastaOrder', (req, res) => { //http://localhost:9000/order?sauces=1_1_1&protein=1_1_1_1_1&topping=1_1_1_1_1&seasoning=1_1_1_1_1&pasta=penne&id=5345345
    var urldata = url.parse(req.url, true);

    var sauces = urldata.query.sauces;
    var protein = urldata.query.protein;
    var topping = urldata.query.topping;
    var seasoning = urldata.query.seasoning;
    var pasta = urldata.query.pasta;
    var id = urldata.query.id;

    var sauceNames = ['pesto', 'marinara', 'alfredo'];
    var proteinNames = ['chicken', 'shrimp', 'meatball', 'sausage', 'crab'];
    var toppingNames = ['onion', 'tomato', 'broccoli', 'mushroom', 'corn'];
    var seasoningNames = ['salt_and_pep', 'old_bay', 'cajun', 'italian', 'garlic'];

    var reqSauces = '';
    var reqProtein = '';
    var reqTopping = '';
    var reqSeasoning = '';

    console.log("Query is: " + sauces + " " + protein + " " + topping + " " + seasoning + " " + pasta + " " + id);

    sauces = sauces.split("_");
    protein = protein.split("_");
    topping = topping.split("_");
    seasoning = seasoning.split("_");

    for (var i = 0; i < sauces.length; i++)
        if (sauces[i] == 1)
            reqSauces += sauceNames[i] + ", ";

    for (var i = 0; i < protein.length; i++)
        if (protein[i] == 1)
            reqProtein += proteinNames[i] + ", ";

    for (var i = 0; i < topping.length; i++)
        if (topping[i] == 1)
            reqTopping += toppingNames[i] + ", ";

    for (var i = 0; i < seasoning.length; i++)
        if (seasoning[i] == 1)
            reqSeasoning += seasoningNames[i] + ", ";


    reqSauces = reqSauces.substring(0, reqSauces.length - 2);
    reqProtein = reqProtein.substring(0, reqProtein.length - 2);
    reqTopping = reqTopping.substring(0, reqTopping.length - 2);
    reqSeasoning = reqSeasoning.substring(0, reqSeasoning.length - 2);

    // console.log("aaa\n" + reqSauces + "\n" + reqProtein + "\n" + reqTopping + "\n" + reqSeasoning);

    var insertIntoCurrentOrders = "INSERT INTO `Current_Orders` "
        + "(`Order_Num`, `Customer_ID`, `Pasta_Type`, `Sauce`, `Pasta_Ingredients`) VALUES ";

    insertIntoCurrentOrders = + "('" + Math.floor(Math.random() * 100000) + "', '" + id + "', '" + pasta
        + "', '" + reqSauces + "', '" + reqProtein + ", " + reqTopping + ", " + reqSeasoning + "')";

    console.log("query: \n" + insertIntoCurrentOrders);

    // console.log(id);

    con = createConnection(con);
    con.query(insertIntoCurrentOrders, function (err, result, fields) {
        if (err) throw err;
        //users = result;
        console.log(result);
        res.send(("success"));
    });
    con.end();
});


///pancakeOrder?pc=4&sugar=1&berries=1&wh_cream=1&id=635111
app.get('/pancakeOrder', (req, res) => {
    var urldata = url.parse(req.url, true);

    var pc = urldata.query.pc;
    var sugar = urldata.query.sugar;
    var berries = urldata.query.berries;
    var wh_cream = urldata.query.wh_cream;
    var id = urldata.query.id;

    var reqIngredients = '';

    if (sugar == 1)
        reqIngredients += "Sugar, ";
    if (berries == 1)
        reqIngredients += "Berries, ";
    if (wh_cream == 1)
        reqIngredients += "Whipped Cream, ";

    reqIngredients = reqIngredients.substring(0, reqIngredients.length - 2);

    var insertIntoCurrentOrders = "INSERT INTO `Current_Orders` "
        + "(`Order_Num`, `Customer_ID`, `Pancake_Toppings`) VALUES ";

    insertIntoCurrentOrders += "('" + Math.floor(Math.random() * 100000)
        + "', '" + id + "', '" + reqIngredients + "')";

    con = createConnection(con);
    con.query(insertIntoCurrentOrders, function (err, result, fields) {
        if (err) throw err;
        //users = result;
        console.log(result);
        res.send(("success"));
    });
    con.end();
});

app.get('/OrderNumber', (req, res) => {
    con = createConnection(con);
    con.query("SELECT max(Order_Num) from current_orders ", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(JSON.stringify(result));
    });
    con.end();
});


app.listen(process.env.PORT || 9000);


function createConnection(connection) {
    connection = mysql.createConnection(config);
    connection.connect();
    console.log("Connection made");
    return connection;
}