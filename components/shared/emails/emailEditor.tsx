"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Save, Send } from "lucide-react";
import { saveEmail } from "@/actions/save.email";
import { DefaultJsonData } from "@/constants";
import { Textarea } from "@/components/ui/textarea";
import CustomEditor from "./customEditor/customEditor";

const Emaileditor = () => {
	const [loading, setLoading] = useState(false);
	const [jsonData, setJsonData] = useState<any>(DefaultJsonData);
	const [htmlContent, setHtmlContent] = useState("");
	const [subject, setSubject] = useState("");
	const { user } = useClerk();
	const emailEditorRef = useRef<EditorRef>(null);
	const router = useRouter();

	const onReady: EmailEditorProps["onReady"] = () => {
		const unlayer = emailEditorRef.current?.editor;
		unlayer?.loadDesign(jsonData);
		setLoading(false);
	};

	const exportHtml = () => {
		const unlayer = emailEditorRef.current?.editor;
		unlayer?.exportHtml((data) => {
			const { design, html } = data;
			// Update JSON and HTML views
			setJsonData(design);
			setHtmlContent(html);
		});
	};

	const saveDraft = async () => {
		const unlayer = emailEditorRef.current?.editor;
		unlayer?.exportHtml(async (data) => {
			const { design, html } = data;
			console.log(design, html);
			// await saveEmail({
			// 	title: subject,
			// 	content: JSON.stringify(design),
			// 	newsLetterOwnerId: user?.id || "",
			// });
		});
	};

	const sendEmail = () => {
		console.log("Sending email...");
	};

	const handleJsonChange = (newJson: string) => {
		try {
			const parsedJson = JSON.parse(newJson);
			updateDesign(parsedJson);
		} catch (error) {
			console.error("Invalid JSON format");
		}
	};

	const updateDesign = (newDesign: any) => {
		const unlayer = emailEditorRef.current?.editor;
		unlayer?.loadDesign(newDesign);
		unlayer?.exportHtml((data) => {
			const { design, html } = data;
			setJsonData(design);
			setHtmlContent(html);
		});
	};

	useEffect(() => {
		const unlayer = emailEditorRef.current?.editor;
		unlayer?.addEventListener("design:updated", exportHtml);

		return () => {
			unlayer?.removeEventListener("design:updated");
		};
	}, []);

	const handleCustomEditorHtmlChange = (html: string) => {
		setHtmlContent(html);
	};

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
						<Button variant="outline" size="sm" onClick={saveDraft}>
							<Save className="mr-2 w-4 h-4" />
							Save Draft
						</Button>
						<Button size="sm" onClick={sendEmail}>
							<Send className="mr-2 w-4 h-4" />
							Send
						</Button>
					</div>

					<Tabs defaultValue="editor" className="w-full">
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="editor">Visual Editor</TabsTrigger>
							<TabsTrigger value="html">HTML</TabsTrigger>
							<TabsTrigger value="json">JSON</TabsTrigger>
						</TabsList>

						{/* Visual Editor */}
						<TabsContent value="editor" className="border rounded-md mt-4">
							{loading ? (
								<div className="flex justify-center items-center h-[70vh] bg-accent">
									<Icons.spinner className="w-7 h-7 animate-spin" />
								</div>
							) : (
								<CustomEditor onHtmlChange={handleCustomEditorHtmlChange} />
							)}
						</TabsContent>

						{/* HTML Tab */}
						<TabsContent value="html" className="border rounded-md mt-4">
							<div className="flex flex-col h-[70vh]">
								<Textarea
									value={htmlContent}
									readOnly
									className="w-full h-1/2 p-4 font-mono text-sm bg-accent mb-4"
								/>
								<div className="w-full h-1/2 border rounded">
									<iframe
										srcDoc={htmlContent}
										className="w-full h-full"
										title="Email Preview"
									/>
								</div>
							</div>
						</TabsContent>

						{/* JSON Tab */}
						<TabsContent value="json" className="border rounded-md mt-4">
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
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
};

export default Emaileditor;
