import { ArrowUp, Minus } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatProps = {
	title: string;
	value: number;
	change: number;
	period: string;
};

const Stat: React.FC<StatProps> = ({ title, value, change, period }) => (
	<div className="flex flex-col space-y-2">
		<h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
		<div className="flex items-center justify-between">
			<span className="text-2xl font-bold">{value}</span>
			<div
				className={`flex items-center rounded-full px-2 py-1 text-xs font-medium ${
					change > 0
						? "bg-green-100 text-green-800"
						: "bg-gray-100 text-gray-800"
				}`}
			>
				{change > 0 ? (
					<ArrowUp className="mr-1 h-3 w-3" />
				) : (
					<Minus className="mr-1 h-3 w-3" />
				)}
				{Math.abs(change)}%
			</div>
		</div>
		<p className="text-xs text-muted-foreground">from {period}</p>
	</div>
);

const EmailOverviewCard: React.FC = () => {
	const stats = [
		{ title: "Subscribers", value: 1, change: 50, period: "0 (last 4 weeks)" },
		{ title: "Open Rate", value: 0, change: 0, period: "0 (last 4 weeks)" },
		{ title: "Click Rate", value: 0, change: 0, period: "0 (last 4 weeks)" },
	];

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="text-xl font-semibold">Email Overview</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{stats.map((stat, index) => (
						<div key={stat.title} className="flex flex-col">
							<Stat {...stat} />
							{index < stats.length - 1 && (
								<div
									className="mt-4 h-px w-full bg-border sm:hidden lg:block"
									aria-hidden="true"
								/>
							)}
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default EmailOverviewCard;
