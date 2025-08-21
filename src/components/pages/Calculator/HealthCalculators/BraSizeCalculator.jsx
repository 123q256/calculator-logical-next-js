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
  useLoveCalculatorCalculationMutation,
  useBraSizeCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useBraSizeCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import ResetButton from "../../../components/Calculator/ResetButton";
import Button from "../../../components/Calculator/Button";

const BraSizeCalculator = () => {
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
    tech_bust: "44",
    tech_unit: "in",
    tech_band: "32",
    tech_unit1: "in",
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useBraSizeCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.tech_bust ||
      !formData.tech_unit ||
      !formData.tech_band ||
      !formData.tech_unit1
    ) {
      setFormError("Please fill in field.");
      return;
    }
    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_bust: formData.tech_bust,
        tech_unit: formData.tech_unit,
        tech_band: formData.tech_band,
        tech_unit1: formData.tech_unit1,
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
      tech_bust: "44",
      tech_unit: "in",
      tech_band: "32",
      tech_unit1: "in",
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

  //dropdown states
  const [dropdownVisible1, setDropdownVisible1] = useState(false);

  const setUnitHandler1 = (unit) => {
    setFormData((prev) => ({ ...prev, tech_unit1: unit }));
    setDropdownVisible1(false);
  };

  const toggleDropdown1 = () => {
    setDropdownVisible1(!dropdownVisible1);
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
          <div className="w-full lg:w-7/12 mx-auto">
            <div className="flex flex-col">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
                <div className="space-y-2 relative">
                  <label htmlFor="tech_bust" className="label">
                    {data?.payload?.tech_lang_keys["1"]}
                  </label>
                  <div className="relative w-full ">
                    <input
                      type="number"
                      name="tech_bust"
                      step="any"
                      className="mt-1 input"
                      value={formData.tech_bust}
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
                          { label: "inches (in)", value: "in" },
                          { label: "centimeters (cm)", value: "cm" },
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

                <div className="space-y-2 relative">
                  <label htmlFor="tech_band" className="label">
                    {data?.payload?.tech_lang_keys["2"]}
                  </label>
                  <div className="relative w-full ">
                    <input
                      type="number"
                      name="tech_band"
                      step="any"
                      className="mt-1 input"
                      value={formData.tech_band}
                      placeholder="00"
                      onChange={handleChange}
                    />
                    <label
                      className="absolute cursor-pointer text-sm underline right-6 top-4"
                      onClick={toggleDropdown1}
                    >
                      {formData.tech_unit1} ▾
                    </label>
                    {dropdownVisible1 && (
                      <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                        {[
                          { label: "inches (in)", value: "in" },
                          { label: "centimeters (cm)", value: "cm" },
                        ].map((unit, index) => (
                          <p
                            key={index}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => setUnitHandler1(unit.value)}
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
              <div className="w-full mx-auto p-4 lg:p-8 md:p-8 result_calculator rounded-lg  space-y-6 result">
                <div>
                  <ResultActions lang={data?.payload?.tech_lang_keys} />

                  <div className="rounded-lg  flex items-center">
                    <div className="w-full md:w-[100%] lg:w-[80%] p-3 rounded-lg mt-3 result">
                      <div className="w-full mt-2 overflow-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="text-left border-b py-3">
                                {data?.payload?.tech_lang_keys["3"]}
                              </th>
                              <th className="text-left border-b py-3">
                                {data?.payload?.tech_lang_keys["4"]}
                              </th>
                              <th className="text-left border-b py-3">
                                {data?.payload?.tech_lang_keys["5"]}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border-b py-3">
                                <strong>US/CA</strong>
                              </td>
                              <td className="border-b py-3">
                                <strong>{result?.tech_band}</strong>
                              </td>
                              <td className="border-b py-3">
                                <strong>{result?.tech_ans[0]}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="border-b py-3">
                                <strong>UK</strong>
                              </td>
                              <td className="border-b py-3">
                                <strong>{result?.tech_band}</strong>
                              </td>
                              <td className="border-b py-3">
                                <strong>{result?.tech_ans[2]}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="border-b py-3">
                                <strong>
                                  US/CA ({data?.payload?.tech_lang_keys["6"]} +
                                  4)
                                </strong>
                              </td>
                              <td className="border-b py-3">
                                <strong>
                                  {isNaN(parseInt(result.tech_band))
                                    ? 4
                                    : parseInt(result.tech_band) + 4}
                                </strong>
                              </td>
                              <td className="border-b py-3">
                                <strong>{result?.tech_ans[0]}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="border-b py-3">
                                <strong>
                                  UK ({data?.payload?.tech_lang_keys["6"]} + 4)
                                </strong>
                              </td>
                              <td className="border-b py-3">
                                <strong>
                                  {isNaN(parseInt(result?.tech_band))
                                    ? 4
                                    : parseInt(result?.tech_band) + 4}
                                </strong>
                              </td>
                              <td className="border-b py-3">
                                <strong>{result?.tech_ans[2]}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="border-b py-3">
                                <strong>EU</strong>
                              </td>
                              <td className="border-b py-3">
                                <strong>
                                  {isFinite(result?.tech_eu)
                                    ? `${result?.tech_eu} cm`
                                    : result?.tech_eu}
                                </strong>
                              </td>
                              <td className="border-b py-3">
                                <strong>{result?.tech_ans[3]}</strong>
                              </td>
                            </tr>
                            <tr>
                              <td className="border-b py-3">
                                <strong>FR/ES/BE</strong>
                              </td>
                              <td className="border-b py-3">
                                <strong>
                                  {isFinite(result?.tech_fr)
                                    ? `${result?.tech_fr} cm`
                                    : result?.tech_fr}
                                </strong>
                              </td>
                              <td className="border-b py-3">
                                <strong>{result?.tech_ans[4]}</strong>
                              </td>
                            </tr>

                            <tr>
                              <td className="py-3">
                                <strong>Australia/New Zealand</strong>
                              </td>
                              <td className="py-3">
                                <strong>
                                  {Number(result?.tech_aus)
                                    ? "dress code ".result?.tech_aus
                                    : result?.tech_aus}
                                </strong>
                              </td>
                              <td className="py-3">
                                <strong>{result?.tech_ans[1]}</strong>
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

export default BraSizeCalculator;
