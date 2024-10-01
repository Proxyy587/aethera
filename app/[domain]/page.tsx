import { getUserByEmail } from "@/actions/user.clerk";
import NewsletterHome from "./_components/newsletter-section";
import Link from "next/link";
import { EnhancedButton } from "@/components/ui/enchancedBtn";
interface DomainPageProps {
	params: { domain: string };
}

interface NewsletterOwner {
	id: string;
	username: string;
	firstName: string;
	lastName: string;
}

export default async function DomainPage({ params }: DomainPageProps) {
	const domain = params.domain.split('.')[0];
	const newsletterOwner = await getUserByEmail(domain) as NewsletterOwner;

	if (!newsletterOwner) {
		return (
			<main className="flex items-center justify-center h-screen">
				<div className="text-center">
					<h1 className="text-4xl font-bold">404</h1>
					<p className="text-lg">The user you are looking for does not exist.</p>
					<Link href="/">
						<EnhancedButton variant="link" className="mt-4 text-blue-500">Go back to the Homepage</EnhancedButton>
					</Link>
				</div>
			</main>
		)
	}
	
	return (
		<div>
			<NewsletterHome
				id={newsletterOwner.id}
				username={newsletterOwner.username}
				firstName={newsletterOwner.firstName}
				lastName={newsletterOwner.lastName}
			/>
		</div>
	);
}
