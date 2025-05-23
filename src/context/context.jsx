import { useContext, createContext, useState } from "react";
import useEventListener from "../hooks/useEventListener";

const MyContext = createContext();

export function useMyContext() {
	return useContext(MyContext);
}

export function ContextProvider({ children }) {
	const [query, setQuery] = useState("landscapes");
	const [showHeader, setShowHeader] = useState(false);

	useEventListener("scroll", (e) => {
		setShowHeader(window.scrollY >= 500 ? true : false);
	});

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
