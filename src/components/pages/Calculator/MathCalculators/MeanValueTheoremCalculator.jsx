import React, { useEffect, useState } from "react";
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
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
  useMeanValueTheoremCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useMeanValueTheoremCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const MeanValueTheoremCalculator = () => {
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
      tech_EnterEq: "(x^2+4)^(1/2)",
      tech_lb: 1,
      tech_ub: 4,
      tech_with: "x"
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useMeanValueTheoremCalculatorMutation();

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
        tech_lb: formData.tech_lb,
        tech_ub: formData.tech_ub,
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

         tech_EnterEq: "(x^2+4)^(1/2)",
      tech_lb: 1,
      tech_ub: 4,
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
                        <div className="col-span-12 md:col-span-4 lg:col-span-4 flex justify-between">
                        <label for="tech_EnterEq" className="label mt-4">{data?.payload?.tech_lang_keys['1']}:</label>
                          <button type="button" className="  flex border rounded-lg p-1  items-center" id="exampleLoadBtn"  onClick={exampleLoadHandler}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-up-right size-5 me-1" ><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>
                              Load Example
                          </button>
                        </div>
                          <div className=" relative">
                          <input
                            type="text"
                            step="any"
                            name="tech_EnterEq"
                            id="tech_EnterEq"
                            className="input my-2"
                            aria-label="input"
                            placeholder="00"
                            value={formData.tech_EnterEq}
                            onChange={handleChange}
                          />
                        <img   src="/images/keyboard.png" className="keyboardImg absolute right-2 top-12 transform -translate-y-1/2 w-9 h-9" alt="keyboard" loading="lazy" decoding="async"  onClick={toggleKeyboard}/>
                          </div>
                    </div>

                      <div className="lg:col-span-3 md:col-span-3 col-span-12 mt-3">
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
                    <div className="col-span-6">
                        <label htmlFor="tech_lb" className="label">
                          {data?.payload?.tech_lang_keys["3"]}:
                            </label>
                            <div className=" relative">
                            <input
                              type="number"
                              step="any"
                              name="tech_lb"
                              id="tech_lb"
                              className="input my-2"
                              aria-label="input"
                              placeholder="00"
                              value={formData.tech_lb}
                              onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-span-6">
                        <label htmlFor="tech_ub" className="label">
                          {data?.payload?.tech_lang_keys["4"]}:
                            </label>
                            <div className=" relative">
                            <input
                              type="number"
                              step="any"
                              name="tech_ub"
                              id="tech_ub"
                              className="input my-2"
                              aria-label="input"
                              placeholder="00"
                              value={formData.tech_ub}
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
                            <div className="w-full overflow-auto">
                              <div className="col-12 text-[16px]">
                                <p className="mt-2 text-[18px]">
                                  <strong>{result?.tech_root}</strong>
                                </p>
                                <p className="mt-3">
                                  <strong>{data?.payload?.tech_lang_keys['6']}</strong>
                                </p>
                                <p className="mt-3">
                                  {data?.payload?.tech_lang_keys['7']}{' '}
                                  <InlineMath math={`f=${result?.tech_enter}`} />{' '}
                                  {data?.payload?.tech_lang_keys['8']}{' '}
                                  <InlineMath math={`[${result?.tech_lb}, ${result?.tech_ub}]`} />
                                </p>
                                <p className="mt-3">
                                  {data?.payload?.tech_lang_keys['9']} <InlineMath math="[a,b]" />{' '}
                                  {data?.payload?.tech_lang_keys['10']},{' '}
                                  <InlineMath math="f'(c)= \dfrac{f(b) - f(a)}{b - a}" />
                                </p>
                                <p className="mt-3">{data?.payload?.tech_lang_keys['11']}:</p>
                                <p className="mt-3">
                                  <InlineMath math={`f(${result?.tech_ub}) = ${result?.tech_end}`} />
                                </p>
                                <p className="mt-3">
                                  <InlineMath math={`f(${result?.tech_lb}) = ${result?.tech_start}`} />
                                </p>
                                <p className="mt-3">{data?.payload?.tech_lang_keys['12']}:</p>
                                <p className="mt-3">
                                  <InlineMath math={`f'(c) = ${result?.tech_deri}`} />
                                </p>
                                <p className="mt-3">{data?.payload?.tech_lang_keys['13']}:</p>
                                <p className="mt-3">
                                  <InlineMath
                                    math={`\\frac{${result?.tech_end} - (${result?.tech_start})}{${result?.tech_ub} - (${result?.tech_lb})} = ${result?.tech_deri}`}
                                  />
                                </p>
                                <p className="mt-3">{data?.payload?.tech_lang_keys['14']}:</p>
                                <p className="mt-3">
                                  <InlineMath math={`${result?.tech_deri} = ${result?.tech_simple}`} />
                                </p>
                                <p className="mt-3">{data?.payload?.tech_lang_keys['15']}:</p>
                                <p className="mt-3">
                                  <InlineMath
                                    math={`${data?.payload?.tech_lang_keys['5']} = ${result?.tech_root}`}
                                  />
                                </p>
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

export default MeanValueTheoremCalculator;
