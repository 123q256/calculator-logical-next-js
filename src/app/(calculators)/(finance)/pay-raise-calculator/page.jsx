"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  useGetSingleCalculatorDetailsMutation,
  usePayRaiseCalculatorMutation,
} from "../../../../redux/services/calculator/calculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../../components/Calculator/CalculatorFeedback";
import Calculator from "../../Calculator";
import { getUserCurrency } from "../../../../components/Calculator/GetCurrency"; //currency import class
import ResetButton from "../../../../components/Calculator/ResetButton";
import Button from "../../../../components/Calculator/Button";

const PayRaiseCalculator = () => {
  const pathname = usePathname();
  const url = pathname.split("/")[1];
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
    tech_period: Number(1),
    tech_pay: Number(50),
    tech_hour: Number(40),
    tech_type: Number(1),
    tech_new: Number(40),
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = usePayRaiseCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.tech_pay ||
      !formData.tech_period ||
      !formData.tech_hour ||
      !formData.tech_type ||
      !formData.tech_new
    ) {
      setFormError("Please fill in field.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_pay: formData.tech_pay,
        tech_period: formData.tech_period,
        tech_hour: formData.tech_hour,
        tech_type: formData.tech_type,
        tech_new: formData.tech_new,
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
      tech_period: Number(1),
      tech_pay: Number(50),
      tech_hour: Number(40),
      tech_type: Number(1),
      tech_new: Number(40),
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
          path: pathname, // This will use the current path dynamically
        },
      ]}
    >
      <form className="row" onSubmit={handleSubmit}>
        <div className="w-full mx-auto p-4 lg:p-8 md:p-8 input_form rounded-lg  space-y-6 mb-3">
          {formError && (
            <p className="text-red-500 text-lg font-semibold w-full">
              {formError}
            </p>
          )}

          <div className="lg:w-[60%] md:w-[80%] w-full mx-auto ">
            <div className="grid grid-cols-12 mt-3  gap-3">
              <div className="col-span-6">
                <div className="  position-relative">
                  <label htmlFor="tech_period" className="label">
                    {data?.payload?.tech_lang_keys["1"]}:
                  </label>
                  <div className="mt-2">
                    <select
                      className="input"
                      aria-label="select"
                      name="tech_period"
                      id="tech_period"
                      value={formData.tech_period}
                      onChange={handleChange}
                    >
                      <option value="1">
                        {data?.payload?.tech_lang_keys["2"]}
                      </option>
                      <option value="2">
                        {data?.payload?.tech_lang_keys["3"]}
                      </option>
                      <option value="3">
                        {data?.payload?.tech_lang_keys["4"]}
                      </option>
                      <option value="4">
                        {data?.payload?.tech_lang_keys["5"]}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-span-6">
                <label htmlFor="tech_pay" className="label">
                  {data?.payload?.tech_lang_keys["6"]}:
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_pay"
                    id="tech_pay"
                    className="input my-2"
                    aria-label="input"
                    placeholder="50"
                    value={formData.tech_pay}
                    onChange={handleChange}
                  />
                  <span className="text-blue input_unit">
                    {currency.symbol}
                  </span>
                </div>
              </div>
              <div className="col-span-6">
                <label htmlFor="tech_hour" className="label">
                  {data?.payload?.tech_lang_keys["7"]}:
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_hour"
                    id="tech_hour"
                    className="input my-2"
                    aria-label="input"
                    placeholder="50"
                    value={formData.tech_hour}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-span-6">
                <label htmlFor="tech_type" className="label">
                  {data?.payload?.tech_lang_keys["8"]}:
                </label>
                <div className="mt-2">
                  <select
                    className="input"
                    aria-label="select"
                    name="tech_type"
                    id="tech_type"
                    value={formData.tech_type}
                    onChange={handleChange}
                  >
                    <option value="1">
                      {data?.payload?.tech_lang_keys["9"]}
                    </option>
                    <option value="2">
                      {data?.payload?.tech_lang_keys["10"]}
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-span-6">
                <label htmlFor="tech_new" className="label">
                  Pay Raise: (
                  <span className="type">
                    {" "}
                    {formData.tech_type == "1" ? "%" : currency.symbol}
                  </span>
                  )
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_new"
                    id="tech_new"
                    className="input my-2"
                    aria-label="input"
                    placeholder="50"
                    value={formData.tech_new}
                    onChange={handleChange}
                  />
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
          <div className="w-full mx-auto p-4 lg:p-8 md:p-8 result_calculator rounded-lg  space-y-6 result">
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
              <div className="w-full result mx-auto p-4 lg:p-8 md:p-8 result_calculator rounded-lg  space-y-6 result">
                <div>
                  <ResultActions lang={data?.payload?.tech_lang_keys} />

                  <div className="rounded-lg  flex items-center justify-center">
                    <div className="w-full mt-3">
                      <div className="w-full md:w-[80%] lg:w-[60%]  mt-2">
                        <table className="w-full text-[18px]">
                          <tbody>
                            <tr>
                              <td className="py-2 border-b" width="70%">
                                <strong>
                                  {data?.payload?.tech_lang_keys[9]} (R){" "}
                                </strong>
                              </td>
                              <td className="py-2 border-b">
                                {" "}
                                {Number(result?.tech_percent).toFixed(2)} %
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="w-full md:w-[80%] lg:w-[60%]  mt-2">
                        <table className="w-full font-s-16">
                          <tbody>
                            <tr>
                              <td className="py-2 mt-2" width="70%">
                                <strong>
                                  {data?.payload?.tech_lang_keys["11"]}{" "}
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b" width="70%">
                                <strong>
                                  {data?.payload?.tech_lang_keys["2"]}{" "}
                                </strong>
                              </td>
                              <td className="py-2 border-b">
                                {" "}
                                {currency.symbol}{" "}
                                {Number(result?.tech_hourly).toFixed(2)}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b" width="70%">
                                <strong>
                                  {data?.payload?.tech_lang_keys["3"]}{" "}
                                </strong>
                              </td>
                              <td className="py-2 border-b">
                                {" "}
                                {currency.symbol}{" "}
                                {Number(result?.tech_weekly).toFixed(2)}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b" width="70%">
                                <strong>
                                  {data?.payload?.tech_lang_keys["4"]}{" "}
                                </strong>
                              </td>
                              <td className="py-2 border-b">
                                {" "}
                                {currency.symbol}{" "}
                                {Number(result?.tech_monthly).toFixed(2)}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b" width="70%">
                                <strong>
                                  {data?.payload?.tech_lang_keys["5"]}{" "}
                                </strong>
                              </td>
                              <td className="py-2 border-b">
                                {" "}
                                {currency.symbol}{" "}
                                {Number(result?.tech_yearly).toFixed(2)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <table className="w-full font-s-16">
                          <tbody>
                            <tr>
                              <td className="py-2 mt-2" width="70%">
                                <strong>
                                  {data?.payload?.tech_lang_keys["12"]}
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b" width="70%">
                                {data?.payload?.tech_lang_keys["2"]}
                              </td>
                              <td className="py-2 border-b">
                                <strong>
                                  {currency.symbol}{" "}
                                  {Number(
                                    result?.tech_hourly + result?.tech_incHour
                                  ).toFixed(2)}
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b" width="70%">
                                {data?.payload?.tech_lang_keys["3"]}
                              </td>
                              <td className="py-2 border-b">
                                <strong>
                                  {currency.symbol}{" "}
                                  {Number(
                                    result?.tech_weekly + result?.tech_incWeek
                                  ).toFixed(2)}
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b" width="70%">
                                {data?.payload?.tech_lang_keys["4"]}
                              </td>
                              <td className="py-2 border-b">
                                <strong>
                                  {currency.symbol}{" "}
                                  {Number(
                                    result?.tech_monthly + result?.tech_incMonth
                                  ).toFixed(2)}
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b" width="70%">
                                {data?.payload?.tech_lang_keys["5"]}
                              </td>
                              <td className="py-2 border-b">
                                <strong>
                                  {currency.symbol}{" "}
                                  {Number(
                                    result?.tech_yearly + result?.tech_incYear
                                  ).toFixed(2)}
                                </strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table className="w-100 font-s-16">
                          <tbody>
                            <tr>
                              <td className="py-2 mt-2" width="70%">
                                <strong>
                                  {data?.payload?.tech_lang_keys["13"]}{" "}
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b" width="70%">
                                <strong>
                                  {data?.payload?.tech_lang_keys["2"]}{" "}
                                </strong>
                              </td>
                              <td className="py-2 border-b">
                                {" "}
                                {currency.symbol}{" "}
                                {Number(result?.tech_incHour).toFixed(2)}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b" width="70%">
                                <strong>
                                  {data?.payload?.tech_lang_keys["3"]}{" "}
                                </strong>
                              </td>
                              <td className="py-2 border-b">
                                {" "}
                                {currency.symbol}{" "}
                                {Number(result?.tech_incWeek).toFixed(2)}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b" width="70%">
                                <strong>
                                  {data?.payload?.tech_lang_keys["4"]}{" "}
                                </strong>
                              </td>
                              <td className="py-2 border-b">
                                {" "}
                                {currency.symbol}{" "}
                                {Number(result?.tech_incMonth).toFixed(2)}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b" width="70%">
                                <strong>
                                  {data?.payload?.tech_lang_keys["5"]}{" "}
                                </strong>
                              </td>
                              <td className="py-2 border-b">
                                {" "}
                                {currency.symbol}{" "}
                                {Number(result?.tech_incYear).toFixed(2)}
                              </td>
                            </tr>
                          </tbody>
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

export default PayRaiseCalculator;
