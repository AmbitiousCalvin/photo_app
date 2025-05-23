import { useState, useRef } from "react";
import { Button, Icon } from "./Buttons";
import { IoSearch } from "react-icons/io5";
import { Dropdown, Option } from "./Dropdown";
import { useEffect } from "react";
import { useMyContext } from "../context/context";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import useEventListener from "../hooks/useEventListener";

function Header() {
	const { showHeader } = useMyContext();
	const [showSidebar, setShowSidebar] = useState(false);

	const headerStyles = !showHeader
		? "absolute z-auto bg-transparent text-white animate-show"
		: "fixed z-50 bg-white animate-opacity text-black shadow-sm";

	// temporary fix for the search bar styles being weird as screen gets wider
	useEventListener("resize", () => {
		if (window.innerWidth > 768) setShowSidebar(false);
	});

	return (
		<header
			className={`top-0 h-[68px] padding-normal flex items-center w-full gap-2 ${headerStyles}`}
		>
			{!showSidebar && <Logo></Logo>}

			<div
				className={`relative grow md:px-2 flex ${
					showSidebar ? "justify-center" : "max-md:justify-end"
				} md:justify-center md:ml-2`}
			>
				<SearchBar
					showSidebar={showSidebar}
					setShowSidebar={setShowSidebar}
					showHeader={showHeader}
					placeholder={"Search for free photos"}
					type="text"
				></SearchBar>
			</div>

			{!showSidebar && (
				<div className="flex items-center">
					<Dropdown
						text={"Explore"}
						className={
							!showHeader
								? "rounded-full btn-third ring-0 h-full bg-transparent  hover:bg-gray-950/25 active:bg-gray-950/40 text-white shadow-none font-semibold"
								: "btn-primary rounded-full pl-4 max-sm:pl-3"
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
			)}
		</header>
	);
}

export function SearchBar({
	placeholder,
	type,
	showHeader,
	showSidebar,
	setShowSidebar,
}) {
	const [value, setValue] = useState("");
	const navigate = useNavigate();

	const inputRef = useRef(null);
	const submitQuery = (e) => {
		e.preventDefault();
		if (value.trim() === "") return;
		navigate(`/photos/${encodeURIComponent(value)}`);
		setValue("");
	};

	useEffect(() => {
		if (showSidebar) inputRef.current?.focus();
	}, [showSidebar]);

	const activeStyles = showSidebar
		? "max-md:flex max-md:bg-transparent max-md:ring-2 max-md:ring-gray-200 w-full"
		: "max-md:hidden md:w-full max-w-[560px]";

	return (
		<>
			{showHeader && !showSidebar && (
				<Icon
					onClick={() => {
						setShowSidebar((prev) => !prev);
					}}
					className={"rounded-md icon-square md:hidden"}
				>
					<IoSearch></IoSearch>
				</Icon>
			)}
			{(showHeader || showSidebar) && (
				<div
					onClick={() => inputRef.current?.focus()}
					className={`${activeStyles} md:flex group transition-[width] duration-150 rounded-md items-center space-x-1 max-sm:scale-[0.9] bg-gray-100 px-1.5`}
				>
					<CustomDropdown></CustomDropdown>

					<form onSubmit={submitQuery} className="flex-grow min-w-0 w-full">
						<input
							value={value}
							ref={inputRef}
							onChange={(e) => setValue(e.target.value)}
							type={type}
							className="outline-none px-4 font-semibold caret-gray-950"
							placeholder={placeholder}
						></input>
					</form>

					{/* clear searchbar icon */}
					<Icon
						onClick={() => {
							setShowSidebar(false);
							setValue("");
						}}
						className={
							"md:hidden  group-hover:opacity-100 group-focus:opacity-100 opacity-[0.4] rounded-md icon-square icon-secondary"
						}
					>
						<IoClose className="text-icon"></IoClose>
					</Icon>

					{/* Click to search the query icon */}
					<Icon
						onClick={submitQuery}
						className={
							"group-hover:opacity-100 group-focus:opacity-100 opacity-[0.4] rounded-md icon-square icon-secondary"
						}
					>
						<IoSearch className="text-icon"></IoSearch>
					</Icon>
				</div>
			)}
		</>
	);
}

function CustomDropdown() {
	return (
		<Dropdown
			className={
				"btn-third searchBar_dropdown bg-white hover:bg-gray-100 hover:ring-1 hover:ring-gray-300"
			}
		>
			<Option>
				<HiOutlinePhotograph className="text-icon"></HiOutlinePhotograph>
				<p>Photos</p>
			</Option>
			<Option>
				<MdOutlineSlowMotionVideo className="text-icon"></MdOutlineSlowMotionVideo>
				<p>Videos</p>
			</Option>
		</Dropdown>
	);
}

export function Logo() {
	return (
		<div>
			<Link to="/">
				<h1 className="italic font-fancy text-2xl text-shadow-md cursor-pointer">
					Lenscape
				</h1>
			</Link>
		</div>
	);
}

export function MenuIcon({ showHeader }) {
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
