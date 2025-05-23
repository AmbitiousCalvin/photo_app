import { Button } from "../components/Buttons.jsx";
import { MenuIcon, Logo, SearchBar } from "../components/Header.jsx";
import { Dropdown } from "../components/Dropdown.jsx";
import Slider from "../components/Slider.jsx";
import PhotoGrid from "../components/PhotoGrid.jsx";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import useEventListener from "../hooks/useEventListener.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";
import { useState, useEffect } from "react";

function PhotosPage() {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 1500);
	}, []);

	return (
		<>
			{!isLoaded && <LoadingScreen></LoadingScreen>}
			<Header></Header>
			<Slider storage_id={"photo_query"} className={"my-2 mb-5"}></Slider>
			<PhotoGrid></PhotoGrid>
		</>
	);
}

function Header() {
	const [isScrolling, setIsScrolling] = useState(false);
	const [showSidebar, setShowSidebar] = useState(false);

	useEventListener("scroll", (e) =>
		setIsScrolling(window.scrollY > 100 ? true : false)
	);

	const shadowStyles = isScrolling ? "shadow-sm shadow-gray-200" : "";

	useEventListener("resize", () => {
		if (window.innerWidth > 768) setShowSidebar(false);
	});

	return (
		<header
			className={`sticky top-0 padding-normal flex items-center w-full gap-2 h-20 z-50 bg-white text-black ${shadowStyles}`}
		>
			{!showSidebar && <Logo></Logo>}

			<div className="relative grow ml-2 md:px-2 flex justify-end md:justify-center">
				<SearchBar
					showSidebar={showSidebar}
					setShowSidebar={setShowSidebar}
					showHeader={true}
					placeholder={"Search for free photos"}
					type="text"
				></SearchBar>
			</div>

			{!showSidebar && (
				<div className="flex items-center">
					<Dropdown
						text={"Explore"}
						className={"btn-primary rounded-full pl-4 max-sm:pl-3"}
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
					<Button className={`btn-primary hidden md:flex`}>Join</Button>
					<MenuIcon showHeader={true}></MenuIcon>
				</div>
			)}
		</header>
	);
}

export default PhotosPage;
