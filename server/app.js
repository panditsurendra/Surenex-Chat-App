const express = require('express'); // it returns a function or method
const app = express(); // calling the method/fun and it will return an object
// now app is an object of express which has many methods and properties
const cors = require("cors");

const authRouter = require('./controller/authController'); 
const userRouter = require('./controller/userController'); 
const chatRouter = require('./controller/chatController');
const messageRouter = require('./controller/messageController');

app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: '30mb' }));


const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        // origin: '*', // Allow all origins
         origin: 'http://localhost:3000', // Allow specific origin
        methods: ['GET', 'POST'], // Allow specific HTTP methods
    },
});


app.use('/api/auth', authRouter); 
app.use('/api/user', userRouter); 
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);

const onlineUser = []; // to keep track of online users

// for express configurations
// module.exports = app; // exporting the app object so that it can be used in other files

// TEST SOCKET CONNECTION FROM CLIENT
io.on('connection', (socket) => {
    socket.on('join-room', (userId)=>{
        socket.join(userId);
        // console.log(`User with ID ${userId} joined the room`);
    });
    socket.on('send-message', (message) => {
        // console.log('Message received:', message);
        io
        .to(message.members[0])
        .to(message.members[1])
        .emit('receive-message', message)

        io
        .to(message.members[0])
        .to(message.members[1])
        .emit('set-message-count', message)
    })

    socket.on('clear-unread-messages', data => {
        io
        .to(data.members[0])
        .to(data.members[1])
        .emit('message-count-cleared', data)
    })

     socket.on('user-typing', (data) => {
        io
        .to(data.members[0])
        .to(data.members[1])
        .emit('started-typing', data)
    })

    // socket.on('user-login', userId => { // this logic has a bug when user logs in again
    //     if(!onlineUser.includes(userId)){
    //         onlineUser.push(userId)
    //     }
    //     socket.emit('online-users', onlineUser);
    // })

    socket.on('user-login', userId => {
        if (!onlineUser.includes(userId)) {
            onlineUser.push(userId);
        }
        io.emit('online-users-updated', onlineUser); // <-- This must run here
    });


    socket.on('user-offline', userId => {
        onlineUser.splice(onlineUser.indexOf(userId), 1);
        io.emit('online-users-updated', onlineUser);
    })
    
});


// for socket.io configurations
module.exports = server;

