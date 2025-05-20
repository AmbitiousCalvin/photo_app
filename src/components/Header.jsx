import { useState } from "react";
import { Button, Icon } from "./Buttons";
import { IoSearchOutline } from "react-icons/io5";

function MenuIcon() {
	const [active, setActive] = useState(false);

	return (
		<div
			onClick={() => setActive((prev) => !prev)}
			className="rounded group p-0 w-10 h-10 flex flex-col items-center justify-center hover:bg-gray-950/10 cursor-pointer relative"
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
					active ? "opacity-0" : "top-1/2 translate-y-[-45%]"
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
		</div>
	);
}

function DropDown({ options, className }) {
	return (
		<div className={`px-2 py-1 rounded-md ${className}`}>
			{options.map((option, index) => (
				<option key={index} value={option}>
					{option}
				</option>
			))}
		</div>
	);
}

function SearchBar({ placeholder, type }) {
	return (
		<div className="w-full max-w-90 rounded-lg flex px-1 py-0.5 space-x-1 border-2 border-gray-400">
			<input
				type={type}
				className="outline-none w-full px-4"
				placeholder={placeholder}
			></input>
			<Icon className={"rounded"}>
				<IoSearchOutline></IoSearchOutline>
			</Icon>
		</div>
	);
}

function Header() {
	return (
		<header className="flex items-center w-full px-4 py-2 space-x-4">
			<div>
				<h1 className="italic text-2xl cursor-pointer">Pexels</h1>
			</div>
			<div className="grow flex justify-center">
				<SearchBar
					placeholder={"Search for free photos"}
					type="search"
				></SearchBar>
			</div>

			<Button>Join</Button>
			<MenuIcon></MenuIcon>
		</header>
	);
}

export default Header;
