var express = require("express");
var mysql = require("mysql");
var app = express();
var path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json()) // To parse the incoming requests with JSON payloads
app.set('view engine', 'pug')

// app.use("/", function(req, res, next)
// {
//     console.log(req.url);
//     next();
// })

app.use(express.static(path.join(__dirname)));

app.get("/", function(req, res){
    
    res
        .status(200)
        .sendFile(path.join(__dirname,"index2.html"));
});


var connection = mysql.createConnection({
    host: 'localhost',
    //host: '127.0.0.1',
    user: "root",
    //port: "3307",
    password: '',
    database: 'test'
  
  });
  connection.connect(function (err) {
    if (err) throw err;
    
  
    console.log('Connected.........');
  })
  
  
  
  app.post('/submit', function (req, res) {
    //console.log(req.body);
    var sql = "insert into entry_details values('" + req.body.first_name + "','" + req.body.last_name + "', '" + req.body.address + "', " + req.body.phone_no + ", '" + req.body.mail +"')"
    connection.query(sql, function (err) {
      if (err) throw err
  
      res.render('index', {
        title: 'Data saved',
        message: 'Data saved successfully'})
       

    })
    connection.end();
  })

  
  app.post('/send', function (req, res) {
    //console.log(req.body);
    var sql = "insert into feed values('" + req.body.feed +"')"
    connection.query(sql, function (err) {
      if (err) throw err
  
      res.render('index', {
        title: 'Data saved',
        message: 'Data saved successfully'})
        
    })
    connection.end();
  })


app.listen(3000, function()
{
    console.log("Listening at 3000")
})