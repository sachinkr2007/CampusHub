import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import Placements from "../components/Placements";
import Events from "../components/Events";
import CTA from "../components/CTA";
import Footer from "../components/Footer";


function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Stats />
      <Features /> 
      <Placements />
      <Events />
      <CTA />
      <Footer />

    </div>
  );
}

export default Home;