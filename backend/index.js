const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bookRoutes = require("./src/Book/book.router");
const cors = require("cors")
const userRoutes = require("./src/User/user.router");

// CORS configuration - More secure for credentials
app.use(cors({
  origin: 'https://book-store-rouge-nine.vercel.app', // Allow only the deployed frontend origin
  credentials: true, // Allow credentials (cookies, auth headers)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

//middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use("/api/books", bookRoutes);
app.use("/api/auth", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

async function connectWithRetry() {
  const maxRetries = 5;
  let currentTry = 1;

  while (currentTry <= maxRetries) {
    try {
      console.log(`Connecting to MongoDB Atlas... Attempt ${currentTry}/${maxRetries}`);
      
      await mongoose.connect(process.env.DB_URL, {
        serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds
        connectTimeoutMS: 10000, // Timeout after 10 seconds
        heartbeatFrequencyMS: 5000, // Check connection every 5 seconds
      });

      console.log("MongoDB Atlas connection successful!");
      return true;
    } catch (err) {
      console.error(`Database connection attempt ${currentTry} failed:`, {
        message: err.message,
        stack: err.stack
      });

      if (currentTry === maxRetries) {
        console.error("Max retries reached. Exiting...");
        process.exit(1);
      }

      // Wait for 5 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
      currentTry++;
    }
  }
}

// Handle process errors
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

const port = process.env.PORT || 3000;

// Start server only after successful database connection
connectWithRetry()
  .then(() => {
    app.listen(port, '0.0.0.0', () => {
      console.log(`Server listening on port ${port}`);
      console.log(`Server URL: http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
