import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Herosection from "./Components/Herosection";
import WhatWeDo from "./Components/Whatwedo";
import Howweworks from "./Components/Howweworks";
// import Testimonials from "./Components/Testomonial";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Herosection />
      <WhatWeDo />
      <Howweworks />
      {/* <Testimonials /> */}
      <Footer />
    </div>
  );
}