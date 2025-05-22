import { useState, useRef } from "react";
import { Button, Icon } from "./Buttons";
import { IoSearchOutline } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";
import { useEffect } from "react";
import useEventListener from "../hooks/useEventListener";

function MenuIcon() {
	const [active, setActive] = useState(false);

	return (
		<button
			onClick={() => setActive((prev) => !prev)}
			className="icon-secondary rounded group p-0 w-10 h-10 flex flex-col items-center justify-center cursor-pointer relative"
		>
			{/* Top bar */}
			<span
				className={`absolute w-5 h-0.5 bg-gray-950 rounded-md transition-all duration-300 ${
					active
						? "rotate-45 top-1/2 translate-y-[-50%]"
						: "top-[calc(50%-0.45rem)] rounded-none"
				}`}
			></span>

			{/* Middle bar */}
			<span
				className={`absolute w-5 h-0.5 bg-gray-950 rounded-md transition-all duration-300 ${
					active ? "opacity-0" : ""
				}`}
			></span>

			{/* Bottom bar */}
			<span
				className={`absolute w-5 h-0.5 bg-gray-950 rounded-md transition-all duration-300 ${
					active
						? "-rotate-45 top-1/2 translate-y-[-50%]"
						: "top-[calc(50%+0.45rem)] rounded-none"
				}`}
			></span>
		</button>
	);
}

function DropDown({ options, className }) {
	return (
		<div className={`px-2 py-1 rounded-md ${className}`}>
			{options?.map((option, index) => (
				<option key={index} value={option}>
					{option}
				</option>
			))}
		</div>
	);
}

function SearchBar({ placeholder, type, setQuery }) {
	const [value, setValue] = useState("");

	// useEffect(() => {
	// 	if (value === "") return;

	// 	const timeoutId = setTimeout(() => setQuery(value), 3000);

	// 	return () => {
	// 		clearTimeout(timeoutId);
	// 	};
	// }, [value]);

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

function Header({ setQuery }) {
	return (
		<header className="sticky top-0 flex items-center w-full padding-normal space-x-5 bg-white">
			<div>
				<h1 className="italic text-2xl cursor-pointer">Pexels</h1>
			</div>

			<div className="grow flex justify-center">
				<SearchBar
					setQuery={setQuery}
					placeholder={"Search for free photos"}
					type="text"
				></SearchBar>
			</div>

			<div className="flex items-center">
				<Button>Join</Button>
				<MenuIcon></MenuIcon>
			</div>
		</header>
	);
}

export default Header;
