import { Link } from "@remix-run/react";
import { Github, Twitter } from "lucide-react";

export function Footer() {
	return (
		<footer className=" w-full flex justify-center items-center border-t py-3 px-1.5 dark:border-gray-300">
			<div className="flex justify-between w-full">
				<div className="flex flex-col gap-2">
					<Link
						target="__blank"
						to="https://www.buymeacoffee.com/swalker326w"
						className="text-blue-700 dark:text-blue-500"
					>
						Buy Me a Coffee
					</Link>
				</div>
				<div className="flex gap-2 text-black dark:text-white">
					<Link target="__blank" to="https://www.github.com/swalker326">
						<span className="sr-only">Github</span>
						<Github />
					</Link>
					<Link target="__blank" to="https://www.x.com/swalker326">
						<span className="sr-only">Twitter/X</span>
						<Twitter />
					</Link>
				</div>
			</div>
		</footer>
	);
}
