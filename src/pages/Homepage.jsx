import HeroSection from "../components/HeroSection.jsx";
import { Button, LoadingIcon } from "./components/Buttons.jsx";
import Header from "./components/Header.jsx";
import Slider from "./components/Slider.jsx";
import HeroSection from "./components/HeroSection.jsx";
import PhotoGrid from "./components/PhotoGrid.jsx";

function HomePage() {
	return (
		<>
			<Header></Header>
			<HeroSection></HeroSection>
			<div className="w-full flex items-center justify-center padding-normal my-2">
				<Slider scrollable={false} className="w-fit">
					<Button className={"btn-secondary rounded-full"}>Home</Button>
					<Button className={"btn-third rounded-md"}>Photos</Button>
					<Button className={"btn-third rounded-md"}>Videos</Button>
				</Slider>
			</div>
			<PhotoGrid></PhotoGrid>
			<LoadingIcon></LoadingIcon>{" "}
		</>
	);
}

export default HomePage;
