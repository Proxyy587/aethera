import AnimatedShinyText from "@/components/ui/shimmer-text";
import TextBlur from "@/components/ui/text-blur";
import { containerVariants, itemVariants } from "@/lib/animation-variant";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <motion.div
      className="flex w-full max-w-2xl flex-col gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible">
      <motion.div variants={itemVariants}>
        <div className="flex items-center justify-center">
          <div className="flex w-fit items-center justify-center rounded-full bg-muted text-center">
            <AnimatedShinyText className="px-4 py-1">
              <span>Subscribe to newsletter!</span>
            </AnimatedShinyText>
          </div>
        </div>
      </motion.div>

      {/* <motion.img
        src="/logo.png"
        alt="logo"
        className="mx-auto h-24 w-24"
        variants={itemVariants}
      /> */}

        <div className="h-12"></div>
      <motion.div variants={itemVariants}>
        <TextBlur
          className="text-center text-3xl font-medium tracking-tighter sm:text-5xl"
          text="Subscribe to Abhijit's newsletter"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TextBlur
          className="mx-auto max-w-[27rem] pt-1.5 text-center text-base text-muted-foreground sm:text-lg"
          text="Join the waitlist to recieve updates on the progress!"
          duration={0.8}
        />
      </motion.div>
    </motion.div>
  );
}