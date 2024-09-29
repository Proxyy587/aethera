import NavBar from "@/components/widgets/navbar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { pricingCards } from "@/constants";
import clsx from "clsx";
import { Check } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default async function Home() {
	return (
		<main>
			<NavBar />
			<section>
				<div className="flex items-center justify-center flex-col mt-[80px] gap-4 ">
					<Badge className="rounded-full text-sm">
						An AI powered sales assistant chatbot
					</Badge>
					<h1 className="text-5xl font-bold max-w-3xl text-center tracking-tight">
						Effortlessly Grow your Product using the power of aethera
					</h1>
					<p className="text-center max-w-[500px] text-sm">
						AI powered sales assistant for your website to help you generate
						leads and run your business more efficiently.
					</p>
					<Button className="px-4 rounded-full">Start For Free</Button>
					<Image
						src="/screenshot.png"
						alt="hero"
						width={1000}
						height={1000}
						className="object-cover rounded-lg shadow-lg border border-accent animate-in fade-in-0 ease-in duration-300"
					/>
				</div>
			</section>
			<section className="flex justify-center items-center flex-col gap-4 mt-20">
				<h2 className="text-3xl font-bold text-center tracking-tight">
					Choose what fits you right
				</h2>
				<p className="text-muted-foreground text-center max-w-lg text-sm">
					Our straightforward pricing plans are tailored to meet your needs.
				</p>
			</section>
			<div className="flex  justify-center gap-4 flex-wrap mt-6 md:mt-12">
				{pricingCards.map((card) => (
					<Card
						key={card.title}
						className={clsx("w-[300px] flex flex-col justify-between", {
							"border-2 border-primary": card.title === "Unlimited",
						})}
					>
						<CardHeader>
							<CardTitle className="text-orange">{card.title}</CardTitle>
							<CardDescription>
								{pricingCards.find((c) => c.title === card.title)?.description}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<span className="text-4xl font-bold">{card.price}</span>
							<span className="text-muted-foreground">
								<span>/ month</span>
							</span>
						</CardContent>
						<CardFooter className="flex flex-col items-start gap-4">
							<div>
								{card.features.map((feature) => (
									<div key={feature} className="flex items-center justify-start gap-2">
										<Check className="text-green-500 w-5 h-5 " />
										<p>{feature}</p>
									</div>
								))}
							</div>
							<Link
								href={`/dashbord?plan=${card.title}`}
								className="w-full"
							>
							<Button
								className="w-full text-center font-bold rounded-md"
							>
								Get Started
							</Button>
							</Link>
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	);
}