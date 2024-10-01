import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware((auth, req: NextRequest) => {
	const url = req.nextUrl;

	const hostname = req.headers
		.get("host")!
		.replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
		// undefined aa rha hai iski maa ka bhosda
	console.log(process.env.NEXT_PUBLIC_ROOT_DOMAIN);

	const searchParams = req.nextUrl.searchParams.toString();
	const path = `${url.pathname}${
		searchParams.length > 0 ? `?${searchParams}` : ""
	}`;

	if (
		hostname === "localhost:3000" ||
		hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
	) {
		if (isProtectedRoute(req)) {
			auth().protect();
		}

		return NextResponse.rewrite(
			new URL(`/app${path === "/" ? "" : path}`, req.url)
		);
	}

	if (hostname === `ui.${process.env.NEXT_PUBLIC_WEBSITE_URL}`) {
		return NextResponse.redirect("https://abhijit.com");
	}

	// `/[domain]/[slug] dynamic route`
	return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
});

export const config = {
	matcher: [
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		"/(api|trpc)(.*)",
	],
};
