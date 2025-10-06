import Hero from "../sections/Hero";
import About from "../sections/About";
import Work from "../sections/Work";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <About />
      <Work />
    </div>
  );
}