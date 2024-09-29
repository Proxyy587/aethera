import NewsletterHome from "./_components/newsletter-section";

interface DomainPageProps {
	params: { domain: string };
}

export default async function DomainPage({ params }: DomainPageProps) {
	const { domain } = params; // This will be the subdomain

	return (
		<div>
			<NewsletterHome />
		</div>
	);
}
