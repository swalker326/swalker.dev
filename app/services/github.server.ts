import { GitHubStrategy } from "remix-auth-github";
import { db } from "~/db";
import { userTable } from "~/db/schema";
import { eq } from "drizzle-orm";
import { add } from "date-fns";

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
		if (!extraParams.accessTokenExpiresIn) {
			throw new Error("Missing access token expiration date");
		}
		const [newUser] = await db
			.insert(userTable)
			.values({
				email: profile.emails[0].value,
				sessionExpirationDate: add(new Date(), {
					seconds: extraParams.accessTokenExpiresIn * 1000,
				}),
				token: accessToken,
			})
			.returning();
		return newUser;
	},
);
