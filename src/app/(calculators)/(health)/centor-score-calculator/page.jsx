"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  useGetSingleCalculatorDetailsMutation,
  useCentorScoreCalculatorMutation,
} from "../../../../redux/services/calculator/calculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../../components/Calculator/CalculatorFeedback";
import Calculator from "../../Calculator";
import { getUserCurrency } from "../../../../components/Calculator/GetCurrency"; //currency import class
import ResetButton from "../../../../components/Calculator/ResetButton";
import Button from "../../../../components/Calculator/Button";

const CentorScoreCalculator = () => {
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
    tech_tonsils: 1, // 0 1
    tech_cough: 1, // 0 1
    tech_lymph: 1, // 0 1
    tech_age: 20,
    tech_temp: 12,
    tech_unit: "°F",
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useCentorScoreCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_tonsils || !formData.tech_cough) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_tonsils: formData.tech_tonsils,
        tech_cough: formData.tech_cough,
        tech_lymph: formData.tech_lymph,
        tech_age: formData.tech_age,
        tech_temp: formData.tech_temp,
        tech_unit: formData.tech_unit,
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
      tech_tonsils: 1, // 0 1
      tech_cough: 1, // 0 1
      tech_lymph: 1, // 0 1
      tech_age: 20,
      tech_temp: 12,
      tech_unit: "°F",
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
  //dropdown states
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const setUnitHandler = (unit) => {
    setFormData((prev) => ({ ...prev, tech_unit: unit }));
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
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
            <div className="grid grid-cols-12  gap-2 md:gap-4 lg:gap-4">
              <div className="col-span-12 md:col-span-6 lg:col-span-6">
                <label htmlFor="tech_age" className="label">
                  {data?.payload?.tech_lang_keys["age"]}:
                </label>
                <div className=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_age"
                    id="tech_age"
                    className="input my-2"
                    aria-label="input"
                    placeholder="00"
                    min="1"
                    value={formData.tech_age}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-6">
                <label htmlFor="tech_tonsils" className="label">
                  {data?.payload?.tech_lang_keys["t"]}:
                </label>
                <div className="mt-2">
                  <select
                    className="input"
                    aria-label="select"
                    name="tech_tonsils"
                    id="tech_tonsils"
                    value={formData.tech_tonsils}
                    onChange={handleChange}
                  >
                    <option value="0">
                      {data?.payload?.tech_lang_keys["no"]}
                    </option>
                    <option value="1">
                      {data?.payload?.tech_lang_keys["yes"]}
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-6">
                <label htmlFor="tech_cough" className="label">
                  {data?.payload?.tech_lang_keys["c"]}:
                </label>
                <div className="mt-2">
                  <select
                    className="input"
                    aria-label="select"
                    name="tech_cough"
                    id="tech_cough"
                    value={formData.tech_cough}
                    onChange={handleChange}
                  >
                    <option value="0">
                      {data?.payload?.tech_lang_keys["cc"]}
                    </option>
                    <option value="1">
                      {data?.payload?.tech_lang_keys["nc"]}
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-6">
                <label htmlFor="tech_lymph" className="label">
                  {data?.payload?.tech_lang_keys["l"]}:
                </label>
                <div className="mt-2">
                  <select
                    className="input"
                    aria-label="select"
                    name="tech_lymph"
                    id="tech_lymph"
                    value={formData.tech_lymph}
                    onChange={handleChange}
                  >
                    <option value="0">
                      {data?.payload?.tech_lang_keys["no"]}
                    </option>
                    <option value="1">
                      {data?.payload?.tech_lang_keys["yes"]}
                    </option>
                  </select>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-6">
                <label htmlFor="tech_temp" className="label">
                  {data?.payload?.tech_lang_keys["b"]}
                </label>
                <div className="relative w-full ">
                  <input
                    type="number"
                    name="tech_temp"
                    step="any"
                    className="mt-1 input"
                    value={formData.tech_temp}
                    placeholder="00"
                    onChange={handleChange}
                  />
                  <label
                    className="absolute cursor-pointer text-sm underline right-6 top-4"
                    onClick={toggleDropdown}
                  >
                    {formData.tech_unit} ▾
                  </label>
                  {dropdownVisible && (
                    <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                      {[
                        { label: "°C", value: "°C" },
                        { label: "°F", value: "°F" },
                      ].map((unit, index) => (
                        <p
                          key={index}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => setUnitHandler(unit.value)}
                        >
                          {unit.label}
                        </p>
                      ))}
                    </div>
                  )}
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
              <div className="w-full  mx-auto p-4 lg:p-8 md:p-8 result_calculator rounded-lg space-y-6 result">
                <div>
                  <ResultActions lang={data?.payload?.tech_lang_keys} />

                  <div className="rounded-lg  flex items-center justify-center">
                    <div className="w-full mt-3">
                      <div className="w-full text-center">
                        <p className="w-full text-[20px] mt-2">
                          <strong>
                            {data?.payload?.tech_lang_keys["ans"]}
                          </strong>
                        </p>
                        <p className="w-full text-[32px]">
                          {result?.tech_ans !== undefined &&
                          result?.tech_ans !== null ? (
                            <strong className="text-[#119154]">
                              {result.tech_ans}
                            </strong>
                          ) : (
                            <strong className="text-[#119154]">
                              0.0{" "}
                              <span className="text-[#119154] text-[25px]">
                                Points
                              </span>
                            </strong>
                          )}
                        </p>
                        <p className="w-full mt-2">
                          {result?.tech_per} {result?.tech_text}
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

export default CentorScoreCalculator;
