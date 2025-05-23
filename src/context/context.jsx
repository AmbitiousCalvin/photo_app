import { useContext, createContext, useState } from "react";
import useEventListener from "../hooks/useEventListener";
import { useEffect } from "react";

const MyContext = createContext();

export function useMyContext() {
	return useContext(MyContext);
}

export function ContextProvider({ children }) {
	const [query, setQuery] = useState("architecture");
	const [showHeader, setShowHeader] = useState(false);

	useEventListener("scroll", (e) => {
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
