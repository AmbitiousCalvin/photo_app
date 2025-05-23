import { useCallback, useEffect } from "react";
import { useRef } from "react";

export default function useInfiniteScroll(callback) {
	const nodeRef = useRef(null);
	const observerRef = useRef(null);

	const observe = useCallback(
		(node) => {
			if (observerRef.current) observerRef.current.disconnect();

			const options = {
				root: null,
				rootMargin: "300px",
				threshold: 0,
			};

			observerRef.current = new IntersectionObserver(([entry]) => {
				if (entry.isIntersecting) {
					callback();
				}
			}, options);

			if (node) observerRef.current.observe(node);
		},
		[callback]
	);

	useEffect(() => {
		const node = nodeRef.current;
		if (!node) return;
		observe(node);

		return () => {
			if (observerRef.current) observerRef.current.disconnect();
		};
	}, [observe]);

	return nodeRef;
}
