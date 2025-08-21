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
  useNetWorthCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useNetWorthCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import ResetButton from "../../../components/Calculator/ResetButton";
import Button from "../../../components/Calculator/Button";

const NetWorthCalculator = () => {
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
    tech_as_real: 47,
    tech_as_check: 20,
    tech_as_saving: 20,
    tech_as_retire: 20,
    tech_as_car: 20,
    tech_as_other: 20,
    tech_li_real: 20,
    tech_li_card: 20,
    tech_li_loan: 20,
    tech_li_stload: 20,
    tech_li_car: 20,
    tech_li_other: 78,
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useNetWorthCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.tech_as_real ||
      !formData.tech_as_check ||
      !formData.tech_as_saving ||
      !formData.tech_as_retire ||
      !formData.tech_as_car ||
      !formData.tech_as_other ||
      !formData.tech_li_real ||
      !formData.tech_li_card ||
      !formData.tech_li_loan ||
      !formData.tech_li_stload ||
      !formData.tech_li_car ||
      !formData.tech_li_other
    ) {
      setFormError("Please fill in field.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_as_real: formData.tech_as_real,
        tech_as_check: formData.tech_as_check,
        tech_as_saving: formData.tech_as_saving,
        tech_as_retire: formData.tech_as_retire,
        tech_as_car: formData.tech_as_car,
        tech_as_other: formData.tech_as_other,
        tech_li_real: formData.tech_li_real,
        tech_li_card: formData.tech_li_card,
        tech_li_loan: formData.tech_li_loan,
        tech_li_stload: formData.tech_li_stload,
        tech_li_car: formData.tech_li_car,
        tech_li_other: formData.tech_li_other,
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
      tech_as_real: 47,
      tech_as_check: 20,
      tech_as_saving: 20,
      tech_as_retire: 20,
      tech_as_car: 20,
      tech_as_other: 20,
      tech_li_real: 20,
      tech_li_card: 20,
      tech_li_loan: 20,
      tech_li_stload: 20,
      tech_li_car: 20,
      tech_li_other: 78,
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
            <div class="grid grid-cols-12 mt-3  gap-4">
              <div class="col-span-6 text-center">
                <p>
                  <strong>{data?.payload?.tech_lang_keys["1"]}</strong>
                </p>
              </div>
              <div class="col-span-6 text-center">
                <p>
                  <strong>{data?.payload?.tech_lang_keys["8"]}</strong>
                </p>
              </div>
              <div class="col-span-6">
                <label htmlFor="tech_as_real" className="label">
                  {data?.payload?.tech_lang_keys["2"]}:
                </label>
                <div class=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_as_real"
                    id="tech_as_real"
                    className="input my-2"
                    aria-label="input"
                    min="0"
                    value={formData.tech_as_real}
                    onChange={handleChange}
                  />
                  <span class="input_unit">{currency.symbol}</span>
                </div>
              </div>
              <div class="col-span-6">
                <label htmlFor="tech_li_real" className="label">
                  {data?.payload?.tech_lang_keys["9"]}:
                </label>
                <div class=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_li_real"
                    id="tech_li_real"
                    className="input my-2"
                    aria-label="input"
                    min="0"
                    value={formData.tech_li_real}
                    onChange={handleChange}
                  />
                  <span class="input_unit">{currency.symbol}</span>
                </div>
              </div>
              <div class="col-span-6">
                <label htmlFor="tech_as_check" className="label">
                  {data?.payload?.tech_lang_keys["3"]}:
                </label>
                <div class=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_as_check"
                    id="tech_as_check"
                    className="input my-2"
                    aria-label="input"
                    min="0"
                    value={formData.tech_as_check}
                    onChange={handleChange}
                  />
                  <span class="input_unit">{currency.symbol}</span>
                </div>
              </div>
              <div class="col-span-6">
                <label htmlFor="tech_li_card" className="label">
                  {data?.payload?.tech_lang_keys["10"]}:
                </label>
                <div class=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_li_card"
                    id="tech_li_card"
                    className="input my-2"
                    aria-label="input"
                    min="0"
                    value={formData.tech_li_card}
                    onChange={handleChange}
                  />
                  <span class="input_unit">{currency.symbol}</span>
                </div>
              </div>
              <div class="col-span-6">
                <label htmlFor="tech_as_saving" className="label">
                  {data?.payload?.tech_lang_keys["4"]}:
                </label>
                <div class=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_as_saving"
                    id="tech_as_saving"
                    className="input my-2"
                    aria-label="input"
                    min="0"
                    value={formData.tech_as_saving}
                    onChange={handleChange}
                  />
                  <span class="input_unit">{currency.symbol}</span>
                </div>
              </div>
              <div class="col-span-6">
                <label htmlFor="tech_li_loan" className="label">
                  {data?.payload?.tech_lang_keys["11"]}:
                </label>
                <div class=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_li_loan"
                    id="tech_li_loan"
                    className="input my-2"
                    aria-label="input"
                    min="0"
                    value={formData.tech_li_loan}
                    onChange={handleChange}
                  />
                  <span class="input_unit">{currency.symbol}</span>
                </div>
              </div>
              <div class="col-span-6">
                <label htmlFor="tech_as_retire" className="label">
                  {data?.payload?.tech_lang_keys["5"]}:
                </label>
                <div class=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_as_retire"
                    id="tech_as_retire"
                    className="input my-2"
                    aria-label="input"
                    min="0"
                    value={formData.tech_as_retire}
                    onChange={handleChange}
                  />
                  <span class="input_unit">{currency.symbol}</span>
                </div>
              </div>
              <div class="col-span-6">
                <label htmlFor="tech_li_stload" className="label">
                  {data?.payload?.tech_lang_keys["12"]}:
                </label>
                <div class=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_li_stload"
                    id="tech_li_stload"
                    className="input my-2"
                    aria-label="input"
                    min="0"
                    value={formData.tech_li_stload}
                    onChange={handleChange}
                  />
                  <span class="input_unit">{currency.symbol}</span>
                </div>
              </div>
              <div class="col-span-6">
                <label htmlFor="tech_as_car" className="label">
                  {data?.payload?.tech_lang_keys["6"]}:
                </label>
                <div class=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_as_car"
                    id="tech_as_car"
                    className="input my-2"
                    aria-label="input"
                    min="0"
                    value={formData.tech_as_car}
                    onChange={handleChange}
                  />
                  <span class="input_unit">{currency.symbol}</span>
                </div>
              </div>
              <div class="col-span-6">
                <label htmlFor="tech_li_car" className="label">
                  {data?.payload?.tech_lang_keys["13"]}:
                </label>
                <div class=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_li_car"
                    id="tech_li_car"
                    className="input my-2"
                    aria-label="input"
                    min="0"
                    value={formData.tech_li_car}
                    onChange={handleChange}
                  />
                  <span class="input_unit">{currency.symbol}</span>
                </div>
              </div>
              <div class="col-span-6">
                <label htmlFor="tech_as_other" className="label">
                  {data?.payload?.tech_lang_keys["7"]}:
                </label>
                <div class=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_as_other"
                    id="tech_as_other"
                    className="input my-2"
                    aria-label="input"
                    min="0"
                    value={formData.tech_as_other}
                    onChange={handleChange}
                  />
                  <span class="input_unit">{currency.symbol}</span>
                </div>
              </div>
              <div class="col-span-6">
                <label htmlFor="tech_li_other" className="label">
                  {data?.payload?.tech_lang_keys["14"]}:
                </label>
                <div class=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_li_other"
                    id="tech_li_other"
                    className="input my-2"
                    aria-label="input"
                    min="0"
                    value={formData.tech_li_other}
                    onChange={handleChange}
                  />
                  <span class="input_unit">{currency.symbol}</span>
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
                        <table class="w-full font-s-18">
                          <tr>
                            <td class="py-2 border-b" width="70%">
                              <strong>
                                {data?.payload?.tech_lang_keys["15"]}
                              </strong>
                            </td>
                            <td class="py-2 border-b">
                              {currency.symbol} {result?.tech_net_worth}
                            </td>
                          </tr>
                          <tr>
                            <td class="py-2 border-b" width="70%">
                              <strong>
                                {data?.payload?.tech_lang_keys["1"]}
                              </strong>
                            </td>
                            <td class="py-2 border-b">
                              {currency.symbol} {result?.tech_assets}
                            </td>
                          </tr>
                          <tr>
                            <td class="py-2 border-b" width="70%">
                              <strong>
                                {data?.payload?.tech_lang_keys["8"]}
                              </strong>
                            </td>
                            <td class="py-2 border-b">
                              {currency.symbol} {result?.tech_liabilities}
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

export default NetWorthCalculator;
