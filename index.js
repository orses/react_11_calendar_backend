const express = require('express');
require('dotenv').config();

// Mounting the server
const app = express();
app.disable('x-powered-by'); // don't disclose technologies used
const PORT = process.env.SERVER_PORT || 8080;
app.use(express.static('public'));

// lectura y parse del body
app.use(express.json());

// Routing
app.use('/api/auth', require('./routes/authRoute'));

// The server is now working, so listening requests
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
