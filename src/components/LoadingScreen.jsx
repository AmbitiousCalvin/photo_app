import { LoadingIcon } from "./Buttons";

export default function LoadingScreen({ className, options }) {
	return (
		<section
			className={`${className} w-screen h-screen fixed top-0 left-0 flex items-center justify-center`}
		>
			<LoadingIcon></LoadingIcon>
		</section>
	);
}
