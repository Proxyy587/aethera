"use client";
import React from "react";
import { DataTable } from "@/components/widgets/table";
import { EMAIL_MARKETING_HEADER } from "@/constants";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { SideSheet } from "@/components/widgets/sidesheet";

export const CustomerTable = () => {
	const customers = [
		{
			id: "customer1",
			email: "customer1@example.com",
			domain: "example.com",
		},
		{
			id: "customer2",
			email: "customer2@example.com",
			domain: "example.com",
		},
		{
			id: "customer3",
			email: "customer3@example.com",
			domain: "anotherexample.com",
		},
	];

	const selectedCustomers = ["customer1@example.com", "customer3@example.com"];

	return (
		<DataTable headers={EMAIL_MARKETING_HEADER}>
			{customers.map((customer) => (
				<TableRow key={customer.id}>
					<TableCell>
						<Card
							className={cn(
								"rounded-full w-5 h-5 border-4 cursor-pointer",
								selectedCustomers.includes(customer.email)
									? "bg-orange"
									: "bg-peach"
							)}
						/>
					</TableCell>
					<TableCell>{customer.email}</TableCell>
					<TableCell className="text-right">{customer.domain}</TableCell>
				</TableRow>
			))}
		</DataTable>
	);
};
