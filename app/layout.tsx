import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { LayoutTransition } from "@/components/providers/layout-transition";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster as SonnerToaster } from "sonner";


const inter = Plus_Jakarta_Sans({
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	subsets: ["latin"],
	variable: "--font-jakarta",
});

export const metadata: Metadata = {
	title: "Aethera Business",
	description: "A toolkit for expanding your business",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body className={inter.className}>
					<ThemeProvider	
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<LayoutTransition
							initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						{children}
						<Toaster />
						<SonnerToaster position="top-center" />
					</LayoutTransition>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
