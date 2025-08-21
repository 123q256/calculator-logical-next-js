"use client";

import { useState, useEffect } from "react";
import { useGetSingleCategoryByCategoryNameQuery } from "../../redux/services/category/categoryApi.js";
import Link from "next/link";
import Head from "next/head";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
const allowedCategories = [
  "health",
  "math",
  "everyday-life",
  "finance",
  "physics",
  "chemistry",
  "statistics",
  "construction",
  "pets",
  "timedate",
];
const CategoryDetail = () => {
  const { category_name } = useParams();
  // 👇 check if category is allowed
  if (!allowedCategories.includes(category_name.toLowerCase())) {
    notFound(); // 👈 this will automatically render your 404 page
  }

  const {
    data: getSingleCategoryByCategoryName,
    isLoading,
    isFetching,
  } = useGetSingleCategoryByCategoryNameQuery(category_name);
  const data = getSingleCategoryByCategoryName?.payload?.subCategories || [];

  const [searchTerm, setSearchTerm] = useState("");
  // Filter data based on search term
  const filteredData = data?.map((subCategory) => ({
    ...subCategory,
    calculators: subCategory.calculators.filter((calc) =>
      calc.tech_calculator_title.toLowerCase().includes(searchTerm)
    ),
  }));
  // Get URLs safely for SSR
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCanonicalUrl(`${window.location.origin}${window.location.pathname}`);
      setCurrentUrl(window.location.href);
    }
  }, []);

  const metaTitle =
    getSingleCategoryByCategoryName?.payload?.category?.meta_title;
  const metaDescription =
    getSingleCategoryByCategoryName?.payload?.category?.meta_des;
  const ogImage = `https://calculator-logical.com/images/ogview/pages/calculator-logical.png`;
  return (
    <div className="container-fluid mx-auto  container-fluid mt-[20px]">
      <Head>
        <title>{metaTitle || "My App"}</title>
        <meta name="description" content={metaDescription || "Description."} />
        <meta property="og:site_name" content="Calculator Logical" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={currentUrl} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@calculator-logical.com" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <link rel="canonical" href={currentUrl} />
      </Head>
      <div className="lg:w-[95%] w-full mx-auto py-1 rounded-lg ">
        {isLoading || isFetching ? (
          <div className="animate-pulse w-1/4">
            <div className="h-8 bg-gray-300 rounded-md ml-4"></div>
          </div>
        ) : (
          <h1 className="lg:text-[30px] md:text-[30px] px-5 text-[26px] font-[700] leading-[46.87px]">
            {getSingleCategoryByCategoryName?.payload?.category?.category_name}
          </h1>
        )}
      </div>
      <div className="flex flex-col items-center py-1 mb-5">
        <div className="mt-2 lg:w-[95%] w-full bg-right bg-cover  rounded-lg px-[12px] ">
          <div className="flex flex-col lg:flex-row">
            <div className=" w-full  order-1 lg:order-2  px-[5px]   rounded-lg md:mb-6 lg:mb-6 ">
              <p className="text-[17px] text-opacity-60  mt-2 leading-[29.83px] text-left font-[400] ">
                {getSingleCategoryByCategoryName?.payload?.category?.des}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            <div
              className="lg:w-[100%]  md:w-[100%] w-full  order-2 lg:order-1 p-[20px] lg:p-[10px] md:p-[10px]   rounded-lg inset-0  bg-center bg-no-repeat filter"
              style={{ backgroundImage: 'url("/new_page/finance_bg.svg")' }}
            >
              {isLoading || isFetching ? (
                <div className="animate-pulse space-y-4 grid grid-cols-12 gap-4">
                  {/* First div takes up the full row */}
                  <div className="h-8 w-1/2 bg-gray-300 rounded-md col-span-12"></div>

                  {/* Next three divs, each takes up 4 columns (lg:col-span-4 md:col-span-4 col-span-12) */}
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-8 w-1/2 bg-gray-300 rounded-md col-span-12"></div>

                  {/* Next three divs, each takes up 4 columns (col-span-4) */}
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-8 w-1/2 bg-gray-300 rounded-md col-span-12"></div>

                  {/* Next three divs, each takes up 4 columns (col-span-4) */}
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                  <div className="h-6 bg-gray-200 rounded-md lg:col-span-4 md:col-span-4 col-span-12"></div>
                </div>
              ) : filteredData.length === 0 ? (
                <p>No calculators found</p> // Show this if no calculators match the search
              ) : (
                <div
                  className="grid grid-cols-12 gap-4 Everyday-Life"
                  id="myTable"
                >
                  {filteredData?.map((subCategory, index) => (
                    <div key={index} className="col-span-12">
                      {/* Subcategory Title */}
                      <h2 className="col-span-12 text-[21px] font-bold my-3">
                        <div>{subCategory.sub_category_name}</div>
                      </h2>

                      {/* Calculators List - Grid with 3 items per row */}
                      <ul className="grid grid-cols-12 gap-1 list-disc pl-5">
                        {subCategory.calculators.map((calc, calcIndex) => (
                          <li
                            key={calcIndex}
                            className="lg:col-span-4 md:col-span-6 col-span-12 p-2 rounded-md"
                          >
                            <Link
                              href={`/${calc.tech_calculator_link}`}
                              className="lg:text-[16px] md:text-[14px] text-[16px] font-serif font-medium hover:underline hover:text-black"
                            >
                              {calc.tech_calculator_title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
