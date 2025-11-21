import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    await mongoose.connect(uri);
    console.log("Connected to MongoDB / CosmosDB");
  } catch (err) {
    console.error("DB connection error:", err.message);
    process.exit(1);
  }
};
