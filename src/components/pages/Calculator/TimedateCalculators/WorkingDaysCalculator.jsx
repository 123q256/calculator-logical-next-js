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
// import {
//   useGetSingleCalculatorDetailsMutation,
//   useWorkingdaysCalculationMutation,
// } from "../../../redux/services/calculator/calculatorApi";

import { useGetSingleCalculatorDetailsMutation } from "../../../redux/services/calculator/calculatorApi";

import { useWorkingdaysCalculationMutation } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import ResetButton from "../../../components/Calculator/ResetButton";
import Button from "../../../components/Calculator/Button";

const WorkingDaysCalculator = () => {
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

  // console.log(data);

  const [formData, setFormData] = useState({
    tech_start_date: "",
    tech_end_date: "",
    tech_period: "Include all days of week",
    tech_include_end_date: "Yes",
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateLovePercentage,
    { isLoading: calculateDeadlineLoading, isError, error: calculateLoveError },
  ] = useWorkingdaysCalculationMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.tech_start_date ||
      !formData.tech_end_date ||
      !formData.tech_period ||
      !formData.tech_include_end_date
    ) {
      setFormError("Please fill in fields.");
      return;
    }
    setFormError("");
    try {
      const response = await calculateLovePercentage({
        tech_start_date: formData.tech_start_date,
        tech_end_date: formData.tech_end_date,
        tech_period: formData.tech_period,
        tech_include_end_date: formData.tech_include_end_date,
      }).unwrap();
      setResult(response); // Assuming the response has 'lovePercentage'
      toast.success("Calculate Successfully");
    } catch (err) {
      setFormError("Error calculating");
      toast.error("Error calculating");
    }
  };

  // Handle reset form
  const handleReset = () => {
    setFormData({
      tech_start_date: "",
      tech_end_date: "",
      tech_period: "Include all days of week",
      tech_include_end_date: "Yes",
    });
    setResult(null);
    setFormError(null);
  };

  // Set current date on mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    setFormData((prev) => ({ ...prev, tech_start_date: today }));
    setFormData((prev) => ({ ...prev, tech_end_date: today }));
  }, []);

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

          <div className="lg:w-[60%] md:w-[60%] w-full mx-auto ">
            <div className="grid grid-cols-1  lg:grid-cols-2 md:grid-cols-2  gap-4">
              <div className="space-y-2 relative">
                <label htmlFor="tech_start_date" className="label">
                  {data?.payload?.tech_lang_keys["1"]}:
                </label>
                <input
                  type="date"
                  step="any"
                  name="tech_start_date"
                  id="tech_start_date"
                  className="input my-2"
                  aria-label="input"
                  value={formData.tech_start_date}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2 relative">
                <label htmlFor="tech_end_date" className="label">
                  {data?.payload?.tech_lang_keys["2"]}:
                </label>
                <input
                  type="date"
                  step="any"
                  name="tech_end_date"
                  id="tech_end_date"
                  className="input my-2"
                  aria-label="input"
                  value={formData.tech_end_date}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2 relative">
                <label htmlFor="tech_period" className="label">
                  {data?.payload?.tech_lang_keys["2"]}:
                </label>
                <div className="">
                  <select
                    className="input"
                    aria-label="select"
                    name="tech_period"
                    id="tech_period"
                    value={formData.tech_period}
                    onChange={handleChange}
                  >
                    <option value="Include all days of week">
                      Include all days of week
                    </option>
                    <option value="Exclude weekends">Exclude weekends</option>
                    <option value="Exclude only sunday">
                      Exclude only sunday
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 relative">
                <label htmlFor="tech_include_end_date" className="label">
                  {data?.payload?.tech_lang_keys["2"]}:
                </label>
                <div className="">
                  <select
                    className="input"
                    aria-label="select"
                    name="tech_include_end_date"
                    id="tech_include_end_date"
                    value={formData.tech_include_end_date}
                    onChange={handleChange}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-6 mt-10">
            <Button type="submit" isLoading={calculateDeadlineLoading}>
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
        {calculateDeadlineLoading ? (
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

                  <div className="rounded-lg  flex items-center justify-center">
                    <div className="w-full bg-light-blue rounded-lg p-4 mt-6">
                      <div className="text-center">
                        <p className="text-lg font-bold">
                          {data?.payload?.tech_lang_keys["5"]}
                        </p>
                        <p className="text-4xl bg-[#2845F5] text-white px-4 py-2 rounded-lg inline-block my-4">
                          <strong>{result?.tech_answer}</strong>
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

export default WorkingDaysCalculator;
