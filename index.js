

const Port = process.env.PORT

/////////////////////////////////////



console.log("Starting Server On Port: " + Port)

const server = require("http").createServer()

const WebS = require("ws")
const wss = new WebS.Server({ server: server })

const app = require("express")()

app.get("/", (req, res) => {
  console.log(__dirname)
  res.sendFile(__dirname + "/index.html")
})
app.get("/flabbergasted.png", (req, res) => {
  res.sendFile(__dirname + "/flabbergasted.png")
})
app.get("/flabbergasted.gif", (req, res) => {
  res.sendFile(__dirname + "/flabbergasted.gif")
})

server.on("request", app)

wss.on("connection", function connection(ws, req) {

  console.log("New Connection From: " + req.socket.remoteAddress)

  ws.on("message", msg => {
    if (msg.toString() === "ping") { ws.send("pong"); return }
    console.log("New Message: " + msg.toString())
    wss.broadcast(msg.toString())
  })
});

wss.broadcast = function broadcast(msg) {
  wss.clients.forEach(function each(client) {
    client.send(msg)
  });
};

server.listen(Port, "0.0.0.0")
