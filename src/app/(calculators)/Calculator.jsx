import React, { useEffect, useState } from "react";

import MetaTags from "../../components/MetaTags";
import Head from "next/head";
import "katex/dist/katex.min.css";

import "katex/dist/katex.min.css";
import renderMathInElement from "katex/contrib/auto-render";

import {
  Breadcrumbs,
  CalculatorTitle,
  CalculatorWrap,
  FormWrap,
  LeftSideCalculator,
  RelatedLinks,
  RightSideCalculator,
} from "../../components/Calculator";

const Calculator = ({ isLoading, data, links, children }) => {
  const [ogImage, setOgImage] = useState(
    "https://calculator-logical.com/images/ogview/pages/calculator-logical.png"
  );
  const [currentUrl, setCurrentUrl] = useState("");
  const [showRight, setShowRight] = useState(true);

  const metaTitle = data?.payload?.tech_meta_title || "Calculator Logical";
  const metaDescription =
    data?.payload?.tech_meta_des || "Best online calculators and converters.";

  // ✅ SSR safe window usage
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // ✅ Ads safe injection
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("Adsbygoogle push error: ", e);
    }
  }, []);

  // ✅ OG image check
  useEffect(() => {
    if (!data?.payload?.tech_calculator_link) return;

    const imagePath = `https://calculator-logical.com/images/ogview/ogy/${data.payload.tech_calculator_link}.png`;
    const img = new Image();
    img.src = imagePath;

    img.onload = () => setOgImage(imagePath); // Image exists
    img.onerror = () =>
      setOgImage(
        "https://calculator-logical.com/images/ogview/pages/calculator-logical.png"
      ); // Fallback
  }, [data?.payload?.tech_calculator_link]);
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
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@calculator-logical.com" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        {currentUrl && <link rel="canonical" href={currentUrl} />}
      </Head>
      <CalculatorWrap>
        <LeftSideCalculator showRight={showRight}>
          {isLoading ? (
            <div className="p-4">
              <div className="mt-4 space-y-3">
                <div className="h-5 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            </div>
          ) : (
            <CalculatorTitle
              name={data?.payload?.tech_calculator_title}
              description={data?.payload?.tech_lang_keys?.after_title}
            />
          )}

          {isLoading ? (
            <div className="">
              <div className="mt-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            </div>
          ) : (
            <Breadcrumbs links={links} />
          )}

          {isLoading ? (
            <div className="p-4">
              <div className="mt-4 space-y-3">
                <div className="w-full h-[450px] bg-gray-300 rounded-lg animate-pulse"></div>
              </div>
            </div>
          ) : (
            <FormWrap>
              <div>
                <button
                  onClick={() => setShowRight((prev) => !prev)}
                  className="bg-blue-600 p-1 rounded-full hover:bg-blue-700 transition lg:flex md:flex hidden absolute top-[23px] right-[-15px] cursor-pointer"
                >
                  <img
                    src={showRight ? "/chevron-right.png" : "/chevron-left.png"}
                    alt="Toggle Sidebar"
                    className="w-5 h-5"
                  />
                </button>
              </div>
              {children}
            </FormWrap>
          )}

          {isLoading ? (
            <div className="p-4">
              <div className="mt-4 space-y-3">
                <div className="h-5 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-5 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-5 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-5 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-5 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="my-5"></div>

              {data?.payload?.tech_cal_cat !== "Math" && (
                <div
                  className="content max-w-[100%] overflow-x-auto"
                  dangerouslySetInnerHTML={{
                    __html: data?.payload?.tech_content,
                  }}
                ></div>
              )}
            </>
          )}
        </LeftSideCalculator>

        <RightSideCalculator showRight={showRight}>
          {isLoading ? (
            <div className="mt-10 bg-white border border-gray-100 rounded-2xl shadow-md p-4 sticky top-3 mt-[155px] mb-5">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                Related Calculators
              </h2>
              <ul>
                {[...Array(6)].map((_, index) => (
                  <li
                    key={index}
                    className="py-2 flex gap-4 animate-pulse w-full"
                  >
                    <div className="animate-pulse w-[100%] py-2">
                      <div className="h-4 bg-gray-300 animate-pulse rounded w-full"></div>
                      <div className="mt-2 h-4 bg-gray-300 animate-pulse rounded w-1/4"></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <RelatedLinks
              links={
                data?.payload?.tech_related_cal?.more.map((item) => ({
                  title: item.cal_title,
                  url: `/${item.cal_link}`,
                })) || []
              }
            />
          )}
        </RightSideCalculator>
      </CalculatorWrap>
    </>
  );
};

export default Calculator;
