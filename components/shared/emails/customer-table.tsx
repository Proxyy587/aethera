"use client";
import React from "react";
import { DataTable } from "@/components/widgets/table";
import { EMAIL_MARKETING_HEADER } from "@/constants";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { format } from "timeago.js";

interface CustomerTableProps {
  data: any[];
}

export const CustomerTable: React.FC<CustomerTableProps> = ({ data }) => {
	const rows = data.map((i: any) => ({
		id: i?._id,
		email: i?.email,
		createdAt: format(i?.createdAt),
		source: i?.source,
		status: i?.status,
	}));

	return (
		<DataTable headers={EMAIL_MARKETING_HEADER}>
			{rows.map((subscriber: any) => (
				<TableRow key={subscriber.id}>
					<TableCell>
						<Card
							className={cn(
								"rounded-full w-5 h-5 border-4 cursor-pointer",
								subscriber.status === "subscribed" ? "bg-orange" : "bg-peach"
							)}
						/>
					</TableCell>
					<TableCell>{subscriber.email}</TableCell>
					<TableCell>{subscriber.email.split('@')[1]}</TableCell>
					<TableCell className="justify-end flex">{subscriber.status}</TableCell>
				</TableRow>
			))}
		</DataTable>
	);
};
