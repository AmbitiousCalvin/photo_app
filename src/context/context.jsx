import { useContext, createContext, useState } from "react";
import useEventListener from "../hooks/useEventListener";
import { useEffect } from "react";

const MyContext = createContext();

export function useMyContext() {
	return useContext(MyContext);
}
const photoQueries = ["mountains", "city skyline", "beach", "forest", "food", "nature"];

export function ContextProvider({ children }) {
	const [query, setQuery] = useState(() => {
		const randomIndex = Math.floor(Math.random() * photoQueries.length);
		return photoQueries[randomIndex];
	});
	const [showHeader, setShowHeader] = useState(false);

	useEventListener("scroll", () => {
		setShowHeader(window.scrollY >= 500 ? true : false);
	});

	useEffect(() => {
		console.log(query);
	}, [query]);

	return (
		<MyContext.Provider
			value={{
				query,
				setQuery,
				showHeader,
			}}
		>
			{children}
		</MyContext.Provider>
	);
}
