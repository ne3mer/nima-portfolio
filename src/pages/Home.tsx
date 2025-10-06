import Hero from "../sections/Hero";
import About from "../sections/About";
import Work from "../sections/Work";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <About />
      <Work />
      <Contact />
    </div>
  );
}