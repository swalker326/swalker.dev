// app/services/session.server.ts
import { createCookieSessionStorage } from "@remix-run/node";

// export the whole sessionStorage object
export const authSessionStorage = createCookieSessionStorage({
	cookie: {
		name: "_auth_session",
		sameSite: "lax", // this helps with CSRF
		path: "/", // remember to add this so the cookie will work in all routes
		maxAge: 60 * 10, // 10 minutes
		httpOnly: true, // for security reasons, make this cookie http only
		secrets: ["s3cr3t"], // replace this with an actual secret
		secure: process.env.NODE_ENV === "production", // enable this in prod only
	},
});

// you can also export the methods individually for your own usage
export const { getSession, commitSession, destroySession } = authSessionStorage;
