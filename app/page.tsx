import { Header } from "./components/header/Header";
import { Hero } from "./components/hero/Hero";

export default function Home() {
  return (
    <div className="bg-black h-screen text-white">
      <Header />
      <Hero />
    </div>
  );
}
