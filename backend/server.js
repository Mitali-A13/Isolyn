const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middlewares/errorHandler");
const AppError = require("./src/utils/AppError");

const cors = require("cors");

console.log("SERVER FILE LOADED");


dotenv.config();

console.log("ENV LOADED");
console.log("MongoURI:", process.env.MONGODB_URI ? "OK" : "NOT FOUND");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://isolyn-frontend.vercel.app",
    ],
    credentials: true,
  })
);

// DB
console.log("Connecting to DB...");
connectDB();
console.log("After connectDB call");

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/developer", require("./src/routes/developer.routes"));
app.use("/api/data", require("./src/routes/data.routes"));

// Handle unknown routes (404) 
app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Global error handler 
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
