import mongoose from "mongoose";
const { Schema } = mongoose;

const subscriberSchema = new Schema(
  {
    name: {
      type: String,  // Added Name field
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    newsLetterOwnerId: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      default: "aethera website",
    },
    status: {
      type: String,
      default: "subscribed",
    },
  },
  { timestamps: true }
);

const Subscriber = mongoose.models.Subscribers || mongoose.model("Subscribers", subscriberSchema);

export default Subscriber;
