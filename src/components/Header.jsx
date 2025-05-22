import { useState, useRef } from "react";
import { Button, Icon } from "./Buttons";
import { IoSearchOutline } from "react-icons/io5";
import { Dropdown, Option } from "./Dropdown";
import { TbWorld } from "react-icons/tb";
import { useEffect } from "react";
import useEventListener from "../hooks/useEventListener";
import { useMyContext } from "../context";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineSlowMotionVideo } from "react-icons/md";

function MenuIcon() {
	const [active, setActive] = useState(false);

	return (
		<button
			onClick={() => setActive((prev) => !prev)}
			className="icon-secondary rounded group p-0 w-10 h-10 flex flex-col items-center justify-center cursor-pointer relative hover:bg-gray-950/25 active:bg-gray-950/40"
		>
			{/* Top bar */}
			<span
				className={`absolute w-5 h-0.5 bg-white rounded-md transition-all duration-300 ${
					active
						? "rotate-45 top-1/2 translate-y-[-50%]"
						: "top-[calc(50%-0.45rem)] rounded-none"
				}`}
			></span>

			{/* Middle bar */}
			<span
				className={`absolute w-5 h-0.5 bg-white rounded-md transition-all duration-300 ${
					active ? "opacity-0" : ""
				}`}
			></span>

			{/* Bottom bar */}
			<span
				className={`absolute w-5 h-0.5 bg-white rounded-md transition-all duration-300 ${
					active
						? "-rotate-45 top-1/2 translate-y-[-50%]"
						: "top-[calc(50%+0.45rem)] rounded-none"
				}`}
			></span>
		</button>
	);
}

function SearchBar({ placeholder, type, setQuery }) {
	const [value, setValue] = useState("");

	useEffect(() => {
		const handler = ({ key }) => {
			if (key === "Enter" && value.trim() !== "") setQuery(value);
		};

		window.addEventListener("keydown", handler);

		return () => window.removeEventListener("keydown", handler);
	}, []);

	return (
		<div className="w-fit rounded-lg flex items-center px-1 py-0 space-x-1 ring-1 ring-gray-400">
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				type={type}
				className="outline-none w-full px-4 font-semibold"
				placeholder={placeholder}
			></input>
			<Icon className={"rounded-md icon-square"}>
				<IoSearchOutline></IoSearchOutline>
			</Icon>
		</div>
	);
}

function Header() {
	const { setQuery } = useMyContext();

	return (
		<header className="absolute top-0 padding-normal z-50 flex items-center w-full space-x-5 bg-transparent text-white">
			<div>
				<h1 className="italic text-2xl text-shadow-lg cursor-pointer">
					Pexels
				</h1>
			</div>

			<div className="grow flex justify-center">
				{/* <SearchBar
					setQuery={setQuery}
					placeholder={"Search for free photos"}
					type="text"
				></SearchBar> */}
			</div>

			<div className="flex items-center">
				<Dropdown
					text={"Explore"}
					className={
						"rounded-full btn-third ring-0 h-full bg-transparent  hover:bg-gray-950/25 active:bg-gray-950/40 text-white shadow-none font-semibold"
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
				<Button className={"btn-secondary"}>Join</Button>
				<MenuIcon></MenuIcon>
			</div>
		</header>
	);
}

export default Header;
