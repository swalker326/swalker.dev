import { json, redirect, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { getProjectById } from "~/server/projects.server";
import { getPresignedUrlFromStorage } from "~/server/utils/storage.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const projectId = params.projectId;
  if (!projectId) {
    return redirect("/projects");
  }
  const project = await getProjectById(Number.parseInt(projectId));
  if (!project) {
    throw new Error("Project not found");
  }
  const media = await getPresignedUrlFromStorage(project.media);
  project.media = media;
  return json({ project });
}

export default function ProjectRoute() {
  const { project } = useLoaderData<typeof loader>();
  return (
    <section className="py-4">
      <div>
        {project.media ? (
          <img
            className="w-full h-96 object-contain rounded-md"
            src={project.media}
            alt={`${project.title}-image`}
          />
        ) : null}
        <h1 className="text-6xl">{project.title}</h1>
        {/* <section>
        
      </section> */}
        <Markdown rehypePlugins={[rehypeRaw]}>{project.content}</Markdown>
      </div>
    </section>
  );
}
