import React from "react";
import PdfContainer from "./PdfContainer";
import fs from "fs";
import path from "path";

export default function DownloadPage() {
	const pdfFolder = path.join(process.cwd(), "src", "PDFs");
	const pdfFiles = fs.readdirSync(pdfFolder).map((file) => {
		const filePath = path.join(pdfFolder, file);
		const stats = fs.statSync(filePath);
		return {
			name: file,
			path: filePath,
			size: (stats.size / (1024 * 1024)).toFixed(1) + "MB",
		};
	});
	console.log("pdfFiles: ", pdfFiles);

	return (
		<div className="w-full h-full flex justify-center">
			<div className="border rounded-2xl shadow-lg w-[90%] h-[80%] mt-10 p-6 overflow-auto">
				<PdfContainer PdfFiles={pdfFiles} />
			</div>
		</div>
	);
}
