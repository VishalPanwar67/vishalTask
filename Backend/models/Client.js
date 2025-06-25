import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Client name is required"],
  },
  description: {
    type: String,
    required: [true, "Client description is required"],
  },
  designation: {
    type: String,
    required: [true, "Client designation is required"],
  },
  imageUrl: {
    type: String
  },
  cloudinary_name: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
},{
  timestamps: true,
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
