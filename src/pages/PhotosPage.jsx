import HeroSection from "../components/HeroSection.jsx";
import { Button, LoadingIcon, Icon } from "../components/Buttons.jsx";
import { MenuIcon, Logo, SearchBar } from "../components/Header.jsx";
import { Dropdown } from "../components/Dropdown.jsx";
import Slider from "../components/Slider.jsx";
import PhotoGrid from "../components/PhotoGrid.jsx";
import { useMyContext } from "../context.jsx";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import useEventListener from "../hooks/useEventListener.jsx";
import { IoSearch } from "react-icons/io5";

import { useState } from "react";

function PhotosPage() {
	return (
		<>
			<Header></Header>
			<Slider storage_id={"photo_query"} className={"my-2 mb-5"}></Slider>
			<PhotoGrid></PhotoGrid>
			<LoadingIcon></LoadingIcon>{" "}
		</>
	);
}

function Header() {
	const { setQuery } = useMyContext();
	const [isScrolling, setIsScrolling] = useState(false);

	useEventListener("scroll", (e) =>
		setIsScrolling(window.scrollY > 100 ? true : false)
	);

	const shadowStyles = isScrolling ? "shadow-sm shadow-gray-200" : "";

	return (
		<header
			className={`sticky top-0 padding-normal flex items-center w-full gap-2 h-20 z-50 bg-white text-black ${shadowStyles}`}
		>
			<Logo></Logo>

			<div className="relative grow ml-2 md:px-2 flex justify-end md:justify-center">
				<SearchBar
					showHeader={true}
					setQuery={setQuery}
					placeholder={"Search for free photos"}
					type="text"
				></SearchBar>
			</div>

			<div className="flex items-center">
				<Dropdown text={"Explore"} className={"btn-primary rounded-full pl-3"}>
					<Option>
						<HiOutlinePhotograph className="text-icon"></HiOutlinePhotograph>
						Photos
					</Option>
					<Option>
						<MdOutlineSlowMotionVideo className="text-icon"></MdOutlineSlowMotionVideo>
						Videos
					</Option>
				</Dropdown>
				<Button className={`btn-primary hidden md:flex`}>Join</Button>
				<MenuIcon showHeader={true}></MenuIcon>
			</div>
		</header>
	);
}

export default PhotosPage;
