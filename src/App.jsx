// import { Button, LoadingIcon } from "./components/Buttons.jsx";
// import Header from "./components/Header.jsx";
// import Slider from "./components/Slider.jsx";
// import HeroSection from "./components/HeroSection.jsx";
// import PhotoGrid from "./components/PhotoGrid.jsx";
import { ContextProvider } from "./context/context.jsx";
import useLazyLoad from "./hooks/useLazyLoad.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";

import HomePage from "./pages/Homepage.jsx";
const PhotosPage = React.lazy(() => import("./pages/PhotosPage.jsx"));
import LoadingScreen from "./components/LoadingScreen.jsx";
import { Suspense } from "react";

function App() {
	return (
		<>
			<ContextProvider>
				<main className="h-auto">
					<Router>
						<Routes>
							<Route path="/" element={<HomePage></HomePage>} />
							<Route
								path="/photos"
								element={
									<Suspense fallback={<LoadingScreen />}>
										<PhotosPage />
									</Suspense>
								}
							>
								<Route path=":query" element={<PhotosPage />} />
							</Route>
						</Routes>
					</Router>
				</main>
			</ContextProvider>
		</>
	);
}

export default App;
