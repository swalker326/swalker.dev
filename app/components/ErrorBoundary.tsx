import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { ZodError } from "zod";

export function ErrorBoundary() {
	const error = useRouteError();
	console.log(error);
	if (error && error instanceof ZodError) {
		const zodError = error;
		return (
			<div>
				<h1>Invalid Data</h1>
				<p>The following errors occurred:</p>
				<ul>
					{Object.entries(zodError.errors).map(([field, value]) => (
						<li key={`${field}-${value.code}`}>
							field {field}: {value.message}
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
