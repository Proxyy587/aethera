import { getUserByEmail } from "@/actions/user.clerk";
import NewsletterHome from "./_components/newsletter-section";
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
		return <div>404 {domain}</div>;
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
