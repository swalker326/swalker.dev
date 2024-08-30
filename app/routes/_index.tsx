import type { MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPosts } from "~/server/posts.server";
import { titleToSlug } from "./blog._index";
import { format } from "date-fns";
import { Card } from "~/components/ui/card";
import { SkillsSection } from "~/components/SkillsSection";
import TypingComponent from "~/components/TypingComponent";

export const meta: MetaFunction = () => {
  return [
    { title: "Swalker.dev" },
    { name: "description", content: "A portfolio and blog for Shane Walker" }
  ];
};

export async function loader() {
  return { blogs: await getPosts() };
}

export default function Index() {
  const { blogs } = useLoaderData<typeof loader>();

  return (
    <div className="pt-5 flex flex-col gap-12 pb-12">
      <div id="about" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-center">
          <TypingComponent fullText="Shane Walker" />
        </div>
        <div className=" flex flex-col gap-4 justify-center">
          <p className="text-lg">
            I&apos;m a passionate and self-taught software engineer with a rich
            experience spanning over five years in the tech industry. My journey
            has led me to master JavaScript & TypeScript. I&apos;ve also had the
            pleasure of working with Go, Rust, Kotlin & Python at length. I
            pride myself on my proficiency in DevOps and deployment processes,
            with a particular focus on Docker, which I&apos;ve leveraged in
            environments handling the demands of millions of users across
            diverse sectors.
          </p>

          <p className="text-lg">
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
      <SkillsSection />
      <div>
        <h2 className="text-4xl mb-6 font-bold ">Recent Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
          {blogs.map(({ title, createdAt, description }) => (
            <div key={titleToSlug(title)} className="w-full h-32">
              <Card className="w-full h-full">
                <Link
                  prefetch="intent"
                  id={titleToSlug(title)}
                  to={`/blog/${titleToSlug(title)}`}
                >
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex-grow h-full">
                    <div className=" group items-end gap-x-2 hover:underline hover:text-blue-700 dark:hover:text-blue-500 transition-all duration-200 ease-in-out">
                      <h3 className="text-2xl ">{title}</h3>
                      <h4 className="text-gray-800 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-500 font-thin">
                        {format(createdAt, "MMM dd, yyyy")}
                      </h4>
                    </div>

                    <p>{description}</p>
                  </div>
                </Link>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
