import { useState } from "react";
import { Button, Icon } from "./Buttons";
import { IoSearchOutline } from "react-icons/io5";
import { Dropdown, Option } from "./Dropdown";
import { HiOutlinePhotograph } from "react-icons/hi";
import { MdOutlineSlowMotionVideo } from "react-icons/md";

function SearchBar({ placeholder = "", type = "text" }) {
	return (
		<div className="w-fit rounded-lg flex items-center px-1 py-0 space-x-1 ring-1 ring-gray-400">
			<Dropdown className={"btn-third"}>
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
				className="outline-none w-full px-4"
				placeholder={placeholder}
			></input>
			<Icon className={"rounded-md icon-square"}>
				<IoSearchOutline></IoSearchOutline>
			</Icon>
		</div>
	);
}

function HeroSection() {
	return (
		<section className="h-[20%] padding-normal border-2 border-red-500 flex items-center justify-center gap-2">
			<SearchBar placeholder="Search for free photos"></SearchBar>
		</section>
	);
}

export default HeroSection;
