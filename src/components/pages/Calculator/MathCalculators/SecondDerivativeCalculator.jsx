import React, { useEffect, useState, useRef } from "react";
import { InlineMath, BlockMath } from "react-katex";
import katex from "katex";
import "katex/dist/katex.min.css";



import {
  Breadcrumbs,
  CalculatorTitle,
  CalculatorWrap,
  RightSideCalculator,
  LeftSideCalculator,
  RelatedLinks,
  FormWrap,
} from "../../../components/Calculator";
import { useLocation } from "react-router-dom";
import {
  useGetSingleCalculatorDetailsMutation,
  useSecondDerivativeCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useSecondDerivativeCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const SecondDerivativeCalculator = ({ html }) => {
  const location = useLocation();
    const url = location.pathname.replace(/^\/+/,"");
  const [getSingleCalculatorDetails, { data, error, isLoading }] =
    useGetSingleCalculatorDetailsMutation();
  const handleFetchDetails = async () => {
    try {
      // Call the mutation with the `tech_calculator_link`
      await getSingleCalculatorDetails({ tech_calculator_link: url });
    } catch (err) {
      console.error("Error fetching calculator details:", err);
    }
  };

  useEffect(() => {
    handleFetchDetails();
  }, [url]);

  const [formData, setFormData] = useState({
    tech_EnterEq: "cos(x)^3*sin(x)",
    tech_with: "x"
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useSecondDerivativeCalculatorMutation();


const [showKeyboard, setShowKeyboard] = useState(false);

  const toggleKeyboard = () => {
    setShowKeyboard((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setResult(null);
    setFormError(null);
  };

  const handleKeyClick = (value) => {
    setFormData((prev) => ({
      ...prev,
      tech_EnterEq: (prev.tech_EnterEq || "") + value
    }));
    setResult(null);
    setFormError(null);
  };

  const clearInput = () => {
    setFormData((prev) => ({ ...prev, tech_EnterEq: "" }));
    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_EnterEq ) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_EnterEq: formData.tech_EnterEq,
        tech_with: formData.tech_with,

      }).unwrap();
      setResult(response?.payload); // Assuming the response has 'lovePercentage'
      toast.success(
       "Successfully Calculated"
      );
    } catch (err) {
         setFormError(err.data.payload.error);
      toast.error(err.data.payload.error);
    }
  };

  // Handle reset form
  const handleReset = () => {
    setFormData({  

        tech_EnterEq: "cos(x)^3*sin(x)",
    tech_with: "x"

    });
    setResult(null);
    setFormError(null);
  };
// currency code
  const [currency, setCurrency] = useState({
    code: "USD",
    symbol: "$",
    name: "US Dollar",
  });
  
  useEffect(() => {
    const fetchCurrency = async () => {
      const result = await getUserCurrency();
      if (result) {
        setCurrency(result);
      }
    };
  
    fetchCurrency();
  }, []);
// currency code

  const exampleLoadHandler = () => {
  const examples = [
    "(x^2 + 1)^(1/2)",
    "(3x^2 - 2x + 5)^(1/2)",
    "(4x^2 + 9)^(1/2)",
    "(x^2 - 6x + 8)^(1/2)",
    "(2x^2 + x + 7)^(1/2)"
  ];

    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    setFormData((prev) => ({
      ...prev,
      tech_EnterEq: randomExample,
    }));
    setResult(null);
    setFormError(null);
  };

  // result

  const [visibleStep, setVisibleStep] = useState(null);
  const stepRefs = useRef([]);
  const expressionRefs = useRef([]);

  // Helper function to render raw LaTeX string to HTML with KaTeX
  const renderMath = (latex, displayMode = false) => {
    try {
      return {
        __html: katex.renderToString(latex, {
          throwOnError: false,
          displayMode,
        }),
      };
    } catch (e) {
      return { __html: latex };
    }
  };



   // Run KaTeX render for any <script type="math/tex"> inside the step divs or expression paragraphs
  useEffect(() => {
    if (visibleStep !== null && stepRefs.current[visibleStep]) {
      const container = stepRefs.current[visibleStep];
      const scripts = container.querySelectorAll('script[type^="math/tex"]');
      scripts.forEach((script) => {
        const isDisplay = script.type.includes("mode=display");
        const tex = script.textContent;
        const span = document.createElement("span");
        try {
          katex.render(tex, span, { displayMode: isDisplay });
          script.replaceWith(span);
        } catch (err) {
          console.error("KaTeX render error:", err);
        }
      });
      container.scrollIntoView({ behavior: "smooth" });
    }

    // Similarly render any math scripts inside expressions (if needed)
    Object.values(expressionRefs.current).forEach((el) => {
      if (el) {
        const scripts = el.querySelectorAll('script[type^="math/tex"]');
        scripts.forEach((script) => {
          const isDisplay = script.type.includes("mode=display");
          const tex = script.textContent;
          const span = document.createElement("span");
          try {
            katex.render(tex, span, { displayMode: isDisplay });
            script.replaceWith(span);
          } catch (err) {
            console.error("KaTeX render error:", err);
          }
        });
      }
    });
  }, [visibleStep, result?.tech_final_res]);

  // Prepare apostrophes string to mimic f'(x), f''(x), etc
  const apostrophesForIndex = (index) => "'".repeat((index + 1) / 2);



    
    return (
      <Calculator
        isLoading={isLoading}
        data={data}
        links={[
          { name: "Home", path: "/" },
          {
            name: data?.payload?.tech_cal_cat,
            path: "/" + data?.payload?.tech_cal_cat,
          },
          {
            name: data?.payload?.tech_calculator_title,
            path: location.pathname, // This will use the current path dynamically
          },
        ]}
      >
          <form className="row" onSubmit={handleSubmit}>
            <div className="w-full mx-auto p-4 lg:p-8 md:p-8 input_form rounded-lg space-y-6 mb-3">
              {formError && (
                <p className="text-red-500 text-lg font-semibold w-full">
                  {formError}
                </p>
              )}
            <div className="lg:w-[60%] md:w-[80%] w-full mx-auto ">
                <div className="grid grid-cols-12 mt-3 gap-2 md:gap-4 lg:gap-4">
                <div className="lg:col-span-9 md:col-span-9 col-span-12">
                    <div className="col-span-12 md:col-span-4 lg:col-span-4 md:flex md:justify-between">
                    <label for="tech_EnterEq" className="label mt-4">{data?.payload?.tech_lang_keys['1']}:</label>
                      <button type="button" className="  flex border rounded-lg p-1  items-center" id="exampleLoadBtn"  onClick={exampleLoadHandler}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-up-right size-5 me-1" ><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                          Load Example
                      </button>
                    </div>
                        <div className="w-full py-2 relative">
                          <input
                            type="text"
                            step="any"
                            name="tech_EnterEq"
                            id="tech_EnterEq"
                            className="input "
                            aria-label="input"
                            placeholder="00"
                            value={formData.tech_EnterEq}
                            onChange={handleChange}
                          />
                          <img   src="/images/keyboard.png" className="keyboardImg absolute right-2 top-12 transform -translate-y-1/2 w-9 h-9" alt="keyboard" loading="lazy" decoding="async"  onClick={toggleKeyboard}/>
                      </div>
                </div>
                <div className="lg:col-span-3 md:col-span-3 col-span-12 md:mt-3">
                    <label htmlFor="tech_with" className="label">
                        W.R.T:
                      </label>
                      <div className="mt-2">
                        <select
                          className="input"
                          aria-label="select"
                          name="tech_with"
                          id="tech_with"
                          value={formData.tech_with}
                          onChange={handleChange}
                        >
                          <option value="a">a </option>
                          <option value="b">b </option>
                          <option value="c">c </option>
                          <option value="n">n </option>
                          <option value="x">x </option>
                          <option value="y">y </option>
                          <option value="z">z </option>
                        </select>
                      </div>
                </div>
                {showKeyboard && (
                    <div className="col-span-12 keyboard grid grid-cols-9 gap-1 mt-2">
                    <button
                      type="button"
                      className="bg-blue-700 text-white rounded-sm h-9 px-2 uppercase shadow-md hover:bg-blue-600"
                      onClick={clearInput}
                    >
                      CLS
                    </button>
                    {["+","-","/","*","^","sqrt(","(",")"].map((keyVal, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="keyBtn bg-blue-700 text-white rounded-sm h-9 px-2 uppercase shadow-md hover:bg-blue-600"
                        onClick={() => handleKeyClick(keyVal)}
                      >
                        {keyVal === "sqrt(" ? "√" : keyVal}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-6 mt-10 text-center space-x-2">
                  <Button type="submit" isLoading={roundToTheNearestLoading}>
                    {data?.payload?.tech_lang_keys["calculate"]}
                  </Button>
                  {result && (
                    <ResetButton type="button" onClick={handleReset}>
                      {data?.payload?.tech_lang_keys["locale"] === "en"
                        ? "RESET"
                        : data?.payload?.tech_lang_keys["reset"] || "RESET"}
                    </ResetButton>
                    )}
              </div>
            </div>
            {roundToTheNearestLoading ? (
              <div className="w-full mx-auto p-4 lg:p-8 md:p-8 result_calculator rounded-lg space-y-6 result">
                <div className="animate-pulse">
                  <div className=" w-full h-[30px] bg-gray-3lg:00 animate md:00 animate 00 animat12-pulse rounded-[10px] mb-4"></div>
                  <div className="w-[75%] h-[20px] bg-gray-3lg:00 animate md:00 animate 00 animat12-pulse rounded-[10px] mb-3"></div>
                  <div className="w-[50%] h-[20px] bg-gray-3lg:00 animate md:00 animate 00 animat12-pulse rounded-[10px] mb-3"></div>
                  <div className="w-[25%] h-[20px] bg-gray-3lg:00 animate md:00 animate 00 animat12-pulse rounded-[10px]"></div>
                </div>
              </div>
            ) : (
              result && (
                <>
                  <div className="w-full mx-auto p-4 lg:p-8 md:p-8 result_calculator rounded-lg space-y-6 result">
                    <div>
                      <ResultActions lang={data?.payload?.tech_lang_keys} />
                      

                   <div className="rounded-lg flex items-center justify-center">
                      <div className="w-full mt-3">
                        <div className="w-full text-[16px]">
                          {result?.tech_final_res &&
                            result.tech_final_res.map((item, index) => {
                              if (index % 2 === 1) {
                                const idx = index + 1;
                                const apostrophes = apostrophesForIndex(index);
                                const fxExpression = `f${apostrophes}(x)`;
                                const langText = data?.payload?.tech_lang_keys["2"];
                                const expression = result.tech_final_res[idx];

                                return (
                                  <div key={idx} className="mb-6">
                                    {/* Derivative header like f'(x) ... */}
                                    <p
                                      className="mt-3 text-[18px] font-semibold"
                                      dangerouslySetInnerHTML={renderMath(`${fxExpression} ${langText}`, false)}
                                    />

                                    {/* Expression which might contain raw HTML with script tags */}
                                    {expression && (
                                      <p
                                        className="mt-3 text-[18px]"
                                        ref={(el) => (expressionRefs.current[idx] = el)}
                                        dangerouslySetInnerHTML={{ __html: expression }}
                                      />
                                    )}

                                    {/* Toggle Button */}
                                    <div className="w-full mt-3">
                                      <button
                                        type="button"
                                        className="calculate repeat px-6 py-3 font-semibold text-[#ffffff] bg-[#2845F5] text-[14px] rounded-lg focus:outline-none focus:ring-2"
                                        style={{ fontSize: 16, padding: 10, cursor: "pointer" }}
                                        onClick={() => setVisibleStep((prev) => (prev === idx ? null : idx))}
                                      >
                                        {data?.payload?.tech_lang_keys["6"]}
                                      </button>
                                    </div>

                                    {/* Steps container */}
                                    <div
                                      className={`w-full mt-3 res_step transition-all duration-500 overflow-hidden ${
                                        visibleStep === idx ? "max-h-[999px] opacity-100" : "max-h-0 opacity-0"
                                      }`}
                                      ref={(el) => (stepRefs.current[idx] = el)}
                                      dangerouslySetInnerHTML={{ __html: result.tech_final_res[idx] || "" }}
                                    />
                                  </div>
                                );
                              }
                              return null;
                            })}
                        </div>
                      </div>
                    </div>
                      
                    
                  </div>
                </div>
              </>
            )
          )}
        </form>
        {result && (
          <CalculatorFeedback calName={data?.payload?.tech_calculator_title} />
        )}
    </Calculator>
  );
};

export default SecondDerivativeCalculator;
