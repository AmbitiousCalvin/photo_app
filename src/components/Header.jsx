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

function Header() {
	const { setQuery, showHeader } = useMyContext();

	const headerStyles = !showHeader
		? "absolute top-0 padding-normal z-auto flex items-center w-full space-x-5 bg-transparent text-white"
		: "fixed top-0 padding-normal z-50 flex items-center w-full space-x-5 animate-opacity bg-white/90 text-black shadow-lg backdrop-blur-md ";

	return (
		<header className={headerStyles}>
			<Logo></Logo>

			<div className="grow flex justify-center">
				<SearchBar
					setQuery={setQuery}
					placeholder={"Search for free photos"}
					type="text"
				></SearchBar>
			</div>

			<div className="flex items-center">
				<Dropdown
					text={"Explore"}
					className={
						!showHeader
							? "rounded-full btn-third ring-0 h-full bg-transparent  hover:bg-gray-950/25 active:bg-gray-950/40 text-white shadow-none font-semibold"
							: "btn-primary rounded-full pl-4"
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
				<Button className={`${showHeader ? "btn-primary" : "btn-secondary"}`}>
					Join
				</Button>
				<MenuIcon showHeader={showHeader}></MenuIcon>
			</div>
		</header>
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

function Logo() {
	return (
		<div>
			<h1 className="italic font-fancy text-2xl text-shadow-md cursor-pointer">
				Lenscape
			</h1>
		</div>
	);
}

function MenuIcon({ showHeader }) {
	const [active, setActive] = useState(false);

	const bgColor = !showHeader ? "bg-white" : "bg-black";
	const activeColors = !showHeader
		? "hover:bg-gray-950/25 active:bg-gray-950/40"
		: "hover:bg-gray-400/25 active:bg-gray-400/40 border-2 border-gray-950";

	return (
		<button
			onClick={() => setActive((prev) => !prev)}
			className={`icon-secondary rounded group p-0 w-10 h-10 flex flex-col items-center justify-center cursor-pointer relative ${activeColors}
			`}
		>
			{/* Top bar */}
			<span
				className={`absolute w-5 h-0.5 ${bgColor} rounded-md transition-all duration-300 ${
					active
						? "rotate-45 top-1/2 translate-y-[-50%]"
						: "top-[calc(50%-0.45rem)] rounded-none"
				}
					
					`}
			></span>

			{/* Middle bar */}
			<span
				className={`absolute w-5 h-0.5 ${bgColor} rounded-md transition-all duration-300 ${
					active ? "opacity-0" : ""
				}`}
			></span>

			{/* Bottom bar */}
			<span
				className={`absolute w-5 h-0.5 ${bgColor} rounded-md transition-all duration-300 ${
					active
						? "-rotate-45 top-1/2 translate-y-[-50%]"
						: "top-[calc(50%+0.45rem)] rounded-none"
				}`}
			></span>
		</button>
	);
}

export default Header;
