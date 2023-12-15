

const Port = 8081

/////////////////////////////////////



console.log("Starting Server On Port: "+Port)

const WebS = require("ws")
const wss = new WebS.Server({port:Port})



wss.on("connection", function connection(ws, req) {
    console.log("New Connection From: " + req.socket.remoteAddress)
    ws.on("message",msg=>{
        console.log("New Message: " + msg.toString())
        wss.broadcast(msg.toString())
    })
});

wss.broadcast = function broadcast(msg){
    wss.clients.forEach(function each(client) {
        client.send(msg)
    });
};