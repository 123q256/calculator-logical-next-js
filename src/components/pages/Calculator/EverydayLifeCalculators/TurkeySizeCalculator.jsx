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
  useTurkeySizeCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useTurkeySizeCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import ResetButton from "../../../components/Calculator/ResetButton";
import Button from "../../../components/Calculator/Button";

const TurkeySizeCalculator = () => {
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
    tech_adults: 27,
    tech_children: 72,
    tech_leftovers: "no", // yes  no
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useTurkeySizeCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.tech_adults ||
      !formData.tech_children ||
      !formData.tech_leftovers
    ) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_adults: formData.tech_adults,
        tech_children: formData.tech_children,
        tech_leftovers: formData.tech_leftovers,
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
      tech_adults: 27,
      tech_children: 72,
      tech_leftovers: "no", // yes  no
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

          <div className="lg:w-[40%] md:w-[80%] w-full mx-auto ">
            <div className="grid grid-cols-12  gap-2">
              <div className="col-span-12 ">
                <label htmlFor="tech_adults" className="label">
                  {data?.payload?.tech_lang_keys["1"]}:
                </label>
                <div className=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_adults"
                    id="tech_adults"
                    className="input my-2"
                    aria-label="input"
                    placeholder="00"
                    value={formData.tech_adults}
                    onChange={handleChange}
                  />
                  <span className="input_unit">#</span>
                </div>
              </div>
              <div className="col-span-12 ">
                <label htmlFor="tech_children" className="label">
                  {data?.payload?.tech_lang_keys["2"]}:
                </label>
                <div className=" relative">
                  <input
                    type="number"
                    step="any"
                    name="tech_children"
                    id="tech_children"
                    className="input my-2"
                    aria-label="input"
                    placeholder="00"
                    value={formData.tech_children}
                    onChange={handleChange}
                  />
                  <span className="input_unit">#</span>
                </div>
              </div>
              <div className="col-span-12 ">
                <label htmlFor="tech_leftovers" className="label">
                  {data?.payload?.tech_lang_keys["3"]}:
                </label>
                <div className="mt-1">
                  <select
                    className="input"
                    aria-label="select"
                    name="tech_leftovers"
                    id="tech_leftovers"
                    value={formData.tech_leftovers}
                    onChange={handleChange}
                  >
                    <option value="no">
                      {data?.payload?.tech_lang_keys["4"]}
                    </option>
                    <option value="yes">
                      {data?.payload?.tech_lang_keys["5"]}
                    </option>
                  </select>
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
              <div className="w-full mx-auto p-4 lg:p-8 md:p-8 result_calculator rounded-lg space-y-6 result">
                <div>
                  <ResultActions lang={data?.payload?.tech_lang_keys} />

                  <div className="rounded-lg  flex items-center justify-center">
                    <div className="w-full mt-3">
                      <div className="w-full">
                        <div className="w-full text-center">
                          <p className="text-[20px]">
                            <strong>{data?.payload?.tech_lang_keys[6]}</strong>
                          </p>
                          <div class="flex justify-center">
                            <p className="text-[25px] bg-[#2845F5] text-white rounded-lg px-3 py-2  my-3">
                              <strong className="text-blue text-[32px]">
                                {Number(result?.tech_turkey_weight).toFixed(1)}
                                <span className="text-[14px]"> (lb)</span>
                              </strong>
                            </p>
                          </div>
                        </div>
                        <div className="w-full md:w-[80%] lg:w-[80%] col-12 overflow-auto mt-2">
                          <table className="w-full lg:text-[18px] md:text-[18px] text-[16px]">
                            <tr>
                              <td className="border-b py-2">
                                <strong>
                                  {data?.payload?.tech_lang_keys[7]} :
                                </strong>
                              </td>
                              <td className="border-b py-2">
                                {Number(result?.tech_inside_fridge).toFixed(1)}
                                <span className="text-[14px]"> (hrs)</span>
                              </td>
                            </tr>
                            <tr>
                              <td className="border-b py-2">
                                <strong>
                                  {data?.payload?.tech_lang_keys[8]} :
                                </strong>
                              </td>
                              <td className="border-b py-2">
                                {Number(result?.tech_cold_water).toFixed(1)}
                                <span className="text-[14px]"> (hrs)</span>
                              </td>
                            </tr>
                            <tr>
                              <td className="border-b py-2">
                                <strong>
                                  {data?.payload?.tech_lang_keys[9]} :
                                </strong>
                              </td>
                              <td className="border-b py-2">
                                {result?.tech_unstuffed_turkey}
                              </td>
                            </tr>
                            <tr>
                              <td className="border-b py-2">
                                <strong>
                                  {data?.payload?.tech_lang_keys[10]} :
                                </strong>
                              </td>
                              <td className="border-b py-2">
                                {result?.tech_stuffed_turkey}
                              </td>
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

export default TurkeySizeCalculator;
