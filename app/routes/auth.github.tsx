// app/routes/auth/github.tsx
import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export async function loader() {
	return redirect("/login");
}

export async function action({ request }: ActionFunctionArgs) {
	try {
		return await authenticator.authenticate("github", request);
	} catch (error: unknown) {
		// console.error("Error Logging In With Github", error);
		if (error instanceof Response) {
			console.log(error.status);
			console.log(error.statusText);
			const formData = await request.formData();
			for (const value of formData.values()) {
				console.log(value);
			}
			const rawRedirectTo = formData.get("redirectTo");
			const redirectTo = typeof rawRedirectTo === "string" && rawRedirectTo;
			// console.log(error);
		}
		throw error;
	}
}
