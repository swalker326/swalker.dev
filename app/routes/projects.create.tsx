import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useActionData } from "@remix-run/react";
import { PlusIcon } from "lucide-react";
import { ConformInput } from "~/components/ConformInput";
import { ConformTextarea } from "~/components/ConformTextarea";
import { Button } from "~/components/ui/button";
import { ProjectInsertSchema } from "~/db/schema";
import { createProject } from "~/server/projects.server";
import { parseMultipartRequest } from "~/server/request.server";
import { uploadFileToStorage } from "~/server/utils/storage.server";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: ActionFunctionArgs) {
  const auth = await authenticator.isAuthenticated(request);
  if (!auth || auth.email !== "shane@swalker.dev") {
    return redirect("/login");
  }
  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  // const isAuth = await authenticator.isAuthenticated(request);
  // if (!isAuth || isAuth.email !== "shane@swalker.dev") {
  //   return redirect("/login");
  // }
  const multipartRequestResponse = await parseMultipartRequest(request);
  const submission = parseWithZod(multipartRequestResponse, {
    schema: ProjectInsertSchema
  });
  if (submission.status !== "success") return submission.reply();
  const uploadedFile = await uploadFileToStorage(submission.value.media);
  const id = await createProject(submission.value, uploadedFile);
  return redirect(`/projects/${id}`);
}
export default function ProjectCreateRoute() {
  const lastResult = useActionData<typeof action>();
  const [form, fields] = useForm({
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    lastResult,
    constraint: getZodConstraint(ProjectInsertSchema),
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: ProjectInsertSchema });
    }
  });
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-6xl">New Project</h2>
      <Form
        method="post"
        {...getFormProps(form)}
        encType="multipart/form-data"
        className="gap-2 flex flex-col"
      >
        <ConformInput field={fields.title} placeholder="Title" />
        <h3 className="text-3xl">Links</h3>
        <ConformInput field={fields.liveCode} placeholder="Live Code" />
        <ConformInput field={fields.repoLink} placeholder="Repo Link" />
        <h3 className="text-3xl">Details</h3>
        <ConformTextarea
          field={fields.description}
          placeholder="Short Description"
        />
        <ConformTextarea
          field={fields.content}
          placeholder="Markdown Content"
        />
        <input {...getInputProps(fields.media, { type: "file" })} type="file" />
        <div className="flex items-center gap-2">
          <input {...getInputProps(fields.isPublished, { type: "checkbox" })} />
          <label htmlFor="isPublished">Published</label>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </div>
  );
}
