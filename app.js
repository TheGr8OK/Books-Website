var express = require('express');
var path = require('path');
var fs = require('fs');
const { json } = require('express');
var app = express();
var users = [];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('login');
});



app.post('/', function (req, res) {
  var x = req.body.username;
  var y = req.body.password;

});

app.get('/registration', function (req, res) {
  res.render('registration',{errr:""});
});

app.post('/register', function (req, res) {
  var x = req.body.username;
  var y = req.body.password;
  if(x==""){
    res.render('registration', {errr:"you should enter a username"});
  }
  if(y==""){
    res.render('registration', {errr:"you should enter a password"});

  }

  var ee = fs.readFileSync("users.json")
  var z = JSON.parse(ee);

  var flag = true;
  for (var i = 0; i < z.length; i++) {
    if (z[i].username == x) {
      flag = false;
    
      break;
    }
  }
  if (flag == true) {
    res.redirect('/');
    var m = { username: x, password: y };
    z.push(m);
    z = JSON.stringify(z);
    fs.writeFileSync("users.json", z);
    
  }
  else{
    res.render('registration', {errr:"the username is already taken"});
  }
  
})


if(process.env.PORT){
  app.listen(process.env.PORT,function(){console.log('Server started')});

}
else{
  app.listen(3000,function(){console.log('Server started on port 3000')});
}