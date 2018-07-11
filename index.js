//web configurations
var express = require('express')
var http = require('http');

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}
var port = normalizePort(process.env.PORT || '80');

//run website
var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/src/main.html');
});
app.get('/gum', function (req, res) {
    res.sendFile(__dirname + '/src/gum.html');
});

app.use(express.static(__dirname + '/src'));
const server = http.createServer(app);
server.listen(port, function listening() {
    console.log('Listening on %d', server.address().port);
});
  