import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
	useInfiniteQuery,
} from "@tanstack/react-query";

import React, { useState } from "react";
import { GoDownload } from "react-icons/go";
import { Button } from "../components/Buttons";

import { createClient } from "pexels";

const client = createClient(
	"P3KeC5CvYDfcp3brfSziJUx1FC2ghTYqfPu8uooxevb5eMLzwECThv7h"
);

// function usePhotos({ query_key = query, per_page = 15 }) {
// 	return ;
// }

function ImgModule({ photo }) {
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<div
			key={photo?.id}
			className={`relative group overflow-hidden w-full h-full border-2 border-green-500 shadow-md shadow-gray-500 rounded-lg mb-4 transition-opacity duration-700
		  ${isLoaded ? "opacity-100" : "opacity-0"} empty:hidden`}
		>
			<img
				src={photo?.src?.large}
				alt={photo?.alt || "Image"}
				onLoad={() => setIsLoaded(true)}
				className={`object-cover w-full h-auto rounded-md transition-opacity duration-700 ease-in-out
			${isLoaded ? "opacity-100" : "opacity-0"}`}
			/>
			<div
				className="absolute bottom-0 left-0 w-full z-10 
						opacity-0 translate-y-full pointer-events-none 
						group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
						transition-all duration-500 ease-in-out
						flex items-center gap-2 p-2 bg-black/70 rounded"
			>
				{/* Photographer Name with Tooltip */}
				<a
					href={photo.photographer_url}
					target="_blank"
					title={photo.photographer}
					className="text-sm font-semibold cursor-pointer text-white underline"
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

function PhotoGrid({ query }) {
	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery({
		queryKey: ["photos", query],
		queryFn: async ({ pageParam = 1 }) => {
			return client.photos.search({
				query,
				per_page: 20,
				page: pageParam,
			});
		},
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			const { page, per_page, total_results } = lastPage;
			const totalPages = Math.ceil(total_results / per_page);
			return page < totalPages ? page + 1 : undefined;
		},
	});

	if (status === "pending")
		return (
			<section className="padding-normal w-full h-10 flex items-center justify-center">
				<h1 className="text-4xl  font-semibold text-shadow-lg text-shadow-green-200 text-emerald-500">
					Loading ...
				</h1>
			</section>
		);

	if (status === "error") {
		return <h1 className="text-4xl text-red-500">Sorry, please retry again</h1>;
	}

	return (
		<section className="padding-normal columns-[280px] md:columns-[320px]">
			{data.pages.map((group, i) => {
				return (
					<React.Fragment key={i}>
						{group.photos?.map((photo) => (
							<ImgModule key={photo.id} photo={photo}></ImgModule>
						))}
					</React.Fragment>
				);
			})}

			<div>{isFetching && !isFetchingNextPage ? "Fetching..." : "Stable"}</div>
			<div>{!isFetchingNextPage && "not fetching next page"}</div>
			<Button
				className="btn-third"
				onClick={() => fetchNextPage()}
				disabled={!hasNextPage || isFetchingNextPage}
			>
				{isFetchingNextPage
					? "Loading more..."
					: hasNextPage
					? "Load More"
					: "Nothing more to load"}
			</Button>
			<div>{isFetching && "fetching or refreshing"}</div>
		</section>
	);
}

export default PhotoGrid;
