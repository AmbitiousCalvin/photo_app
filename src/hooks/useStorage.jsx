import { useState, useEffect, useCallback } from "react";

function useLocalStorage(key, defaultValue) {
	return useStorage(key, defaultValue, localStorage);
}

function useSessionStorage(key, defaultValue) {
	return useStorage(key, defaultValue, sessionStorage);
}

function useStorage(key, defaultValue, storageObj) {
	const [value, setValue] = useState(() => {
		const jsonValue = storageObj.getItem(key);

		if (jsonValue !== null) return JSON.parse(jsonValue);

		if (typeof defaultValue === "function") return defaultValue();

		return defaultValue;
	});

	useEffect(() => {
		if (value == undefined) return storageObj.removeItem(key);

		storageObj.setItem(key, JSON.stringify(value));
	}, [key, value, storageObj]);

	const remove = useCallback(() => setValue(undefined), []);

	return [value, setValue, remove];
}

export { useLocalStorage, useSessionStorage };
