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
  useSpeedOfSoundCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useSpeedOfSoundCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const SpeedOfSoundCalculator = () => {
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
    tech_temperature_air: "8",
    tech_temperature_air_unit: "k",
    tech_select_unit: "°F",
    tech_f_values: "1553",
    tech_c_values: "1403",
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useSpeedOfSoundCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_temperature_air: formData.tech_temperature_air,
        tech_temperature_air_unit: formData.tech_temperature_air_unit,
        tech_select_unit: formData.tech_select_unit,
        tech_f_values: formData.tech_f_values,
        tech_c_values: formData.tech_c_values,
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
      tech_temperature_air: "8",
      tech_temperature_air_unit: "k",
      tech_select_unit: "°F",
      tech_f_values: "1553",
      tech_c_values: "1403",
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
    setFormData((prev) => ({ ...prev, tech_temperature_air_unit: unit }));
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

          <div className="lg:w-[50%] md:w-[60%] w-full mx-auto ">
            <div className="grid grid-cols-12 mt-3  gap-4">
              <p className="col-span-12">
                <strong>{data?.payload?.tech_lang_keys[1]}</strong>
              </p>
              <div className="col-span-12">
                <label htmlFor="tech_temperature_air" className="label">
                  {data?.payload?.tech_lang_keys["2"]}
                </label>
                <div className="relative w-full ">
                  <input
                    type="number"
                    name="tech_temperature_air"
                    step="any"
                    className="mt-1 input"
                    value={formData.tech_temperature_air}
                    placeholder="00"
                    onChange={handleChange}
                  />
                  <label
                    className="absolute cursor-pointer text-sm underline right-6 top-4"
                    onClick={toggleDropdown}
                  >
                    {formData.tech_temperature_air_unit} ▾
                  </label>
                  {dropdownVisible && (
                    <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                      {[
                        { label: "°C", value: "°C" },
                        { label: "°F", value: "°F" },
                        { label: "k", value: "k" },
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
              <p className="col-span-12">
                <strong>{data?.payload?.tech_lang_keys[3]}</strong>
              </p>
              <div className="col-span-6">
                <label htmlFor="tech_select_unit" className="label">
                  {data?.payload?.tech_lang_keys["4"]}:
                </label>
                <div className="mt-2">
                  <select
                    className="input"
                    aria-label="select"
                    name="tech_select_unit"
                    id="tech_select_unit"
                    value={formData.tech_select_unit}
                    onChange={handleChange}
                  >
                    <option value="°C">°C</option>
                    <option value="°F">°F</option>
                  </select>
                </div>
              </div>
              <div className="col-span-6">
                <label htmlFor="tech_f_values" className="label">
                  {data?.payload?.tech_lang_keys["2"]}:
                </label>
                <div className="mt-2">
                  {formData.tech_select_unit == "°F" && (
                    <>
                      <select
                        className="input"
                        aria-label="select"
                        name="tech_f_values"
                        id="tech_f_values"
                        value={formData.tech_f_values}
                        onChange={handleChange}
                      >
                        <option value="1403">32 °F</option>
                        <option value="1424">40 °F</option>
                        <option value="1447.2">50 °F</option>
                        <option value="1467.3">60 °F</option>
                        <option value="1484.7">70 °F</option>
                        <option value="1499.3">80 °F</option>
                        <option value="1511.8">90 °F</option>
                        <option value="1522.5">100 °F</option>
                        <option value="1539">120 °F</option>
                        <option value="1551.7">140 °F</option>
                        <option value="1554.8">160 °F</option>
                        <option value="1553">180 °F</option>
                        <option value="1551">200 °F</option>
                        <option value="1543">212 °F</option>
                      </select>
                    </>
                  )}
                  {formData.tech_select_unit == "°C" && (
                    <>
                      <select
                        className="input"
                        aria-label="select"
                        name="tech_c_values"
                        id="tech_c_values"
                        value={formData.tech_c_values}
                        onChange={handleChange}
                      >
                        <option value="1403">0 °C</option>
                        <option value="1427">5 °C</option>
                        <option value="1447">10 °C</option>
                        <option value="1481">20 °C</option>
                        <option value="1507">30 °C</option>
                        <option value="1526">40 °C</option>
                        <option value="1541">50 °C</option>
                        <option value="1552">60 °C</option>
                        <option value="1555">70 °C</option>
                        <option value="1555">80 °C</option>
                        <option value="1550">90 °C</option>
                        <option value="1543">100 °C</option>
                      </select>
                    </>
                  )}
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
              <div className="w-full result mx-auto p-4 lg:p-8 md:p-8 result_calculator rounded-lg space-y-6 result">
                <div>
                  <ResultActions lang={data?.payload?.tech_lang_keys} />

                  <div className="rounded-lg  flex items-center justify-center">
                    <div className="w-full mt-3">
                      <div className="w-full">
                        <div className="w-full md:w-[60%] lg:w-[60%] overflow-auto mt-2">
                          <table className="w-full text-[16px]">
                            <tbody>                            <tr>
                              <td className="py-2 border-b">
                                {data?.payload?.tech_lang_keys["1"]}
                              </td>
                              <td className="py-2 border-b">
                                <strong className="text-blue">
                                  {result?.tech_speedOfSound} m/s
                                </strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b">
                                {data?.payload?.tech_lang_keys["3"]}
                              </td>
                              <td className="py-2 border-b">
                                <strong className="text-blue">
                                  {formData?.tech_f_values} m/s
                                </strong>
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

export default SpeedOfSoundCalculator;
