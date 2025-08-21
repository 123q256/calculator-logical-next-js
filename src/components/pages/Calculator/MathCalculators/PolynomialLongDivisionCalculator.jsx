import React, { useEffect, useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

function renderKatex(texString, displayMode = true) {
  try {
    return { __html: katex.renderToString(texString, { throwOnError: false, displayMode }) };
  } catch (error) {
    console.error("KaTeX render error:", error);
    return { __html: texString }; // fallback raw text
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
  usePolynomialLongDivisionCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   usePolynomialLongDivisionCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const PolynomialLongDivisionCalculator = () => {
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
    tech_dividend: "2x^3 - 3x^2 + 13x - 5",
    tech_divisor: "x + 5"
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = usePolynomialLongDivisionCalculatorMutation();


  
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
        tech_dividend: (prev.tech_dividend || "") + value
      }));
      setResult(null);
      setFormError(null);
    };
  
    const clearInput = () => {
      setFormData((prev) => ({ ...prev, tech_dividend: "" }));
      setResult(null);
      setFormError(null);
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_dividend || !formData.tech_divisor ) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_dividend: formData.tech_dividend,
        tech_divisor: formData.tech_divisor,

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

       tech_dividend: "2x^3 - 3x^2 + 13x - 5",
    tech_divisor: "x + 5"

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
      tech_dividend: randomExample,
    }));
    setResult(null);
    setFormError(null);
  };

  // result

  const buildFormattedDividend = () => {
    const coeffs = result?.tech_divCoeff || [];
    const count = coeffs.length - 1;
    let dividend = "";

    coeffs.forEach((val, i) => {
      if (!val.includes("-") && i !== 0) val = "+" + val;

      if (count - i === 0) {
        dividend += val;
      } else if (count - i === 1) {
        dividend += val + "x";
      } else if (val === "1" || val === "+1" || val === "-1") {
        dividend += (val === "-1" ? "-" : "") + "x^" + (count - i);
      } else {
        dividend += val + "x^" + (count - i);
      }
    });

 dividend = dividend.replace(/\+/g, " + ").replace(/-/g, " - ");

    return dividend;
  };


const formattedQuotient = result?.tech_rmnd === "0"
  ? result?.tech_quot.replace(/frac/g, "dfrac")
  : result?.tech_quot.replace(/frac/g, "dfrac") + "+\\dfrac{" + result?.tech_rmnd + "}{" + result?.tech_eq1 + "}";

const dividend1 = buildFormattedDividend();






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

          <div class="lg:w-[50%] md:w-[60%] w-full mx-auto ">
              <div class="grid grid-cols-12 mt-3   gap-2 md:gap-4 lg:gap-4">
              <div class="col-span-12">
                  <div class="col-span-12 md:col-span-4 lg:col-span-4 flex justify-between">
                  <label for="tech_dividend" class="label mt-4">{data?.payload?.tech_lang_keys['1']} y = f(x) =</label>
                    <button type="button" class="  flex border rounded-lg p-1  items-center" id="exampleLoadBtn"  onClick={exampleLoadHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right size-5 me-1" ><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                        Load Example
                    </button>
                  </div>
                     <div class="w-full py-2 relative">
                       <input
                          type="text"
                          step="any"
                          name="tech_dividend"
                          id="tech_dividend"
                          className="input "
                          aria-label="input"
                          placeholder="00"
                          value={formData.tech_dividend}
                          onChange={handleChange}
                        />
                        <img   src="/images/keyboard.png" class="keyboardImg absolute right-2 top-11 transform -translate-y-1/2 w-9 h-9" alt="keyboard" loading="lazy" decoding="async"  onClick={toggleKeyboard}/>
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
              <div class="col-span-12">
                  <label htmlFor="tech_divisor" className="label">
                  {data?.payload?.tech_lang_keys["2"]}:
                    </label>
                    <div class=" relative">
                    <input
                      type="text"
                      step="any"
                      name="tech_divisor"
                      id="tech_divisor"
                      className="input my-2"
                      aria-label="input"
                        placeholder="00"
                      value={formData.tech_divisor}
                      onChange={handleChange}
                    />
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

                 
                      <div className="rounded-lg flex items-center justify-center">
                            <div className="w-full mt-3 text-[16px] overflow-auto">
                              {/* Final simplified fraction display */}
                              <p className="mt-3 text-[18px]" dangerouslySetInnerHTML={renderKatex(`\\(${formattedQuotient}\\)`)} />

                              {result?.tech_check != "xy" && (
                                <>
                                  <p className="mt-3"><strong>{data?.payload?.tech_lang_keys['5']}:</strong></p>
                                  <p className="mt-3">{data?.payload?.tech_lang_keys['6']}</p>

                                  {/* Initial Division Setup */}
                                <p
                                  className="mt-3"
                                  dangerouslySetInnerHTML={renderKatex(
                                    `\\require{enclose}\\begin{array}{rl}x + 5 & \\enclose{longdiv}{2x^{3} - 3x^{2} + 13x - 5}\\end{array}`
                                  )}
                                />




                                  {/* Steps */}
                                  {Array.from({ length: result?.tech_loop_len || 0 }).map((_, i) => (
                                    <div key={i}>
                                      <p className="mt-3">{data?.payload?.tech_lang_keys[7]} {i + 1}</p>
                                      <p className="mt-2" dangerouslySetInnerHTML={renderKatex(
                                        `\\dfrac{${result?.tech_leading_term[i]}}{${result?.tech_divby_lt}} = ${result?.tech_quotient[i]}`
                                      )} />
                                      <p className="mt-3">{data?.payload?.tech_lang_keys[9]}.</p>
                                      <p className="mt-3" dangerouslySetInnerHTML={renderKatex(
                                        `${result?.tech_quotient[i]}(${result?.tech_eq1}) = ${result?.tech_multiplies[i]}`
                                      )} />
                                      <p className="mt-3">{data?.payload?.tech_lang_keys[11]}:</p>
                                      <p className="mt-3" dangerouslySetInnerHTML={renderKatex(
                                        `(${result?.tech_eq}) - (${result?.tech_multiplies[i]}) = ${result?.tech_steps[i]}`
                                      )} />
                                    </div>
                                  ))}

                                  {/* Final Long Division Table */}
                                  <p className="mt-3">{data?.payload?.tech_lang_keys[12]}:</p>
                                  <p className="mt-3" dangerouslySetInnerHTML={renderKatex(
                                    `\\require{enclose}\\begin{array}{rlc}
                                    \\phantom{${result?.tech_eq1}}&\\phantom{\\enclose{longdiv}{}}\\begin{array}{rrrrrr}${result?.tech_quot.replace(/frac/g, "dfrac").replace(/\s\+\s/g, " & + ").replace(/\s-\s/g, " & - ")}\\end{array}&\\\\
                                    ${result?.tech_eq1}&\\phantom{-}\\enclose{longdiv}{\\begin{array}{cccccc}${dividend1.replace(/\s\+\s/g, " & + ").replace(/\s-\s/g, " & - ")}\\end{array}}\\\\
                                    &\\begin{array}{rrrrrr}-
                                    ${result?.tech_multiplies.map(m => `\\\\${m.replace(/\s\+\s/g, " & + ").replace(/\s-\s/g, " & - ")}\\\\\\hline`).join("")}
                                    \\end{array}
                                    &\\begin{array}{c}
                                    \\\\${result?.tech_steps[result?.tech_loop_len - 1].replace(/\s\+\s/g, " & + ").replace(/\s-\s/g, " & - ")}
                                    \\end{array}
                                    \\end{array}`
                                  )} />

                                  {/* Final Answer */}
                                  <p className="mt-3" dangerouslySetInnerHTML={renderKatex(
                                    `\\text{${data?.payload?.tech_lang_keys[13]}}\\ ${result?.tech_quot.replace(/frac/g, "dfrac")},\\ \\text{${data?.payload?.tech_lang_keys[14]}}\\ ${result?.tech_rmnd.replace(/frac/g, "dfrac")}`
                                  )} />

                                  {/* Final Fraction Representation */}
                                  <p className="mt-3">{data?.payload?.tech_lang_keys[15]}:</p>
                                  <p className="text-[18px] mt-3" dangerouslySetInnerHTML={renderKatex(
                                    `\\dfrac{${result?.tech_eq}}{${result?.tech_eq1}} = ${formattedQuotient}`
                                  )} />
                                </>
                              )}
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

export default PolynomialLongDivisionCalculator;
