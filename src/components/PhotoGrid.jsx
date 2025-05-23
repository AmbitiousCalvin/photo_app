import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMyContext } from "../context";

import { Button } from "../components/Buttons";
import { createClient } from "pexels";
import { Dropdown, Option } from "./Dropdown";
import { FaCheck } from "react-icons/fa6";
import ImgModule from "./ImageModule";

const apiKey = import.meta.env.VITE_PEXELS_API_KEY;
const client = createClient(apiKey);

function PhotoGrid() {
	const { query } = useMyContext();

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
			<div className="w-full padding-normal [&&]:px-6 my-2 flex items-center justify-between">
				<h1 className="text-2xl font-sans text-black">Free Stock Photos</h1>
				<CustomDropdown></CustomDropdown>
			</div>

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

function CustomDropdown() {
	const [value, setValue] = useState("Trending");

	return (
		<Dropdown
			text={value}
			onChildClick={(e) => setValue(e.target.dataset.value)}
			className="btn-third py-2 h-full bg-white hover:bg-gray-50 hover:ring-1 hover:ring-gray-400"
		>
			<Option data-value="Trending">
				Trending {value === "Trending" && <FaCheck></FaCheck>}
			</Option>
			<Option data-value="New">
				New {value === "New" && <FaCheck></FaCheck>}
			</Option>
		</Dropdown>
	);
}
export default PhotoGrid;
