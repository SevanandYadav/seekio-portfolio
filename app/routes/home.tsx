import type { Route } from "./+types/home";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { Hero } from "../components/sections/hero";
import { ServicesPreview } from "../components/sections/services-preview";
import { WhyChoose } from "../components/sections/why-choose";
import { TechStack } from "../components/sections/tech-stack";
import { CTA } from "../components/sections/cta";
import { FloatingContact } from "../components/ui/floating-contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Seekio - Digital Transformation Solutions" },
    { name: "description", content: "Transform your business with cutting-edge digital solutions, automation, and low-code development." },
  ];
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServicesPreview />
      <WhyChoose />
      <TechStack />
      <CTA />
      <Footer />
      <FloatingContact />
    </>
  );
}
