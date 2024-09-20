import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

const ChatComponent = () => {
	const [isChatboxOpen, setIsChatboxOpen] = useState(true);
	const [messages, setMessages] = useState([
		{
			text: "Hello! You are currently viewing Article 5, which deals with citizenship at the commencement of the Constitution. Feel free to ask me any questions regarding this article.",
			user: false,
		},
		{
			text: "What does Article 5 specify?",
			user: true,
		},
		{
			text: "Article 5 of the Constitution specifies that at the commencement of the Constitution (on January 26, 1950), every person who had their domicile in the territory of India and met certain conditions would be considered a citizen of India. These conditions included being born in India, having Indian parents, or residing in India for at least five years prior to this date.",
			user: false,
		},
	]);
	const [streamingMessage, setStreamingMessage] = useState("");
	const [isStreaming, setIsStreaming] = useState(false);
	const chatContainerRef = useRef(null);
	const chatboxRef = useRef(null);

	const chatBot = (data) => {
		setIsStreaming(true);
		setStreamingMessage(""); // Clear previous streaming message
		axios
			.post("http://localhost:5000/api/getAnswerBot", { question: data })
			.then((response) => {
				const botResponse = response.data;
				let i = -1;
				const streamInterval = setInterval(() => {
					if (i < botResponse.length) {
						setStreamingMessage((prev) => prev + botResponse[i]);
						i++;
						if (chatboxRef.current) {
							chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
						}
					} else {
						clearInterval(streamInterval);
						setMessages((prevMessages) => [
							...prevMessages,
							{ text: botResponse, user: false },
						]);
						setStreamingMessage("");
						setIsStreaming(false);
					}
				}, 20);
			})
			.catch((err) => {
				console.log(err);
				setIsStreaming(false);
			});
	};
	const [userInput, setUserInput] = useState("");

	const toggleChatbox = () => {
		setIsChatboxOpen(!isChatboxOpen);
	};

	const addUserMessage = (message) => {
		setMessages([...messages, { text: message, user: true }]);
	};

	const handleSendMessage = () => {
		if (userInput.trim() !== "") {
			addUserMessage(userInput);
			chatBot(userInput);
			setUserInput("");
		}
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			handleSendMessage();
		}
	};

	// useEffect(() => {
	// 	const handleClickOutside = (event) => {
	// 		if (
	// 			chatContainerRef.current &&
	// 			!chatContainerRef.current.contains(event.target)
	// 		) {
	// 			setIsChatboxOpen(false);
	// 		}
	// 	};

	// 	document.addEventListener("mousedown", handleClickOutside);
	// 	return () => {
	// 		document.removeEventListener("mousedown", handleClickOutside);
	// 	};
	// }, []);

	useEffect(() => {
		if (chatboxRef.current) {
			chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
		}
	}, [messages, streamingMessage]);

	return (
		<div>
			<div className=" chatBot flex items-center justify-center my-2">
				<button
					id="open-chat"
					className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center text-center"
					onClick={toggleChatbox}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6 mr-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 6v6m0 0v6m0-6h6m-6 0H6"
						></path>
					</svg>
					Chat with Bot
				</button>
			</div>
			{isChatboxOpen && (
				<div className="top-0 bottom-0 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
					<div
						ref={chatContainerRef}
						id="chat-container"
						className="w-[50vw] h-[50vh]"
					>
						<div className="bg-white shadow-md rounded-lg h-full w-full flex flex-col justify-between">
							<div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
								<p className="text-lg font-semibold">Constitution AI</p>
								<button
									id="close-chat"
									className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
									onClick={toggleChatbox}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-6 h-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M6 18L18 6M6 6l12 12"
										></path>
									</svg>
								</button>
							</div>
							<div
								id="chatbox"
								ref={chatboxRef}
								className="p-8 flex-grow overflow-y-auto"
							>
								{messages.map((message, index) => (
									<div
										key={index}
										className={`mb-2 ${message.user ? "text-right" : ""}`}
									>
										<p
											className={`rounded-lg py-2 px-4 inline-block  ${
												message.user
													? "bg-blue-500 text-white"
													: "bg-gray-200 text-gray-700"
											}`}
										>
											{message.text}
										</p>
									</div>
								))}
								{isStreaming && (
									<div className="mb-2">
										<p
											className={`rounded-lg py-2 px-4 ${
												streamingMessage.length === 0
													? "animate-pulse flex items-center justify-center h-10 w-20"
													: ""
											}  inline-block max-w-[70%] bg-gray-200 text-gray-700`}
										>
											{streamingMessage.length === 0 ? (
												<div className="flex items-center justify-center !w-fit space-x-1">
													<div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce"></div>
													<div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce animation-delay-2000"></div>
													<div className="w-2 h-2 bg-gray-700 rounded-full animate-bounce animation-delay-400"></div>
												</div>
											) : (
												<>{streamingMessage}</>
											)}
										</p>
									</div>
								)}
							</div>
							<div className="p-4 border-t flex">
								<input
									id="user-input"
									type="text"
									placeholder="Type a message"
									className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={userInput}
									onChange={(e) => setUserInput(e.target.value)}
									onKeyPress={handleKeyPress}
								/>
								<button
									id="send-button"
									className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
									onClick={handleSendMessage}
								>
									Send
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatComponent;
