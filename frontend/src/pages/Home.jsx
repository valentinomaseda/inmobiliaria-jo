import React from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import PropertyList from "../components/PropertyList";
import AboutSection from "../components/AboutSection";
import ValuationBanner from "../components/ValuationBanner";
import { propiedades } from "../data/propiedades";

export default function Home() {
  return (
    <>
      <Hero />
      <SearchBar />
      <PropertyList propiedades={propiedades} destacadas={true} />
      <AboutSection />
      <ValuationBanner />
    </>
  );
}
