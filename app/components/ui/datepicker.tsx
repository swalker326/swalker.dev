"use client";

import * as React from "react";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover";
import { type FieldMetadata, unstable_useControl } from "@conform-to/react";

export function DatePicker({ meta }: { meta: FieldMetadata<Date> }) {
	const control = unstable_useControl(meta);
	const triggerRef = React.useRef<HTMLButtonElement>(null);
	// Function to convert date to ISO string while preserving local time
	const dateToLocalISOString = (date: Date) => {
		const offset = date.getTimezoneOffset();
		const localDate = new Date(date.getTime() - offset * 60 * 1000);
		return localDate.toISOString().split("T")[0];
	};

	// Function to parse ISO string to local date
	const parseLocalISOString = (isoString: string) => {
		const date = parseISO(isoString);
		return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
	};

	return (
		<div>
			<input
				className="sr-only"
				aria-hidden
				tabIndex={-1}
				ref={control.register}
				name={meta.name}
				defaultValue={
					meta.initialValue
						? dateToLocalISOString(new Date(meta.initialValue))
						: ""
				}
				onFocus={() => {
					triggerRef.current?.focus();
				}}
			/>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						ref={triggerRef}
						variant={"outline"}
						className={cn(
							"w-[280px] justify-start text-left font-normal",
							!control.value && "text-muted-foreground",
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{control.value ? (
							format(parseLocalISOString(control.value), "PPP")
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="single"
						selected={
							control.value ? parseLocalISOString(control.value) : undefined
						}
						onSelect={(value) => {
							control.change(value ? value.toISOString() : "");
							return value;
						}}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
