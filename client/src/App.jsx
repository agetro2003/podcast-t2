import { SheetContextProvider } from "./context/SheetContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Spotify from "./components/Spotify/Spotify";
import TestimonialSlider from "./components/TestimonialSlider";
import ApplyFor from "./components/ApplyFor/ApplyFor";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <SheetContextProvider>
        <main>
          <Hero />
          <Spotify />
          <TestimonialSlider />
          <ApplyFor />
        </main>
      </SheetContextProvider>
      <Footer />
    </>
  );
}
