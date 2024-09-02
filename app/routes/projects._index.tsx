import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ListCard } from "~/components/ListCard";
import { SectionHeader } from "~/components/SectionHeader";
import { db } from "~/db";
import { projectTable } from "~/db/schema";

export async function loader() {
  const projects = await db.select().from(projectTable);
  return json({ projects });
}
export default function ProjectIndexRoute() {
  const { projects } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col gap-3">
      <SectionHeader>Projects</SectionHeader>
      {projects.map((project) => (
        <ListCard
          key={project.id}
          title={project.title}
          description={project.description}
          to={`/projects/${project.id}`}
        />
      ))}
    </div>
  );
}
