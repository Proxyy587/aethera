import { cn } from "@/lib/utils";
import React from "react";
import { Icons } from "../ui/icons";

type SpinnerProps = {
	noPadding?: boolean;
};

export const Spinner = ({ noPadding }: SpinnerProps) => {
	return (
		<div className={cn("w-full flex justify-center", noPadding ? "" : "py-10")}>
			<div role="status">
				<Icons.spinner className="w-8 h-8" />
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
};
