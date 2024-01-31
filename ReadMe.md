# ChatterUp Documentation

## Overview

ChatterUp is a real-time chat application built using Node.js, Express, Socket.io, and MongoDB. The application allows users to join chat rooms, send messages, and view real-time updates.

## Components

### 1. Server (`server.js`)

The server is implemented using Express, providing the backbone for the ChatterUp application. It handles user connections, message storage/retrieval, and real-time communication using Socket.io.

#### Dependencies

- **Express**: Web application framework for Node.js.
- **Socket.io**: Enables real-time, bidirectional communication between clients and server.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js. Used for connecting to MongoDB and defining models.
- **dotenv**: Loads environment variables from a `.env` file.

#### Implementation

- The server creates an Express app, sets up CORS, and establishes a Socket.io server.
- User connections, disconnections, and messages are handled using Socket.io events.
- A MongoDB connection is established using Mongoose.
- The `messageRepository` class is used to store and retrieve messages from MongoDB.

### 2. Client-Side (`index.html`)

The client-side HTML file serves as the interface for users. It uses Bootstrap for styling and includes Socket.io for real-time communication.

#### Dependencies

- **Bootstrap**: A popular CSS framework for building responsive and styled web pages.
- **Socket.io Client**: Enables Socket.io functionality on the client-side.

#### Features

- A user enters their name using a modal on joining the chat.
- Users can send and receive real-time messages.
- Notifications are displayed when users join or leave the chat.
- A typing indicator shows when someone is typing.

### 3. Message Repository (`messageRepository.js`)

The `messageRepository` class encapsulates the logic for storing and retrieving messages from MongoDB.

#### Dependencies

- **Mongoose**: Used to define and interact with the MongoDB model.
- **dotenv**: Loads environment variables from a `.env` file.

#### Methods

- `storeMessage(msg)`: Stores a new message in MongoDB.
- `retrieveMessages()`: Retrieves all stored messages from MongoDB.

## Usage

1. Install dependencies: `npm install`.
2. Create a `.env` file with the following variables:
   - `MONGO_URI`: MongoDB connection URL.
   - `PORT`: Port number for the server.
3. Start the server: `npm start`.
4. Open `index.html` in a web browser.

## Configuration

- The MongoDB connection URL and server port can be configured in the `.env` file.

## Enhancements

- Future improvements could include user authentication, private messaging, and additional styling.
