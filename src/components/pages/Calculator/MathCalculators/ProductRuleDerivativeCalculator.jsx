import React, { useEffect, useState ,useRef  } from "react";
import { InlineMath, BlockMath } from "react-katex";
import katex from "katex";
import "katex/dist/katex.min.css";
function renderMath(tex) {
  try {
    return { __html: katex.renderToString(tex, { throwOnError: false, displayMode: true }) };
  } catch {
    return { __html: tex };
  }
}
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
  useProductRuleDerivativeCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useProductRuleDerivativeCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const ProductRuleDerivativeCalculator = () => {
  const location = useLocation();
    const url = location.pathname.replace(/^\/+|\/+$/g, "");
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
    tech_enter_eq: "(5x^5-3x)(3x^{7}+2)",
    tech_with: "x",
    tech_how: "1"
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useProductRuleDerivativeCalculatorMutation();


  
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
        tech_enter_eq: (prev.tech_enter_eq || "") + value
      }));
      setResult(null);
      setFormError(null);
    };
  
    const clearInput = () => {
      setFormData((prev) => ({ ...prev, tech_enter_eq: "" }));
      setResult(null);
      setFormError(null);
    };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_enter_eq ) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_enter_eq: formData.tech_enter_eq,
        tech_with: formData.tech_with,
        tech_how: formData.tech_how,

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

       tech_enter_eq: "(5x^5-3x)(3x^{7}+2)",
    tech_with: "x",
    tech_how: "1"

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
      tech_enter_eq: randomExample,
    }));
    setResult(null);
    setFormError(null);
  };




  
    const containerRef = useRef(null);
  
  useEffect(() => {
    if (containerRef.current) {
      const scripts = containerRef.current.querySelectorAll('script[type^="math/tex"]');
  
      scripts.forEach((script) => {
        const isDisplayMode = script.type.includes("mode=display");
        const tex = script.textContent;
        const span = document.createElement("span");
  
        try {
          katex.render(tex, span, { displayMode: isDisplayMode });
          script.replaceWith(span);
        } catch (err) {
          console.error("KaTeX render error:", err);
        }
      });
    }
  }, [result?.tech_buffer]);



   const containerRef1 = useRef(null);
  const [visibleStep, setVisibleStep] = useState({});

  function toggleStep(index) {
    setVisibleStep(prev => ({ ...prev, [index]: !prev[index] }));
  }

  useEffect(() => {
    if (containerRef1.current) {
      const scripts = containerRef1.current.querySelectorAll('script[type^="math/tex"]');

      scripts.forEach((script) => {
        const isDisplayMode = script.type.includes("mode=display");
        const tex = script.textContent;
        const span = document.createElement("span");

        try {
          katex.render(tex, span, { displayMode: isDisplayMode });
          script.replaceWith(span);
        } catch (err) {
          console.error("KaTeX render error:", err);
        }
      });
    }
  }, [visibleStep]); // ہر بار visibleStep change پر re-run ہوگا
  

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
          <div className="w-full mx-auto p-4 lg:p-8 md:p-8 bg-white rounded-lg shadow-md space-y-6 mb-3">
            {formError && (
              <p className="text-red-500 text-lg font-semibold w-full">
                {formError}
              </p>
            )}


          <div class="lg:w-[60%] md:w-[60%] w-full mx-auto ">
              <div class="grid grid-cols-12 mt-3   gap-2 md:gap-4 lg:gap-4">
                <div class="col-span-12">
                    <div class="col-span-12 md:col-span-4 lg:col-span-4 flex justify-between">
                    <label for="tech_enter_eq" class="label mt-4">{data?.payload?.tech_lang_keys['1']}:</label>
                      <button type="button" class="  flex border rounded-lg p-1  items-center" id="exampleLoadBtn"  onClick={exampleLoadHandler}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right size-5 me-1" ><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                          Load Example
                      </button>
                    </div>
                      <div class="w-full py-2 relative">
                        <input
                            type="text"
                            step="any"
                            name="tech_enter_eq"
                            id="tech_enter_eq"
                            className="input "
                            aria-label="input"
                            placeholder="00"
                            value={formData.tech_enter_eq}
                            onChange={handleChange}
                          />
                          <img   src="/images/keyboard.png" class="keyboardImg absolute right-2 top-11 transform -translate-y-1/2 w-9 h-9" alt="keyboard" loading="lazy" decoding="async"  onClick={toggleKeyboard}/>
                      </div>
                </div>
                <div class="col-span-6">
                  <label htmlFor="tech_with" className="label">
                     {data?.payload?.tech_lang_keys["3"]}  W.R.T:
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
                      className="bg-green-700 text-white rounded-sm h-9 px-2 uppercase shadow-md hover:bg-green-600"
                      onClick={clearInput}
                    >
                      CLS
                    </button>
                    {["+","-","/","*","^","sqrt(","(",")"].map((keyVal, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="keyBtn bg-green-700 text-white rounded-sm h-9 px-2 uppercase shadow-md hover:bg-green-600"
                        onClick={() => handleKeyClick(keyVal)}
                      >
                        {keyVal === "sqrt(" ? "√" : keyVal}
                      </button>
                    ))}
                  </div>
                )}
                <div class="col-span-6">
                  <label htmlFor="tech_how" className="label">
                        {data?.payload?.tech_lang_keys["4"]}:
                      </label>
                      <div className="mt-2">
                        <select
                          className="input"
                          aria-label="select"
                          name="tech_how"
                          id="tech_how"
                          value={formData.tech_how}
                          onChange={handleChange}
                        >
                          <option value="1">1</option>
                          <option value="2">2 </option>
                          <option value="3">3 </option>
                          <option value="4">4 </option>
                          <option value="5">5 </option>
                        </select>
                      </div>
                </div>
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
            <div className="w-full mx-auto p-4 lg:p-8 md:p-8 bg-white rounded-lg shadow-md space-y-6 result">
              <div className="animate-pulse">
                <div className=" w-full h-[30px] bg-gray-200 animate-pulse rounded-[10px] mb-4"></div>
                <div className="w-[75%] h-[20px] bg-gray-200 animate-pulse rounded-[10px] mb-3"></div>
                <div className="w-[50%] h-[20px] bg-gray-200 animate-pulse rounded-[10px] mb-3"></div>
                <div className="w-[25%] h-[20px] bg-gray-200 animate-pulse rounded-[10px]"></div>
              </div>
            </div>
          ) : (
            result && (
              <>
                <div className="w-full result mx-auto p-4 lg:p-8 md:p-8 bg-white rounded-lg shadow-md space-y-6 result">
                  <div>
                    <ResultActions lang={data?.payload?.tech_lang_keys} />

                        <div class="rounded-lg  flex items-center justify-center">
                          <div class="w-full mt-3">
                              <div class="w-full">
                                  <div className="w-full text-[16px] overflow-auto">
                                      {formData?.tech_how > 1 ? (
                                        <>
                                         <div ref={containerRef1}>
                                            {result?.tech_final_res?.map((_, i) => {
                                              if (i % 3 !== 0) return null;
                                              const j = "'".repeat(i / 3 + 1);

                                              return (
                                                <div key={i}>
                                                  <p className="mt-3 text-[18px]">
                                                    <strong dangerouslySetInnerHTML={renderMath(`f${j}(x)`)} /> {data?.payload?.tech_lang_keys["3"]}
                                                  </p>
                                                  <p
                                                    className="mt-3 text-[18px]"
                                                    dangerouslySetInnerHTML={renderMath(result.tech_final_res[i])}
                                                  />

                                                  <p className="mt-3 text-[18px]">
                                                    <strong>{data?.payload?.tech_lang_keys["7"]}</strong>
                                                  </p>
                                                  <p
                                                    className="mt-3 text-[18px]"
                                                    dangerouslySetInnerHTML={renderMath(result.tech_final_res[i + 1])}
                                                  />

                                                  <div className="w-full mt-3">
                                                    <button
                                                      type="button"
                                                      className="calculate repeat px-6 py-3 font-semibold text-[#99EA48] bg-black text-[14px] rounded-lg focus:outline-none focus:ring-2"
                                                      style={{ fontSize: "16px", padding: "10px", cursor: "pointer" }}
                                                      onClick={() => toggleStep(i + 2)}
                                                    >
                                                      {data?.payload?.tech_lang_keys["8"]}
                                                    </button>
                                                  </div>

                                                  {visibleStep[i + 2] && (
                                                    <div
                                                      className="katex-rendered-content mt-3"
                                                      dangerouslySetInnerHTML={{ __html: result.tech_final_res[i + 2] }}
                                                    />
                                                  )}
                                                </div>
                                              );
                                            })}
                                          </div>
                                          </>
                                      ) : (
                                        <>
                                          <p className="mt-3 text-[18px]">
                                            <strong>{data?.payload?.tech_lang_keys["3"]}</strong>
                                          </p>
                                          <p className="mt-3 text-[18px]" dangerouslySetInnerHTML={renderMath(result?.tech_ans)} />

                                          <p className="mt-3 text-[18px]">
                                            <strong>{data?.payload?.tech_lang_keys["7"]}</strong>
                                          </p>
                                          <p className="mt-3 text-[18px]" dangerouslySetInnerHTML={renderMath(result?.tech_simple)} />

                                          <p className="mt-3 text-[18px]">
                                            <strong>Solution:</strong>
                                          </p>

                                          <div className="w-full res_step mt-3">
                                              {/* Render raw KaTeX HTML if tech_step contains <script type="math/tex"> */}
                                              {result?.tech_buffer && (
                                                <div
                                                  ref={containerRef}
                                                  className="katex-rendered-content"
                                                  dangerouslySetInnerHTML={{ __html: result?.tech_buffer }}
                                                />
                                              )}
                                            </div>
                                        
                                        </>
                                      )}
                                    </div>
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

export default ProductRuleDerivativeCalculator;
