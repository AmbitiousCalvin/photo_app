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
		<div className=" rounded-full flex items-center justify-center group-hover/dropdown:rotate-180 transition-all duration-300">
			<IoIosArrowDown></IoIosArrowDown>
		</div>
	);
}

function LoadingIcon({ duration = 1 }) {
	return (
		<>
			<div className="flex flex-items-center justify-center gap-2">
				{/* <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

				<div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
				<div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div> */}

				{[0, 0.2, 0.4, 0.2, 0.0].map((delay, index) => (
					<div
						key={index}
						className="w-2 h-13 bg-emerald-600 rounded-lg animate-wiggle"
						style={{
							animationDuration: `${duration}s`,
							animationDelay: `${delay}s`,
						}}
					></div>
				))}
			</div>
		</>
	);
}

export { Button, Icon, ArrowIcon, LoadingIcon };
