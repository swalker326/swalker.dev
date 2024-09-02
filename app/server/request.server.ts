import { parseMultipartRequest as MJParseMultipartRequest } from "@mjackson/multipart-parser";
import { nanoid } from "nanoid";

export const parseMultipartRequest = async (request: Request) => {
	// logRequestBody(request);
	const responseObject = new FormData();
	for await (const part of MJParseMultipartRequest(request, {
		maxFileSize: 55000000,
	})) {
		if (!part.name) {
			continue;
		}

		if (part.isFile) {
			if (!part.filename) {
				continue;
			}
			const uniqueFilename = `${nanoid()}-${part.filename}`;
			const blob = new Blob([await part.bytes()], { type: part.mediaType });
			if (blob.size !== 0) {
				responseObject.append(part.name, blob, uniqueFilename);
			}
		} else {
			responseObject.append(part.name, await part.text());
		}
	}
	return responseObject;
};

// export async function writeStreamToFile(
// 	filename: string,
// 	stream: ReadableStream<Uint8Array>,
// ) {
// 	const tmpDir = os.tmpdir();
// 	const tmpFilename = path.join(tmpDir, filename);
// 	const file = fsync.createWriteStream(tmpFilename);
// 	let bytesWritten = 0;

// 	//@ts-expect-error - The stream is not a Node.js stream
// 	for await (const chunk of stream) {
// 		file.write(chunk);
// 		bytesWritten += chunk.byteLength;
// 	}

// 	file.end();

// 	return { size: bytesWritten, path: tmpFilename };
// }

// use for debugging
// async function stringifyReadableStreamBody(request: Request): Promise<string> {
// 	const reader = request.body?.getReader();
// 	const decoder = new TextDecoder();
// 	let result = "";
// 	if (!reader) {
// 		return result;
// 	}

// 	while (true) {
// 		const { done, value } = await reader.read();
// 		if (done) break;
// 		result += decoder.decode(value, { stream: true });
// 	}

// 	// Final decode to ensure any remaining bits are flushed
// 	result += decoder.decode();

// 	return result;
// }

// async function logRequestBody(request: Request) {
// 	try {
// 		const bodyString = await stringifyReadableStreamBody(request);
// 		console.log("Request body:");
// 		console.log(bodyString);
// 	} catch (error) {
// 		console.error("Error reading request body:", error);
// 	}
// }
