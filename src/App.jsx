import { useState } from "react";
import { Icon, Button } from "./components/Buttons.jsx";
import Header from "./components/Header.jsx";
import Slider from "./components/Slider.jsx";
import { TbWorld } from "react-icons/tb";
import { Option, Dropdown } from "./components/Dropdown.jsx";
import HeroSection from "./components/HeroSection.jsx";

function App() {
	const [isHovering, setIsHovering] = useState(false);
	const [selectedId, setSelectedId] = useState(0);

	return (
		<>
			<main className="h-[2000px]">
				<Header></Header>
				<HeroSection></HeroSection>

				<div className="flex items-center justify-center gap-3 padding-normal my-2">
					<Button className={"btn-secondary rounded-full"}>Home</Button>
					<Button className={"btn-third rounded-md"}>Photos</Button>
					<Button className={"btn-third rounded-md"}>Videos</Button>
				</div>

				<Button className={"sticky top-0"}> Click me</Button>
				<Dropdown text="Explore">
					<Option>
						<TbWorld></TbWorld>
						Option 2
					</Option>
					<Option>
						<TbWorld></TbWorld>
						Option 3
					</Option>
				</Dropdown>
				<Button
					onMouseEnter={() => setIsHovering(true)}
					onMouseLeave={() => setIsHovering(false)}
				>
					{isHovering ? "Hovering" : "Not Hovering"}
				</Button>
			</main>
		</>
	);
}

export default App;
