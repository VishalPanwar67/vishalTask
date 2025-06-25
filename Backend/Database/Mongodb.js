import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vishal4panwar:JaKfKtlF62Rzqa15@cluster0.tdp40.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Database connection error:", err.message);
  }
};

export default connectDB;
