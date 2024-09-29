import MobileSidebar from "@/components/widgets/mobile-dashboard";
import Sidebar from "@/components/widgets/sidebar";

export default function LayoutRoot({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div className="grid max-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
				<Sidebar />
				<div className="flex flex-col flex-1">
					<MobileSidebar />
					<div className="flex-1 overflow-auto max-h-screen">{children}</div>
				</div>
			</div>
		</>
	);
}
