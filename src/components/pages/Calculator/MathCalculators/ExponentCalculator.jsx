import React, { useEffect, useState } from "react";
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

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
  useExponentCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useExponentCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const ExponentCalculator = () => {
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
    tech_b: "5",
    tech_x: "2"
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useExponentCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
        setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_b || !formData.tech_x ) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_b: formData.tech_b,
        tech_x: formData.tech_x,


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

       tech_b: "5",
    tech_x: "2"

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

// result

  const base = Number(formData?.tech_b || 0);
  const exponent = Number(result?.tech_x || 0);
  const finalResult = Number(result?.tech_result || 0).toFixed(2);

  // Generate multiplication steps
  const steps = [];
  if (exponent > 0) {
    for (let i = 0; i < exponent; i++) {
      steps.push(base);
    }
  }
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

        <div class="lg:w-[40%] md:w-[60%] w-full mx-auto ">
            <div class="grid grid-cols-12 mt-3   gap-2">
                <div class="col-span-12">
                   <label htmlFor="tech_b" className="label">
                      {data?.payload?.tech_lang_keys["1"]} (b)
                        </label>
                        <div class=" relative">
                        <input
                          type="number"
                          step="any"
                          name="tech_b"
                          id="tech_b"
                          className="input my-2"
                          aria-label="input"
                      	  placeholder="00"
                          value={formData.tech_b}
                          onChange={handleChange}
                        />
                        </div>
                </div>
                <div class="col-span-12">
                    <label htmlFor="tech_x" className="label">
                      {data?.payload?.tech_lang_keys["2"]} (x)
                        </label>
                        <div class=" relative">
                        <input
                          type="number"
                          step="any"
                          name="tech_x"
                          id="tech_x"
                          className="input my-2"
                          aria-label="input"
                      	  placeholder="00"
                          value={formData.tech_x}
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
                            <div className="w-full">
                              <div className="w-full md:w-[80%] lg:w-[60%] mt-2 overflow-auto">
                                <table className="w-full text-[16px]">
                                  <tbody>
                                    <tr>
                                      <td className="py-2 border-b" width="60%">
                                        <strong>Answer</strong>
                                      </td>
                                      <td className="py-2 border-b">{finalResult}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>

                              <div className="w-full text-[16px] mt-2">
                                <p className="mt-2">
                                  <strong>{data?.payload?.tech_lang_keys[4]}</strong>
                                </p>

                                <BlockMath math={`x^n = (${base})^{${exponent}}`} />

                                {exponent > 0 && (
                                  <p className="mt-2 overflow-x-auto">
                                    <InlineMath math={`(${base})^{${exponent}} = ${steps.join(' \\times ')}`} />
                                  </p>
                                )}

                                <BlockMath math={`(${base})^{${exponent}} = ${finalResult}`} />
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

export default ExponentCalculator;
