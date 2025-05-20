function Button({ className, children, ...rest }) {
	return (
		<button className={className} {...rest}>
			{children}
		</button>
	);
}

function Icon({ className, children, ...rest }) {
	return <Button className={`icon ${className}`} {...rest}>{children}</Button>;
}

export { Button, Icon };
