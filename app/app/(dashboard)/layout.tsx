import MobileSidebar from "@/components/widgets/mobile-dashboard";
import Sidebar from "@/components/widgets/sidebar";

export default function LayoutRoot({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex h-screen w-full overflow-hidden">
			<Sidebar />
			<div className="flex flex-col flex-grow">
				<MobileSidebar />
				<main className="flex-grow overflow-auto">
					{children}
				</main>
			</div>
		</div>
	);
}
