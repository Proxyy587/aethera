import AnimatedShinyText from "@/components/ui/shimmer-text";
import TextBlur from "@/components/ui/text-blur";
import { containerVariants, itemVariants } from "@/lib/animation-variant";
import { motion } from "framer-motion";

interface CTAProps {
	username: string;
	firstName: string;
	lastName: string;
}

export default function CTA({ username, firstName, lastName }: CTAProps) {
	const displayName = firstName || username || "Owner";

	return (
		<motion.div
			className="flex w-full max-w-2xl flex-col gap-2"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<motion.div variants={itemVariants}>
				<div className="flex items-center justify-center">
					<div className="flex w-fit items-center justify-center rounded-full bg-muted text-center">
						<AnimatedShinyText className="px-4 py-1">
							<span>Subscribe to {username}&apos;s newsletter!</span>
						</AnimatedShinyText>
					</div>
				</div>
			</motion.div>

			<div className="h-12"></div>
			<motion.div variants={itemVariants}>
				<TextBlur
					className="text-center text-3xl font-medium tracking-tighter sm:text-5xl"
					text={`Subscribe to ${displayName}'s newsletter`}
				/>
			</motion.div>

			<motion.div variants={itemVariants}>
				<TextBlur
					className="mx-auto max-w-[27rem] pt-1.5 text-center text-base text-muted-foreground sm:text-lg"
					text={`Join the waitlist to receive updates from ${displayName.toLowerCase()}!`}
					duration={0.8}
				/>
			</motion.div>
		</motion.div>
	);
}
