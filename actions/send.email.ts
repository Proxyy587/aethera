"use server";

import { connectToDB } from "@/lib/db";
import { getSubscriber } from "./get.subscriber";
import { Resend } from "resend";

interface SendEmailProps {
	ownerId: string;
	subject: string;
	body: string;
}

export async function sendEmail({ ownerId, subject, body }: SendEmailProps) {
	try {
		await connectToDB();

		const subscribers = await getSubscriber({ newsLetterOwnerId: ownerId });

		if (!subscribers || subscribers.length === 0) {
			return {
				success: false,
				message: "No subscribers found",
			};
		}

		const allEmails = subscribers.map((subscriber) => subscriber.email);

		const resend = new Resend(process.env.RESEND_API_KEY);

		const batchSize = 50;
		const totalEmails = allEmails.length;
		let successCount = 0;
		let errorCount = 0;

		for (let i = 0; i < totalEmails; i += batchSize) {
			const batch = allEmails.slice(i, i + batchSize);
			try {
				const results = await Promise.allSettled(
					batch.map(mail =>
						resend.emails.send({
							from: "newsletter@cyprostudio.com",
							to: mail,
							subject: subject,
							html: body,
						})
					)
				);
				
				successCount += results.filter(result => result.status === 'fulfilled').length;
				errorCount += results.filter(result => result.status === 'rejected').length;
			} catch (error) {
				console.error(`Error sending batch of emails:`, error);
				errorCount += batch.length;
			}
			
			await new Promise(resolve => setTimeout(resolve, 1000));
		}

		if (errorCount > 0) {
			console.error(`Failed to send ${errorCount} out of ${totalEmails} emails`);
			return {
				success: false,
				message: `Failed to send ${errorCount} out of ${totalEmails} emails`,
			};
		}

		return {
			success: true,
			message: `Email sent to ${successCount} subscribers`,
		};
	} catch (error) {
		console.error("Error sending email:", error);
		return {
			success: false,
			message: "An unexpected error occurred",
		};
	}
}
