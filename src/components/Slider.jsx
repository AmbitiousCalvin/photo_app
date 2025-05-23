import { useState, useRef } from "react";
import { Icon, Button } from "./Buttons";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Children } from "react";
import { useLocalStorage } from "../hooks/useStorage";
import { useNavigate } from "react-router-dom";

const photoTags = [
	"portrait",
	"landscape",
	"macro",
	"black-and-white",
	"hdr",
	"panorama",
	"aerial",
	"underwater",
	"vintage",
	"film",
	"city",
	"nature",
	"beach",
	"mountains",
	"urban",
	"rural",
	"desert",
	"forest",
	"ocean",
	"architecture",
	"golden-hour",
	"sunset",
	"sunrise",
	"night",
	"daylight",
	"low-light",
	"studio-light",
];

function Slider({
	storage_id,
	className,
	options = photoTags,
	scrollable = true,
	children,
}) {
	const childrenArray = Children.toArray(children);
	const [isHidden, setHidden] = useState([true, false]);
	const [selectedId, setSelectedId] = useLocalStorage(storage_id, 0);
	const sliderContentRef = useRef(null);
	const naviagte = useNavigate();

	const scrollSlider = (direction = 1) => {
		const el = sliderContentRef.current;
		if (!el) return;

		const scrollAmount = el.offsetWidth * 0.55 * direction;
		el.scrollBy({ left: scrollAmount });

		const atStart = el.scrollLeft + scrollAmount <= 0 ? true : false;
		const atEnd =
			el.scrollLeft + scrollAmount >= el.scrollWidth - el.clientWidth;

		setHidden([atStart, atEnd]);
	};

	// transparent styles around edges if it is scrollable
	const maskStyle = scrollable
		? {
				WebkitMaskImage: `linear-gradient(to right,
			${isHidden[0] ? "black" : "transparent"} 0px,
			black 30px,
			black calc(100% - 30px),
			${isHidden[1] ? "black" : "transparent"} 100%)`,
				maskImage: `linear-gradient(to right,
			${isHidden[0] ? "black" : "transparent"} 0px,
			black 30px,
			black calc(100% - 30px),
			${isHidden[1] ? "black" : "transparent"} 100%)`,
		  }
		: {};

	// styles for showing a selected button
	const selectedStyles = (isSelected) => {
		if (isSelected)
			return "[&&&]:rounded-full bg-gray-950 hover:bg-gray-950/90 active:bg-gray-950/70 text-white border-2 btn-primary";

		return "[&&&]:rounded bg-gray-100 hover:bg-gray-200 active:bg-gray-950/20 border-2 text-slate-950 shadow-sm ring-1 ring-gray-200 ";
	};

	return (
		<nav
			className={`${
				className ? className : "w-full"
			} h-10 flex items-center padding-normal space-x-2 my-2`}
		>
			{scrollable && (
				<Icon
					onClick={() => scrollSlider(-1)}
					className={`icon-secondary ${
						isHidden[0] && "opacity-25 cursor-not-allowed"
					}`}
				>
					<FaArrowLeft></FaArrowLeft>
				</Icon>
			)}

			{/* if only options is provided, display in default way */}
			{childrenArray.length === 0 && options.length !== 0 && (
				<div
					ref={sliderContentRef}
					className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hidden scroll-smooth"
					style={maskStyle}
				>
					<div className="inline-flex items-center space-x-2">
						{options.map((option, index) => (
							<Button
								onClick={(e) => {
									setSelectedId(index);
									naviagte(`/photos/${e.target.textContent}`);
								}}
								className={`btn-third w-fit text-black rounded-m ${selectedStyles(
									index === selectedId
								)}`}
								key={index}
							>
								{option}
							</Button>
						))}
					</div>
				</div>
			)}

			{/* if children is provided, inject some extra code and display it */}
			{Children.map(childrenArray, (child, index) => {
				const {
					children,
					onClick = () => {},
					className,
					...rest
				} = child.props;

				return (
					<Button
						onClick={(e) => {
							setSelectedId(index);
							onClick(e, index);
							naviagte(`/photos/${e.target.textContent}`);
						}}
						key={index}
						{...rest}
						className={`${className} ${selectedStyles(index === selectedId)}`}
					>
						{children}
					</Button>
				);
			})}

			{scrollable && (
				<Icon
					onClick={() => scrollSlider(1)}
					className={`icon-secondary ${
						isHidden[1] && "opacity-25 cursor-not-allowed"
					}`}
				>
					<FaArrowRight></FaArrowRight>
				</Icon>
			)}
		</nav>
	);
}

export default Slider;
