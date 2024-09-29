"use server";

import { connectToDB } from "@/lib/db";
import Email from "@/lib/schema/marketing.schema";

export async function saveEmail({
	title,
	content,
	newsLetterOwnerId,
}: {
	title: string;
	content: string;
	newsLetterOwnerId: string;
}) {
	try {
		await connectToDB();

		const email = await Email.findOne({
			title,
			newsLetterOwnerId,
		});

		if (email) {
			await Email.findByIdAndUpdate(email._id, {
				title,
				content,
			});
			return {
				success: true,
				message: "Email updated successfully",
			};
		} else {
			await Email.create({
				title,
				content,
				newsLetterOwnerId,
			});
			return {
				success: true,
				message: "Email created successfully",
			};
		}
	} catch (error) {
		console.log(error);
		return {
			success: false,
			message: "Error creating email",
		};
	}
}
