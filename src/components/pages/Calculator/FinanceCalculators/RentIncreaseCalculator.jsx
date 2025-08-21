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
  useRentIncreaseCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useRentIncreaseCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import ResetButton from "../../../components/Calculator/ResetButton";
import Button from "../../../components/Calculator/Button";

const RentIncreaseCalculator = () => {
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
    tech_rent: 20400,
    tech_year: 475,
    tech_numbers: 2,
    tech_numbers_unit: "mos",
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useRentIncreaseCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.tech_rent ||
      !formData.tech_year ||
      !formData.tech_numbers ||
      !formData.tech_numbers_unit
    ) {
      setFormError("Please fill in field.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_rent: formData.tech_rent,
        tech_year: formData.tech_year,
        tech_numbers: formData.tech_numbers,
        tech_numbers_unit: formData.tech_numbers_unit,
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
      tech_rent: 20400,
      tech_year: 475,
      tech_numbers: 2,
      tech_numbers_unit: "mos",
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
    setFormData((prev) => ({ ...prev, tech_numbers_unit: unit }));
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
          path: location.pathname, // This will use the current path dynamically
        },
      ]}
    >
      <form className="row" onSubmit={handleSubmit}>
        <div className="w-full mx-auto p-4 lg:p-8 md:p-8 input_form rounded-lg input_form space-y-6 mb-3">
          {formError && (
            <p className="text-red-500 text-lg font-semibold w-full">
              {formError}
            </p>
          )}

          <div className="lg:w-[40%] md:w-[60%] w-full mx-auto ">
            <div className="grid grid-cols-12  gap-4">
              <div className="col-span-12">
                <label htmlFor="tech_rent" className="label">
                  {data?.payload?.tech_lang_keys["1"]}:
                </label>
                <div className=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_rent"
                    id="tech_rent"
                    className="input my-2"
                    aria-label="input"
                    value={formData.tech_rent}
                    onChange={handleChange}
                  />
                  <span className="input_unit">{currency.symbol}</span>
                </div>
              </div>
              <div className="col-span-12">
                <label htmlFor="tech_year" className="label">
                  {data?.payload?.tech_lang_keys["2"]}:
                </label>
                <div className=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_year"
                    id="tech_year"
                    className="input my-2"
                    aria-label="input"
                    value={formData.tech_year}
                    onChange={handleChange}
                  />
                  <span className="input_unit">{currency.symbol}</span>
                </div>
              </div>

              <div className="col-span-12">
                <label htmlFor="tech_numbers" className="label">
                  {data?.payload?.tech_lang_keys["3"]}
                </label>
                <div className="relative w-full ">
                  <input
                    type="number"
                    name="tech_numbers"
                    step="any"
                    className="mt-1 input"
                    value={formData.tech_numbers}
                    placeholder="00"
                    onChange={handleChange}
                  />
                  <label
                    className="absolute cursor-pointer text-sm underline right-6 top-3"
                    onClick={toggleDropdown}
                  >
                    {formData.tech_numbers_unit} ▾
                  </label>
                  {dropdownVisible && (
                    <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                      {[
                        { label: "wks", value: "wks" },
                        { label: "mos", value: "mos" },
                        { label: "yrs", value: "yrs" },
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
              <div className="w-full  mx-auto p-4 lg:p-8 md:p-8 result_calculator rounded-lg  space-y-6 result">
                <div>
                  <ResultActions lang={data?.payload?.tech_lang_keys} />
                  <div className="rounded-lg  flex items-center justify-center">
                    <div className="w-full mt-3">
                      <div className="w-full md:w-[60%] lg:w-[60%] overflow-auto mt-2">
                        <table className="w-full text-[16px]">
                          <tr>
                            <td className="py-2 border-b" width="60%">
                              <strong>
                                {data?.payload?.tech_lang_keys["4"]}{" "}
                              </strong>
                            </td>
                            <td className="py-2 border-b">
                              {currency.symbol}{" "}
                              {Number(result?.tech_answer).toFixed(2)}
                            </td>
                          </tr>
                        </table>
                      </div>
                      <div className="w-full text-[16px]">
                        <p className="mt-2">
                          <strong>{data?.payload?.tech_lang_keys["5"]}</strong>
                        </p>
                        <p className="mt-2">
                          {data?.payload?.tech_lang_keys["6"]}
                        </p>
                        <p className="mt-2">
                          {data?.payload?.tech_lang_keys["4"]} ={" "}
                          {data?.payload?.tech_lang_keys["1"]}(1 +{" "}
                          {data?.payload?.tech_lang_keys["2"]} )
                          <sup>{data?.payload?.tech_lang_keys["3"]}</sup>
                        </p>
                        <p className="mt-2">
                          {data?.payload?.tech_lang_keys["4"]} ={" "}
                          {formData?.tech_rent} (1 + {formData?.tech_year} % )
                          <sup>{formData?.tech_numbers}</sup>
                        </p>
                        <p className="mt-2">
                          {data?.payload?.tech_lang_keys["4"]} ={" "}
                          {currency.symbol}{" "}
                          {Number(result?.tech_answer).toFixed(2)}
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

export default RentIncreaseCalculator;
