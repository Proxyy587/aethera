"use client";

import { toast } from "sonner";
import { useState } from "react";
import Header from "@/components/shared/newsletterSlug/header";
import CTA from "@/components/shared/newsletterSlug/CTA";
import Form from "@/components/forms/newsLetterSlug";
import NewsletterFooter from "@/components/shared/newsletterSlug/newsletterFooter";
import Particles from "@/components/magicui/particles";
import { addSubscriber } from "@/actions/add.subscriber";

interface NewsletterHomeProps {
	id: string;
	username: string;
	firstName: string;
	lastName: string;
}

export default function NewsletterHome({
	id,
	username,
	firstName,
	lastName,
}: NewsletterHomeProps) {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	// Event handlers
	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const isValidEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleSubmit = async () => {
		try {
			if (!name || !email) {
				toast.error("Please fill in all fields 😠");
				return;
			}

			if (!isValidEmail(email)) {
				toast.error("Please enter a valid email address 😠");
				return;
			}

			setLoading(true);

			await addSubscriber(name, email, id)
				.then((res) => {
					setLoading(false);
					if (res.error) {
						toast.error(res.error);
					} else {
						toast.success("You are successfully subscribed!");
					}
				})
				.catch((error) => {
					console.log(error);
					setLoading(false);
				});
		} catch (error) {
			console.log(error);
			toast.error("An error occurred. Please try again 😢.");
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center overflow-x-clip pt-12 md:pt-24">
			<section className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
				<Header />

				{/* Pass the firstName, lastName, and username to CTA */}
				<CTA username={username} firstName={firstName} lastName={lastName} />

				<Form
					name={name}
					email={email}
					handleNameChange={handleNameChange}
					handleEmailChange={handleEmailChange}
					handleSubmit={handleSubmit}
					loading={loading}
				/>
			</section>

			<NewsletterFooter />

			<Particles
				quantityDesktop={350}
				quantityMobile={100}
				ease={80}
				color={"#F7FF9B"}
				refresh
			/>
		</main>
	);
}
