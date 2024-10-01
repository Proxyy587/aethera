import Image from "next/image";
import * as React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";

function NavBar() {
	return (
		<header className="sticky top-0 left-0 flex-center w-full gap-5 items-center px-7 py-3 font-bold border-b border-white/10 leading-[154.5%] max-md:flex-wrap max-md:px-5 bg-white/5 backdrop-blur-md">
			<div className="max-w-6xl w-full flex-between">
				<div className="flex gap-1.5 justify-center self-stretch my-auto text-2xl tracking-tighter text-muted-foreground">
					<Image src="/vercel.svg" alt="LOGO" width={150} height={0} />
				</div>
				<ul className="gap-5 justify-between self-stretch my-auto text-sm leading-5 text-muted-foreground max-md:flex-wrap max-md:max-w-full font-normal hidden md:flex">
					<li>Home</li>
					<li>Pricing</li>
					<li>Features</li>
					<li>Contact us</li>
				</ul>
				<div className="flex-center gap-3">
					<Button size="sm" className="rounded-full">
						<Link href="/sign-up">Get Started</Link>
					</Button>
					<Button variant="outline" size="sm" className="rounded-full">
						<Link href="/sign-in" className="flex-center gap-1">
							<LogIn className="w-3 h-3 mr-1" />
							Login
						</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}

export default NavBar;
