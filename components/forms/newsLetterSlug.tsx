import Link from "next/link";
import { ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { FaArrowRightLong } from "react-icons/fa6";
import { EnhancedButton } from "@/components/ui/enchancedBtn";
import { containerVariants, itemVariants } from "@/lib/animation-variant";

interface FormProps {
	name: string;
	email: string;
	handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
	handleSubmit: () => void;
	loading: boolean;
}

export default function Form({
	name,
	email,
	handleNameChange,
	handleEmailChange,
	handleSubmit,
	loading,
}: FormProps) {
	return (
		<motion.div
			className="mt-6 flex w-full max-w-[24rem] flex-col gap-2"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<motion.div variants={itemVariants}>
				<Input
					type="text"
					placeholder="Your Name"
					value={name}
					onChange={handleNameChange}
				/>
			</motion.div>
			<motion.div variants={itemVariants}>
				<Input
					type="email"
					placeholder="Your Email Address"
					value={email}
					onChange={handleEmailChange}
				/>
			</motion.div>
			<motion.div variants={itemVariants}>
				<EnhancedButton
					variant="expandIcon"
					Icon={FaArrowRightLong}
					onClick={handleSubmit}
					iconPlacement="right"
					className="mt-2 w-full"
					disabled={loading}
				>
					{loading ? "Loading..." : "Subscribe!"}
				</EnhancedButton>
			</motion.div>
			<motion.div
				variants={itemVariants}
				className="mt-4 flex w-full items-center justify-center gap-1 text-muted-foreground"
			>
				<p>
					Trusted and protected by{" "}
					<Link
						className="underline underline-offset-2 hover:text-accent-foreground transition-all"
						href="https://abhijee.com"
					>
						aethera
					</Link>
				</p>
			</motion.div>
		</motion.div>
	);
}
