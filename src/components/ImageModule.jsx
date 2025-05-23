import { useState } from "react";
import { Button } from "./Buttons";
import { GoDownload } from "react-icons/go";

function ImgModule({ index, width, data: photo }) {
	const [isLoaded, setIsLoaded] = useState(false);

	const downloadImage = async (url) => {
		try {
			const res = await fetch(url);
			const blob = await res.blob();

			const link = document.createElement("a");
			link.href = URL.createObjectURL(blob);
			link.download = crypto.randomUUID();
			link.click();
		} catch (error) {
			console.error("Error downloading the image:", error);
		}
	};

	return (
		<div
			key={photo?.id}
			className={`relative w-full group overflow-hidden rounded-lg mb-4
				${isLoaded ? " shadow-md shadow-gray-300" : ""}`}
		>
			<div
				className={`absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-500 ${
					isLoaded ? "opacity-0" : "opacity-100"
				}`}
			></div>

			<img
				src={photo?.src?.large}
				alt={photo?.alt || "Image"}
				onLoad={() => setIsLoaded(true)}
				className={`relative z-10 object-cover w-full h-auto rounded-sm transition-opacity duration-700 ease-in-out ${
					isLoaded ? "opacity-100" : "opacity-0"
				}`}
			/>

			<div
				className="absolute bottom-0 left-0 w-full z-20 
					opacity-0 translate-y-full pointer-events-none 
					group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
					transition-all duration-500 ease-in-out 
					flex items-center gap-2 p-2 bg-black/70 rounded"
			>
				<a
					href={photo.photographer_url}
					target="_blank"
					title={photo.photographer}
					className="text-sm font-semibold text-white underline truncate max-w-[140px]"
				>
					@{photo.photographer}
				</a>

				<div className="grow"></div>
				<Button
					className="btn-secondary m-0 flex items-center gap-2 px-3 py-1.5
					 bg-emerald-400 text-white font-medium
					 border border-emerald-500
					 hover:bg-emerald-500 hover:border-emerald-800
					 active:bg-emerald-600 active:border-emerald-700
					 transition-all duration-200 rounded"
				>
					<GoDownload className="text-base"></GoDownload>
					Download Now
				</Button>
			</div>
		</div>
	);
}

export default ImgModule;
