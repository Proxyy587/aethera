import mongoose from "mongoose";

const { Schema } = mongoose;

const campaignSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		editorType: {
			type: String,
			enum: ['visual', 'unlayer', 'html'],
			required: true,
		},
		newsLetterOwnerId: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const Campaign = mongoose.models.Campaigns || mongoose.model("Campaigns", campaignSchema);
export default Campaign;
