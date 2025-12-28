import type { Route } from "./+types/home";
import { Navbar } from "../components/layout/navbar";
import { Footer } from "../components/layout/footer";
import { Hero } from "../components/sections/hero";
import { ServicesPreview } from "../components/sections/services-preview";
import { WhyChoose } from "../components/sections/why-choose";
import { CTA } from "../components/sections/cta";
import { FloatingContact } from "../components/ui/floating-contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Seekio Campus Solutions® - Academic Management Platform" },
    { name: "description", content: "Transform your educational institution with comprehensive academic management solutions for schools, colleges, and universities." },
  ];
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServicesPreview />
      <WhyChoose />
      <CTA />
      <Footer />
      <FloatingContact />
    </>
  );
}
