// import { Button, LoadingIcon } from "./components/Buttons.jsx";
// import Header from "./components/Header.jsx";
// import Slider from "./components/Slider.jsx";
// import HeroSection from "./components/HeroSection.jsx";
// import PhotoGrid from "./components/PhotoGrid.jsx";
import { ContextProvider } from "./context/context.jsx";
import HomePage from "./pages/Homepage.jsx";
import PhotosPage from "./pages/PhotosPage.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
	return (
		<>
			<ContextProvider>
				<main className="h-auto">
					<Router>
						<Routes>
							<Route path="/" element={<HomePage></HomePage>} />
							<Route path="/photos" element={<PhotosPage></PhotosPage>} />
						</Routes>
					</Router>
				</main>
			</ContextProvider>
		</>
	);
}

export default App;
