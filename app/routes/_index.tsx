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
				className="w-full flex justify-center gap-x-6 flex-col sm:flex-row "
			>
				<div className="sm:w-1/2 flex items-center pb-6 sm:pb-0 min-h-96">
					<picture>
						<source srcSet="headshot_desktop.jpg" media="(min-width: 1024px)" />
						<source srcSet="headshot_tablet.jpg" media="(min-width: 768px)" />
						<source srcSet="headshot_mobile.jpg" media="(max-width: 767px)" />
						<img src="headshot_desktop.jpg" alt="shane's headshot" />
					</picture>
				</div>
				<div className="prose lg:prose-xl dark:prose-invert sm:w-1/2 min-h-32">
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
			<h2 className="text-4xl mb-6 font-bold text-blue-700 dark:text-blue-500">
				Recent Blogs
			</h2>
			<div className="pb-6">
				<swiper-container
					style={{
						"--swiper-navigation-color": "#fff",
						"--swiper-pagination-color": "#000",
					}}
					slides-per-view="3"
					navigation={true}
					pagination={true}
					autoHeight={true}
				>
					{blogs.map((blog) => (
						<swiper-slide key={blog.slug}>
							<div className="mr-3 h-[10rem]">
								<Link
									prefetch="intent"
									id={blog.slug}
									to={`/blog/${blog.slug}`}
								>
									<div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex-grow h-full">
										<div className=" group items-end gap-x-2 hover:underline hover:text-blue-700 dark:hover:text-blue-500 transition-all duration-200 ease-in-out">
											<h3 className="text-2xl ">{blog.frontmatter.title}</h3>
											<h4 className="text-gray-800 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-500 font-thin">
												{blog.frontmatter.published}
											</h4>
										</div>

										<p>{blog.frontmatter.description}</p>
									</div>
								</Link>
							</div>
						</swiper-slide>
					))}
				</swiper-container>
			</div>
		</div>
	);
}
