import React, { useState } from "react";
import { Button, ArrowIcon } from "./Buttons";

function Option({ className, children, selected, ...rest }) {
	return (
		<span
			{...rest}
			className={` text-nowrap flex items-center justify-between w-full cursor-pointer hover:bg-gray-200 active:bg-gray-300 px-3 py-2 rounded-lg font-semibold transition-all duration-150 gap-2 ${
				selected ? "text-emerald-500" : "text-slate-800"
			} ${className}`}
		>
			{children}
		</span>
	);
}

function Dropdown({
	className,
	text,
	children,
	onChildClick = () => {},
	...rest
}) {
	const childrenArray = React.Children.toArray(children);
	const [selectedId, setSelectedId] = useState(0);
	const childProps = childrenArray[selectedId]?.props;

	return (
		<>
			<Button
				{...rest}
				className={`group/dropdown dropdown-btn px-3 ${className}`}
			>
				<div className="dropdown_text_container flex items-center gap-1 justify-center">
					{text && <>{text}</>}
					{!text && childrenArray.length >= 1 && childProps?.children}
					<ArrowIcon></ArrowIcon>
				</div>

				<div className="dropdown-element">
					{React.Children.map(childrenArray, (child, index) => {
						const { children, ...restProps } = child.props;
						return (
							<Option
								onClick={(e) => {
									setSelectedId(index);
									onChildClick(e, index);
								}}
								{...restProps}
								selected={index === selectedId}
							>
								{children}
							</Option>
						);
					})}
				</div>
			</Button>
		</>
	);
}

export { Dropdown, Option };
