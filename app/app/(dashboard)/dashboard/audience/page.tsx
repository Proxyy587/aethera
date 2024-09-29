import { CustomerTable } from "@/components/shared/emails/customer-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import React from "react";

const AudiencePage = () => {
	return (
		<>
			<section className="container mx-auto py-8">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-semibold">Audience</h1>
					<Button className="rounded-full" size={"sm"} variant={"outline"}>
						<Plus className="mr-2 h-4 w-4" /> Add Audience
					</Button>
				</div>
				<Separator className="my-4" />
				<div className="grid grid-cols-1 mt-9">
					<CustomerTable />
				</div>
			</section>
		</>
	);
};

export default AudiencePage;
