import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { gitHubStrategy } from "./github.server";
import type { SelectUser } from "~/db/schema";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<SelectUser>(sessionStorage);
authenticator.use(gitHubStrategy);
