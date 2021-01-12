var express = require('express');
var path = require('path');
var fs = require('fs');
const { json } = require('express');
const { Session } = require('inspector');
var app = express();
var users = [];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('login',{e:""});
});

app.get('/novel', function (req, res) {
  res.render('novel');
});
app.get('/poetry', function (req, res) {
  res.render('poetry');
});

app.get('/fiction', function (req, res) {
  res.render('fiction');
});

app.get('/readlist', function (req, res) {
  var x= Session["user"]
 var ee = fs.readFileSync("users.json")
 var z = JSON.parse(ee);
 for(var i =0; i<z.length; i++){
  if(z[i].username==x){
    res.render('readlist', {l: z[i].readlist});
    break;

  }
}
});



app.get('/flies', function (req, res) {
  res.render('flies', {msg:""});
});

app.get('/grapes', function (req, res) {
  res.render('grapes', {msg:""});
});

app.get('/mockingbird', function (req, res) {
  res.render('mockingbird', {msg:""});
});

app.get('/leaves', function (req, res) {
  res.render('leaves', {msg:""});
});

app.get('/sun', function (req, res) {
  res.render('sun', {msg:""});
});

app.get('/dune', function (req, res) {
  res.render('dune', {msg:""});
});

app.get('/home', function(req,res){
  res.render('home');
});



app.get('/registration', function (req, res) {
  res.render('registration',{errr:""});
});
app.post('/home', function(req,res){
var x = req.body.username;
var y = req.body.password;
var ee = fs.readFileSync("users.json")
var z = JSON.parse(ee);

var flag=false
for (var i = 0; i < z.length; i++) {
  if (z[i].username == x && z[i].password==y) {
    flag=true;
    break;
  }
}
  if(flag==true){
    res.render('home')
    Session["user"]=x
  }
  else {
  res.render('login',{e:"username or password is incorrect"})
}

})

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
    var m = { username: x, password: y , readlist: ""};
    z.push(m);
    z = JSON.stringify(z);
    fs.writeFileSync("users.json", z);
    
  }
  else{
    res.render('registration', {errr:"the username is already taken"});
  }
  
})

app.get('/searchresults', function (req, res) {
  res.render('searchresults',{f:""});
});

app.post('/search', function(req,res){
 var s = req.body.Search;
 var x=["Dune","To Kill a Mockingbird","Leaves of Grass","The Sun and Her Flowers","Lord of the Flies","The Grapes of Wrath"];
 var y= "";
 for(var i=0; i<x.length; i++){
   if(x[i].includes(s)){
     y=y+ x[i]+","
     
   }
 }
 if(y==""){
   res.render('searchresults', {f:"book not found"})
 }
 else{
 res.render('searchresults', {f:y})
 }

})
  
app.post('/addmockingbird', function(req,res){
  var x= Session["user"]
  var ee = fs.readFileSync("users.json")
  var z = JSON.parse(ee);
  for(var i =0; i<z.length; i++){
    if(z[i].username==x){
      var ko = z[i].readlist.split(",")
      var flag = false
      for (let j = 0; j < ko.length; j++) {
        if(ko[j]=="To Kill a Mockingbird"){
         flag = true
         break
        }
      }
      if(flag){
        res.render('mockingbird',{msg:"already in want to read list"})
      }
    z[i].readlist=z[i].readlist +"To Kill a Mockingbird" + "," 
    
    z = JSON.stringify(z);
 
    fs.writeFileSync("users.json",z)
    var p = JSON.parse(z)
    res.render('readlist', {l:p[i].readlist})
    break;
    }
  }
})

app.post('/addflies', function(req,res){
  var x= Session["user"]
  var ee = fs.readFileSync("users.json")
  var z = JSON.parse(ee);
  for(var i =0; i<z.length; i++){
    if(z[i].username==x){
      var ko = z[i].readlist.split(",")
      var flag = false
      for (let j = 0; j < ko.length; j++) {
        if(ko[j]=="Lord of the Flies"){
         flag = true
         break
        }
      }
      if(flag){
        res.render('flies',{msg:"already in want to read list"})
      }
    z[i].readlist=z[i].readlist +"Lord of the Flies" + "," 
    
    z = JSON.stringify(z);
 
    fs.writeFileSync("users.json",z)
    var p = JSON.parse(z)
    res.render('readlist', {l:p[i].readlist})
    break;
    }
  }
})

app.post('/adddunes', function(req,res){
  var x= Session["user"]
 var ee = fs.readFileSync("users.json")
 var z = JSON.parse(ee);
 for(var i =0; i<z.length; i++){
   if(z[i].username==x){
     var ko = z[i].readlist.split(",")
     var flag = false
     for (let j = 0; j < ko.length; j++) {
       if(ko[j]=="Dune"){
        flag = true
        break
       }
     }
     if(flag){
       res.render('dune',{msg:"already in want to read list"})
     }
   z[i].readlist=z[i].readlist +"Dune" + "," 
   
   z = JSON.stringify(z);

   fs.writeFileSync("users.json",z)
   var p = JSON.parse(z)
   res.render('readlist', {l:p[i].readlist})
   break;
   }
 }
})

app.post('/addsun', function(req,res){
  var x= Session["user"]
  var ee = fs.readFileSync("users.json")
  var z = JSON.parse(ee);
  for(var i =0; i<z.length; i++){
    if(z[i].username==x){
      var ko = z[i].readlist.split(",")
      var flag = false
      for (let j = 0; j < ko.length; j++) {
        if(ko[j]=="The Sun and Her Flowers"){
         flag = true
         break
        }
      }
      if(flag){
        res.render('sun',{msg:"already in want to read list"})
      }
    z[i].readlist=z[i].readlist +"The Sun and Her Flowers" + "," 
    
    z = JSON.stringify(z);
 
    fs.writeFileSync("users.json",z)
    var p = JSON.parse(z)
    res.render('readlist', {l:p[i].readlist})
    break;
    }
  }
  
})

app.post('/addgrapes', function(req,res){
  var x= Session["user"]
 var ee = fs.readFileSync("users.json")
 var z = JSON.parse(ee);
 for(var i =0; i<z.length; i++){
   if(z[i].username==x){
     var ko = z[i].readlist.split(",")
     var flag = false
     for (let j = 0; j < ko.length; j++) {
       if(ko[j]=="The Grapes of Wrath"){
        flag = true
        break
       }
     }
     if(flag){
       res.render('grapes',{msg:"already in want to read list"})
     }
   z[i].readlist=z[i].readlist +"The Grapes of Wrath" + "," 
   
   z = JSON.stringify(z);

   fs.writeFileSync("users.json",z)
   var p = JSON.parse(z)
   res.render('readlist', {l:p[i].readlist})
   break;
   }
 }
})

app.post('/addleaves', function(req,res){
  var x= Session["user"]
 var ee = fs.readFileSync("users.json")
 var z = JSON.parse(ee);
 for(var i =0; i<z.length; i++){
   if(z[i].username==x){
     var ko = z[i].readlist.split(",")
     var flag = false
     for (let j = 0; j < ko.length; j++) {
       if(ko[j]=="Leaves of Grass"){
        flag = true
        break
       }
     }
     if(flag){
       res.render('leaves',{msg:"already in want to read list"})
     }
   z[i].readlist=z[i].readlist +"Leaves of Grass" + "," 
   
   z = JSON.stringify(z);

   fs.writeFileSync("users.json",z)
   var p = JSON.parse(z)
   res.render('readlist', {l:p[i].readlist})
   break;
   }
 }
})

if(process.env.PORT){
  app.listen(process.env.PORT, function() {console.log('Server started')});
}
else{
  app.listen(3000, function() {console.log('Server started on port 3000')});
}