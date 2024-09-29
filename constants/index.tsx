import {
	BotIcon,
	DollarSignIcon,
	Globe,
	Home,
	LineChart,
	Mail,
	MessageSquare,
	PenIcon,
	Settings,
	UserIcon,
} from "lucide-react";

export const pricingCards = [
	{
		title: "Basic",
		description: "Casual Beginners newbies",
		price: "$0",
		duration: "",
		highlight: "Key features",
		features: [" 1 domain ", "10 contacts", "30 Emails per month"],
		priceId: "",
	},
	{
		title: "Solopreneur [Experimental]",
		description: "I will not recommend this plan",
		price: "$12",
		duration: "month",
		highlight: "Everything in Starter, plus",
		features: ["2 domains ", "30 contacts", "Unlimited Emails per month"],
		priceId: "price_1OYxkqFj9oKEERu1NbKUxXxN",
	},
	{
		title: "Infinite",
		description: "For serious agency owners",
		price: "$67",
		duration: "lifetime",
		highlight: "Everything in Solopreneur, plus",
		features: [
			"Unlimited domains ",
			"Unlimited contacts",
			"Unlimited Emails per month",
		],
		priceId: "price_1OYxkqFj9oKEERu1NbKUxXxN",
	},
];

export const EMAIL_MARKETING_HEADER = ["Id", "Email", "Domain", "Status"];

export const dashboardSidebar = [
	{ href: "/dashboard", label: "Dashboard", icon: Home },
	{ href: "/dashboard/email-marketing", label: "Email Marketing", icon: Mail },
	{ href: "/dashboard/audience", label: "Audience", icon: UserIcon },
	{ href: "/dashboard/campaign", label: "Campaign", icon: PenIcon },
	{ href: "/dashboard/view", label: "Analytics", icon: LineChart },
	{ href: "/dashboard/chat-integration", label: "Chat Integration", icon: BotIcon },
	{ href: "/dashboard/marketplace", label: "Top Sites", icon: Globe },
	// gufffy ahh
	{ href: "/dashboard/feedbacks", label: "Feedbacks", icon: MessageSquare },
	{ href: "/credits", label: "Credits", icon: DollarSignIcon },
	{ href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export const DefaultJsonData = {
	counters: {
		u_column: 1,
		u_row: 1,
		u_content_text: 1,
	},
	body: {
		id: "Kc7Fn0stSP",
		rows: [
			{
				id: "6YQJAqv3UT",
				cells: [1],
				columns: [
					{
						id: "exy50lfXe7",
						contents: [
							{
								id: "WMQpmIVKz9",
								type: "text",
								values: {
									containerPadding: "20px",
									anchor: "",
									fontSize: "18px", // Elegant and larger text size
									textAlign: "center", // Centered for elegance
									lineHeight: "150%",
									linkStyle: {
										inherit: true,
										linkColor: "#000", // Black text for all links
										linkHoverColor: "#000",
										linkUnderline: true,
										linkHoverUnderline: true,
									},
									_meta: {
										htmlID: "u_content_text_1",
										htmlClassNames: "u_content_text",
									},
									selectable: true,
									draggable: true,
									duplicatable: true,
									deletable: true,
									hideable: true,
									text: `
					  <h1 style="margin: 0; padding: 10px 0px; line-height: 140%; text-align: center; font-weight: bold; font-size: 28px; color: #000;">
						Aethera UI
					  </h1>
					  <p style="margin: 0; padding: 10px 0px; line-height: 140%; text-align: center; font-size: 18px; color: #000;">
						A highly customizable component library built for modern web applications. 
						Perfect for developers who value simplicity and scalability. 
						Clean code, elegant designs, and powerful functionality.
					  </p>
					  <p style="margin: 0; padding: 10px 0px; line-height: 140%; text-align: center; font-size: 24px; font-weight: bold; color: #000;">
						Coming Soon
					  </p>
					`,
								},
							},
						],
						values: {
							backgroundColor: "#FFFFFF", // White background for clarity
							padding: "0px",
							_meta: {
								htmlID: "u_column_1",
								htmlClassNames: "u_column",
							},
						},
					},
				],
				values: {
					padding: "20px",
					_meta: {
						htmlID: "u_row_1",
						htmlClassNames: "u_row",
					},
					selectable: true,
					draggable: true,
					duplicatable: true,
					deletable: true,
					hideable: true,
				},
			},
		],
		values: {
			popupPosition: "center",
			popupWidth: "600px",
			popupHeight: "auto",
			borderRadius: "15px",
			contentAlign: "center",
			contentVerticalAlign: "center",
			contentWidth: "500px",
			fontFamily: {
				label: "Poppins",
				value: "poppins,helvetica,sans-serif", // Elegant sans-serif font
			},
			popupBackgroundColor: "#FFFFFF", // Clean white background for a minimalist approach
			popupOverlay_backgroundColor: "rgba(0, 0, 0, 0.3)", // Subtle black overlay
			popupCloseButton_position: "top-right",
			popupCloseButton_backgroundColor: "#000000", // Black close button
			popupCloseButton_iconColor: "#FFFFFF", // White icon for contrast
			popupCloseButton_borderRadius: "50%", // Circular button for elegance
			popupCloseButton_margin: "5px",
			popupCloseButton_action: {
				name: "close_popup",
				attrs: {
					onClick:
						"document.querySelector('.u-popup-container').style.display = 'none';",
				},
			},
			backgroundColor: "#FFFFFF",
			linkStyle: {
				body: true,
				linkColor: "#000000",
				linkHoverColor: "#000000",
				linkUnderline: true,
				linkHoverUnderline: true,
			},
			_meta: {
				htmlID: "u_body",
				htmlClassNames: "u_body",
			},
		},
	},
	schemaVersion: 16,
};
