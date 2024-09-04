import React from "react";
import NavDock from "./NavDock";

export default function DockComponent() {
	return (
		<div className="fixed h-[12vh] bottom-0 left-0 right-0 flex justify-center items-center">
			<NavDock />
		</div>
	);
}
