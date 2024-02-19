const app  = require("express")();
const port = 3000;
const mysql = require('mysql');

const config = {
  host: "db",
  user: "root",
  password: "user",
  database: "nodedb"
};

const createTableConnection = mysql.createConnection(config);

createTableConnection.query(`create table if not exists people (id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY, name varchar(255))`)
createTableConnection.end();

app.get("/", function(req, res) {
    const connection = mysql.createConnection(config);

    connection.connect(err => {
  
        if (err) throw new Error(err); 

        const insert = `INSERT INTO people(name) values('Felipe Oliveira')`;
        connection.query(insert);

        connection.query("SELECT * FROM people", function (err, result, fields) {
            if (err) throw err;
            const names = result.reduce((prev, curr) => {
            return prev + curr.name + '<br>'
        }, '<h1>Full Cycle Rocks!</h1><br>');
        res.send(names);
    });

    })

});

app.listen(port, function(err) {
    console.log("servidor rodando");
    if (err) 
        console.log(err)
});