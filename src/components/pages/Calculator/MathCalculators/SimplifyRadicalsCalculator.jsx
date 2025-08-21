import React, { useEffect, useState } from "react";
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// --- Helper Functions (PLACEHOLDERS - Replace with your actual implementations) ---
// You would typically define these in a separate utility file and import them.

function isInteger(num) {
    return Number.isInteger(num);
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
// import {
//   useGetSingleCalculatorDetailsMutation,
//   useSimplifyRadicalsCalculatorMutation,
// } from "../../../redux/services/calculator/calculatorApi";

import {
  useGetSingleCalculatorDetailsMutation,
} from "../../../redux/services/calculator/calculatorApi";

import {
  useSimplifyRadicalsCalculatorMutation,
} from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const SimplifyRadicalsCalculator = (radicand, index) => {
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
    tech_expression_unit : "2", // 1 2 3 4 
    tech_num1 : "5",
    tech_num2 : "7",
    tech_num3 : "7",
    tech_num4 : "7",
    tech_num5 : "7",
    tech_num6 : "7"
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useSimplifyRadicalsCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
        setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_expression_unit) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_expression_unit: formData.tech_expression_unit,
        tech_num1: formData.tech_num1,
        tech_num2: formData.tech_num2,
        tech_num3: formData.tech_num3,
        tech_num4: formData.tech_num4,
        tech_num5: formData.tech_num5,
        tech_num6: formData.tech_num6,

      }).unwrap();
      setResult(response); // Assuming the response has 'lovePercentage'
      toast.success(
       "Successfully Calculated"
      );
    } catch (err) {
     setFormError(err.data.error);
     toast.error(err.data.error);
    }
  };

  // Handle reset form
  const handleReset = () => {
    setFormData({  

      tech_expression_unit : "2", // 1 2 3 4 
    tech_num1 : "5",
    tech_num2 : "7",
    tech_num3 : "7",
    tech_num4 : "7",
    tech_num5 : "7",
    tech_num6 : "7"

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

            <div className="lg:w-[50%] md:w-[70%] w-full mx-auto ">
            <div className="grid grid-cols-12 mt-3 gap-2 md:gap-4 lg:gap-4">

                <div className="col-span-12">
                      <label htmlFor="tech_expression_unit" className="label">
                        {data?.payload?.tech_lang_keys["1"]}:
                      </label>
                      <div className="mt-2">
                        <select
                          className="input"
                          aria-label="select"
                          name="tech_expression_unit"
                          id="tech_expression_unit"
                          value={formData.tech_expression_unit}
                          onChange={handleChange}
                        >
                          <option value="1">{data?.payload?.tech_lang_keys["2"]} </option>
                          <option value="2">{data?.payload?.tech_lang_keys["3"]} </option>
                          <option value="3">{data?.payload?.tech_lang_keys["4"]} </option>
                          <option value="4">{data?.payload?.tech_lang_keys["5"]} </option>
                        </select>
                      </div>
                </div>
                <div className="col-span-12 text-center">

                  {(formData.tech_expression_unit == "1") && (
                    <>
                    <p className="simplify">
                      <BlockMath math="a\sqrt[n]{b}" />
                    </p>
                    </>
                  )}
                   {(formData.tech_expression_unit == "2") && (
                    <>
                    <p className="simplify1">
                      <BlockMath math="a\sqrt[n]{b} + c\sqrt[m]{d} = ?" />
                    </p>
                    </>
                  )}
                   {(formData.tech_expression_unit == "3") && (
                    <>
                    <p className="simplify2">
                      <BlockMath math="a\sqrt[n]{b} \cdot c\sqrt[m]{d} = ?" />
                    </p>
                    </>
                  )}
                   {(formData.tech_expression_unit == "4") && (
                    <>
                    <p className="simplify3">
                      <BlockMath math="\frac{a\sqrt[n]{b}}{c\sqrt[m]{d}} = ?" />
                    </p>
                    </>
                  )}
                </div>
               
                  <div className="col-span-6 num1">
                      <label htmlFor="tech_num1" className="label">
                        a  {data?.payload?.tech_lang_keys["6"]}:
                          </label>
                          <div className=" relative">
                          <input
                            type="number"
                            step="any"
                            name="tech_num1"
                            id="tech_num1"
                            className="input my-2"
                            aria-label="input"
                            placeholder="00"
                            value={formData.tech_num1}
                            onChange={handleChange}
                          />
                          </div>
                  </div>
                  <div className="col-span-6 num2">
                      <label htmlFor="tech_num2" className="label">
                        b :
                          </label>
                          <div className=" relative">
                          <input
                            type="number"
                            step="any"
                            name="tech_num2"
                            id="tech_num2"
                            className="input my-2"
                            aria-label="input"
                            placeholder="00"
                            value={formData.tech_num2}
                            onChange={handleChange}
                          />
                          </div>
                  </div>
                  <div className="col-span-6 num3">
                    <label htmlFor="tech_num3" className="label">
                        n  :
                          </label>
                          <div className=" relative">
                          <input
                            type="number"
                            step="any"
                            name="tech_num3"
                            id="tech_num3"
                            className="input my-2"
                            aria-label="input"
                            placeholder="00"
                            value={formData.tech_num3}
                            onChange={handleChange}
                          />
                          </div>
                  </div>
              

                 {(formData.tech_expression_unit == "2" || formData.tech_expression_unit == "3" || formData.tech_expression_unit == "4" ) && (
                  <>
                  <div className="col-span-6 ">
                      <label htmlFor="tech_num4" className="label">
                        c  {data?.payload?.tech_lang_keys["6"]}:
                          </label>
                          <div className=" relative">
                          <input
                            type="number"
                            step="any"
                            name="tech_num4"
                            id="tech_num4"
                            className="input my-2"
                            aria-label="input"
                            placeholder="00"
                            value={formData.tech_num4}
                            onChange={handleChange}
                          />
                          </div>
                  </div>
                  <div className="col-span-6 ">
                    <label htmlFor="tech_num5" className="label">
                        d
                          </label>
                          <div className=" relative">
                          <input
                            type="number"
                            step="any"
                            name="tech_num5"
                            id="tech_num5"
                            className="input my-2"
                            aria-label="input"
                            placeholder="00"
                            value={formData.tech_num5}
                            onChange={handleChange}
                          />
                          </div>
                  </div>
                  <div className="col-span-6 ">

                      <label htmlFor="tech_num6" className="label">
                        m
                          </label>
                          <div className=" relative">
                          <input
                            type="number"
                            step="any"
                            name="tech_num6"
                            id="tech_num6"
                            className="input my-2"
                            aria-label="input"
                            placeholder="00"
                            value={formData.tech_num6}
                            onChange={handleChange}
                          />
                          </div>
                    
                  </div>
                  </>
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
                <div className="w-full mx-auto p-4 lg:p-8 md:p-8 result_calculator rounded-lg space-y-6 result">
                  <div>
                    <ResultActions lang={data?.payload?.tech_lang_keys} />



                      {/* <div className="rounded-lg  flex items-center justify-center">
                          <div className="w-full mt-3">
                              <div className="w-full my-2">
                                  <div className="text-center">
                                      <p className="text-[20px]"><strong>{data?.payload?.tech_lang_keys[7]}:</strong></p>
                                      <div className="col-12">
                                          <div className="all_result">
                                              <p className="text-[20px] mt-2">
                                                  
                                              </p>
                                          </div>
                                      </div>
                                          $number1=result?.tech_num1
                                          $number2=result?.tech_num2
                                          $number3=result?.tech_num3
                                          $number4=result?.tech_num4
                                          $number5=result?.tech_num5
                                          $number6=result?.tech_num6
                                          $expression_unit=result?.tech_expression_unit
                                      </div>
                              </div>
                          </div>
                      </div> */}

                      
                    
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

export default SimplifyRadicalsCalculator;
