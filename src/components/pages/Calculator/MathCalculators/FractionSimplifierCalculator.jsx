import React, { useEffect, useState } from "react";
import { InlineMath } from 'react-katex';
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
  useFractionSimplifierCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useFractionSimplifierCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const FractionSimplifierCalculator = () => {
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
    tech_n1: "2",
    tech_n2: "3",
    tech_d1: "4"
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useFractionSimplifierCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
        setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_n1 || !formData.tech_n2 ) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_n1: formData.tech_n1,
        tech_n2: formData.tech_n2,
        tech_d1: formData.tech_d1,

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

      tech_n1: "2",
    tech_n2: "3",
    tech_d1: "4"

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

  const n1 = formData?.tech_n1 || '';
  const n2 = formData?.tech_n2;
  const d1 = formData?.tech_d1;

  const totalN = result?.tech_totalN;
  const totalD = result?.tech_totalD;
  const upr = result?.tech_upr;
  const btm = result?.tech_btm;
  const g = result?.tech_g;

  const isMixed = upr > btm && btm !== '1';
  const shi = isMixed ? Math.floor(upr / btm) : null;
  const bta = isMixed ? upr % btm : null;

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

              <div className="lg:w-[80%] md:w-[80%] w-full mx-auto ">
                  <div className="grid grid-cols-12 mt-3   gap-2 md:gap-4 lg:gap-4">
                  
                    <div className="col-span-12 text-center">
                          <div className="flex velocitytab border-b-dark border-b relative overflow-auto justify-center">
                              <p className="cursor-pointer veloTabs px-2"><strong>
                              <a href="/fraction-calculator" className="cursor-pointer veloTabs  text-decoration-none ">{  data?.payload?.tech_lang_keys['43'] ?? 'Fraction Calculator' }</a></strong></p>
                              <p className="cursor-pointer veloTabs  px-2"><strong>
                                <a href="/mixed-number-calculator" className="cursor-pointer veloTabs  text-decoration-none ">
                                {  data?.payload?.tech_lang_keys['44'] ??  'Mixed Number' }
                                </a></strong></p>
                              <p className="cursor-pointer veloTabs px-2 v_active"><strong>
                              { data?.payload?.tech_lang_keys['45'] ?? 'Fraction Simplifier' }</strong></p>
                          </div>
                      </div>
                      
                  <div className="col-span-12  flex items-center mx-auto  mt-3">
                      <div className="pe-2">
                          <div className=" relative">
                            <input
                              type="number"
                              step="any"
                              name="tech_n1"
                              id="tech_n1"
                              className="input my-2"
                              aria-label="input"
                              value={formData.tech_n1}
                              onChange={handleChange}
                            />
                            </div>
                      </div>
                      <div className="ps-2">
                        <input
                              type="number"
                              step="any"
                              name="tech_n2"
                              id="tech_n2"
                              className="input my-2"
                              aria-label="input"
                              value={formData.tech_n2}
                              onChange={handleChange}
                            />
                          <hr/>
                            <input
                              type="number"
                              step="any"
                              name="tech_d1"
                              id="tech_d1"
                              className="input my-2"
                              aria-label="input"
                              value={formData.tech_d1}
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
                <div className="w-full h-[30px] bg-gray-300 animate-pulse rounded-[10px] mb-4"></div>
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
                          {/* Final expression */}
                       <p className="mt-2 text-[18px]">
                        <InlineMath
                          math={`${n1} \\ \\dfrac{${n2}}{${d1}} = \\dfrac{${upr}}{${btm}}`}
                        />
                      </p>
                          {/* Labels */}
                          <p className="mt-2 font-bold">{data?.payload?.tech_lang_keys['ex']}:</p>

                          {/* Input */}
                          <p className="mt-2">
                            {data?.payload?.tech_lang_keys['input']}:{' '}
                            <InlineMath math={`${n1}\\dfrac{${n2}}{${d1}}`} />
                          </p>

                          {/* Step 1 */}
                          <p className="mt-2">
                            {data?.payload?.tech_lang_keys['step']} #1 ={' '}
                            <InlineMath math={`\\dfrac{${totalN}}{${totalD}}`} />
                          </p>

                          {/* Step 2 */}
                          <p className="mt-2">
                            {data?.payload?.tech_lang_keys['step']} #2 ={' '}
                            <InlineMath math={`\\dfrac{(${totalN} \\div ${g})}{(${totalD} \\div ${g})}`} />
                          </p>

                          {/* Final answer */}
                          {btm === '1' ? (
                            <p className="mt-2">
                              {data?.payload?.tech_lang_keys['an']} = {upr}
                            </p>
                          ) : (
                            <p className="mt-2">
                              {data?.payload?.tech_lang_keys['an']} ={' '}
                              <InlineMath math={`\\dfrac{${upr}}{${btm}}`} />
                            </p>
                          )}

                          {/* Mixed form if applicable */}
                          {isMixed && (
                            <p className="mt-2">
                              {data?.payload?.tech_lang_keys['or']} = {shi}{' '}
                              <InlineMath math={`\\dfrac{${bta}}{${btm}}`} />
                            </p>
                          )}

                          {/* Decimal output */}
                          {btm !== '1' && (
                            <p className="mt-2">
                              {data?.payload?.tech_lang_keys['dec']}:{' '}
                              {Number(upr / btm).toFixed(4)}
                            </p>
                          )}
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

export default FractionSimplifierCalculator;
