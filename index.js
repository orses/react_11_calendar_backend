const cors = require('cors');
require('dotenv').config();
const { request } = require('express');
const express = require('express');
const helmet = require('helmet');
const { dbConnection } = require('./database/config');

// Mounting the server
const app = express();
app.use(helmet()); // don't disclose technologies used

// Database
try {
  dbConnection();
} catch (error) {
  console.log('No hay acceso a los eventos');
}

// CORS
const corsOptions = {
  origin: process.env.TRUSTED_WEBSITE || process.env.TRUSTED_DEV_WEBSITE,
};
app.use(cors(corsOptions));

// Sending data
app.use(express.static('public'));

// lectura y parse del body
app.use(express.json());

// Routing
app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/events', require('./routes/eventsRoute'));

// The server is now working, so listening requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `🚀 Server listening at http://${process.env.TRUSTED_WEBSITE}:${PORT}`
  );
});
