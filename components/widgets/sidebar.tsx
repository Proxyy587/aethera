"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { dashboardSidebar } from "@/constants";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PopoverContent } from "../ui/popover";
import { useClerk } from "@clerk/nextjs";

const Sidebar = () => {
	const { user } = useClerk();
	const pathname = usePathname();

	return (
		<div className="hidden sidebar h-screen w-[230px] flex-shrink-0 flex-col border-r bg-muted/40 md:flex lg:w-[280px] ">
			<div className="flex items-center border-b px-4 md:h-[60px] md:px-6">
				<Link
					href="/"
					className="flex items-center gap-2 font-semibold transition-all duration-150 hover:text-primary"
				>
					<span className="text-xl">Aethera Toolkit</span>
				</Link>
			</div>
			<nav className="flex-1 overflow-y-auto px-2 py-4 lg:px-4">
				{dashboardSidebar.slice(0, 7).map((item) => {
					const Icon = item.icon;
					const isActive = pathname === item.href;

					return (
						<Link
							key={item.href}
							href={item.href}
							className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
								isActive
									? "bg-accent text-primary"
									: "text-muted-foreground hover:text-primary"
							}`}
						>
							<Icon className="h-4 w-4" />
							{item.label}
						</Link>
					);
				})}
			</nav>
			<div className="flex flex-col px-2 py-2 lg:px-4">
				{dashboardSidebar.slice(7).map((item) => {
					const Icon = item.icon;
					const isActive = pathname === item.href;

					return (
						<Link
							key={item.href}
							href={item.href}
							className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
								isActive
									? "bg-accent text-primary"
									: "text-muted-foreground hover:text-primary"
							}`}
						>
							<Icon className="h-4 w-4" />
							{item.label}
						</Link>
					);
				})}
				<div className="border-t p-4 w-full">
					<Popover >
						<PopoverTrigger asChild>
							<Button
								variant="ghost"
								className="w-full flex items-center justify-start gap-2"
							>
								<Avatar className="h-8 w-8">
									<AvatarImage src={user?.imageUrl} alt="user" />
									<AvatarFallback>O</AvatarFallback>
								</Avatar>
								<span>Abhijit Bhattacharjee</span>
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-full">
							<Button variant="destructive" className="w-full">
								Log out
							</Button>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
