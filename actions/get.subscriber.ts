"use server";

import { connectToDB } from "@/lib/db";
import Subscriber from "@/lib/schema/subscriber.schema";

export const getSubscriber = async ({
	newsLetterOwnerId,
}: {
	newsLetterOwnerId: string;
}) => {
	try {
		await connectToDB();

		const subscribers = await Subscriber.find({
			newsLetterOwnerId,
		});
		return subscribers;
	} catch (error) {
		console.log(error);
	}
};
