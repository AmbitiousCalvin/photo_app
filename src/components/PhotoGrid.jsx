import { useInfiniteQuery } from "@tanstack/react-query";
import { createClient } from "pexels";
import ImgModule from "./ImageModule";
import { useParams } from "react-router-dom";
import { Masonry } from "masonic";
import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_PEXELS_API_KEY;
const client = createClient(apiKey);

function PhotoGrid({ children }) {
	const { query } = useParams();
	const [allPhotos, setAllPhotos] = useState([]);
	const [lastFetchedLength, setLastFetchedLength] = useState(0);

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery({
		queryKey: ["photos", query],
		queryFn: ({ pageParam = 1 }) => {
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

	useEffect(() => {
		if (!data) return;

		const newPages = data.pages.slice(lastFetchedLength);
		const newPhotos = newPages.flatMap((page) => page.photos);

		if (newPhotos.length > 0) {
			setAllPhotos((prev) => [...prev, ...newPhotos]);
			setLastFetchedLength(data.pages.length);
		}
	}, [data]);

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
			<section className="padding-normal mx-3">
				<Masonry
					items={allPhotos}
					render={ImgModule}
					columnWidth={320}
					maxColumnCount={3}
					columnGutter={16}
					onRender={(start, stop, visible) => {
						if (
							stop >= allPhotos.length - 1 &&
							hasNextPage &&
							!isFetching &&
							!isFetchingNextPage
						) {
							fetchNextPage();
						}
					}}
				/>
			</section>
		</>
	);
}

export default PhotoGrid;
