"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  useGetSingleCalculatorDetailsMutation,
  useMarkupCalculatorMutation,
} from "../../../../redux/services/calculator/calculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../../components/Calculator/CalculatorFeedback";
import Calculator from "../../Calculator";
import { getUserCurrency } from "../../../../components/Calculator/GetCurrency"; //currency import class
import ResetButton from "../../../../components/Calculator/ResetButton";
import Button from "../../../../components/Calculator/Button";

const MarkupCalculator = () => {
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
    tech_to_cal: "1", // 1 2 3 4 5 6
    tech_a: "10",
    tech_b: "20",
    tech_c: "30",
    tech_d: "40",
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useMarkupCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_to_cal || !formData.tech_a) {
      setFormError("Please fill in field.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_to_cal: formData.tech_to_cal,
        tech_a: formData.tech_a,
        tech_b: formData.tech_b,
        tech_c: formData.tech_c,
        tech_d: formData.tech_d,
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
      tech_to_cal: "1", // 1 2 3 4 5 6
      tech_a: "10",
      tech_b: "20",
      tech_c: "30",
      tech_d: "40",
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
          <div class="lg:w-[60%] md:w-[60%] w-full mx-auto ">
            <div class="grid grid-cols-12  gap-2 md:gap-4 lg:gap-4">
              <div class="col-span-12 md:col-span-6 lg:col-span-6">
                <label htmlFor="tech_to_cal" className="label">
                  {data?.payload?.tech_lang_keys["1"]}:
                </label>
                <div className="mt-2">
                  <select
                    className="input"
                    aria-label="select"
                    name="tech_to_cal"
                    id="tech_to_cal"
                    value={formData.tech_to_cal}
                    onChange={handleChange}
                  >
                    <option value="1">
                      {" "}
                      {data?.payload?.tech_lang_keys["c"]} &{" "}
                      {data?.payload?.tech_lang_keys["d"]}
                    </option>
                    <option value="2">
                      {" "}
                      {data?.payload?.tech_lang_keys["b"]} &{" "}
                      {data?.payload?.tech_lang_keys["d"]}
                    </option>
                    <option value="3">
                      {" "}
                      {data?.payload?.tech_lang_keys["b"]} &{" "}
                      {data?.payload?.tech_lang_keys["c"]}
                    </option>
                    <option value="4">
                      {" "}
                      {data?.payload?.tech_lang_keys["a"]} &{" "}
                      {data?.payload?.tech_lang_keys["d"]}
                    </option>
                    <option value="5">
                      {" "}
                      {data?.payload?.tech_lang_keys["a"]} &{" "}
                      {data?.payload?.tech_lang_keys["c"]}
                    </option>
                    <option value="6">
                      {" "}
                      {data?.payload?.tech_lang_keys["a"]} &{" "}
                      {data?.payload?.tech_lang_keys["b"]}
                    </option>
                  </select>
                </div>
              </div>

              {formData.tech_to_cal == "1" && (
                <>
                  <div class="col-span-12 md:col-span-6 lg:col-span-6 a">
                    <label htmlFor="tech_a" className="label">
                      {data?.payload?.tech_lang_keys["a"]}:
                    </label>
                    <div class=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_a"
                        id="tech_a"
                        className="input my-2"
                        aria-label="input"
                        value={formData.tech_a}
                        onChange={handleChange}
                      />
                      <span class="input_unit">{currency.symbol}</span>
                    </div>
                  </div>
                  <div class="col-span-12 md:col-span-6 lg:col-span-6  b">
                    <label htmlFor="tech_b" className="label">
                      {data?.payload?.tech_lang_keys["b"]}:
                    </label>
                    <div class=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_b"
                        id="tech_b"
                        className="input my-2"
                        aria-label="input"
                        value={formData.tech_b}
                        onChange={handleChange}
                      />
                      <span class="input_unit">{currency.symbol}</span>
                    </div>
                  </div>
                  <div class="col-span-12 md:col-span-6 lg:col-span-6 ">
                    <label htmlFor="tech_c" className="label">
                      {data?.payload?.tech_lang_keys["c"]}:
                    </label>
                    <div class=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_c"
                        id="tech_c"
                        className="input my-2"
                        aria-label="input"
                        value={formData.tech_c}
                        onChange={handleChange}
                      />
                      <span class="input_unit">{currency.symbol}</span>
                    </div>
                  </div>
                </>
              )}

              {formData.tech_to_cal == "2" && (
                <>
                  <div class="col-span-12 md:col-span-6 lg:col-span-6 a">
                    <label htmlFor="tech_a" className="label">
                      {data?.payload?.tech_lang_keys["a"]}:
                    </label>
                    <div class=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_a"
                        id="tech_a"
                        className="input my-2"
                        aria-label="input"
                        value={formData.tech_a}
                        onChange={handleChange}
                      />
                      <span class="input_unit">{currency.symbol}</span>
                    </div>
                  </div>
                  <div class="col-span-12 md:col-span-6 lg:col-span-6 ">
                    <label htmlFor="tech_c" className="label">
                      {data?.payload?.tech_lang_keys["c"]}:
                    </label>
                    <div class=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_c"
                        id="tech_c"
                        className="input my-2"
                        aria-label="input"
                        value={formData.tech_c}
                        onChange={handleChange}
                      />
                      <span class="input_unit">{currency.symbol}</span>
                    </div>
                  </div>
                </>
              )}
              {formData.tech_to_cal == "3" && (
                <>
                  <div class="col-span-12 md:col-span-6 lg:col-span-6 a">
                    <label htmlFor="tech_a" className="label">
                      {data?.payload?.tech_lang_keys["a"]}:
                    </label>
                    <div class=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_a"
                        id="tech_a"
                        className="input my-2"
                        aria-label="input"
                        value={formData.tech_a}
                        onChange={handleChange}
                      />
                      <span class="input_unit">{currency.symbol}</span>
                    </div>
                  </div>
                  <div class="col-span-12 md:col-span-6 lg:col-span-6 ">
                    <label htmlFor="tech_c" className="label">
                      {data?.payload?.tech_lang_keys["c"]}:
                    </label>
                    <div class=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_c"
                        id="tech_c"
                        className="input my-2"
                        aria-label="input"
                        value={formData.tech_c}
                        onChange={handleChange}
                      />
                      <span class="input_unit">{currency.symbol}</span>
                    </div>
                  </div>
                  <div class="col-span-12 md:col-span-6 lg:col-span-6 d">
                    <label htmlFor="tech_d" className="label">
                      {data?.payload?.tech_lang_keys["d"]}:
                    </label>
                    <div class=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_d"
                        id="tech_d"
                        className="input my-2"
                        aria-label="input"
                        value={formData.tech_d}
                        onChange={handleChange}
                      />
                      <span class="input_unit">{currency.symbol}</span>
                    </div>
                  </div>
                </>
              )}
              {formData.tech_to_cal == "4" && (
                <>
                  <div class="col-span-12 md:col-span-6 lg:col-span-6  b">
                    <label htmlFor="tech_b" className="label">
                      {data?.payload?.tech_lang_keys["b"]}:
                    </label>
                    <div class=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_b"
                        id="tech_b"
                        className="input my-2"
                        aria-label="input"
                        value={formData.tech_b}
                        onChange={handleChange}
                      />
                      <span class="input_unit">{currency.symbol}</span>
                    </div>
                  </div>
                  <div class="col-span-12 md:col-span-6 lg:col-span-6 ">
                    <label htmlFor="tech_c" className="label">
                      {data?.payload?.tech_lang_keys["c"]}:
                    </label>
                    <div class=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_c"
                        id="tech_c"
                        className="input my-2"
                        aria-label="input"
                        value={formData.tech_c}
                        onChange={handleChange}
                      />
                      <span class="input_unit">{currency.symbol}</span>
                    </div>
                  </div>
                </>
              )}
              {formData.tech_to_cal == "5" && (
                <>
                  <div class="col-span-12 md:col-span-6 lg:col-span-6  b">
                    <label htmlFor="tech_b" className="label">
                      {data?.payload?.tech_lang_keys["b"]}:
                    </label>
                    <div class=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_b"
                        id="tech_b"
                        className="input my-2"
                        aria-label="input"
                        value={formData.tech_b}
                        onChange={handleChange}
                      />
                      <span class="input_unit">{currency.symbol}</span>
                    </div>
                  </div>
                  <div class="col-span-12 md:col-span-6 lg:col-span-6 ">
                    <label htmlFor="tech_c" className="label">
                      {data?.payload?.tech_lang_keys["c"]}:
                    </label>
                    <div class=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_c"
                        id="tech_c"
                        className="input my-2"
                        aria-label="input"
                        value={formData.tech_c}
                        onChange={handleChange}
                      />
                      <span class="input_unit">{currency.symbol}</span>
                    </div>
                  </div>
                  <div class="col-span-12 md:col-span-6 lg:col-span-6 d">
                    <label htmlFor="tech_d" className="label">
                      {data?.payload?.tech_lang_keys["d"]}:
                    </label>
                    <div class=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_d"
                        id="tech_d"
                        className="input my-2"
                        aria-label="input"
                        value={formData.tech_d}
                        onChange={handleChange}
                      />
                      <span class="input_unit">{currency.symbol}</span>
                    </div>
                  </div>
                </>
              )}
              {formData.tech_to_cal == "6" && (
                <>
                  <div class="col-span-12 md:col-span-6 lg:col-span-6 ">
                    <label htmlFor="tech_c" className="label">
                      {data?.payload?.tech_lang_keys["c"]}:
                    </label>
                    <div class=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_c"
                        id="tech_c"
                        className="input my-2"
                        aria-label="input"
                        value={formData.tech_c}
                        onChange={handleChange}
                      />
                      <span class="input_unit">{currency.symbol}</span>
                    </div>
                  </div>
                  <div class="col-span-12 md:col-span-6 lg:col-span-6 d">
                    <label htmlFor="tech_d" className="label">
                      {data?.payload?.tech_lang_keys["d"]}:
                    </label>
                    <div class=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_d"
                        id="tech_d"
                        className="input my-2"
                        aria-label="input"
                        value={formData.tech_d}
                        onChange={handleChange}
                      />
                      <span class="input_unit">{currency.symbol}</span>
                    </div>
                  </div>
                </>
              )}
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

                  <div class="rounded-lg  flex items-center justify-center">
                    <div class="w-full mt-3">
                      <div class="w-full md:w-[60%] lg:w-[60%]  mt-2">
                        <table className="w-full text-[18px]">
                          <tbody>
                            <tr>
                              <td className="py-2 border-b" width="70%">
                                <strong>
                                  {data?.payload?.tech_lang_keys["a"]}
                                </strong>
                              </td>
                              <td className="py-2 border-b">
                                {currency.symbol}
                                {result?.tech_cost !== ""
                                  ? result?.tech_cost
                                  : "0.0"}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b" width="70%">
                                <strong>
                                  {data?.payload?.tech_lang_keys["b"]}
                                </strong>
                              </td>
                              <td className="py-2 border-b">
                                {result?.tech_markup !== ""
                                  ? result?.tech_markup
                                  : "0.0"}
                                %
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b" width="70%">
                                <strong>
                                  {data?.payload?.tech_lang_keys["c"]}
                                </strong>
                              </td>
                              <td className="py-2 border-b">
                                {currency.symbol}
                                {result?.tech_revenue !== ""
                                  ? result?.tech_revenue
                                  : "0.0"}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b" width="70%">
                                <strong>
                                  {data?.payload?.tech_lang_keys["d"]}
                                </strong>
                              </td>
                              <td className="py-2 border-b">
                                {currency.symbol}
                                {result?.tech_profit !== ""
                                  ? result?.tech_profit
                                  : "0.0"}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b" width="70%">
                                <strong>
                                  {data?.payload?.tech_lang_keys["e"]}
                                </strong>
                              </td>
                              <td className="py-2 border-b">
                                {result?.tech_margin !== ""
                                  ? result?.tech_margin
                                  : "0.0"}
                                %
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

export default MarkupCalculator;
