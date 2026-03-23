import { connect } from "mongoose";
import { config } from "../../config/config";

const mongoDb = config.mongo.url;

const connectDB = async () => {
  try {
    await connect(mongoDb);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;