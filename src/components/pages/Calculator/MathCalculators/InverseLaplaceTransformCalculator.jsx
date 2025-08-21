import React, { useEffect, useState } from "react";
import { BlockMath } from 'react-katex';
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
  useInverseLaplaceTransformCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useInverseLaplaceTransformCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const InverseLaplaceTransformCalculator = () => {
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
    tech_EnterEq: "4/(s-3) - 1/(s-8)"
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useInverseLaplaceTransformCalculatorMutation();


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

    if (!formData.tech_EnterEq) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_EnterEq: formData.tech_EnterEq,



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

       tech_EnterEq: "4/(s-3) - 1/(s-8)"

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
 "1/(s + 1)",
  "2/3s^2",
  "2/(s + 3)",
  "1/s^3 + 6/(s^2+4)",
  "5/(s^2 +4s + 5)",
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
  const cleanedAnswer = result?.tech_ans?.replace(/\\theta\\left\(t\\right\)/g, '');


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

                <div className="w-full lg:w-[50%] md:w-[80%]  mx-auto ">
                    <div className="grid grid-cols-12 mt-3   gap-2 md:gap-4 lg:gap-4">
                    <div className="col-span-12">
                        <div className="col-span-12 md:col-span-4 lg:col-span-4 flex justify-between">
                        <label for="tech_EnterEq" className="label mt-4">{data?.payload?.tech_lang_keys['2']}:</label>
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
                <div className=" w-full h-[30px] bg-gray-300 animate-pulse rounded-[10px] mb-4"></div>
                <div className="w-[75%] h-[20px] bg-gray-300 animate-pulse rounded-[10px] mb-3"></div>
                <div className="w-[50%] h-[20px] bg-gray-300 animate-pulse rounded-[10px] mb-3"></div>
                <div className="w-[25%] h-[20px] bg-gray-300 animate-pulse rounded-[10px]"></div>
              </div>
            </div>
          ) : (
            result && (
              <>
                <div className="w-full mx-auto p-4 lg:p-8 md:p-8 bresult_calculator rounded-lg space-y-6 result">
                  <div>
                    <ResultActions lang={data?.payload?.tech_lang_keys} />

                 
                 <div className="rounded-lg flex items-center justify-center">
                    <div className="w-full mt-3">
                      <div className="w-full text-center my-3 text-[25px] flex justify-center overflow-auto">
                        <p>
                            <BlockMath math={`\\color{#1670a7}{${cleanedAnswer}}`} />
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

export default InverseLaplaceTransformCalculator;
