"use client";

import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import {
	CreditCard,
	Settings,
	TrendingUp,
	Users,
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
	PlusCircle,
	Camera,
	Smartphone,
	LogOut,
} from "lucide-react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

const data = [
	{ name: "Jan", followers: 400 },
	{ name: "Feb", followers: 600 },
	{ name: "Mar", followers: 800 },
	{ name: "Apr", followers: 1000 },
	{ name: "May", followers: 1400 },
	{ name: "Jun", followers: 1800 },
];

export default function UserDashboard() {
	const { isSignedIn, user, isLoaded } = useUser();
	const { signOut } = useClerk();
	const [activeTab, setActiveTab] = useState("overview");
	const [username, setUsername] = useState(user?.username || "");
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	if (!isLoaded) {
		return null;
	}

	const handleUsernameChange = async () => {
		try {
			await user?.update({
				username: username,
			});
			toast({
				title: "Success",
				description: "Username updated successfully!",
			});
		} catch (error) {
			console.error("Error updating username:", error);
			toast({
				title: "Error",
				description: "Failed to update username. Please try again.",
				variant: "destructive",
			});
		}
	};

	const handleProfilePhotoChange = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0];
		if (file) {
			try {
				const formData = new FormData();
				formData.append("file", file);
				await user?.setProfileImage({ file });
				toast({
					title: "Success",
					description: "Profile photo updated successfully!",
				});
			} catch (error) {
				console.error("Error updating profile photo:", error);
				toast({
					title: "Error",
					description: "Failed to update profile photo. Please try again.",
					variant: "destructive",
				});
			}
		}
	};

	const handleDeleteAccount = async () => {
		try {
			await user?.delete();
			signOut();
			toast({
				title: "Account Deleted",
				description: "Your account has been successfully deleted.",
			});
		} catch (error) {
			console.error("Error deleting account:", error);
			toast({
				title: "Error",
				description: "Failed to delete account. Please try again.",
				variant: "destructive",
			});
		}
	};

	return (
		<main className="container mx-auto py-6 px-4 space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h1 className="text-3xl font-bold">
						Welcome back,{" "}
						<span className="text-primary">
							{isSignedIn ? user.fullName : "Guest"}!
						</span>
					</h1>
					<p className="text-muted-foreground mt-1">
						TODO: Sample dashboard overview will change alot after
					</p>
				</div>
				<Button>Buy Credits</Button>
			</div>

			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				className="space-y-4"
			>
				<TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="growth">Growth</TabsTrigger>
					<TabsTrigger value="settings">Settings</TabsTrigger>
				</TabsList>
				<TabsContent value="overview" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Total Followers
								</CardTitle>
								<Users className="h-4 w-4 text-primary" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">6,969</div>
								<p className="text-xs text-muted-foreground">
									+6.9% from last month
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Engagement Rate
								</CardTitle>
								<TrendingUp className="h-4 w-4 text-primary" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">4.5%</div>
								<p className="text-xs text-muted-foreground">
									+1.2% from last month
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Credits Left
								</CardTitle>
								<CreditCard className="h-4 w-4 text-primary" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">250</div>
								<p className="text-xs text-muted-foreground">
									Used 50 this month
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Active Campaigns
								</CardTitle>
								<Settings className="h-4 w-4 text-primary" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">3</div>
								<p className="text-xs text-muted-foreground">
									2 ending this week
								</p>
							</CardContent>
						</Card>
					</div>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4">
							<CardHeader>
								<CardTitle>Social Media Growth</CardTitle>
							</CardHeader>
							<CardContent className="pl-2">
								<ResponsiveContainer width="100%" height={300}>
									<LineChart data={data}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="name" />
										<YAxis />
										<Tooltip />
										<Line
											type="monotone"
											dataKey="followers"
											stroke="#8884d8"
										/>
									</LineChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>
						<Card className="col-span-3">
							<CardHeader>
								<CardTitle>Connected Accounts</CardTitle>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<Button variant="outline" className="w-full justify-start">
										<Facebook className="mr-2 h-4 w-4 text-blue-600" />
										Facebook
									</Button>
									<Button variant="outline" className="w-full justify-start">
										<Twitter className="mr-2 h-4 w-4 text-sky-500" />
										Twitter
									</Button>
									<Button variant="outline" className="w-full justify-start">
										<Instagram className="mr-2 h-4 w-4 text-pink-600" />
										Instagram
									</Button>
									<Button variant="outline" className="w-full justify-start">
										<Linkedin className="mr-2 h-4 w-4 text-blue-700" />
										LinkedIn
									</Button>
									<Button variant="ghost" className="w-full justify-start">
										<PlusCircle className="mr-2 h-4 w-4" />
										Connect More
									</Button>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
				<TabsContent value="growth">
					<Card>
						<CardHeader>
							<CardTitle>Growth Strategies</CardTitle>
						</CardHeader>
						<CardContent>
							<p>
								Detailed growth analytics and strategies will be displayed here.
							</p>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value="settings" className="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Profile Settings</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center space-x-4">
								<Avatar className="w-20 h-20">
									<AvatarImage src={user?.imageUrl} />
									<AvatarFallback>
										{user?.firstName?.[0]}
										{user?.lastName?.[0]}
									</AvatarFallback>
								</Avatar>
								<div>
									<h3 className="text-lg font-semibold">{user?.fullName}</h3>
									<p className="text-sm text-muted-foreground">
										{user?.primaryEmailAddress?.emailAddress}
									</p>
								</div>
							</div>
							<div>
								<Label htmlFor="profile-photo" className="cursor-pointer">
									<div className="flex items-center space-x-2">
										<Camera className="h-4 w-4" />
										<span>Change Profile Photo</span>
									</div>
								</Label>
								<Input
									id="profile-photo"
									type="file"
									accept="image/*"
									onChange={handleProfilePhotoChange}
									className="hidden"
								/>
							</div>
							<div>
								<Label htmlFor="username">Username</Label>
								<div className="flex space-x-2">
									<Input
										id="username"
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										placeholder="Enter new username"
									/>
									<Button onClick={handleUsernameChange}>Update</Button>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Connected Social Media</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<Button variant="outline" className="w-full justify-start">
								<Facebook className="mr-2 h-4 w-4 text-blue-600" />
								Connect Facebook
							</Button>
							<Button variant="outline" className="w-full justify-start">
								<Twitter className="mr-2 h-4 w-4 text-sky-500" />
								Connect Twitter
							</Button>
							<Button variant="outline" className="w-full justify-start">
								<Instagram className="mr-2 h-4 w-4 text-pink-600" />
								Connect Instagram
							</Button>
							<Button variant="outline" className="w-full justify-start">
								<Linkedin className="mr-2 h-4 w-4 text-blue-700" />
								Connect LinkedIn
							</Button>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Security</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div>
								<h3 className="text-lg font-semibold mb-2">Active Devices</h3>
								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-2">
											<Smartphone className="h-4 w-4 text-primary" />
											<span>{user?.lastSignInAt?.toLocaleString()}</span>
										</div>
									</div>
								</div>
							</div>
							<div>
								<h3 className="text-lg font-semibold mb-2">Account Actions</h3>
								<Dialog
									open={isDeleteModalOpen}
									onOpenChange={setIsDeleteModalOpen}
								>
									<DialogTrigger asChild>
										<Button variant="destructive">
											<LogOut className="mr-2 h-4 w-4" />
											Delete Account
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>
												Are you sure you want to delete your account?
											</DialogTitle>
											<DialogDescription>
												This action cannot be undone. This will permanently
												delete your account and remove your data from our
												servers.
											</DialogDescription>
										</DialogHeader>
										<div className="flex justify-end space-x-2">
											<Button
												variant="outline"
												onClick={() => setIsDeleteModalOpen(false)}
											>
												Cancel
											</Button>
											<Button
												variant="destructive"
												onClick={handleDeleteAccount}
											>
												Delete Account
											</Button>
										</div>
									</DialogContent>
								</Dialog>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</main>
	);
}
