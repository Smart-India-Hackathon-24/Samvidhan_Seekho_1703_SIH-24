import React from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CustomToolTip({ children, title }) {
	return (
		<TooltipProvider delayDuration={200} >
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent
					className="bg-white border text-sm shadow text-gray-700"
					sideOffset={8}
					side="top"
				>
					{title}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
