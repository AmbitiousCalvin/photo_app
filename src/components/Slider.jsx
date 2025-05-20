import { useState, useRef } from "react";
import { Icon, Button } from "./Buttons";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

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

function Slider({ options = photoTags }) {
	const [isHidden, setHidden] = useState([true, false]);
	const sliderContentRef = useRef(null);

	const scrollSlider = (direction = 1) => {
		const el = sliderContentRef.current;
		if (!el) return;

		const scrollAmount = el.offsetWidth * 0.5 * direction;
		el.scrollBy({ left: scrollAmount });

		const atStart = el.scrollLeft + scrollAmount <= 0 ? true : false;
		const atEnd =
			el.scrollLeft + scrollAmount >= el.scrollWidth - el.clientWidth;

		setHidden([atStart, atEnd]);
	};

	const maskStyle = {
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
	};

	return (
		<nav className="w-full h-10 flex items-center padding-normal space-x-2 my-2">
			<Icon
				onClick={() => scrollSlider(-1)}
				className={`icon-secondary ${
					isHidden[0] && "opacity-25 cursor-not-allowed"
				}`}
			>
				<FaArrowLeft></FaArrowLeft>
			</Icon>

			<div
				ref={sliderContentRef}
				className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hidden scroll-smooth"
				style={maskStyle}
			>
				<div className="inline-flex items-center space-x-2">
					{options.map((option, index) => (
						<Button
							className="btn-third w-fit text-black rounded-md"
							key={index}
						>
							<p>{option}</p>
						</Button>
					))}
				</div>
			</div>

			<Icon
				onClick={() => scrollSlider(1)}
				className={`icon-secondary ${
					isHidden[1] && "opacity-25 cursor-not-allowed"
				}`}
			>
				<FaArrowRight></FaArrowRight>
			</Icon>
		</nav>
	);
}

export default Slider;
