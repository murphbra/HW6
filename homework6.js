
var mysql = require('mysql');
var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs290_murphbra',
  password        : '5461',
  database        : 'cs290_murphbra'
});

  
app.set('port', 5463)


app.get('/reset-table',function(req,res,next){
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err){ 
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('main',context);
    })
  });
});


app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
  });