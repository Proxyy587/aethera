import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/animation-variant";

export default function NewsletterFooter() {
	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="mt-auto flex w-full items-center justify-center gap-1 border-t bg-background p-6 text-muted-foreground/70 md:justify-start"
		>
			<motion.div variants={itemVariants}>
				Powered by{" "}
				<Link
					href="https://cyprostudio.com"
					rel="noopener noreferrer"
					target="_blank"
				>
					<span className="text-muted-foreground hover:text-accent-foreground underline underline-offset-2 transition-all duration-200 ease-linear">
						CyproStudio
					</span>
					.
				</Link>
			</motion.div>
		</motion.div>
	);
}
