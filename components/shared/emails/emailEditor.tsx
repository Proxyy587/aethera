"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { EditorRef, EmailEditorProps } from "react-email-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Save, Send } from "lucide-react";
import { saveCampaign, getCampaign } from "@/actions/save.email";
import { DefaultJsonData } from "@/constants";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";

// Dynamic import to improve performance
const CustomEditor = dynamic(() => import("./customEditor/customEditor"), {
	loading: () => <Spinner />,
	ssr: false,
});

const EmailEditor = dynamic(() => import("react-email-editor"), {
	loading: () => <Spinner />,
	ssr: false,
});

import { toast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";
import { Spinner } from "@/components/loader/loading";
import { sendEmail } from "@/actions/send.email";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

const Emaileditor = () => {
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [sending, setSending] = useState(false);
	const [jsonData, setJsonData] = useState<any>(DefaultJsonData);
	const [htmlContent, setHtmlContent] = useState("");
	const [subject, setSubject] = useState("");
	const { user } = useClerk();
	const emailEditorRef = useRef<EditorRef | null>(null);
	const router = useRouter();
	const [editorType, setEditorType] = useState<string>("visual");
	const [campaignId, setCampaignId] = useState<string | null>(null);
	const { theme } = useTheme();
	const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
	const [subscriberCount, setSubscriberCount] = useState(0);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const editorParam = params.get("editor");
		const subjectParam = params.get("subject");
		const idParam = params.get("id");

		if (editorParam) setEditorType(editorParam);
		if (subjectParam) setSubject(decodeURIComponent(subjectParam));
		if (idParam) setCampaignId(idParam);

		const loadCampaignData = async () => {
			if (idParam) {
				const campaign = await getCampaign(idParam);
				if (campaign) {
					setSubject(campaign.title);
					if (campaign.editorType === "unlayer") {
						setJsonData(JSON.parse(campaign.content));
					} else {
						setHtmlContent(campaign.content);
					}
				}
			}
			setLoading(false);
		};

		loadCampaignData();
		// TODO: Fetch subscriber count and set it
		setSubscriberCount(1000); // Placeholder value
	}, []);

	const onReady: EmailEditorProps["onReady"] = (unlayer) => {
		emailEditorRef.current = { editor: unlayer };
		if (unlayer && jsonData) {
			unlayer.loadDesign(jsonData);
		}
	};

	const exportHtml = () => {
		const unlayer = emailEditorRef.current?.editor;
		if (unlayer) {
			unlayer.exportHtml((data) => {
				const { design, html } = data;
				setJsonData(design);
				setHtmlContent(html);
			});
		} else {
			console.error("Unlayer editor not initialized");
		}
	};

	const saveDraft = async () => {
		let content = "";
		setSaving(true);
		try {
			if (editorType === "unlayer") {
				const unlayer = emailEditorRef.current?.editor;
				if (unlayer) {
					await new Promise<void>((resolve) => {
						unlayer.exportHtml((data) => {
							const { design, html } = data;
							console.log(html);
							content = JSON.stringify(design);
							resolve();
						});
					});
				} else {
					throw new Error("Unlayer editor not initialized");
				}
			} else {
				content = htmlContent;
			}
			await saveToDatabase(content);
		} catch (error) {
			console.error("Error saving draft:", error);
			toast({
				title: "Error",
				description: "Failed to save draft",
				variant: "destructive",
			});
		} finally {
			setSaving(false);
		}
	};

	const saveToDatabase = async (content: string) => {
		try {
			const result = await saveCampaign({
				id: campaignId,
				title: subject,
				content,
				editorType,
				newsLetterOwnerId: user?.id || "",
			});
			if (result.success) {
				toast({ title: "Success", description: result.message });
				if (!campaignId) setCampaignId(result.id);
			} else {
				throw new Error(result.message);
			}
		} catch (error) {
			console.error("Error saving to database:", error);
			toast({
				title: "Error",
				description: "Failed to save to database",
				variant: "destructive",
			});
		}
	};

	const send = async () => {
		setIsConfirmDialogOpen(true);
	};

	const confirmSend = async () => {
		setSending(true);
		try {
			let emailContent = "";

			if (editorType === "unlayer") {
				const unlayer = emailEditorRef.current?.editor;
				if (!unlayer) {
					throw new Error("Unlayer editor not initialized");
				}
				await new Promise<void>((resolve) => {
					unlayer.exportHtml((data) => {
						const { design, html } = data;
						emailContent = html;
						setJsonData(design);
						setHtmlContent(html);
						resolve();
					});
				});
			} else {
				emailContent = htmlContent;
			}

			if (!emailContent) {
				throw new Error("Email content is empty");
			}

			const result = await sendEmail({
				ownerId: user?.username || "",
				subject,
				body: emailContent,
			});

			if (!result) {
				throw new Error("No response from send email function");
			}

			if (result.success) {
				toast({ title: "Success", description: result.message });
			} else {
				throw new Error(result.message || "Failed to send email");
			}
		} catch (error) {
			console.error("Error sending email:", error);
			toast({
				title: "Error",
				description:
					error instanceof Error ? error.message : "Failed to send email",
				variant: "destructive",
			});
		} finally {
			setSending(false);
			setIsConfirmDialogOpen(false);
		}
	};

	const handleCustomEditorHtmlChange = (html: string) => {
		setHtmlContent(html);
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<div className="container mx-auto py-2 space-y-6">
			<Card>
				<CardContent className="p-6">
					<div className="flex items-center space-x-4 mb-6">
						<Input
							type="text"
							placeholder="Subject"
							value={subject}
							onChange={(e) => setSubject(e.target.value)}
							className="flex-grow"
						/>
						<Button
							variant="outline"
							size="sm"
							onClick={saveDraft}
							disabled={saving}
						>
							{saving ? (
								<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<Save className="mr-2 w-4 h-4" />
							)}
							Save Draft
						</Button>
						<Button size="sm" onClick={send} disabled={sending}>
							<Send className="mr-2 w-4 h-4" />
							Send
						</Button>
					</div>

					{editorType === "visual" && (
						<CustomEditor
							onHtmlChange={handleCustomEditorHtmlChange}
							initialHtml={htmlContent}
						/>
					)}

					{editorType === "unlayer" && (
						<EmailEditor
							ref={emailEditorRef}
							onReady={onReady}
							minHeight="70vh"
							options={{
								version: "latest",
								appearance: {
									theme: "modern_light",
								},
							}}
						/>
					)}

					{editorType === "html" && (
						<Textarea
							value={htmlContent}
							onChange={(e) => setHtmlContent(e.target.value)}
							className="w-full h-[70vh] p-4 font-mono text-sm"
						/>
					)}
				</CardContent>
			</Card>

			<Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirm Send</DialogTitle>
						<DialogDescription>
							Send the email to {subscriberCount} people?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
							Cancel
						</Button>
						<Button onClick={confirmSend} disabled={sending}>
							{sending ? (
								<>
									<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
									Sending...
								</>
							) : (
								"Yes, Send"
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Emaileditor;
