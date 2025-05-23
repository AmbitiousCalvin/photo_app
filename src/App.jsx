// import { Button, LoadingIcon } from "./components/Buttons.jsx";
// import Header from "./components/Header.jsx";
// import Slider from "./components/Slider.jsx";
// import HeroSection from "./components/HeroSection.jsx";
// import PhotoGrid from "./components/PhotoGrid.jsx";
// import { ContextProvider } from "./context.jsx";
import HomePage from "./pages/Homepage.jsx";

function App() {
	return (
		<>
			<ContextProvider>
				<main className="h-auto">
					<HomePage></HomePage>
				</main>
			</ContextProvider>
		</>
	);
}

export default App;
