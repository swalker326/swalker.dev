import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Separator } from "~/components/ui/separator";
import { getPosts } from "~/server/posts.server";

export const meta: MetaFunction = () => {
	return [
		{ title: "Swalker.dev" },
		{ name: "description", content: "A portfolio and blog for Shane Walker" },
	];
};

export async function loader() {
	return { blogs: await getPosts() };
}

export default function Index() {
	const { blogs } = useLoaderData<typeof loader>();
	return (
		<div className="pt-5">
			<div
				id="about"
				className="w-full flex justify-center gap-x-6 flex-col sm:flex-row"
			>
				<div className="sm:w-1/2 flex items-center pb-6 sm:pb-0">
					<img
						className="rounded-md"
						src="/headshot.jpeg"
						alt="shane headshot"
					/>
				</div>
				<div className="prose lg:prose-xl dark:prose-invert sm:w-1/2">
					<h2 className="not-prose text-4xl">👋 Hello</h2>
					<p>
						I'm Shane Walker, a passionate and self-taught software engineer
						with a rich experience spanning over five years in the tech
						industry. My journey has led me to master JavaScript & TypeScript.
						I've also had the pleasure of working with Go, Rust, Kotlin & Python
						at length. I pride myself on my proficiency in DevOps and deployment
						processes, with a particular focus on Docker, which I've leveraged
						in environments handling the demands of millions of users across
						diverse sectors.
					</p>

					<p>
						My career has been a blend of empowering small businesses to
						transcend their limits and being an integral part of a team that
						successfully executed large-scale projects, each a 10,000-yard march
						in its own right. At the core of my professional ethos is a
						commitment to solving complex business challenges, particularly in
						navigating and optimizing across different cloud providers. My goal
						is always to harness technology to forge new paths and
						possibilities, whether for a burgeoning startup or a
						well-established enterprise.
					</p>
				</div>
			</div>
			<Separator className="my-8" />
			<h2 className="text-4xl mb-6">Recent Blogs</h2>
			<swiper-container
				style={{
					"--swiper-navigation-color": "#fff",
					"--swiper-pagination-color": "#000",
				}}
				slides-per-view="3"
				navigation={true}
				pagination={true}
			>
				{blogs.map((blog) => (
					<swiper-slide key={blog.slug}>
						<Link prefetch="intent" id={blog.slug} to={`/blog/${blog.slug}`}>
							<div className="items-end gap-x-2 hover:bg-gray-100">
								<h3 className="text-2xl ">{blog.frontmatter.title}</h3>
								<h4 className="text-gray-800 font-thin">
									{blog.frontmatter.published}
								</h4>
							</div>

							<p>{blog.frontmatter.description}</p>
						</Link>
					</swiper-slide>
				))}
			</swiper-container>
		</div>
	);
}
