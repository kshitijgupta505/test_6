const express = require('express');

// app.use(express.static('public')); //cheak
var PORT;
var Cloudant = require('@cloudant/cloudant');
var app = express();

if (process.env.PORT) {
  PORT = process.env.PORT;
} else {
  PORT = 8000;
}
var Cloudant = require('@cloudant/cloudant');
var url = "https://apikey-v2-hwgelvh4xtrijtqerxlgg7odppa0ujpo92pne7phy5r:fbd2d3f81e9fcdac4aa086dfd66dbdc7@f446d07d-a9bb-48d4-a164-03a29a05a628-bluemix.cloudantnosqldb.appdomain.cloud";
var username = "apikey-v2-hwgelvh4xtrijtqerxlgg7odppa0ujpo92pne7phy5r";
var password = "fbd2d3f81e9fcdac4aa086dfd66dbdc7";

const bodyParser = require('body-parser');
//const cors = require('cors');
//app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public')); //cheak
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
////////////
app.post('/insert', (req, res) => {

  const { name, email, phone, city, country, pincode, database } = req.body;
  
  const data = {
      name: name,
      email: email,
      phone: phone,
      city: city,
      country: country,
      pincode: pincode
  };
///////
Cloudant({ url: url, username: username, password: password }, function(err, cloudant, pong) {
  if (err) {
    return console.log('Failed to initialize Cloudant: ' + err.message);
  }
console.log(pong); // {"couchdb":"Welcome","version": ..

cloudant.use(database).insert({ "name": name, "email": email , "phone": phone, "city": city , "country": country , "pincode": pincode } , (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data); // { ok: true, id: 'rabbit', ...
      }
    });
});

});


app.listen(PORT);
//console.log(message.getPortMessage() + PORT);



