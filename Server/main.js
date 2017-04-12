const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const net = require('net');

var id = 0;
var register = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.send("test");
});

app.post('/register', (req, res) => {
  register[id] = req.body.hash;


  res.send(id);
  id++;
});

var server = net.createServer(function(connection) {
   console.log('client connected');
   console.log(connection);

   connection.on('end', function() {
      console.log('client disconnected');
   });

   /*var data = {
     hash: genHash(),

   };*/
   connection.write('\r\n');
   connection.pipe(connection);
});

server.listen(3020, function() {
   console.log('server is listening');
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Server started on ' + (process.env.PORT || 3000));
});
