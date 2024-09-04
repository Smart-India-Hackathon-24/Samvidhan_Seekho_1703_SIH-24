"use client";
import Link from "next/link";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Separator } from "@/components/ui/separator";
import CustomToolTip from "../CustomToolTip";
import { Icons } from "./utils";
import React, { useState, useEffect, useRef } from "react";
import { ArrowUp, LucideChevronUp } from "lucide-react";

const DATA = {
	navbar: [
		{ href: "/home", icon: Icons.home, label: "Home" },
		{
			href: "/constitution",
			icon: Icons.constitution,
			label: "View Constitution",
		},
		{
			href: "/games",
			icon: Icons.game,
			label: "Constitutional Games",
		},
	],
	contact: {
		social: {
			GitHub: {
				name: "GitHub",
				url: "#",
				icon: Icons.github,
			},
			LinkedIn: {
				name: "LinkedIn",
				url: "#",
				icon: Icons.linkedin,
			},
			X: {
				name: "X",
				url: "#",
				icon: Icons.x,
			},
		},
	},
	utility: [
		{
			light: {
				label: "Light Theme",
				icon: Icons.sun,
			},
			dark: {
				label: "Dark Theme",
				icon: Icons.sun,
			},
		},
		{
			icon: Icons.downArrow,
			label: "Close Dock",
		},
	],
};

export default function NavDock() {
	const [isDockVisible, setIsDockVisible] = useState(true);
	const [isArrowClosed, setIsArrowClosed] = useState(false);
	const timeoutRef = useRef(null);

	useEffect(() => {
		const handleMouseMove = () => {
			if (!isArrowClosed) {
				setIsDockVisible(true);
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
				timeoutRef.current = setTimeout(() => {
					setIsDockVisible(false);
				}, 4000); // Changed to 5 seconds (5000ms)
			}
		};

		document.addEventListener("mousemove", handleMouseMove);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [isArrowClosed]);

	const handleUpArrowClick = () => {
		setIsDockVisible(true);
		setIsArrowClosed(false);
	};
	const handleDownArrowClick = () => {
		setIsDockVisible(false);
		setIsArrowClosed(true);
	};

	return (
		<div className="relative h-[75%] flex justify-center items-center ">
			{isDockVisible ? (
				<Dock
					magnification={60}
					distance={100}
					direction="middle"
					className="flex bg-white/90 shadow-xl justify-evenly items-center mx-0 md:w-[30vw] w-[95vw] h-full mt-0"
				>
					{DATA.navbar.map((item) => (
						<DockIcon key={item.label} asChild className="relative">
							<CustomToolTip title={item.label}>
								<Link
									href={item.href}
									className="bg-gray-700/10 dark:bg-white/10 p-3 rounded-full"
								>
									<item.icon className="size-full min-w-4 min-h-4 md:min-w-5 md:min-h-5 stroke-[1.5] text-gray-700" />
								</Link>
							</CustomToolTip>
						</DockIcon>
					))}
					<Separator orientation="vertical" className="h-full bg-gray-700" />
					{Object.entries(DATA.contact.social).map(([name, social]) => (
						<DockIcon key={name} asChild>
							<CustomToolTip title={social.name}>
								<Link
									href={social.url}
									className="bg-gray-700/10 dark:bg-white/10 p-3 rounded-full"
								>
									<social.icon className="size-full min-w-4 min-h-4 md:min-w-5 md:min-h-5 stroke-[1.5] text-gray-700" />
								</Link>
							</CustomToolTip>
						</DockIcon>
					))}
					<Separator orientation="vertical" className="h-full py-2" />

					{Object.entries(DATA.utility).map(([name, utility]) => {
						const IconComponent =
							utility.icon ||
							(utility.dark && utility.dark.icon) ||
							(utility.light && utility.light.icon);
						const label =
							utility.label ||
							(utility.dark && utility.dark.label) ||
							(utility.light && utility.light.label) ||
							name;

						return (
							<DockIcon key={name} asChild>
								<CustomToolTip title={label}>
									<button
										onClick={() => {
											if (label === "Close Dock") {
												handleDownArrowClick();
											}
										}}
										className="bg-gray-700/10 dark:bg-white/10 p-3 rounded-full"
									>
										{IconComponent && (
											<IconComponent className="size-full min-w-4 min-h-4 md:min-w-5 md:min-h-5 stroke-[1.5] text-gray-700" />
										)}
									</button>
								</CustomToolTip>
							</DockIcon>
						);
					})}
				</Dock>
			) : (
				<CustomToolTip title="Open Dock">
					<button
						onClick={handleUpArrowClick}
						className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-black/10 px-4 hover:bg-black/20 py-2 rounded-t-full shadow-md border-t-2 border-white/1"
					>
						<LucideChevronUp className="h-6 w-6 text-gray-700" />
					</button>
				</CustomToolTip>
			)}
		</div>
	);
}
