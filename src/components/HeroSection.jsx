import { useState, useRef } from "react";
import { Button, Icon } from "./Buttons";
import { IoSearchOutline } from "react-icons/io5";
import { Dropdown, Option } from "./Dropdown";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
const apiKey = import.meta.env.VITE_PEXELS_API_KEY;

function SearchBar({ placeholder = "", type = "text" }) {
	return (
		<div className="w-full h-15 transition-[width] duration-150 rounded-lg flex items-center p-1.5 space-x-1 ring-1 ring-gray-100 shadow-md bg-gray-50 ">
			<Dropdown
				className={
					"btn-third py-2 h-full bg-white hover:bg-gray-200 hover:ring-1 hover:ring-gray-300"
				}
			>
				<Option>
					<HiOutlinePhotograph className="text-icon"></HiOutlinePhotograph>
					Photos
				</Option>
				<Option>
					<MdOutlineSlowMotionVideo className="text-icon"></MdOutlineSlowMotionVideo>
					Videos
				</Option>
			</Dropdown>
			<input
				type={type}
				className="outline-none w-full px-4 h-full font-semibold"
				placeholder={placeholder}
			></input>
			<Icon className={"rounded-md icon-square icon-secondary"}>
				<IoSearchOutline className="text-icon"></IoSearchOutline>
			</Icon>
		</div>
	);
}

import { createClient } from "pexels";
import { useEffect } from "react";

const client = createClient(
	"P3KeC5CvYDfcp3brfSziJUx1FC2ghTYqfPu8uooxevb5eMLzwECThv7h"
);
const query = "Green";

function HeroSection() {
	const [photo, setPhoto] = useState({});

	useEffect(() => {
		const getPhoto = async () => {
			try {
				const photos = await client.photos.search({ query, per_page: 1 });

				setPhoto(photos.photos[0]);
			} catch (e) {
				console.log(e);
				setPhoto(null);
			}
		};

		getPhoto();
	}, []);

	useEffect(() => {
		console.log(photo);
	}, [photo]);

	return (
		<section
			className="h-[23%] padding-normal border-2 flex flex-col items-center justify-center gap-2 bg-no-repeat bg-cover bg-center"
			style={{
				backgroundImage: `url(${photo?.src?.landscape})`,
			}}
		>
			<div className="w-[clamp(250px,95%,600px)] flex flex-col items-center gap-4 justify-center px-1">
				<h1 className="text-[clamp(1.5rem,3vw,2rem)] text-left text-white font-semibold leading-tight text-shadow-lg ">
					The best free stock photos, royalty-free images & videos shared by
					creators.
				</h1>
				<SearchBar placeholder="Search for free photos" />
			</div>
		</section>
	);
}

export default HeroSection;
