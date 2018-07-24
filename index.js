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

app.get('/experiment', function (req, res) {
    res.sendFile(__dirname + '/src/nets.html');
});

app.get('/customvision', function (req, res) {
    res.sendFile(__dirname + '/src/images/custom-vision/temp.png');
});

app.use(express.static(__dirname + '/src'));
const server = http.createServer(app);
server.listen(port, function listening() {
    console.log('Listening on %d', server.address().port);
});

//web socket is initiated so that the browser can update the data without refreshing the entire page
//init websocket
var WebSocketServer = require('websocket').server;
var wsServer = new WebSocketServer({
    httpServer: server
});
// WebSocket server
var ws;
wsServer.on('request', function (request) {
    ws = request.accept(null, request.origin);
    console.log('Websocket established on port %d', server.address().port);
    // This is the most important callback for us, we'll handle
    // all messages from users here.
    ws.on('message', function (message) {
        //when the server receives a message or change in web configuration
        var msg = message.utf8Data;
        if (msg[0] == '{') {
            //receives the data in utf-8 format and convert it into JSON format
            var data = JSON.parse(msg);
            //querry the JSON data
            var imageData = data.imageData;
            // console.log(imageData);
            var base64Data = imageData.replace(/^data:image\/png;base64,/, "");
            require("fs").writeFile(__dirname + "/src/images/custom-vision/temp.png", base64Data, 'base64', function (err) {
                console.log(err);
            });
        }
    });
    ws.on('close', function (ws) {});
});