"use server";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "../components/Buttons";
import { createClient } from "pexels";
import ImgModule from "./ImageModule";
import { useParams } from "react-router-dom";

const apiKey = import.meta.env.VITE_PEXELS_API_KEY;
const client = createClient(apiKey);

function PhotoGrid({ children }) {
	const { query } = useParams();

	const {
		data,
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
		<>
			{children}

			<section className="padding-normal mx-3 columns-[280px] md:columns-[320px]">
				{data.pages.map((group, i) => {
					return (
						<React.Fragment key={i}>
							{group.photos?.map((photo) => (
								<ImgModule key={photo.id} photo={photo}></ImgModule>
							))}
						</React.Fragment>
					);
				})}

				<div>
					{isFetching && !isFetchingNextPage ? "Fetching..." : "Stable"}
				</div>
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
		</>
	);
}

export default PhotoGrid;
