import { type FieldMetadata, getTextareaProps } from "@conform-to/react";
import { Textarea } from "./ui/textarea";

export const ConformTextarea = ({
	field,
	placeholder,
}: {
	field: FieldMetadata;
	placeholder: string;
}) => {
	return (
		<div>
			<Textarea {...getTextareaProps(field)} placeholder={placeholder} />
			<div id={field.errorId}>{field.errors}</div>
		</div>
	);
};
