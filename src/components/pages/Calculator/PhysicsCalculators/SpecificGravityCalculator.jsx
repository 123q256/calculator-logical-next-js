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
  useSpecificGravityCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useSpecificGravityCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const SpecificGravityCalculator = () => {
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
    tech_t_fluid: "ls", // ls gas
    tech_density: "12",
    tech_density_unit: "g/dm³",
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useSpecificGravityCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_t_fluid) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_t_fluid: formData.tech_t_fluid,
        tech_density: formData.tech_density,
        tech_density_unit: formData.tech_density_unit,
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
      tech_t_fluid: "ls", // ls gas
      tech_density: "12",
      tech_density_unit: "g/dm³",
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
    setFormData((prev) => ({ ...prev, tech_density_unit: unit }));
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

          <div class="lg:w-[40%] md:w-[60%] w-full mx-auto ">
            <div class="grid grid-cols-12 mt-3  gap-4">
              <div class="col-span-12">
                <label htmlFor="tech_t_fluid" className="label">
                  {data?.payload?.tech_lang_keys["1"]}:
                </label>
                <div className="mt-2">
                  <select
                    className="input"
                    aria-label="select"
                    name="tech_t_fluid"
                    id="tech_t_fluid"
                    value={formData.tech_t_fluid}
                    onChange={handleChange}
                  >
                    <option value="ls">
                      {data?.payload?.tech_lang_keys["2"]}
                    </option>
                    <option value="gas">
                      {data?.payload?.tech_lang_keys["3"]}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-span-12">
                <label htmlFor="tech_density" className="label">
                  {data?.payload?.tech_lang_keys["4"]}
                </label>
                <div className="relative w-full ">
                  <input
                    type="number"
                    name="tech_density"
                    step="any"
                    className="mt-1 input"
                    value={formData.tech_density}
                    placeholder="00"
                    onChange={handleChange}
                  />

                  {formData.tech_t_fluid == "ls" && (
                    <>
                      <label
                        className="absolute cursor-pointer text-sm underline right-6 top-4"
                        onClick={toggleDropdown}
                      >
                        {formData.tech_density_unit} ▾
                      </label>
                      {dropdownVisible && (
                        <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                          {[
                            { label: "kg/m³", value: "kg/m³" },
                            { label: "lb/ft³", value: "lb/ft³" },
                            { label: "lb/yd³", value: "lb/yd³" },
                            { label: "g/cm³", value: "g/cm³" },
                            { label: "nmi", value: "nmi" },
                            { label: "kg/cm³", value: "kg/cm³" },
                            { label: "mg/cm³", value: "mg/cm³" },
                            { label: "g/m³", value: "g/m³" },
                            { label: "g/dm³", value: "g/dm³" },
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
              <div className="w-full mx-auto p-4 lg:p-8 md:p-8 result_calculator rounded-lg space-y-6 result">
                <div>
                  <ResultActions lang={data?.payload?.tech_lang_keys} />

                  <div class="rounded-lg  flex items-center justify-center">
                    <div class="w-full mt-3">
                      <div class="w-full">
                        <div class="text-center">
                          <p class="text-[20px]">
                            <strong>
                              {data?.payload?.tech_lang_keys["5"]}
                            </strong>
                          </p>
                          <div class="flex justify-center">
                            <p className="text-[25px] bg-[#2845F5] text-white rounded-lg px-3 py-2  my-3">
                              <strong class="text-blue">
                                {formData?.tech_t_fluid == "ls"
                                  ? result?.tech_gravity
                                  : result?.tech_gs_gravity}
                              </strong>
                            </p>
                          </div>
                        </div>
                        <p class="col-12 mt-2 text-center">
                          {data?.payload?.tech_lang_keys[6]}
                        </p>
                        <p class="col-12 mt-3 text-[20px] text-blue">
                          {data?.payload?.tech_lang_keys[6]}
                        </p>
                        <div class="w-full md:w-[100%] lg:w-[60%] overflow-auto mt-2">
                          <table class="w-full">
                            <tr class="bg-[#2845F5] text-white">
                              <th class="p-2 border text-center text-blue">
                                {data?.payload?.tech_lang_keys["8"]}
                              </th>
                              <th class="p-2 border text-center text-blue">
                                {data?.payload?.tech_lang_keys["9"]}
                              </th>
                            </tr>
                            <tr class="">
                              <td class="p-2 border-b text-center">
                                {data?.payload?.tech_lang_keys["10"]}
                              </td>
                              <td class="p-2 border-b text-center">0.12</td>
                            </tr>
                            <tr class="">
                              <td class="p-2 border-b text-center">
                                {data?.payload?.tech_lang_keys["11"]}
                              </td>
                              <td class="p-2 border-b text-center">
                                0.6 - 0.9
                              </td>
                            </tr>
                            <tr class="">
                              <td class="p-2 border-b text-center">
                                {data?.payload?.tech_lang_keys["12"]}
                              </td>
                              <td class="p-2 border-b text-center">0.789</td>
                            </tr>
                            <tr class="">
                              <td class="p-2 border-b text-center">
                                {data?.payload?.tech_lang_keys["13"]}
                              </td>
                              <td class="p-2 border-b text-center">0.91</td>
                            </tr>
                            <tr class="">
                              <td class="p-2 border-b text-center">
                                {data?.payload?.tech_lang_keys["14"]}
                              </td>
                              <td class="p-2 border-b text-center">0.92</td>
                            </tr>
                            <tr class="">
                              <td class="p-2 border-b text-center">
                                {data?.payload?.tech_lang_keys["15"]}
                              </td>
                              <td class="p-2 border-b text-center">1.0</td>
                            </tr>
                            <tr class="">
                              <td class="p-2 border-b text-center">
                                {data?.payload?.tech_lang_keys["16"]}
                              </td>
                              <td class="p-2 border-b text-center">1.06</td>
                            </tr>
                            <tr class="">
                              <td class="p-2 border-b text-center">
                                {data?.payload?.tech_lang_keys["17"]}
                              </td>
                              <td class="p-2 border-b text-center">2.17</td>
                            </tr>
                            <tr class="">
                              <td class="p-2 border-b text-center">
                                {data?.payload?.tech_lang_keys["18"]}
                              </td>
                              <td class="p-2 border-b text-center">2.7</td>
                            </tr>
                            <tr class="">
                              <td class="p-2 border-b text-center">
                                {data?.payload?.tech_lang_keys["19"]}
                              </td>
                              <td class="p-2 border-b text-center">3.15</td>
                            </tr>
                            <tr class="">
                              <td class="p-2 border-b text-center">
                                {data?.payload?.tech_lang_keys["20"]}
                              </td>
                              <td class="p-2 border-b text-center">11.34</td>
                            </tr>
                            <tr class="">
                              <td class="p-2 border-b text-center">
                                {data?.payload?.tech_lang_keys["21"]}
                              </td>
                              <td class="p-2 border-b text-center">13.6</td>
                            </tr>
                            <tr class="">
                              <td class="p-2 border-b text-center">
                                {data?.payload?.tech_lang_keys["22"]}
                              </td>
                              <td class="p-2 border-b text-center">19.05</td>
                            </tr>
                            <tr class="">
                              <td class="p-2 border-b text-center">
                                {data?.payload?.tech_lang_keys["23"]}
                              </td>
                              <td class="p-2 border-b text-center">19.32</td>
                            </tr>
                            <tr class="">
                              <td class="p-2 border-b text-center">
                                {data?.payload?.tech_lang_keys["24"]}
                              </td>
                              <td class="p-2 border-b text-center">22.59</td>
                            </tr>
                            <tr class="">
                              <td class="p-2 border-b text-center">
                                {data?.payload?.tech_lang_keys["25"]}
                              </td>
                              <td class="p-2 border-b text-center">8.96</td>
                            </tr>
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

export default SpecificGravityCalculator;
