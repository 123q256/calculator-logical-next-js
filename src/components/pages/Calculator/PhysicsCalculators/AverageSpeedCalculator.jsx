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
  useAverageSpeedCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useAverageSpeedCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const AverageSpeedCalculator = () => {
  const location = useLocation();
  const url = location.pathname.replace(/^\/+/, "");
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
    tech_t_hours: "8",
    tech_t_min: "30",
    tech_t_sec: "0",
    tech_distance: "10",
    tech_distance_unit: "meters",
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useAverageSpeedCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_t_hours) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_t_hours: formData.tech_t_hours,
        tech_t_min: formData.tech_t_min,
        tech_t_sec: formData.tech_t_sec,
        tech_distance: formData.tech_distance,
        tech_distance_unit: formData.tech_distance_unit,
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
      tech_t_hours: "8",
      tech_t_min: "30",
      tech_t_sec: "0",
      tech_distance: "10",
      tech_distance_unit: "meters",
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
    setFormData((prev) => ({ ...prev, tech_distance_unit: unit }));
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

    // majax
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS_HTML";
    script.async = true;
    script.type = "text/javascript";
    script.onload = () => {
      window.MathJax &&
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [result]);
// majax


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

          <div className="lg:w-[40%] md:w-[60%] w-full mx-auto  ">
            <div className="flex flex-wrap  overflow-auto">
              <label for="dob" className="label font-bold">
                <strong>{data?.payload?.tech_lang_keys[1]}: </strong>
              </label>
              <div className="w-full flex space-x-1 my-2">
                <div className="w-full px-2">
                  <label htmlFor="tech_t_hours" className="label">
                    {data?.payload?.tech_lang_keys["2"]}:
                  </label>
                  <div className=" relative">
                    <input
                      type="number"
                      step="any"
                      name="tech_t_hours"
                      min="0"
                      id="tech_t_hours"
                      className="input my-2"
                      aria-label="input"
                      placeholder="00"
                      value={formData.tech_t_hours}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full px-2">
                  <label htmlFor="tech_t_min" className="label">
                    {data?.payload?.tech_lang_keys["3"]}:
                  </label>
                  <div className=" relative">
                    <input
                      type="number"
                      step="any"
                      name="tech_t_min"
                      min="0"
                      id="tech_t_min"
                      className="input my-2"
                      aria-label="input"
                      placeholder="00"
                      value={formData.tech_t_min}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full px-2">
                  <label htmlFor="tech_t_sec" className="label">
                    {data?.payload?.tech_lang_keys["4"]}:
                  </label>
                  <div className=" relative">
                    <input
                      type="number"
                      step="any"
                      name="tech_t_sec"
                      min="0"
                      id="tech_t_sec"
                      className="input my-2"
                      aria-label="input"
                      placeholder="00"
                      value={formData.tech_t_sec}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <label for="e_date" className="label font-bold">
                <strong>{data?.payload?.tech_lang_keys[5]}: </strong>
              </label>
              <div className="w-full flex space-x-1 my-2">
                <div className="w-full px-2">
                  <div className="space-y-2">
                    <label htmlFor="tech_distance" className="label">
                      {data?.payload?.tech_lang_keys["6"]}
                    </label>
                    <div className="relative w-full ">
                      <input
                        type="number"
                        name="tech_distance"
                        step="any"
                        className="mt-1 input"
                        value={formData.tech_distance}
                        placeholder="00"
                        onChange={handleChange}
                      />
                      <label
                        className="absolute cursor-pointer text-sm underline right-6 top-4"
                        onClick={toggleDropdown}
                      >
                        {formData.tech_distance_unit} ▾
                      </label>
                      {dropdownVisible && (
                        <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                          {[
                            { label: "km", value: "km" },
                            {
                              label: data?.payload?.tech_lang_keys["7"],
                              value: data?.payload?.tech_lang_keys["7"],
                            },
                            {
                              label: data?.payload?.tech_lang_keys["8"],
                              value: data?.payload?.tech_lang_keys["8"],
                            },
                            {
                              label: data?.payload?.tech_lang_keys["9"],
                              value: data?.payload?.tech_lang_keys["9"],
                            },
                            {
                              label: data?.payload?.tech_lang_keys["10"],
                              value: data?.payload?.tech_lang_keys["10"],
                            },
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
                    <div className="w-full bg-light-blue  p-3 rounded-lg mt-3">
                      <div className="w-full md:w-[50%]  overflow-auto mt-2">
                        <p className="mt-4">
                          {data?.payload?.tech_lang_keys[11]}
                        </p>
                        <table className="w-full lg:text-[18px] md:text-[18px] text-[16px]">
                          <tr>
                            <td className="py-2 border-b w-7/12">
                              <strong>
                                {data?.payload?.tech_lang_keys[12]}
                              </strong>
                            </td>
                            <td className="py-2 border-b">
                              {Number(result?.tech_ans_mps).toFixed(2)} m/s
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 border-b w-7/12">
                              <strong>
                                {data?.payload?.tech_lang_keys[13]}
                              </strong>
                            </td>
                            <td className="py-2 border-b">
                              {Number(result?.tech_ans_mph).toFixed(2)} mph
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 border-b w-7/12">
                              <strong>
                                {data?.payload?.tech_lang_keys[14]}
                              </strong>
                            </td>
                            <td className="py-2 border-b">
                              {Number(result?.tech_ans_kmh).toFixed(2)} km/h
                            </td>
                          </tr>
                        </table>
                        <p className="mt-4">
                          {data?.payload?.tech_lang_keys[15]}
                        </p>
                        <table className="w-full lg:text-[18px] md:text-[18px] text-[16px]">
                          <tr>
                            <td className="py-2 border-b w-7/12">
                              <strong>
                                {data?.payload?.tech_lang_keys[15]}
                              </strong>
                            </td>
                            <td className="py-2 border-b">
                              {Number(result?.tech_ans_mphh).toFixed(2)} m/h
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 border-b w-7/12">
                              <strong>
                                {data?.payload?.tech_lang_keys[16]}
                              </strong>
                            </td>
                            <td className="py-2 border-b">
                              {Number(result?.tech_ans_ydph).toFixed(2)} yd/h
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 border-b w-7/12">
                              <strong>
                                {data?.payload?.tech_lang_keys[17]}
                              </strong>
                            </td>
                            <td className="py-2 border-b">
                              {Number(result?.tech_ans_ftph).toFixed(2)} ft/h
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

export default AverageSpeedCalculator;
