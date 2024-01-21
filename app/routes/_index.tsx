import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [{ title: "Swalker.dev" }, { name: "description", content: "Hello" }];
};

export default function Index() {
	return (
		<div className="pt-5">
			<div
				id="cta"
				className="bg-white dark:bg-gray-800 rounded-md w-full flex justify-center p-2 flex-col"
			>
				<h2 className="text-3xl pb-2">👋 Hello</h2>
				<p>
					I'm Shane Walker, a passionate and self-taught software engineer with
					a rich experience spanning over five years in the tech industry. My
					journey has led me to master JavaScript & TypeScript. I've also had
					the pleasure of working with Go, Rust & Python at length. I pride
					myself on my proficiency in DevOps and deployment processes, with a
					particular focus on Docker, which I've leveraged in environments
					handling the demands of millions of users across diverse sectors.
				</p>

				<p className="pt-2">
					My career has been a blend of empowering small businesses to transcend
					their limits and being an integral part of a team that successfully
					executed large-scale projects, each a 10,000-yard march in its own
					right. At the core of my professional ethos is a commitment to solving
					complex business challenges, particularly in navigating and optimizing
					across different cloud providers. My goal is always to harness
					technology to forge new paths and possibilities, whether for a
					burgeoning startup or a well-established enterprise.
				</p>
			</div>
		</div>
	);
}
