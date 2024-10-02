"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Book, Key, LogOut, Menu, Settings, User } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { dashboardSidebar } from "@/constants";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";
import { Progress } from "../ui/progress";

const MobileSidebar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const user = useUser();
	const handleLinkClick = () => {
		setIsOpen(false);
	};

	return (
		<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 py-6">
			<Sheet open={isOpen} onOpenChange={setIsOpen}>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 md:hidden">
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="flex flex-col">
					<nav className="mt-6 grid gap-4 text-lg font-medium">
						<Link
							href="#"
							className="flex items-center gap-2 text-lg font-semibold text-primary"
							onClick={handleLinkClick}
						>
							<h1 className="text-2xl font-semibold">EmailApp</h1>
						</Link>
						{dashboardSidebar.map((item) => (
							<Link
								key={item.label}
								href={item.href}
								className="flex items-center gap-4 rounded-lg px-3 py-2 transition-colors hover:bg-muted"
								onClick={handleLinkClick}
							>
								<item.icon className="h-5 w-5" />
								{item.label}
							</Link>
						))}
					</nav>
					<div className="mt-auto p-4">
						<Button className="hover:bg-primary-dark w-full bg-primary">
							Logout
						</Button>
					</div>
				</SheetContent>
			</Sheet>
			<div className="flex-1" />
			<div className="flex items-center justify-center gap-2">
				<div className="flex items-center space-x-2 rounded-full px-3 py-1 border hover:bg-accent transition-all duration-300">
					<span className="text-primary font-bold">NaN 🪙</span>
				</div>
				<Popover>
					<PopoverTrigger asChild className="group">
						<Button
							variant="ghost"
							className={`w-8 h-8 rounded-full p-0 transition-all duration-300 hover:ring-2 hover:ring-primary/20 hover:opacity-85`}
						>
							<Avatar className="w-full h-full">
								<AvatarImage
									src={user?.user?.imageUrl}
									alt="User avatar"
									className="w-8 h-8"
								/>
								<AvatarFallback>
									<div className="w-8 h-8 rounded-full bg-accent"></div>
								</AvatarFallback>
							</Avatar>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-64 p-4 rounded-lg shadow-lg border md:mr-8 mr-6">
						<div className="space-y-3">
							<div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
								<Avatar className="w-10 h-10">
									<AvatarImage src={user?.user?.imageUrl} alt="User avatar" />
									<AvatarFallback>
										<div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-600 to-blue-400"></div>
									</AvatarFallback>
								</Avatar>
								<div>
									<p className="text-sm font-medium">{user?.user?.fullName}</p>
									<p className="text-xs text-gray-500">
										{user?.user?.emailAddresses[0]?.emailAddress.slice(0, 24)}
										...
									</p>
								</div>
							</div>
							<div className="mb-4 p-3 bg-muted/20 rounded-lg">
								<div className="flex items-center justify-between mb-2">
									<span className="text-sm font-medium">Credits Remaining</span>
									<span className="text-sm font-semibold">
										<span className="mr-1" role="img" aria-label="coin">
											🪙
										</span>
										15
									</span>
								</div>
								<Progress value={(15 / 100) * 100} className="h-2" />
							</div>
							<PopoverMenuItem icon={User} label="Profile" />
							<PopoverMenuItem icon={Settings} label="Settings" />
							<PopoverMenuItem icon={Book} label="Docs" />
							<PopoverMenuItem icon={Key} label="API Keys" />
							<SignOutButton>
								<Button
									variant="ghost"
									className={`w-full justify-start text-sm font-normal text-red-600 hover:text-red-700 bg-red-500/10 transition-all`}
								>
									<LogOut className="mr-2 h-4 w-4" />
									Logout
								</Button>
							</SignOutButton>
						</div>
					</PopoverContent>
				</Popover>
			</div>
		</header>
	);
};

export default MobileSidebar;

function PopoverMenuItem({ icon: Icon, label, variant = "default" }: any) {
	return (
		<Button
			variant="ghost"
			className={`w-full justify-start text-sm font-normal ${
				variant === "destructive"
					? "text-red-600 hover:text-red-700 hover:bg-red-50"
					: "hover:bg-muted"
			}`}
		>
			<Icon className="mr-2 h-4 w-4" />
			{label}
		</Button>
	);
}
