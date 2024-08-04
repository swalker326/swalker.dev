import { type FieldMetadata, getInputProps } from "@conform-to/react";
import { Input } from "./ui/input";

export const ConformInput = ({
	field,
	placeholder,
}: {
	field: FieldMetadata;
	placeholder: string;
}) => {
	return (
		<div>
			<Input
				{...getInputProps(field, { type: "text" })}
				placeholder={placeholder}
			/>
			<div id={field.errorId}>{field.errors}</div>
		</div>
	);
};
