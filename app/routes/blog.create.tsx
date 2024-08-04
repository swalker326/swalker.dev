import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Form, json, redirect, useActionData } from "@remix-run/react";
import { PostCreateSchema } from "~/db/schema";
import { createPost } from "~/server/posts.server";
import { Button } from "~/components/ui/button";
import { ConformInput } from "~/components/ConformInput";
import { ConformTextarea } from "~/components/ConformTextarea";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
	//require me to be logged in
	const isAuth = await authenticator.isAuthenticated(request);
	if (isAuth && isAuth.email === "shane@swalker.dev") {
		return json({});
	}
	return redirect("/login");
}
export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const submission = parseWithZod(formData, { schema: PostCreateSchema });
	if (submission.status !== "success") return submission.reply();

	const id = await createPost(submission.value);
	if (id[0].id) {
		submission.value.isPublished
			? redirect(`/posts/${submission.value.slug}`)
			: redirect(`/drafts/${submission.value.slug}`);
	}
	return new Response("Failed to create entry", { status: 500 });
}

export default function CreateEntry() {
	const lastResult = useActionData<typeof action>();
	const [form, fields] = useForm({
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
		lastResult,
		constraint: getZodConstraint(PostCreateSchema),
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: PostCreateSchema });
		},
	});
	return (
		<div>
			<h2 className="font-semibold text-5xl pb-2">Create</h2>
			<Form method="post" {...getFormProps(form)}>
				<div className="flex flex-col gap-2">
					<ConformInput field={fields.slug} placeholder="Slug" />
					<ConformInput field={fields.title} placeholder="Title" />
					<ConformInput field={fields.description} placeholder="Description" />
					<ConformTextarea field={fields.content} placeholder="Content" />
					<div className="flex gap-2 w-full flex-row-reverse">
						<div className="flex items-center gap-2">
							<input
								{...getInputProps(fields.isPublished, { type: "checkbox" })}
							/>
							<label htmlFor="isPublished">Published</label>
						</div>
						<div className="flex items-center gap-2">
							<input
								{...getInputProps(fields.isFeatured, { type: "checkbox" })}
							/>
							<label htmlFor="isFeatured">Featured</label>
						</div>
					</div>
				</div>
				<div>
					<Button type="submit">Create</Button>
				</div>
			</Form>
		</div>
	);
}
