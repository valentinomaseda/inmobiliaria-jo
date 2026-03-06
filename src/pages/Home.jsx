import React from "react";
import Hero from "../components/Hero";
import PropertyList from "../components/PropertyList";
import { propiedades } from "../data/propiedades";

export default function Home() {
  return (
    <>
      <Hero />
      <PropertyList propiedades={propiedades} destacadas={true} />
    </>
  );
}
