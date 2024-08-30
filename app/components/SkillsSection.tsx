import {
  BrushIcon,
  CloudIcon,
  CodeIcon,
  CogIcon,
  DatabaseIcon,
  PenToolIcon
} from "lucide-react";
import { SkillList } from "./SkillList";

export function SkillsSection() {
  return (
    <section className="relative w-full">
      {/* <div style={{ height: childHeight }} /> */}
      <div />
      <div className=" bg-gray-300 dark:bg-gray-800 p-12 rounded-md">
        <div className="grid items-center justify-center md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <h2 className=" text-4xl mb-6 font-bold text-blue-700 dark:text-blue-500">
              Skills
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              I&apos;m proficient in a variety of programming languages,
              frameworks, and architecture that I use to bring my ideas to life.
            </p>
            <SkillList
              skills={[
                "TypeScript",
                "Node.Js",
                "JavaScript",
                "Go",
                "Rust",
                "Kotlin",
                "Python",
                "React",
                "React Native",
                "Tailwind CSS",
                "Git",
                "Docker",
                "Redux"
              ]}
            />
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:gap-8">
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-primary p-3 text-primary-foreground">
                <CodeIcon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium">Web Development</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-secondary p-3 text-secondary-foreground">
                <BrushIcon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium">Design</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-accent p-3 text-accent-foreground">
                <DatabaseIcon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium">Database</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-muted p-3 text-muted-foreground">
                <CloudIcon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium">Cloud</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-primary p-3 text-primary-foreground">
                <CogIcon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium">CI/CD</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-full bg-secondary p-3 text-secondary-foreground">
                <PenToolIcon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium">UI/UX</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
