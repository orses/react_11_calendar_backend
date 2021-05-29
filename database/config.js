const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('[DB] Successful connection');
  } catch (error) {
    throw new Error('[DB] Database initialization failed');
  }
};

module.exports = { dbConnection };
