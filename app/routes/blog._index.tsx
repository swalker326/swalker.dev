import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ListCard } from "~/components/ListCard";
import { SectionHeader } from "~/components/SectionHeader";
import { getPosts } from "~/server/posts.server";

export const meta = () => {
  return [
    {
      title: "Blog"
    },
    {
      name: "description",
      content: "All of the recent and featured blog posts i've made"
    }
  ];
};

export async function loader() {
  const posts = await getPosts();
  return json({ posts });
}

export default function BlogIndex() {
  const { posts } = useLoaderData<typeof loader>();
  console.log("typeof date?", typeof posts[0]?.createdAt);
  return (
    //negative margin top to compensate for every other page having pt-10
    <div className="flex flex-col gap-3">
      <SectionHeader>Blog</SectionHeader>
      <div className="flex flex-col gap-1">
        {posts.map((post) => (
          <ListCard
            key={post.title}
            description={post.description}
            created={new Date(post.createdAt)}
            title={post.title}
            to={`/blog/${post.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
