// import socket
const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let users = [];

// add user
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

// remove user
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

// get user
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

// socket
io.on("connection", (socket) => {
    // when user connect
    console.log("A User Connected!");

    // take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        // send users after add
        io.emit("getUsers", users)
    });

    // send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const receiver = getUser(receiverId);
        io.to(receiver.socketId).emit("getMessage", {
            senderId,
            text
        });
    });

    // remove user
    socket.on("disconnect", () => {
        console.log("A User Disconnected!");
        removeUser(socket.id);
        // send users after remove
        io.emit("getUsers", users)
    });
});