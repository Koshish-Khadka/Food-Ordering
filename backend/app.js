import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/Database.js";
import authRoute from "./routes/auth/authRoute.js";
import productRoute from "./routes/admin/productRoute.js";
import adminUsersRoute from "./routes/admin/adminUsersRoute.js";
import userReviewRoute from "./routes/user/userReviewRoute.js";
const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config({ quiet: true });

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads")); //make uploads folder excessable
// api create

// api.use("/api/users", userRoutes);
app.use("/api", authRoute);
app.use("/api", productRoute);
app.use("/api", adminUsersRoute);
app.use("/api", userReviewRoute);

// app.get("/", (req, res) => {
//   res.send("Hello Koshish don !");
// });

// Server listening
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at port http://localhost:${PORT}`);
});
