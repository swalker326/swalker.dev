export const SkillList = ({ skills }: { skills: string[] }) => {
	return (
		<ul className="flex gap-1 flex-wrap">
			{skills.map((skill) => (
				<li
					key={skill}
					className="p-2 font-bold bg-gray-100 dark:bg-gray-900 rounded-xl"
				>
					{skill}
				</li>
			))}
		</ul>
	);
};
