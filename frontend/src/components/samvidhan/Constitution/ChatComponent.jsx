import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { LucideBotMessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";

const initialMessages = [
	{
		text: "Hello! I m your AI chatbot. You can ask me anything about the Constitution of India. I will try my best to answer your questions.",
		user: false,
	},
	{
		text: "What does Article 3 specify?",
		user: true,
	},
	{
		text: "Article 3 of the Constitution outlines the process by which Parliament can form new states, alter the boundaries of existing states, or change their names. It requires the President's recommendation and, in cases affecting a state's area, boundaries, or name, the state legislature's opinion.",
		user: false,
	},
];

export default function ChatComponent({ isOpen, setIsChatOpen }) {
	const [messages, setMessages] = useState(
		JSON.parse(localStorage.getItem("messages")) || initialMessages
	);
	const [userInput, setUserInput] = useState("");
	const chatContainerRef = useRef(null);
	const chatboxRef = useRef(null);

	const addUserMessage = (message) => {
		setMessages([...messages, { text: message, user: true }]);
		localStorage.setItem("messages", JSON.stringify(messages));
	};

	const handleSendMessage = () => {
		if (userInput.trim() !== "") {
			addUserMessage(userInput);
			setUserInput("");
		}
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			handleSendMessage();
		}
	};

	useEffect(() => {
		if (chatboxRef.current) {
			chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div className="">
			<Popover open={isOpen} onOpenChange={setIsChatOpen}>
				<PopoverTrigger asChild>
					<Button
						id="open-chat"
						className="bg-black group gap-3 text-white py-2 px-4 rounded-md hover:bg-black/80 transition duration-300 flex items-center text-center"
						onClick={() => setIsChatOpen(!isOpen)}
					>
						<LucideBotMessageSquare />
						AI Chat
					</Button>
				</PopoverTrigger>
				<PopoverContent
					asChild
					sideOffset={10}
					align="end"
					className="data-[side=bottom]:slide-in-from-top-2 w-[400px]"
				>
					<div className="flex flex-col gap-6 p-5 text-sm">
						{messages.map((message, index) => (
							<div
								key={index}
								className={`flex  gap-3 ${
									message.user ? "justify-end" : "justify-start"
								}`}
							>
								<div
									className={`px-4 py-2 max-w-[80%] rounded-md ${
										message.user ? "bg-black text-white" : "bg-gray-200"
									}`}
								>
									{message.text}
								</div>
							</div>
						))}
						<div className="flex gap-3">
							<Input
								type="text"
								placeholder="Type your message..."
								value={userInput}
								onChange={(e) => setUserInput(e.target.value)}
								onKeyDown={handleKeyPress}
							/>
							<Button
								onClick={handleSendMessage}
								className="bg-black text-white px-4 py-2 rounded-md"
							>
								Send
							</Button>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
