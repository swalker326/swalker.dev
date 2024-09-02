import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getWorks } from "~/server/work.server";
import { format } from "date-fns";
import { SectionHeader } from "~/components/SectionHeader";
import { ListCard } from "~/components/ListCard";

export const meta = () => {
  return [
    {
      title: "Work"
    },
    {
      name: "description",
      content: "All of the recent and featured jobs or projects i've worked on"
    }
  ];
};

export async function loader() {
  const works = await getWorks();
  return json({ works });
}

export default function BlogIndex() {
  const { works } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col gap-3">
      <SectionHeader>Work</SectionHeader>
      <div className="flex flex-col gap-2">
        {works.map(({ id, place, description, start, end }) => (
          <div key={id} className="relative">
            <ListCard
              title={place}
              description={description}
              to={`/work/${placeToSlug(place)}`}
            />
            <span className="text-gray-500 dark:text-gray-400 font-thin absolute right-5 top-1">
              {format(new Date(start), "MMM yyy")} -{" "}
              {end ? format(new Date(end), "MMM yyy") : "Present"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
const placeToSlug = (place: string) => {
  return place.toLowerCase().replace(/\s/g, "_");
};
