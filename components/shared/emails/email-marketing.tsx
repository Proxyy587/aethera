"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Plus } from "lucide-react";
import Modal from "@/components/widgets/modal";
import FormGenerator from "@/components/forms/form-generator";
import { Icons } from "@/components/ui/icons";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import EmailOverviewCard from "@/components/cards/email-overview-card";
import SubscribersChart from "@/components/cards/subscriber-chart";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

type Props = {
	campaign?: {
		name: string;
		id: string;
		customers: string[];
		createdAt: Date;
	}[];
	subscription?: {
		plan: "STANDARD" | "PRO" | "ULTIMATE";
		credits: number;
	} | null;
};

export default function EmailMarketing({ campaign, subscription }: Props) {
	const isSelected = ["customer1@example.com", "customer2@example.com"];
	const loading = false;
	const router = useRouter();
	const [campaignName, setCampaignName] = useState("");
	// FIXME: later
	const { isSignedIn, user, isLoaded } = useUser();
	const [copied, setCopied] = useState(false);

	const onCreateCampaign = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Creating campaign");
		if (campaignName.length <= 2) {
			toast({
				title: "Error",
				description: "Campaign name cant be less than 2 characters",
			});
			return;
		}

		const formattedTitle = campaignName.replace(/\s+/g, "-").replace(/&/g, "-");
		router.push(`/dashboard/editor?subject=${formattedTitle}`);
	};

	const handleCopyClick = () => {
		const smallText = document.querySelector(".copy-text") as HTMLElement;
		if (smallText) {
			const textToCopy = smallText.innerText;
			navigator.clipboard.writeText(textToCopy).then(() => {
				setCopied(true);
				toast({
					title: "Copied",
					description: "Copied to clipboard",
				});
				setTimeout(() => {
					setCopied(false);
				}, 2000);
			});
		}
	};

	const onAddCustomersToCampaign = () => {
		// Logic to add customers to campaign
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<header className="mb-4 space-y-1">
				<h1 className="text-3xl font-bold">
					Hello,{" "}
					<span className="text-primary">
						{isSignedIn ? user.fullName : "Guest"}!
					</span>
				</h1>
				<p className="text-muted-foreground text-sm">
					Here's your Email Dashboard overview.
				</p>
			</header>
			<Separator className="mb-6" />
			<main className="space-y-8">
				<section className="flex flex-wrap gap-4">
					<Modal
						title="Create a new campaign"
						description="Add your customers and create a marketing campaign"
						trigger={
							<Button>
								<Plus className="mr-2 h-4 w-4" /> Create Campaign
							</Button>
						}
					>
						<form className="space-y-4" onSubmit={onCreateCampaign}>
							<Input
								type="text"
								placeholder="Campaign Name"
								value={campaignName}
								onChange={(e) => setCampaignName(e.target.value)}
							/>
							<Button className="w-full" disabled={loading} type="submit">
								{loading ? (
									<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
								) : (
									"Create Campaign"
								)}
							</Button>
						</form>
					</Modal>
					<Button
						disabled={isSelected.length == 0}
						onClick={onAddCustomersToCampaign}
						variant="outline"
					>
						<Plus className="mr-2 h-4 w-4" /> Add to campaign
					</Button>
				</section>
				<div className="grid gap-8 md:grid-cols-3">
					<Card className="md:col-span-2">
						<CardHeader>
							<CardTitle>Dashboard Overview</CardTitle>
						</CardHeader>
						<CardContent>
							<EmailOverviewCard />
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Resources</CardTitle>
						</CardHeader>
						<CardContent>
							<h4 className="font-medium mb-2">Home page</h4>
							<div
								className="flex items-center justify-between p-2 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
								onClick={handleCopyClick}
							>
								<small className="text-sm truncate copy-text mr-2">
									{`${process.env.NEXT_PUBLIC_WEBSITE_URL}/subscribe?username=${user?.username}`.slice(
										0,
										32
									) + "..."}
								</small>
								<Button variant="outline" size="icon">
									<Copy className="h-4 w-4" />
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>

				<SubscribersChart />
			</main>
		</div>
	);
}
