"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Save, Send } from "lucide-react";
import { saveCampaign, getCampaign } from "@/actions/save.email";
import { DefaultJsonData } from "@/constants";
import { Textarea } from "@/components/ui/textarea";
import CustomEditor from "./customEditor/customEditor";
import { toast } from "@/hooks/use-toast";

const Emaileditor = () => {
	const [loading, setLoading] = useState(true);
	const [jsonData, setJsonData] = useState<any>(DefaultJsonData);
	const [htmlContent, setHtmlContent] = useState("");
	const [subject, setSubject] = useState("");
	const { user } = useClerk();
	const emailEditorRef = useRef<EditorRef>(null);
	const router = useRouter();
	const [editorType, setEditorType] = useState<string>("visual");
	const [campaignId, setCampaignId] = useState<string | null>(null);

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
	}, []);

	const onReady: EmailEditorProps["onReady"] = () => {
		const unlayer = emailEditorRef.current?.editor;
		if (unlayer && jsonData) {
			unlayer.loadDesign(jsonData);
		}
	};

	const exportHtml = () => {
		const unlayer = emailEditorRef.current?.editor;
		unlayer?.exportHtml((data) => {
			const { design, html } = data;
			setJsonData(design);
			setHtmlContent(html);
		});
	};

	const saveDraft = async () => {
		setLoading(true);
		let content = "";
		if (editorType === "unlayer") {
			const unlayer = emailEditorRef.current?.editor;
			unlayer?.exportHtml(async (data) => {
				const { design } = data;
				content = JSON.stringify(design);
				await saveToDatabase(content);
			});
		} else {
			content = htmlContent;
			await saveToDatabase(content);
		}
	};

	const saveToDatabase = async (content: string) => {
		const result = await saveCampaign({
			id: campaignId,
			title: subject,
			content,
			editorType,
			newsLetterOwnerId: user?.id || "",
		});
		setLoading(false);
		if (result.success) {
			toast({ title: "Success", description: result.message });
			if (!campaignId) setCampaignId(result.id);
		} else {
			toast({ title: "Error", description: result.message, variant: "destructive" });
		}
	};

	const sendEmail = () => {
		console.log("Sending email...");
	};

	const handleCustomEditorHtmlChange = (html: string) => {
		setHtmlContent(html);
	};

	if (loading) {
		return <div>Loading...</div>;
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
						<Button variant="outline" size="sm" onClick={saveDraft} disabled={loading}>
							{loading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 w-4 h-4" />}
							Save Draft
						</Button>
						<Button size="sm" onClick={sendEmail}>
							<Send className="mr-2 w-4 h-4" />
							Send
						</Button>
					</div>

					{editorType === "visual" && (
						<CustomEditor onHtmlChange={handleCustomEditorHtmlChange} initialHtml={htmlContent} />
					)}

					{editorType === "unlayer" && (
						<EmailEditor
							ref={emailEditorRef}
							onReady={onReady}
							minHeight="70vh"
							options={{
								appearance: {
									theme: "dark",
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
		</div>
	);
};

export default Emaileditor;