"use client";
import React from "react";

export default function PdfContainer({ PdfFiles }) {
	const handleDownload = async (filePath) => {
		try {
			const response = await fetch(filePath);
			if (!response.ok) throw new Error('Network response was not ok');
			
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.style.display = 'none';
			a.href = url;
			a.download = filePath.split('/').pop();
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch (error) {
			console.error('Error downloading the file:', error);
		}
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{PdfFiles.map((file, index) => (
				<div key={index} className="border rounded-lg p-4 shadow-md">
					<h3 className="text-lg font-semibold mb-2">
						Constitution Of India ({file.name.replace(".pdf", "")})
					</h3>
					<p className="text-sm text-gray-600 mb-4">Size: {file.size}</p>
					<div className="flex justify-between">
						<a
							href={file.path}
							target="_blank"
							// rel="noopener noreferrer"
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
						>
							View
						</a>
						<button
							onClick={() => handleDownload(file.path)}
							className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
						>
							Download
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
