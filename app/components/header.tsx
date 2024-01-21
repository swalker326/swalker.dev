import { Navigation } from "~/components/navigation";
import { ModeToggle } from "./theme-switch";

export function Header() {
	return (
		<div className="flex justify-between">
			<div>
				<h1 className="text-3xl font-bold tracking-wider">
					swalker.<span className="text-blue-700 dark:text-blue-500">dev</span>
				</h1>
				<Navigation />
			</div>
			<ModeToggle />
		</div>
	);
}
