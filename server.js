import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import messageRepository from './DataBase/repository.js';
import { connectToDB } from './mongoDB.js';
import 'dotenv/config'
import path from 'path';

const app = express();



// Enable CORS for all routes
app.use(cors());



const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/')));
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '/') });
});

const server = http.createServer(app);
// Create a socket server.
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

const MessageRepository = new messageRepository();


//To count users connected
let userOnline = 0;


// Set up a connection event for Socket.io
io.on('connection',async (socket) => {

    // Emit a user join event to notify all clients when a user joins
    socket.on('user join', async (userName) => {
        userOnline += 1;
        io.emit('users online', userOnline);
        console.log(`${userName} joined the chat`);
        socket.userName = userName;

        // Retrieve messages from MongoDB and emit to the user who just joined
        const storedMessages = await MessageRepository.retrieveMessages();
        socket.emit('stored messages', storedMessages);

        io.emit('user join', userName);
    });
    
    // Handle custom events when a message is received
    socket.on('chat message', async (msg) => {
        console.log('message:', msg);
        
        // Store the chat message in MongoDB
        await MessageRepository.storeMessage(msg);
        
        io.emit('chat message', msg); // Broadcast the message to all connected clients
        
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        // Emit a user leave event to notify all clients when a user leaves
        if(userOnline > 0){
            userOnline -= 1;
        }
        io.emit('users online', userOnline);
        const userName = socket.userName || 'Unknown User';
        if (userName) {
            console.log(`${userName} left the chat`);
            io.emit('user leave', userName);
        }
        console.log('User disconnected');
    });

     // Listen for 'typing' event
     socket.on('typing', ({ userName }) => {
        io.emit('typing', { userName });
    });

    // Listen for 'stop typing' event
    socket.on('stop typing', ({ userName }) => {
        io.emit('stop typing', { userName });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
console.log()
server.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectToDB();
});
