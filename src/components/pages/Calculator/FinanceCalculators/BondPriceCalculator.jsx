import React, { useEffect, useState } from "react";
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
  useBondPriceCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useBondPriceCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import ResetButton from "../../../components/Calculator/ResetButton";
import Button from "../../../components/Calculator/Button";

const BondPriceCalculator = () => {
  const location = useLocation();
  const url = location.pathname.split("/")[1];
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
    tech_frequency: 1, // 1 2 4 12  52  365
    tech_faceValue: 2000,
    tech_couponRate: 5,
    tech_yearsToMaturity: 7,
    tech_yieldRate: 5,
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useBondPriceCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.tech_frequency ||
      !formData.tech_faceValue ||
      !formData.tech_couponRate ||
      !formData.tech_yearsToMaturity ||
      !formData.tech_yieldRate
    ) {
      setFormError("Please fill in field.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_frequency: formData.tech_frequency,
        tech_faceValue: formData.tech_faceValue,
        tech_couponRate: formData.tech_couponRate,
        tech_yearsToMaturity: formData.tech_yearsToMaturity,
        tech_yieldRate: formData.tech_yieldRate,
      }).unwrap();
      setResult(response?.payload); // Assuming the response has 'lovePercentage'
      toast.success("Successfully Calculated");
    } catch (err) {
      setFormError("Error in calculating.");
      toast.error("Error in calculating.");
    }
  };

  // Handle reset form
  const handleReset = () => {
    setFormData({
      tech_frequency: 1, // 1 2 4 12  52  365
      tech_faceValue: 2000,
      tech_couponRate: 5,
      tech_yearsToMaturity: 7,
      tech_yieldRate: 5,
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
        <div className="w-full mx-auto p-4 lg:p-8 md:p-8 bg-white rounded-lg shadow-md space-y-6 mb-3">
          {formError && (
            <p className="text-red-500 text-lg font-semibold w-full">
              {formError}
            </p>
          )}

          <div class="lg:w-[60%] md:w-[60%] w-full mx-auto ">
            <div class="grid grid-cols-12 mt-3   gap-2 md:gap-4 lg:gap-4">
              <div class="col-span-12 md:col-span-6 lg:col-span-6">
                <label htmlFor="tech_frequency" className="label">
                  {data?.payload?.tech_lang_keys["3"]}:
                </label>
                <div className="mt-2">
                  <select
                    className="input"
                    aria-label="select"
                    name="tech_frequency"
                    id="tech_frequency"
                    value={formData.tech_frequency}
                    onChange={handleChange}
                  >
                    <option value="1">Annually</option>
                    <option value="2">Semi-Annually</option>
                    <option value="4">Quarterly</option>
                    <option value="12">Monthly</option>
                    <option value="52">Weekly</option>
                    <option value="365">Daily</option>
                  </select>
                </div>
              </div>
              <div class="col-span-12 md:col-span-6 lg:col-span-6">
                <label htmlFor="tech_faceValue" className="label">
                  {data?.payload?.tech_lang_keys["1"]}:
                </label>
                <div class=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_faceValue"
                    id="tech_faceValue"
                    className="input my-2"
                    aria-label="input"
                    value={formData.tech_faceValue}
                    onChange={handleChange}
                  />
                  <span class="input_unit">{currency.symbol}</span>
                </div>
              </div>
              <div class="col-span-12 md:col-span-6 lg:col-span-6">
                <label htmlFor="tech_couponRate" className="label">
                  {data?.payload?.tech_lang_keys["2"]}:
                </label>
                <div class=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_couponRate"
                    id="tech_couponRate"
                    className="input my-2"
                    aria-label="input"
                    value={formData.tech_couponRate}
                    onChange={handleChange}
                  />
                  <span class="input_unit">%</span>
                </div>
              </div>
              <div class="col-span-12 md:col-span-6 lg:col-span-6">
                <label htmlFor="tech_yearsToMaturity" className="label">
                  {data?.payload?.tech_lang_keys["4"]}:
                </label>
                <div class=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_yearsToMaturity"
                    id="tech_yearsToMaturity"
                    className="input my-2"
                    aria-label="input"
                    value={formData.tech_yearsToMaturity}
                    onChange={handleChange}
                  />
                  <span class="input_unit">years</span>
                </div>
              </div>
              <div class="col-span-12 md:col-span-6 lg:col-span-6">
                <label htmlFor="tech_yieldRate" className="label">
                  {data?.payload?.tech_lang_keys["6"]}:
                </label>
                <div class=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_yieldRate"
                    id="tech_yieldRate"
                    className="input my-2"
                    aria-label="input"
                    value={formData.tech_yieldRate}
                    onChange={handleChange}
                  />
                  <span class="input_unit">%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-6 mt-10">
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
                      <div class="w-full md:w-[60%] lg:w-[60%]  mt-2">
                        <table class="w-100 font-s-18">
                          <tr>
                            <td class="py-2 border-b" width="70%">
                              <strong>
                                {data?.payload?.tech_lang_keys["7"]}{" "}
                              </strong>
                            </td>
                            <td class="py-2 border-b">
                              {currency.symbol} {result?.tech_couponPayment}
                            </td>
                          </tr>
                          <tr>
                            <td class="py-2 border-b" width="70%">
                              <strong>
                                {" "}
                                {data?.payload?.tech_lang_keys["8"]}{" "}
                              </strong>
                            </td>
                            <td class="py-2 border-b">
                              {" "}
                              {currency.symbol} {Math.abs(result?.tech_annual)}
                            </td>
                          </tr>
                          <tr>
                            <td class="py-2 border-b" width="70%">
                              <strong>
                                {data?.payload?.tech_lang_keys["5"]}{" "}
                              </strong>
                            </td>
                            <td class="py-2 border-b">
                              {currency.symbol} {result?.tech_bondPrice}
                            </td>
                          </tr>
                        </table>
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

export default BondPriceCalculator;
