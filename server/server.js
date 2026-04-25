const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = require("./users");

app.use(express.static(path.join(__dirname, "../client")));

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (username) => {
        users.addUser(socket.id, username);
        io.emit("userList", users.getUsers());
        io.emit("message", {
            user: "System",
            text: `${username} joined the chat`
        });
    });

    socket.on("sendMessage", (msg) => {
        const user = users.getUser(socket.id);
        if (user) {
            io.emit("message", {
                user: user.username,
                text: msg
            });
        }
    });

    socket.on("disconnect", () => {
        const user = users.removeUser(socket.id);
        if (user) {
            io.emit("message", {
                user: "System",
                text: `${user.username} left the chat`
            });
            io.emit("userList", users.getUsers());
        }
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});