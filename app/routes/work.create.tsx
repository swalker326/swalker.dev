import type { ActionFunctionArgs } from "@remix-run/node";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Form, redirect, useActionData } from "@remix-run/react";
import { WorkCreateSchema } from "~/db/schema";
import { createPost } from "~/server/posts.server";
import { Button } from "~/components/ui/button";
import { ConformInput } from "~/components/ConformInput";
import { ConformTextarea } from "~/components/ConformTextarea";
import { createWork } from "~/server/work.server";
import { DatePicker } from "~/components/ui/datepicker";

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const submission = parseWithZod(formData, { schema: WorkCreateSchema });
	if (submission.status !== "success") return submission.reply();

	const id = await createWork(submission.value);
	if (id[0].id) {
		return redirect(`/work/${submission.value.slug}`);
	}

	return new Response("Failed to create entry", { status: 500 });
}

export default function CreateEntry() {
	const lastResult = useActionData<typeof action>();
	const [form, fields] = useForm({
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
		lastResult,
		constraint: getZodConstraint(WorkCreateSchema),
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: WorkCreateSchema });
		},
	});
	console.log("ERRORS", form.allErrors);
	console.log("::Values", form.value);
	return (
		<div>
			<h2 className="font-semibold text-5xl pb-2">Create</h2>
			<Form method="post" {...getFormProps(form)}>
				<div className="flex flex-col gap-2">
					<ConformInput field={fields.slug} placeholder="Slug" />
					<ConformInput field={fields.position} placeholder="Position" />
					<ConformInput field={fields.place} placeholder="Place" />
					<ConformInput field={fields.description} placeholder="Description" />
					<div className="flex gap-3">
						<div>
							Start Date
							<DatePicker meta={fields.start} />
						</div>
						<div>
							End Date
							<DatePicker meta={fields.end} />
						</div>
					</div>
					<ConformTextarea field={fields.content} placeholder="Content" />
					<div className="flex items-center gap-2 w-full flex-row-reverse">
						<input
							{...getInputProps(fields.isFeatured, { type: "checkbox" })}
						/>
						<label htmlFor="isFeatured">Featured</label>
					</div>
				</div>
				<div>
					<Button type="submit">Create</Button>
				</div>
			</Form>
		</div>
	);
}
