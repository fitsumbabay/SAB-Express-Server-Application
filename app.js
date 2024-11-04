
import express from "express";
import path from "path"; 
import { fileURLToPath } from "url"; 
import userRoutes from "./routes/userRoutes.js"; 
import postRoutes from "./routes/postRoutes.js"; 
import commentRoutes from "./routes/commentRoutes.js"; 
import loggingMiddleware from "./middleware/loggerMiddleware.js"; 
import responseTimeMiddleware from "./middleware/responseTimeMiddleware.js"; 
import errorHandler from "./errorHandler/errorHandler.js"; 


const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// API Routes
app.use("/users", userRoutes);
app.use("/post", postRoutes);
app.use("/comments", commentRoutes);

// Use custom middleware
app.use(loggingMiddleware);
app.use(responseTimeMiddleware);


//Render the main HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});


// Simulated error route
app.get("/error", (req, res, next) => {
  const error = new Error("This is a simulated error!");
  next(error); // Pass the error to the next middleware
});

app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});







