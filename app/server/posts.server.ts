import { PostPayload, PostPayloadSchema } from "~/utils/posts";
import { getMDX, getMDXByName } from "./dataFetching";

const path = "content/posts";

export const getPosts = async () => {
	const posts = await getMDX<PostPayload>({
		path,
		schema: PostPayloadSchema,
	});
	return posts;
};
export const getPostByName = async (name: string) => {
	return await getMDXByName<PostPayload>({
		name,
		schema: PostPayloadSchema,
		path,
	});
};
