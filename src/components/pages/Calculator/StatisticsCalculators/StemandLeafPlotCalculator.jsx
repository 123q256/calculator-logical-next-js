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
  useStemLeafPlotCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useStemLeafPlotCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const StemandLeafPlotCalculator = () => {
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
    tech_x: "10, 12, 11, 15, 11, 14, 13, 17, 12, 22, 14, 11",
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useStemLeafPlotCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_x) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_x: formData.tech_x,
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
      tech_x: "10, 12, 11, 15, 11, 14, 13, 17, 12, 22, 14, 11",
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

  // resuult

  // Extract keys for looping
  const firstKey = result?.tech_new ? Object.keys(result.tech_new)[0] : null;
  const lastKey = result?.tech_new
    ? Object.keys(result.tech_new)[Object.keys(result.tech_new).length - 1]
    : null;

  // Create array of keys from firstKey to lastKey
  // Assuming keys are numeric strings or numbers and contiguous
  // Otherwise, better to just map over Object.keys(result.tech_new)
  const keysArray = [];
  if (firstKey !== null && lastKey !== null) {
    for (let i = Number(firstKey); i <= Number(lastKey); i++) {
      keysArray.push(i.toString());
    }
  }

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

          <div class="lg:w-[60%] md:w-[80%] w-full mx-auto ">
            <div class="grid grid-cols-1   mt-3  gap-4">
              <div class="space-y-2 ">
                <label htmlFor="tech_x" className="label">
                  {data?.payload?.tech_lang_keys["1"]} (
                  {data?.payload?.tech_lang_keys["2"]}):
                </label>
                <div class="w-full py-2">
                  <textarea
                    name="tech_x"
                    id="tech_x"
                    className="input textareaInput"
                    aria-label="textarea input"
                    placeholder="e.g. 10, 12, 11, 15, 11, 14, 13, 17, 12, 22, 14, 11"
                    value={formData.tech_x || ""}
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
                        <div className="col-12 text-[18px] mt-3">
                          <strong className="text-blue">
                            {data?.payload?.tech_lang_keys["3"]}
                          </strong>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/2 mt-1">
                          <table className="w-full text-[18px]">
                            <tbody>
                              {keysArray.map((key) => (
                                <tr key={key}>
                                  <td className="py-2 border-b">{key}:</td>
                                  <td className="py-2 border-b">
                                    {result?.tech_new?.[key]?.map(
                                      (value, idx) => (
                                        <span key={idx}>{value} </span>
                                      )
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="col-12 text-[18px] mt-3">
                          <strong className="text-blue">
                            {data?.payload?.tech_lang_keys["4"]}
                          </strong>
                        </div>

                        <div className="w-full md:w-[80%] lg:w-[60%] mt-1">
                          <table className="w-full text-[18px]">
                            <tbody>
                              <tr>
                                <td className="py-2 border-b">
                                  {data?.payload?.tech_lang_keys[5]}
                                </td>
                                <td className="py-2 border-b">
                                  {result?.tech_min}
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 border-b">
                                  {data?.payload?.tech_lang_keys[6]}
                                </td>
                                <td className="py-2 border-b">
                                  {result?.tech_max}
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 border-b">
                                  {data?.payload?.tech_lang_keys[7]}
                                </td>
                                <td className="py-2 border-b">
                                  {result?.tech_range}
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 border-b">
                                  {data?.payload?.tech_lang_keys[8]}
                                </td>
                                <td className="py-2 border-b">
                                  {result?.tech_count}
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 border-b">
                                  {data?.payload?.tech_lang_keys[9]}
                                </td>
                                <td className="py-2 border-b">
                                  {result?.tech_sum}
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 border-b">
                                  {data?.payload?.tech_lang_keys[10]}
                                </td>
                                <td className="py-2 border-b">
                                  {result?.tech_median}
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 border-b">
                                  {data?.payload?.tech_lang_keys[11]}
                                </td>
                                <td className="py-2 border-b">
                                  {result?.tech_mode?.map((value, idx) => (
                                    <span key={idx}>{value} </span>
                                  ))}
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 border-b">
                                  {data?.payload?.tech_lang_keys[12]}
                                </td>
                                <td className="py-2 border-b">
                                  {result?.tech_SD
                                    ? result.tech_SD.toFixed(2)
                                    : null}
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 border-b">
                                  {data?.payload?.tech_lang_keys[13]}
                                </td>
                                <td className="py-2 border-b">
                                  {result?.tech_var
                                    ? result.tech_var.toFixed(2)
                                    : null}
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

export default StemandLeafPlotCalculator;
