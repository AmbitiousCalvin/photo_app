import { useInfiniteQuery } from "@tanstack/react-query";
import { createClient } from "pexels";
import ImgModule from "./ImageModule";
import { useParams } from "react-router-dom";
import { Masonry } from "masonic";
import { useState, useEffect } from "react";
import { LoadingIcon } from "./Buttons";
import { useRef } from "react";
import { useMyContext } from "../context/context";

const apiKey = import.meta.env.VITE_PEXELS_API_KEY;
const client = createClient(apiKey);

function PhotoGrid() {
	const { query } = useMyContext();
	const [allPhotos, setAllPhotos] = useState([]);
	const [lastFetchedLength, setLastFetchedLength] = useState(0);
	const prevQueryRef = useRef(query);

	console.log(query);

	const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
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
		const isEqual = prevQueryRef.current === query;

		const newPages = data.pages.slice(isEqual ? lastFetchedLength : 0);
		const newPhotos = newPages.flatMap((page) => page.photos);

		if (newPhotos.length > 0) {
			setAllPhotos((prev) => {
				if (!isEqual) return [...newPhotos];
				return [...prev, ...newPhotos];
			});
			setLastFetchedLength(isEqual ? data.pages.length : 0);
		}
	}, [data, query]);

	if (status === "pending")
		return (
			<section className="padding-normal w-full h-[calc(100vh-45vh)] flex items-center justify-center">
				<LoadingIcon></LoadingIcon>
			</section>
		);

	if (status === "error") {
		return <h1 className="text-4xl text-red-500">Sorry, please retry again</h1>;
	}

	return (
		<>
			<section className="padding-normal mx-3">
				<Masonry
					items={allPhotos}
					render={ImgModule}
					columnWidth={320}
					maxColumnCount={3}
					columnGutter={16}
					onRender={(start, stop, visible) => {
						if (stop >= allPhotos.length - 1 && hasNextPage && !isFetching && !isFetchingNextPage) {
							fetchNextPage();
						}
					}}
				/>
			</section>
		</>
	);
}

export default PhotoGrid;
