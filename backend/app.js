import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/Database.js";
import authRoute from "./routes/auth/authRoute.js";
import productRoute from "./routes/admin/productRoute.js";
import adminUsersRoute from "./routes/admin/adminUsersRoute.js";
import userReviewRoute from "./routes/user/userReviewRoute.js";
import profileRoute from "./routes/user/profileRoute.js";
import cartRoute from "./routes/user/cartRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config({ quiet: true });

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads")); //make uploads folder excessable
// api create

// api.use("/api/users", userRoutes);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/admin", adminUsersRoute);
app.use("/api/reviews", userReviewRoute);
app.use("/api/profile", profileRoute);
app.use("/api/cart", cartRoute);

// app.get("/", (req, res) => {
//   res.send("Hello Koshish don !");
// });

// Server listening
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at port http://localhost:${PORT}`);
});
