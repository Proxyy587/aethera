import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type DataTableProps = {
	headers: string[];
	children: React.ReactNode;
};

export const DataTable = ({ headers, children }: DataTableProps) => {
	return (
		<Table className="rounded-t-xl overflow-hidden">
			<TableHeader className="bg-accent">
				<TableRow className="">
					{headers.map((header, key) => (
						<TableHead
							key={key}
							className={cn(
								key == headers.length - 1 && "text-right",
								"text-primary"
							)}
						>
							{header}
						</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody className="bg-muted/10">{children}</TableBody>
			<TableCaption>List of all newsletter subscribers</TableCaption>
		</Table>
	);
};
