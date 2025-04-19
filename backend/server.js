const express = require('express');
const connectDB = require('./db/db'); // Import DB connection
require('dotenv').config(); // Load .env variables

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(express.json())

// Basic /ping route
app.get('/ping', (req, res) => {
  res.send('Pong');
});

const userAPI = require('./Router/userAPI')
app.use('/',userAPI);

const savedPostAPI = require('./Router/savedPostAPI'); // adjust path
app.use('/api/saved-posts', savedPostAPI);

const reportAPI = require('./Router/reportAPI'); // adjust path
app.use('/api/reports', reportAPI);

const postAPI = require('./Router/postAPI'); // Adjust if needed
app.use('/api/posts', postAPI);

const notificationAPI = require('./Router/notificationAPI'); // Adjust the path
app.use('/api/notifications', notificationAPI);

const messageAPI = require('./Router/messageAPI'); // adjust path
app.use('/api/messages', messageAPI);

const friendRequestAPI = require('./Router/friendRequestAPI'); // adjust as needed
app.use('/api/friend-requests', friendRequestAPI);

const commentAPI = require('./Router/commentAPI'); // update path if needed
app.use('/api/comments', commentAPI);

const chatAPI = require('./Router/chatAPI'); // update the path if needed
app.use('/api/chats', chatAPI);

const activityLogAPI = require('./Router/activityLogAPI'); // update path if needed
app.use('/api/activitylogs', activityLogAPI);


// Start server

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});