import { useState, useEffect } from "react";

export default function TypingComponent({ fullText }: { fullText: string }) {
	const [text, setText] = useState("");
	const [typingSpeed, setTypingSpeed] = useState(50);
	useEffect(() => {
		let timeout: Timer;
		let index = 0;
		const typeText = () => {
			if (index < fullText.length) {
				setText(fullText.slice(0, index + 1));
				index++;
				timeout = setTimeout(typeText, typingSpeed);
			} else {
				clearTimeout(timeout);
			}
		};
		typeText();
		return () => clearTimeout(timeout);
	}, [typingSpeed, fullText]);
	return (
		<div className="flex flex-col items-center justify-center min-h-28 w-full">
			<div className="flex justify-center">
				<h2 className="text-6xl font-bold text-blue-700">{text}</h2>
			</div>
		</div>
	);
}
