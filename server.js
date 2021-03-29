
// require
const http = require("http");
const express = require("express");
const socket = require("socket.io");

// init variable
const app = express();
const server = http.createServer(app);
const io = socket(server);

const port = process.env.PORT || 80;

// response path
app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("home");
});

// socket event
io.on("connection", socket => {
    socket.on("online", data => {
        console.log("online event: " + data);
    });

    socket.on("last connection", data => {
        console.log("last connection: " + data);
    });

    socket.on("disconnect", () => {
        socket.broadcast.emit("connection_count_change", io.engine.clientsCount);
        socket.emit("connection_count_change", io.engine.clientsCount);
        console.log("offline event");
    });
    socket.broadcast.emit("connection_count_change", io.engine.clientsCount);
    socket.emit("connection_count_change", io.engine.clientsCount);
    console.log("connection event");
});

// start the server
server.listen(port, err => {
    if(err) throw err;
    console.log("Server running port: " + port);
});
// server.listen(port, () => console.log("server is running on port 80"));