import HeroSection from "../components/HeroSection.jsx";
import { Button, LoadingIcon } from "../components/Buttons.jsx";
import Header from "../components/Header.jsx";
import Slider from "../components/Slider.jsx";
import PhotoGrid from "../components/PhotoGrid.jsx";
import { useState, useEffect } from "react";
import { Dropdown, Option } from "../components/Dropdown.jsx";
import { FaCheck } from "react-icons/fa";
import LoadingScreen from "../components/LoadingScreen.jsx";

function HomePage() {
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 3000);
	}, []);

	return (
		<>
			{!isLoaded && <LoadingScreen></LoadingScreen>}

			<Header></Header>
			<HeroSection></HeroSection>
			<div className="w-full flex items-center justify-center padding-normal my-2">
				<Slider storage_id={"page_id"} scrollable={false} className="w-fit">
					<Button className={"btn-secondary rounded-full"}>Home</Button>
					<Button className={"btn-third rounded-md"}>Videos</Button>
					<Button className={"btn-third rounded-md"}>Explore</Button>
				</Slider>
			</div>
			<div className="w-full padding-normal [&&]:px-6 my-2 flex items-center justify-between">
				<h1 className="text-2xl font-sans text-black">Free Stock Photos</h1>
				<CustomDropdown></CustomDropdown>
			</div>
			<PhotoGrid></PhotoGrid>
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

export default HomePage;
