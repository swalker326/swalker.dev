import { Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "remix-themes";
import { Toggle } from "@radix-ui/react-toggle";

export function ModeToggle() {
	const [theme, setTheme] = useTheme();

	return (
		<div className="mr-2 rounded-lg">
			<Toggle
				aria-label="Toggle dark mode"
				className="transition-colors duration-200 p-4 relative border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
				onClick={(e) => {
					e.preventDefault();
					setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
				}}
			>
				<Sun className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 duration-75" />
				<Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 duration-75" />
				<span className="sr-only">Toggle theme</span>
			</Toggle>
		</div>
	);
}
