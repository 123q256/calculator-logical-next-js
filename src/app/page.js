"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

import SearchBar from "@/components/pages/Home/SearchBar/SearchBar";
import Calculator from "@/components/pages/Home/Calculator/Calculator";
import CategorySection from "@/components/pages/Home/category/CategorySection";
import AboutCalculator from "@/components/pages/Home/AboutCalculator/AboutCalculator";
import CalculatorCategory from "@/components/pages/Home/CalculatorCategory/CalculatorCategory";


export default function Home() {
  const [currentUrl, setCurrentUrl] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
      setCanonicalUrl(
        `https://calculator-logical.com${window.location.pathname}`
      );
    }
  }, []);

  const ogImage = `https://calculator-logical.com/images/ogview/pages/calculator-logical.png`;
  const metaTitle =
    "Calculators Logical Online - 100% Free, Reliable & Accurate Calculators Logical";
  const metaDescription =
    "The 100% free and reliable online Calculators Logical that help you solve any calculation-related problems and provide you with precise measurements.";

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:site_name" content="Calculator Logical" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        {currentUrl && <meta property="og:url" content={currentUrl} />}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      </Head>

      <div className="lg:text-[35px] md:text-[35px] text-[30px] pt-5 font-[700] text-center">
        <h1 className="text-[#2845F5]">
          Calculator <span className="text-[#1A1A1A]">Logical</span>
        </h1>
      </div>

      <SearchBar />
      <Calculator />
      <CategorySection />
      <CalculatorCategory />
      <AboutCalculator />
    </>
  );
}
