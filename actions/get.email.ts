"use server";

import { connectToDB } from "@/lib/db";
import Campaign from "@/lib/schema/marketing.schema";


export const GetEmailDetails = async ({
	title,
	newsLetterOwnerId,
}: {
	title: string;
	newsLetterOwnerId: string;
}) => {
	try {
		await connectToDB();
		const email = await Campaign.findOne({
			title,
			newsLetterOwnerId,
		});
		return email;
	} catch (error) {
		console.log(error);
	}
};
