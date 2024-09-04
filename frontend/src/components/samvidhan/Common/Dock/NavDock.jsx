import React from "react";
import Link from "next/link";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Separator } from "@/components/ui/separator";
import CustomToolTip from "../CustomToolTip";
import { Icons } from "./utils";

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
	theme: {
		light: {
			icon: Icons.sun,
		},
		dark: {
			icon: Icons.sun,
		},
	},
};

export default function NavDock() {
	return (
		<div className="relative h-[75%] flex justify-center items-center">
			<Dock
				magnification={70}
				distance={100}
				direction="middle"
				className="flex bg-white/90 shadow-xl justify-evenly items-center mx-0 md:w-[30vw] w-[95vw] h-full mt-0"
			>
				{DATA.navbar.map((item) => (
					<DockIcon key={item.label} asChild>
						<CustomToolTip title={item.label}>
							<Link
								href={item.href}
								className="bg-black/10 dark:bg-white/10 p-3 rounded-full"
							>
								<item.icon className="size-full min-w-4 min-h-4 md:min-w-7 md:min-h-7 stroke-[1.5]" />
							</Link>
						</CustomToolTip>
					</DockIcon>
				))}
				<Separator orientation="vertical" className="h-full" />
				{Object.entries(DATA.contact.social).map(([name, social]) => (
					<DockIcon key={name} asChild>
						<CustomToolTip title={social.name}>
							<Link
								href={social.url}
								className="bg-black/10 dark:bg-white/10 p-3 rounded-full"
							>
								<social.icon className="size-full min-w-4 min-h-4 md:min-w-7 md:min-h-7 stroke-[1.5]" />
							</Link>
						</CustomToolTip>
					</DockIcon>
				))}
				<Separator orientation="vertical" className="h-full py-2" />

				<DockIcon asChild>
					<CustomToolTip title="Toggle Theme">
						<button className="bg-black/10 dark:bg-white/10 p-3 rounded-full">
							<DATA.theme.light.icon className="size-full min-w-4 min-h-4 md:min-w-7 md:min-h-7 stroke-[1.5]" />
						</button>
					</CustomToolTip>
				</DockIcon>
			</Dock>
		</div>
	);
}
