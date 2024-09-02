import { StorageFactory } from "./storage/StorageFactory";

export async function uploadFileToStorage(file: File): Promise<string> {
	const bucket = process.env.STORAGE_BUCKET;
	if (!bucket) {
		throw new Error("Missing bucket name");
	}
	const storageProvider = StorageFactory.createStorageProvider("aws", bucket);
	const uploadedFile = await storageProvider.uploadFile({
		data: file.stream(),
		destination: "uploads",
		name: file.name,
	});
	return uploadedFile;
}

export async function getPresignedUrlFromStorage(
	name: string,
): Promise<string> {
	const bucket = process.env.STORAGE_BUCKET;
	if (!bucket) {
		throw new Error("Missing bucket name");
	}
	const storageProvider = StorageFactory.createStorageProvider("aws", bucket);
	const signedUrl = await storageProvider.getSignedUrl(name);
	return signedUrl;
}
