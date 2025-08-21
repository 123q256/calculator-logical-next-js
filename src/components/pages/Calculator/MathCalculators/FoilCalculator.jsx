import React, { useEffect, useState } from "react";
import { InlineMath } from "react-katex";
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
  useFoilCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useFoilCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const FoilCalculator = () => {
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
   tech_exp: "(2x+1)(5x-7)"
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useFoilCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
        setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_exp) {
      setFormError("Please fill in input.");
      return;
    }
    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_exp: formData.tech_exp,

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

     tech_exp: "(2x+1)(5x-7)"

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

  const isNegative = (value) => String(value).includes("-");
  const plusOrMinus = (val) => (isNegative(val) ? val : `+${val}`);

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
              <div class="grid grid-cols-12 mt-3   gap-2 md:gap-4 lg:gap-4">
                <div class="col-span-12">
                     <label htmlFor="tech_exp" className="label">
                      {data?.payload?.tech_lang_keys["1"]}:
                        </label>
                        <div class=" relative">
                        <input
                          type="text"
                          step="any"
                          name="tech_exp"
                          id="tech_exp"
                          className="input my-2"
                          aria-label="input"
                  	      placeholder="00"
                          value={formData.tech_exp}
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
                        <div className="w-full md:w-[80%] lg:w-[80%] overflow-auto mt-2">
                          <table className="w-full text-[16px]">
                            <tbody>
                              <tr>
                                <td className="py-2 border-b w-1/2">
                                  <strong>{data?.payload?.tech_lang_keys["3"]}</strong>
                                </td>
                                <td className="py-2 border-b">
                                  <InlineMath math={String(result?.tech_ans)} />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="w-full text-[16px] overflow-auto">
                          <p className="mt-2">
                            <strong>{data?.payload?.tech_lang_keys["4"]}:</strong>
                          </p>
                          <p className="mt-2">{data?.payload?.tech_lang_keys["2"]}</p>
                          <p className="mt-2">
                            <InlineMath math={String(result?.tech_eq)} />
                          </p>

                          {result?.tech_exp === 2 ? (
                            <>
                              <p className="mt-2">
                                <InlineMath
                                  math={`${result?.tech_eq} = (${result?.tech_equ})(${result?.tech_equ})`}
                                />
                              </p>
                              <p className="mt-2">
                                <InlineMath
                                  math={`(${result?.tech_equ})(${result?.tech_equ}) = (${result?.tech_a})(${result?.tech_a}) + (${result?.tech_a})(${result?.tech_b}) + (${result?.tech_b})(${result?.tech_a}) + (${result?.tech_b})(${result?.tech_b})`}
                                />
                              </p>
                              <p className="mt-2">
                                <InlineMath
                                  math={`(${result?.tech_equ})(${result?.tech_equ}) = ${result?.tech_s1} ${plusOrMinus(
                                    result?.tech_s2
                                  )} ${plusOrMinus(result?.tech_s3)} ${plusOrMinus(
                                    result?.tech_s4
                                  )}`}
                                />
                              </p>
                              <p className="mt-2">
                                <InlineMath
                                  math={`(${result?.tech_equ})(${result?.tech_equ}) = ${result?.tech_ans}`}
                                />
                              </p>
                            </>
                          ) : result?.tech_check ? (
                            <>
                              <p className="mt-2">
                                <InlineMath
                                  math={`${result?.tech_eq} = (${result?.tech_a})(${result?.tech_c}) + (${result?.tech_a})(${result?.tech_d}) + (${result?.tech_b})(${result?.tech_c}) + (${result?.tech_b})(${result?.tech_d})`}
                                />
                              </p>
                              <p className="mt-2">
                                <InlineMath
                                  math={`${result?.tech_eq} = ${result?.tech_s1} ${plusOrMinus(
                                    result?.tech_s2
                                  )} ${plusOrMinus(result?.tech_s3)} ${plusOrMinus(
                                    result?.tech_s4
                                  )}`}
                                />
                              </p>
                              <p className="mt-2">
                                <InlineMath
                                  math={`${result?.tech_eq} = ${result?.tech_ans}`}
                                />
                              </p>
                            </>
                          ) : null}
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

export default FoilCalculator;
