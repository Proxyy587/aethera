"use server";

import { connectToDB } from "@/lib/db";
import Campaign from "@/lib/schema/marketing.schema";

export async function saveCampaign({
	id,
	title,
	content,
	editorType,
	newsLetterOwnerId,
}: {
	id?: string | null;
	title: string;
	content: string;
	editorType: string;
	newsLetterOwnerId: string;
}) {
	try {
		await connectToDB();

		if (id) {
			await Campaign.findByIdAndUpdate(id, {
				title,
				content,
				editorType,
			});
			return {
				success: true,
				message: "Campaign updated successfully",
				id,
			};
		} else {
			const newCampaign = await Campaign.create({
				title,
				content,
				editorType,
				newsLetterOwnerId,
			});
			return {
				success: true,
				message: "Campaign created successfully",
				id: newCampaign._id,
			};
		}
	} catch (error) {
		console.log(error);
		return {
			success: false,
			message: "Error saving campaign",
		};
	}
}

export async function getCampaigns(newsLetterOwnerId: string) {
	try {
		await connectToDB();
		const campaigns = await Campaign.find({ newsLetterOwnerId }).sort({ createdAt: -1 });
		return campaigns;
	} catch (error) {
		console.log(error);
		return [];
	}
}

export async function getCampaign(id: string) {
	try {
		await connectToDB();
		const campaign = await Campaign.findById(id);
		if (campaign) {
			return {
				id: campaign._id.toString(),
				title: campaign.title,
				content: campaign.content,
				editorType: campaign.editorType,
				newsLetterOwnerId: campaign.newsLetterOwnerId,
				createdAt: campaign.createdAt.toISOString(),
				updatedAt: campaign.updatedAt.toISOString(),
			};
		}
		return null;
	} catch (error) {
		console.log(error);
		return null;
	}
}
