import { lazy } from "react";

function useLazyLoad(src, component) {
	if (component !== "") {
		return lazy(() =>
			import(src).then((module) => ({ default: module[component] }))
		);
	}

	return lazy(() => import(src));
}

export default useLazyLoad;
