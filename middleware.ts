import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware((auth, req: NextRequest) => {
	const url = req.nextUrl;

	const hostname = req.headers.get("host")!;

	const searchParams = req.nextUrl.searchParams.toString();
	const path = `${url.pathname}${
		searchParams.length > 0 ? `?${searchParams}` : ""
	}`;

	if (hostname === "aethera.online") {
		if (isProtectedRoute(req)) {
			auth().protect();
		}

		return NextResponse.rewrite(
			new URL(`/app${path === "/" ? "" : path}`, req.url)
		);
	}

	if (hostname === `ui.aethera.online`) {
		return NextResponse.redirect("https://abhijee.com");
	}

	if (hostname.endsWith('.aethera.online') && hostname !== 'aethera.online') {
		const subdomain = hostname.replace('.aethera.online', '');
		return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
	}

	if (hostname === "localhost:3000") {
		if (isProtectedRoute(req)) {
			auth().protect();
		}

		return NextResponse.rewrite(
			new URL(`/app${path === "/" ? "" : path}`, req.url)
		);
	}

	if (hostname.endsWith('.localhost:3000') && hostname !== 'localhost:3000') {
		const subdomain = hostname.replace('.localhost:3000', '');
		return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
	}

	return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
});

export const config = {
	matcher: [
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		"/(api|trpc)(.*)",
	],
};
