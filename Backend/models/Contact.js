import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"]
  },
  mobile: {
    type: String,
    required: [true, "Mobile number is required"]
  },
  city: {
    type: String,
    required: [true, "City is required"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
},{
  timestamps: true,
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
