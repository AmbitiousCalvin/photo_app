import { useState } from "react";
import { Button, Icon } from "./Buttons";
import { IoSearch } from "react-icons/io5";
import { Dropdown, Option } from "./Dropdown";
import { useEffect } from "react";
import { useMyContext } from "../context";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { Link } from "react-router-dom";

function Header() {
	const { setQuery, showHeader } = useMyContext();
	const [showSidebar, setShowSidebar] = useState(false);

	const headerStyles = !showHeader
		? "absolute z-auto bg-transparent text-white animate-show"
		: "fixed z-50 bg-white animate-opacity text-black shadow-sm";

	return (
		<header
			className={`top-0 h-[68px] padding-normal flex items-center w-full gap-2 ${headerStyles}`}
		>
			{!showSidebar && <Logo></Logo>}

			<div className="relative grow ml-2 md:px-2 flex justify-end md:justify-center">
				<SearchBar
					showSidebar={showSidebar}
					setShowSidebar={setShowSidebar}
					showHeader={showHeader}
					setQuery={setQuery}
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
			)}
		</header>
	);
}

export function SearchBar({
	placeholder,
	type,
	setQuery,
	showHeader,
	showSidebar,
	setShowSidebar,
}) {
	const [value, setValue] = useState("");
	const activeStyles = showSidebar ? "flex" : "hidden";

	useEffect(() => {
		const handler = ({ key }) => {
			if (key === "Enter" && value.trim() !== "") setQuery(value);
		};

		window.addEventListener("keydown", handler);

		return () => window.removeEventListener("keydown", handler);
	}, [value]);

	return (
		<>
			{showHeader && !showSidebar && (
				<Icon
					onClick={() => setShowSidebar((prev) => !prev)}
					className={"rounded-md icon-square md:hidden"}
				>
					<IoSearch></IoSearch>
				</Icon>
			)}
			{(showHeader || showSidebar) && (
				<div
					className={`${activeStyles} md:flex group w-full transition-[width] duration-150 rounded-md items-center space-x-1 bg-gray-100 px-1.5`}
				>
					<Dropdown
						className={
							"btn-third bg-white hover:bg-gray-200 hover:ring-1 hover:ring-gray-300"
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
					<input
						type={type}
						className="outline-none w-full px-4 font-semibold"
						placeholder={placeholder}
					></input>
					<Icon
						className={
							"group-hover:opacity-100 opacity-[0.4] rounded-md icon-square icon-secondary"
						}
					>
						<IoSearch className="text-icon"></IoSearch>
					</Icon>
				</div>
			)}
		</>
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
