import { z } from "zod";
import { getMDX, getMDXByName } from "./dataFetching";
import { WorkPayload, WorkPayloadSceham } from "~/utils/works";

export const getWorks = async () => {
	const works = await getMDX<WorkPayload>({
		schema: WorkPayloadSceham,
		path: "content/work",
	});
	return works;
};

export const getWorkByName = async (name: string) => {
	return await getMDXByName<WorkPayload>({
		name,
		schema: WorkPayloadSceham,
		path: "content/work",
	});
};
