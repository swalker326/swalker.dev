import { db } from "~/db";
import { type ProjectInsert, projectTable } from "~/db/schema/projects";
import { eq } from "drizzle-orm";

export async function getProjectById(projectId: number) {
	const [project] = await db
		.select()
		.from(projectTable)
		.where(eq(projectTable.id, projectId))
		.limit(1);
	return project;
}

export async function createProject(
	project: Omit<ProjectInsert, "file">,
	file: string,
) {
	const projectWithFile = { ...project, media: file };
	const [{ id }] = await db
		.insert(projectTable)
		.values(projectWithFile)
		.returning({ id: projectTable.id });
	return id;
}
