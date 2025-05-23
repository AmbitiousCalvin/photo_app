import { useState } from "react";
import { Button, Icon } from "./Buttons";
import { IoSearch } from "react-icons/io5";
import { Dropdown, Option } from "./Dropdown";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import Header from "./Header";

const apiKey = import.meta.env.VITE_PEXELS_API_KEY;
const client = createClient(apiKey);

import { createClient } from "pexels";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function HeroSection() {
	const query = "Nature";
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

	return (
		<section
			className="h-[545px] padding-normal border-none flex flex-col items-center justify-center gap-2 bg-no-repeat bg-cover bg-center"
			style={{
				backgroundImage: `url(/src/assets/background.jpeg)`,
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

function SearchBar({ placeholder = "", type = "text" }) {
	const [value, setValue] = useState("");
	const navigate = useNavigate();
	const inputRef = useRef(null);

	const submitQuery = (e) => {
		e.preventDefault();
		if (value.trim() === "") return;
		navigate(`/photos/${encodeURIComponent(value)}`);
		setValue("");
	};

	return (
		<div
			onClick={() => inputRef.current?.focus()}
			className="group w-full h-15 transition-[width] duration-150 rounded-lg flex items-center p-1.5 space-x-1 ring-1 ring-gray-100 shadow-md bg-gray-50 "
		>
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

			<form onSubmit={submitQuery} className="flex-grow min-w-0 w-full">
				<input
					value={value}
					ref={inputRef}
					onChange={(e) => setValue(e.target.value)}
					type={type}
					className="outline-none px-4 font-semibold caret-gray-950"
					placeholder={placeholder}
				></input>
			</form>
			<Icon
				onClick={submitQuery}
				className={
					"group-hover:opacity-100 opacity-[0.4] rounded-md icon-square icon-secondary"
				}
			>
				<IoSearch className="text-icon"></IoSearch>
			</Icon>
		</div>
	);
}

export default HeroSection;
