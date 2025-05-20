import { IoIosArrowDown } from "react-icons/io";

function Button({ className, children, ...rest }) {
	return (
		<button className={className} {...rest}>
			{children}
		</button>
	);
}
function Icon({ className, children, ...rest }) {
	return (
		<Button className={`icon ${className}`} {...rest}>
			{children}
		</Button>
	);
}

function ArrowIcon() {
	return (
		<div className=" rounded-full flex items-center justify-center group-hover:rotate-180 transition-all duration-300">
			<IoIosArrowDown></IoIosArrowDown>
		</div>
	);
}

export { Button, Icon, ArrowIcon };
