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
  usePointEstimateCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   usePointEstimateCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const PointEstimateCalculator = () => {
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
    tech_success: 4,
    tech_trials: 10,
    tech_ci: 95,
    tech_z: 1.959964,
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = usePointEstimateCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_success || !formData.tech_trials || !formData.tech_ci) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_success: formData.tech_success,
        tech_trials: formData.tech_trials,
        tech_ci: formData.tech_ci,
        tech_z: formData.tech_z,
      }).unwrap();
      setResult(response?.payload); // Assuming the response has 'lovePercentage'
      toast.success("Successfully Calculated");
    } catch (err) {
      setFormError(err.data.payload.error);
      toast.error(err.data.payload.error);
    }
  };

  // Handle reset form
  const handleReset = () => {
    setFormData({
      tech_success: 4,
      tech_trials: 10,
      tech_ci: 95,
      tech_z: 1.959964,
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
          <div className="lg:w-[60%] md:w-[80%] w-full mx-auto ">
            <div className="grid grid-cols-12 gap-1  md:gap-3">
              <div className="col-span-12 md:col-span-6 relative">
                <label htmlFor="tech_success" className="label">
                  {data?.payload?.tech_lang_keys["1"]}:
                </label>
                <div className=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_success"
                    id="tech_success"
                    className="input my-2"
                    aria-label="input"
                    placeholder="00"
                    value={formData.tech_success}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-span-12 md:col-span-6">
                <label htmlFor="tech_trials" className="label">
                  {data?.payload?.tech_lang_keys["2"]}:
                </label>
                <div className=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_trials"
                    id="tech_trials"
                    className="input my-2"
                    aria-label="input"
                    placeholder="00"
                    value={formData.tech_trials}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 ">
                <label htmlFor="tech_ci" className="label">
                  {data?.payload?.tech_lang_keys["3"]}:
                </label>
                <div className=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_ci"
                    id="tech_ci"
                    className="input my-2"
                    aria-label="input"
                    placeholder="00"
                    value={formData.tech_ci}
                    onChange={handleChange}
                  />
                  <span className=" input_unit">%</span>
                </div>
              </div>
              <input
                type="hidden"
                name="tech_z"
                className="input my-2"
                value={formData.tech_z}
                onChange={handleChange}
              />
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

                  <div className="rounded-lg  flex items-center justify-center">
                    <div className="w-full  mt-3">
                      <div className="grid grid-cols-12 gap-2">
                        <div className="text-center col-span-12">
                          <p className="text-[28px]">
                            <strong>
                              {data?.payload?.tech_lang_keys["4"]}
                            </strong>
                          </p>
                          <p className="text-[32px]  radius-10 d-inline-block my-3">
                            <strong className="bg-[#2845F5] text-white rounded-lg px-3 py-2">
                              {result?.tech_pe}
                            </strong>
                          </p>
                        </div>
                        <div className="col-span-12 md:col-span-7 mt-2 overflow-auto">
                          <table className="w-full">
                            <tbody>
                            <tr>
                              <td className="py-2 border-b">
                                <strong className="text-blue">
                                  {data?.payload?.tech_lang_keys["5"]}
                                </strong>
                              </td>
                              <td className="py-2 border-b">{result?.tech_z}</td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b">
                                <strong className="text-blue">
                                  {data?.payload?.tech_lang_keys["6"]} (MLE)
                                </strong>
                              </td>
                              <td className="py-2 border-b">{result?.tech_mle}</td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b">
                                <strong className="text-blue">
                                  {data?.payload?.tech_lang_keys["7"]}
                                </strong>
                              </td>
                              <td className="py-2 border-b">
                                {result?.tech_laplace}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b">
                                <strong className="text-blue">
                                  {data?.payload?.tech_lang_keys["8"]}
                                </strong>
                              </td>
                              <td className="py-2 border-b">
                                {result?.tech_jeffrey}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b">
                                <strong className="text-blue">
                                  {data?.payload?.tech_lang_keys["9"]}
                                </strong>
                              </td>
                              <td className="py-2 border-b">
                                {result?.tech_wilson}
                              </td>
                            </tr>
                            </tbody>
                          </table>
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

export default PointEstimateCalculator;
