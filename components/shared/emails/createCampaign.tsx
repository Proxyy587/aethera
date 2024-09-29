"use client";

import React, { useState } from "react";
import { Trash2, Edit3, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Modal from "@/components/widgets/modal";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const emails = [
	{ id: 1, title: "Welcome Newsletter" },
	{ id: 2, title: "Monthly Update" },
	{ id: 3, title: "Product Launch" },
	{ id: 4, title: "Holiday Special" },
];

export default function CreateCampaign() {
	const [emailTitle, setEmailTitle] = useState("");
	const [open, setOpen] = useState(false);

	const loading = false;
	const router = useRouter();
	const [campaignName, setCampaignName] = useState("");
	// FIXME: later
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

	return (
		<div className="container mx-auto py-8">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Campaign</h1>
				<Modal
					title="Create a new campaign"
					description="Add your customers and create a marketing campaign"
					trigger={
						<Button className="rounded-full" size={"sm"} variant={"outline"}>
							<Plus className="mr-2 h-4 w-4" /> Add Campaign
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
			</div>
			<Separator className="my-4" />

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{emails.map((email) => (
					<Card key={email.id} className="relative group">
						<CardContent className="flex h-[200px] flex-col items-center justify-center">
							<Link
								href={`/dashboard/new-email?subject=${email.title.replace(
									/\s+/g,
									"-"
								)}`}
								className="text-xl font-medium"
							>
								{email.title}
							</Link>
							<div className="absolute right-2 top-2 flex space-x-2 opacity-0 transition-opacity group-hover:opacity-100">
								<Button variant="ghost" size="icon">
									<Edit3 className="h-4 w-4" />
								</Button>
								<Button variant="ghost" size="icon">
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
