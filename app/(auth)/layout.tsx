import { LayoutTransition } from "@/components/providers/layout-transition";
import { EnhancedButton } from "@/components/ui/enchancedBtn";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className="min-h-screen flex flex-col items-center justify-center">
				<LayoutTransition
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<div className="fixed top-4 left-4 m-4">
						<Link href="/">
							<EnhancedButton
								variant="expandIcon"
								Icon={ArrowLeft}
								className="flex items-center justify-center gap-2"
								iconPlacement="left"
							>
								Go Back
							</EnhancedButton>
						</Link>
					</div>
					{children}
				</LayoutTransition>
			</div>
		</>
	);
}
