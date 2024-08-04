import { GitHubStrategy } from "remix-auth-github";
import { db } from "~/db";
import { userTable } from "~/db/schema";
import { eq } from "drizzle-orm";
import { add } from "date-fns";
import { getSessionExpirationDate } from "./auth.server";

if (!process.env.GITHUB_CLIENT_ID) {
	throw new Error("No GitHub client ID provided");
}
if (!process.env.GITHUB_CLIENT_SECRET) {
	throw new Error("No GitHub client secret provided");
}

export const gitHubStrategy = new GitHubStrategy(
	{
		clientID: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET,
		callbackURL: "/auth/github/callback",
	},
	async ({ accessToken, extraParams, profile }) => {
		extraParams.accessTokenExpiresIn;
		const [user] = await db
			.select()
			.from(userTable)
			.where(eq(userTable.email, profile.emails[0].value));
		if (user) {
			return user;
		}

		const [newUser] = await db
			.insert(userTable)
			.values({
				email: profile.emails[0].value,
				sessionExpirationDate: getSessionExpirationDate(),
				token: accessToken,
			})
			.returning();
		return newUser;
	},
);
