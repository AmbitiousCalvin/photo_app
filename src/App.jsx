import { useState } from "react";
import { Icon, Button, LoadingIcon } from "./components/Buttons.jsx";
import Header from "./components/Header.jsx";
import Slider from "./components/Slider.jsx";
import { TbWorld } from "react-icons/tb";
import { Option, Dropdown } from "./components/Dropdown.jsx";
import HeroSection from "./components/HeroSection.jsx";
import PhotoGrid from "./components/PhotoGrid.jsx";

import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
	const [isHovering, setIsHovering] = useState(false);
	const [selectedId, setSelectedId] = useState(0);
	const [query, setQuery] = useState("landscapes");

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<main className="h-[2000px]">
					<Header setQuery={setQuery}></Header>
					<Slider></Slider>
					<HeroSection></HeroSection>

					<div className="w-full flex items-center justify-center padding-normal my-2">
						<Slider scrollable={false} className="w-fit">
							<Button className={"btn-secondary rounded-full"}>Home</Button>
							<Button className={"btn-third rounded-md"}>Photos</Button>
							<Button className={"btn-third rounded-md"}>Videos</Button>
						</Slider>
					</div>

					{/* 
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

				<Button className={"btn-third"}>Hello</Button> */}
					<PhotoGrid query={query}></PhotoGrid>
					<LoadingIcon></LoadingIcon>
				</main>
			</QueryClientProvider>
		</>
	);
}

export default App;
