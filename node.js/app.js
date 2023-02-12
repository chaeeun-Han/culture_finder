const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'becky25^^',
    database: 'hack'
})

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack)
        return
    }

    console.log('connected as id ' + connection.threadId)
})


// env
const dotenv = require("dotenv");
const { response } = require("express");
dotenv.config();

// CORS ERROR
app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    res.header("SameSite", "None");
    next();
});

// 데이터 응답 API
app.get('/facilities', async (req, res) => {
    try {
        connection.query(
            'SELECT * FROM `facilities`',
            function (error, results, fields) {
                res.send(results);
            }
        )
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server Error.' });
    }
});

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});