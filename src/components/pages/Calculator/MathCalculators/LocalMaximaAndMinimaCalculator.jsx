import React, { useEffect, useState  ,useRef} from "react";
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
  useLocalMaximaAndMinimaCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useProbabilityCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const LocalMaximaAndMinimaCalculator = () => {
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
  tech_equation: "4x^3+3x^2-6x+1"
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useLocalMaximaAndMinimaCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
        setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_equation ) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_equation: formData.tech_equation,



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

      tech_equation: "4x^3+3x^2-6x+1"

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

  const containerRef = useRef(null);
  const containerRef1 = useRef(null);

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
}, [result?.tech_step]);

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
}, [result?.tech_buffer]);



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

            <div className="lg:w-[40%] md:w-[60%] w-full mx-auto ">
            <div className="grid grid-cols-12   gap-2 md:gap-4 lg:gap-4">
                <div className="col-span-12">
                      <label htmlFor="tech_equation" className="label">
                  {data?.payload?.tech_lang_keys["1"]}:
                    </label>
                    <div className=" relative">
                    <input
                      type="text"
                      step="any"
                      name="tech_equation"
                      id="tech_equation"
                      className="input my-2"
                      aria-label="input"
                      placeholder="00"
                      value={formData.tech_equation}
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
            <div className="w-full mx-auto p-4 lg:p-8 md:p-8 result_calculator rounded-lg space-y-6 result">
              <div className="animate-pulse">
                <div className=" w-full h-[30px] bg-gray-300 animate-pulse rounded-[10px] mb-4"></div>
                <div className="w-[75%] h-[20px] bg-gray-300 animate-pulse rounded-[10px] mb-3"></div>
                <div className="w-[50%] h-[20px] bg-gray-300 animate-pulse rounded-[10px] mb-3"></div>
                <div className="w-[25%] h-[20px] bg-gray-300 animate-pulse rounded-[10px]"></div>
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
                          <div className="w-full text-[16px] overflow-auto">
                            
                            {/* Derivative */}
                            <p className="mt-3 text-[18px]">
                              <strong>Derivative</strong>
                            </p>
                            <p className="mt-3">
                              <BlockMath math={result?.tech_simple || ''} />
                            </p>

                            {/* Factoring */}
                            <p className="mt-3 text-[18px]">
                              <strong>Factoring</strong>
                            </p>
                            <p className="mt-3">
                              <BlockMath math={result?.tech_fac || ''} />
                            </p>

                            {/* Tech Lang Key 3 (Roots) */}
                            <p className="mt-3 text-[18px]">
                              <strong>{data?.payload?.tech_lang_keys['3']}</strong>
                            </p>
                            <p className="mt-3">
                              <BlockMath math={result?.tech_root || ''} />
                            </p>

                            {/* Local Minima */}
                            <p className="mt-3 text-[18px]">
                              <strong>Local Minima</strong>
                            </p>
                            <p className="mt-3">
                              <BlockMath math={`(x,f(x))=${result?.tech_mini || ''}`} />
                            </p>

                            {/* Local Maxima */}
                            <p className="mt-3 text-[18px]">
                              <strong>Local Maxima</strong>
                            </p>
                            <p className="mt-3">
                              <BlockMath math={`(x,f(x))=${result?.tech_maxi || ''}`} />
                            </p>

                            {/* Derivative Heading */}
                            <p className="mt-3">
                              <strong>{data?.payload?.tech_lang_keys['5']}</strong>
                            </p>
                            <p className="mt-3">{data?.payload?.tech_lang_keys['4']}:</p>

                            {/* Derivative with respect to x */}
                            <p className="mt-3 mb-3">
                              <BlockMath math={`\\frac{d}{dx}\\left(${result?.tech_enter || ''}\\right)`} />
                            </p>

                            {/* Steps */}
                               <div className="w-full res_step mt-3">
                                  {result?.tech_buffer && (
                                    <div
                                      ref={containerRef1}
                                      className="katex-rendered-content"
                                      dangerouslySetInnerHTML={{ __html: result?.tech_buffer }}
                                    />
                                  )}
                                </div>

                            {/* If partial derivative is present */}
                            {result?.tech_wrt ? (
                              <>
                                <p className="mt-3">{data?.payload?.tech_lang_keys['4']}:</p>
                                <p className="mt-3 mb-3">
                                  <BlockMath math={`\\frac{\\partial}{\\partial y}\\left(${result?.tech_enter || ''}\\right)`} />
                                </p>

                                <div className="w-full res_step mt-3">
                                  {result?.tech_step && (
                                    <div
                                      ref={containerRef}
                                      className="katex-rendered-content"
                                      dangerouslySetInnerHTML={{ __html: result?.tech_step }}
                                    />
                                  )}
                                </div>

                                <p className="mt-3">
                                  <strong>{data?.payload?.tech_lang_keys['6']} f'(x,y) = 0</strong>
                                </p>
                                <p className="mt-3">
                                  <BlockMath math={`${result?.tech_ans || ''} = 0`} />
                                </p>
                                <p className="mt-3">
                                  <BlockMath math={`${result?.tech_ans1 || ''} = 0`} />
                                </p>
                              </>
                            ) : (
                              <>
                                <p className="mt-3">{data?.payload?.tech_lang_keys['6']} f'(x) = 0</p>
                                <p className="mt-3">
                                  <BlockMath math={`${result?.tech_ans || ''} = 0`} />
                                </p>
                              </>
                            )}

                            {/* Final Roots */}
                            <p className="mt-3">
                              {data?.payload?.tech_lang_keys['7']}:{' '}
                              <InlineMath math={result?.tech_root || ''} />
                            </p>
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

export default LocalMaximaAndMinimaCalculator;
