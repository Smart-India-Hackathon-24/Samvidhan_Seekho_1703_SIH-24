"use client";
import React, { useState, useRef, useEffect } from "react";
import data from "./constitutiondata";
import { File, Folder, Tree } from "@/components/magicui/file-tree";
import ChatComponent from "@/components/samvidhan/Constitution/ChatComponent";
import { LucideWandSparkles } from "lucide-react";

export default function page() {
	//   const [openPartitions, setOpenPartitions] = useState({});
	//   const [openSubPartitions, setOpenSubPartitions] = useState({}); // State for sub-partition collapsibles
	const initialOpenPartitions = {};
	const initialOpenSubPartitions = {};

	// Initialize open state for all partitions and sub-partitions
	data.forEach((part) => {
		initialOpenPartitions[part.partition_number] = true; // Open all main partitions
		part.sub_partitions?.forEach((sub) => {
			initialOpenSubPartitions[sub.partition_id] = true; // Open all sub-partitions
		});
	});

	const [openPartitions, setOpenPartitions] = useState(initialOpenPartitions);
	const [openSubPartitions, setOpenSubPartitions] = useState(
		initialOpenSubPartitions
	);

	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const [articleId, setArticleId] = useState("66d6a855e1d17e5da704bb84");
	const handleArticleClick = (id) => {
		console.log("id: ", id);
		setArticleId(id);
	};
	const ELEMENTS = data.map((part) => ({
		id: part.partition_number, // Use partition_number as the id
		isSelectable: false, // Set to false for folders
		name: part.partition_title,
		children:
			part.sub_partitions?.map((sub) => ({
				id: sub.partition_id, // Use partition_id as the id for sub-partitions
				isSelectable: false, // Set to false for folders
				name: sub.partition_number + "" + sub.partition_title,
				//   children: sub.sub_partitions?.map(subPart => ({
				// 	id: subPart.partition_id, // Use partition_id as the id for sub-sub-partitions
				// 	isSelectable: true, // Set to true for files
				// 	name: subPart.partition_title,
				//   })) || [],
			})) || [],
	}));

	const [selectedText, setSelectedText] = useState("");
	const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
	const [isPopoverVisible, setIsPopoverVisible] = useState(false);
	const [isChatOpen, setIsChatOpen] = useState(false);
	const articleRef = useRef(null);

	const handleTextSelection = () => {
		const selection = window.getSelection();
		const text = selection.toString().trim();
		if (text) {
			const range = selection.getRangeAt(0);
			const rect = range.getBoundingClientRect();
			console.log("rect: ", rect);
			console.log(window.scrollY);
			console.log(window.scrollX);
			setPopoverPosition({
				top: rect.top + window.scrollY - 75, // Adjusted to be 40px above the selected text
				left: rect.left + window.scrollX - 450, // Centered horizontally and ensure it doesn't move out of parent
				// right: rect.right + window.scrollX, // Centered horizontally and ensure it doesn't move out of parent
			});
			setSelectedText(text);
			setIsPopoverVisible(true);
		} else {
			setIsPopoverVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mouseup", handleTextSelection);
		return () => {
			document.removeEventListener("mouseup", handleTextSelection);
		};
	}, []);

	const handleSimplifyClick = () => {
		setIsPopoverVisible(false);
		setIsChatOpen(true);
	};

	return (
		<div className="flex gap-10 p-8 h-dvh">
			<div
				className={`w-3/12 h-full border-2 rounded-xl overflow-scroll shadow-xl p-5 `}
			>
				{isSidebarOpen && (
					<div className="">
						<div className="text-gray-100 text-xl">
							<h1 className="font-bold text-gray-800 text-[15px] ml-3">
								Constitution
							</h1>
							<span
								className="bi bi-x cursor-pointer ml-28 lg:hidden right-0"
								onClick={toggleSidebar}
							>
								X
							</span>
						</div>
						<div className="text-black text-wrap overflow-scroll">
							<Tree
								className="p-2 overflow-hidden rounded-md bg-background truncate"
								initialSelectedId={articleId} // Set the selected article ID
								initialExpandedItems={data.map((part) => part.partition_number)} // Expand all partitions initially
								elements={ELEMENTS} // Use the ELEMENTS structure
							>
								{data.map((part) =>
									part.sub_partitions ? (
										<Folder
											className="truncate font-bold"
											key={part.partition_number}
											value={part.partition_number}
											element={
												part.partition_number + " " + part.partition_title
											}
										>
											{part.sub_partitions?.map((sub) => (
												<Folder
													key={sub.partition_id}
													value={sub.partition_id}
													element={sub.partition_title}
												>
													{sub.sub_partitions ? (
														sub.sub_partitions?.map((subPart) => (
															<File
																key={subPart.partition_id}
																value={subPart.partition_id}
																className="bg-black text-white px-2 py-1"
															>
																<p
																	onClick={() =>
																		handleArticleClick(subPart.partition_id)
																	}
																>
																	{subPart.partition_number}{" "}
																</p>
															</File>
														))
													) : (
														<File
															key={sub.partition_id}
															value={sub.partition_id}
															className={
																articleId === sub.partition_id
																	? "bg-black text-white px-2 py-1"
																	: "bg-gray-200 text-black px-2 py-1"
															}
														>
															<p
																onClick={() =>
																	handleArticleClick(sub.partition_id)
																}
															>
																{sub.partition_number}
															</p>
														</File>
													)}
												</Folder>
											))}
										</Folder>
									) : (
										<File
											key={part.partition_id}
											value={part.partition_id}
											className="bg-black text-white"
										>
											<p onClick={() => handleArticleClick(part.partition_id)}>
												{part.partition_number}
											</p>
										</File>
									)
								)}
							</Tree>
						</div>
					</div>
				)}
			</div>
			<div className="flex-1 border-2 rounded-xl shadow-xl relative p-16 h-full overflow-scroll">
				{/* {data[articleId]} */}
				<div className="my-2 px-4 gap-3 relative">
					<h1 className="text-4xl text-center font-bold">Article 3</h1>
					<h3 className="text-lg text-center font-semibold my-2">
						Formation of new States and alteration of areas, boundaries or names
						of existing States.
					</h3>
					<p className="my-5 mt-10">Parliament may by law—</p>
					<ul className="gap-2 flex flex-col">
						<li>
							<b>(a)</b> form a new State by separation of territory from any
							State or by uniting two or more States or parts of States or by
							uniting any territory to a part of any State;
						</li>
						<li>
							<b>(b)</b> increase the area of any State;
						</li>
						<li>
							<b>(c)</b> diminish the area of any State;
						</li>
						<li>
							<b>(d)</b> alter the boundaries of any State;
						</li>
						<li>
							<b>(e)</b> alter the name of any State;
						</li>
					</ul>
					<p className="my-5">
						Provided that no Bill for the purpose shall be introduced in either
						House of Parliament except on the recommendation of the President
						and unless, where the proposal contained in the Bill affects the
						area, boundaries or name of any of the States, the Bill has been
						referred by the President to the Legislature of that State for
						expressing its views thereon within such period as may be specified
						in the reference or within such further period as the President may
						allow and the period so specified or allowed has expired.
					</p>
					<p className="my-5">
						Explanation I.—In this article, in clauses (a) to (e), "State"
						includes a Union territory, but in the proviso, "State" does not
						include a Union territory.
					</p>
					<p className="my-5">
						Explanation II.—The power conferred on Parliament by clause (a)
						includes the power to form a new State or Union territory by uniting
						a part of any State or Union territory to any other State or Union
						territory.
					</p>
				</div>
				{isPopoverVisible && (
					<button
						onClick={handleSimplifyClick}
						style={{
							top: popoverPosition.top,
							left: popoverPosition.left,
						}}
						className="bg-black absolute text-white px-2 py-1 flex items-center gap-3 rounded shadow"
					>
						<LucideWandSparkles className="w-5 h-5" />
						Simplify this text
					</button>
				)}
				<div className="absolute right-10 top-5">
					<ChatComponent
						isOpen={isChatOpen}
						setIsChatOpen={setIsChatOpen}
						selectedText={selectedText}
					/>
				</div>
			</div>
		</div>
	);
}
