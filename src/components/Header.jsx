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
		? "absolute z-auto bg-transparent text-white animate-show"
		: "fixed z-50 flex items-center w-full bg-white/90 text-black shadow-lg backdrop-blur-md animate-opacity";

	return (
		<header
			className={`top-0 padding-normal flex items-center w-full gap-2 ${headerStyles}`}
		>
			<Logo></Logo>

			<div className="relative grow ml-2 sm:px-2 flex justify-end sm:justify-center">
				<SearchBar
					showHeader={showHeader}
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
							: "btn-primary rounded-full pl-3"
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
				<Button
					className={`${
						showHeader ? "btn-primary" : "btn-secondary"
					} hidden sm:flex`}
				>
					Join
				</Button>
				<MenuIcon showHeader={showHeader}></MenuIcon>
			</div>
		</header>
	);
}

function SearchBar({ placeholder, type, setQuery, showHeader }) {
	const [value, setValue] = useState("");

	useEffect(() => {
		const handler = ({ key }) => {
			if (key === "Enter" && value.trim() !== "") setQuery(value);
		};

		window.addEventListener("keydown", handler);

		return () => window.removeEventListener("keydown", handler);
	}, [value]);

	return (
		<>
			{showHeader && (
				<Icon className={"rounded-md icon-square sm:hidden"}>
					<IoSearchOutline></IoSearchOutline>
				</Icon>
			)}
			{showHeader && (
				<div className="hidden sm:flex w-fit rounded-lg items-center px-1 py-0 space-x-1 ring-1 ring-gray-400">
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
			)}
		</>
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
