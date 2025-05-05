Steps to Set Up the Project

1. Create Project Structure
   Start by creating the following folder structure:

ba
/project-root
├── /backend
├── /frontend
Frontend Setup
Navigate to the frontend directory:

cd frontend
Install React using Vite:

npm create vite@latest . --template react
Install dependencies:

npm install
Start the development server:
npm run dev
Backend Setup
Navigate to the backend directory:

cd ../backend
Initialize a Node.js project:

npm init -y
Install necessary packages:

npm install express mongoose jsonwebtoken dotenv nodemon cors
Create a .env file in the backend directory and add your MongoDB connection string:
ini
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Set up Mongoose and connect to MongoDB:
js
Copy
Edit
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
try {
await mongoose.connect(process.env.MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
});
console.log("MongoDB connected successfully!");
} catch (error) {
console.error("MongoDB connection failed:", error);
process.exit(1);
}
};

export default connectDB;
Start the backend server:

npm run dev
Final Steps
Ensure both the frontend (npm run dev) and backend (npm run dev) are running.
Your API will be accessible at http://localhost:5001 (if using Express).
Your frontend will be accessible at http://localhost:5173 (default Vite port).
You're now ready to build your app! 🚀
