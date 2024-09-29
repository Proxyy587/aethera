"use server";

import { connectToDB } from "@/lib/db";
import { Campaign } from "@/lib/model";

export const deleteEmail = async ({ emailId }: { emailId: string }) => {
	try {
		await connectToDB();
		await Campaign.findByIdAndDelete(emailId);
		return { message: "Email deleted successfully!" };
	} catch (error) {
		return { error: "An error occurred while saving the email." };
	}
};
