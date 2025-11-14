import mongoose from "mongoose";
import { Seedadmin } from "./SeedAdmin.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb connected Successfully");

    // Seed the admin data
    Seedadmin();

  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
