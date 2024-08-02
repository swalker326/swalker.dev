import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { FlattenedErrors } from "~/server/work.server";

export function ErrorBoundary() {
	const error = useRouteError();
	console.log(error);
	if (error && typeof error === "object" && "fieldErrors" in error) {
		const zodError = error as FlattenedErrors;
		return (
			<div>
				<h1>Invalid Data</h1>
				<p>The following errors occurred:</p>
				<ul>
					{Object.entries(zodError.fieldErrors).map(([field, value]) => (
						<li key={`${field}-${value.length}`}>
							field {field}: {value.join(", ")}
						</li>
					))}
				</ul>
			</div>
		);
	}
	if (isRouteErrorResponse(error)) {
		return (
			<div>
				<h1>
					{error.status} {error.statusText}
				</h1>
				<p>{error.data}</p>
			</div>
		);
	}
	if (error instanceof Error) {
		return (
			<div>
				<h1>Error</h1>
				<p>{error.message}</p>
				<p>The stack trace is:</p>
				<pre>{error.stack}</pre>
			</div>
		);
	}
	return <h1>Unknown Error</h1>;
}
