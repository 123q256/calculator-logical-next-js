"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useGetSingleCalculatorDetailsMutation } from "../../../../redux/services/calculator/calculatorApi";
import { useMonthCalculationMutation } from "../../../../redux/services/datecalculator/dateCalculatorApi";
import { toast } from "react-toastify";
import ResultActions from "../../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../../components/Calculator/CalculatorFeedback";
import Calculator from "../../Calculator";
import ResetButton from "../../../../components/Calculator/ResetButton";
import Button from "../../../../components/Calculator/Button";

const MonthCalculator = () => {
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

  // console.log(data);

  const [formData, setFormData] = useState({
    tech_start_date: "",
    tech_end_date: "",
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    MonthCalculator,
    { isLoading: calculateMonthLoading, isError, error: calculateLoveError },
  ] = useMonthCalculationMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_start_date || !formData.tech_end_date) {
      setFormError("Please fill in both Date.");
      return;
    }

    setFormError("");
    try {
      const response = await MonthCalculator({
        tech_start_date: formData.tech_start_date,
        tech_end_date: formData.tech_end_date,
      }).unwrap();
      setResult(response); // Assuming the response has ''
      toast.success("Calculate Successfully");
    } catch (err) {
      setFormError("Error calculating.");
      toast.error("Error calculating.");
    }
  };

  // Handle reset form
  const handleReset = () => {
    setFormData({
      tech_start_date: "",
      tech_end_date: "",
    });
    setResult(null);
    setFormError(null);
  };

  useEffect(() => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 1); // subtract 1 year
    const oneYearAgo = today.toISOString().split("T")[0]; // format: YYYY-MM-DD

    setFormData((prev) => ({ ...prev, tech_start_date: oneYearAgo }));
  }, []);

  // Set current date on mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    setFormData((prev) => ({ ...prev, tech_end_date: today }));
  }, []);

  const handleNowClick = () => {
    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
    setFormData((prev) => ({
      ...prev,
      tech_start_date: today,
    }));
  };

  const handleNowClick1 = () => {
    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
    setFormData((prev) => ({
      ...prev,
      tech_end_date: today,
    }));
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
        <div className="w-full mx-auto p-4 lg:p-8 md:p-8 input_form rounded-lg space-y-6 mb-3">
          {formError && (
            <p className="text-red-500 text-lg font-semibold w-full">
              {formError}
            </p>
          )}

          <div className="lg:w-[60%] md:w-[60%] w-full mx-auto ">
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="tech_start_date" className="label">
                    {data?.payload?.tech_lang_keys["1"]}:
                  </label>
                  <span
                    className="text-[14px] text-end text-blue underline cursor-pointer"
                    onClick={handleNowClick}
                  >
                    {data?.payload?.tech_lang_keys?.now ?? "Now"}
                  </span>
                </div>
                <input
                  type="date"
                  name="tech_start_date"
                  id="tech_start_date"
                  className="input my-2"
                  aria-label="input"
                  value={formData.tech_start_date}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label htmlFor="tech_end_date" className="label">
                    {data?.payload?.tech_lang_keys["2"]}:
                  </label>
                  <span
                    className="text-[14px] text-end text-blue underline cursor-pointer"
                    onClick={handleNowClick1}
                  >
                    {data?.payload?.tech_lang_keys?.now ?? "Now"}
                  </span>
                </div>
                <input
                  type="date"
                  name="tech_end_date"
                  id="tech_end_date"
                  className="input my-2"
                  aria-label="input"
                  value={formData.tech_end_date}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-6 mt-10">
            <Button type="submit" isLoading={calculateMonthLoading}>
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
        {calculateMonthLoading ? (
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
              <div className="w-full result mx-auto p-4 lg:p-8 md:p-8 result_calculator rounded-lg space-y-6 result">
                <div>
                  <ResultActions lang={data?.payload?.tech_lang_keys} />
                  <div className="rounded-lg  flex items-center justify-center">
                    <div className="w-full bg-light-blue p-1 rounded-lg mt-6">
                      <div className="flex justify-center my-4">
                        <div className="text-center shadow-lg bg-[#2845F5] text-white rounded-lg ">
                          <p className="text-2xl  px-5 py-1 inline-block my-5">
                            <strong className="text-blue">
                              {result?.tech_months}
                            </strong>{" "}
                            <span className="text-xl">
                              {data?.payload?.tech_lang_keys["4"]}
                            </span>{" "}
                            <strong className="text-blue">
                              {result?.tech_days}
                            </strong>{" "}
                            <span className="text-xl">
                              {data?.payload?.tech_lang_keys["5"]}
                            </span>{" "}
                          </p>
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

export default MonthCalculator;
