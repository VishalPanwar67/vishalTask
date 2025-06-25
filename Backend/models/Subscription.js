import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
},{
  timestamps: true,
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
