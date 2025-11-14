import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/Database.js";
import userRoutes from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config({ quiet: true });

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api create

// api.use("/api/users", userRoutes);
app.use("/api/users", userRoutes);
app.use("/api/product", productRoute);

// app.get("/", (req, res) => {
//   res.send("Hello Koshish don !");
// });

// Server listening
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at port http://localhost:${PORT}`);
});
