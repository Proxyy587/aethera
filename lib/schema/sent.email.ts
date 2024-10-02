import mongoose from "mongoose";

const sentEmailSchema = new mongoose.Schema({
  ownerId: { type: String, required: true },
  subject: { type: String, required: true },
  sentTo: { type: Number, required: true },
  sentDate: { type: Date, default: Date.now },
  status: { type: Boolean, required: true },
});

export const SentEmail = mongoose.models.SentEmail || mongoose.model("SentEmail", sentEmailSchema);
