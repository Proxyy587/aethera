import React from "react";
import { Bold, Italic, Underline } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ToggleGroupDemo({
	applyTextFormatting,
}: {
	applyTextFormatting: (command: string) => void;
}) {
	return (
		<ToggleGroup type="multiple">
			<ToggleGroupItem
				value="bold"
				aria-label="Toggle bold"
				onClick={() => applyTextFormatting("bold")}
			>
				<Bold className="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value="italic"
				aria-label="Toggle italic"
				onClick={() => applyTextFormatting("italic")}
			>
				<Italic className="h-4 w-4" />
			</ToggleGroupItem>
			<ToggleGroupItem
				value="underline"
				aria-label="Toggle underline"
				onClick={() => applyTextFormatting("underline")}
			>
				<Underline className="h-4 w-4" />
			</ToggleGroupItem>
		</ToggleGroup>
	);
}
