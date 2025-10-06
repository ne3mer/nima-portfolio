import Hero from "../sections/Hero";
import About from "../sections/About";
import Work from "../sections/Work";
import Playground from "../sections/Playground";
import Contact from "../sections/Contact";
import CursorRipple from "../components/CursorRipple";

export default function Home() {
  return (
    <div className="relative">
      <CursorRipple />
      <Hero />
      <About />
      <Work />
      <Playground />
      <Contact />
    </div>
  );
}