import { Authenticator } from "remix-auth";
import { authSessionStorage } from "~/services/authSession.server";
import { gitHubStrategy } from "./github.server";
import { session, type SelectUser } from "~/db/schema";
import { redirect } from "@remix-run/node";
import { db } from "~/db";
import { eq } from "drizzle-orm";
import { combineHeaders } from "~/utils/misc";

export const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30; // 30 days
export const getSessionExpirationDate = () => {
	return new Date(Date.now() + SESSION_EXPIRATION_TIME);
};

export const sessionKey = "sessislaonId";

export async function getUserId(request: Request) {
	const authSession = await authSessionStorage.getSession(
		request.headers.get("cookie"),
	);
	const sessionId = authSession.get(sessionKey);
	if (!sessionId) return null;
	const session = await db.query.session.findFirst({
		with: { user: true },
		columns: { id: true, expirationDate: true },
		where: (session, { eq, and, gt }) =>
			and(eq(session.id, sessionId), gt(session.expirationDate, new Date())),
	});

	if (!session?.user) {
		throw redirect("/", {
			headers: {
				"set-cookie": await authSessionStorage.destroySession(authSession),
			},
		});
	}
	return session.user.id;
}

export async function requireUserId(
	request: Request,
	{ redirectTo }: { redirectTo?: string | null } = {},
) {
	const userId = await getUserId(request);
	if (!userId) {
		const requestUrl = new URL(request.url);
		redirectTo =
			redirectTo === null
				? null
				: redirectTo ?? `${requestUrl.pathname}${requestUrl.search}`;
		const loginParams = redirectTo ? new URLSearchParams({ redirectTo }) : null;
		const loginRedirect = ["/auth/login", loginParams?.toString()]
			.filter(Boolean)
			.join("?");
		throw redirect(loginRedirect);
	}
	return userId;
}

export async function logout(
	{
		request,
		redirectTo = "/",
	}: {
		request: Request;
		redirectTo?: string;
	},
	responseInit?: ResponseInit,
) {
	const authSession = await authSessionStorage.getSession(
		request.headers.get("cookie"),
	);
	const sessionId = authSession.get(sessionKey);
	// if this fails, we still need to delete the session from the user's browser
	// and it doesn't do any harm staying in the db anyway.
	// todo: Void is from epic stack. Why void? What is void?
	if (sessionId) {
		void db.delete(session).where(eq(session.id, sessionId));
	}
	throw redirect(redirectTo, {
		...responseInit,
		headers: combineHeaders(
			{ "set-cookie": await authSessionStorage.destroySession(authSession) },
			responseInit?.headers,
		),
	});
}

export const authenticator = new Authenticator<SelectUser>(authSessionStorage);
authenticator.use(gitHubStrategy);
