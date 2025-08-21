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
  useSquareRootCurveCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";
import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const SquareRootCurveCalculator = () => {
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

  console.log(data);

  const [formData, setFormData] = useState({
    tech_percentage: "4.567",
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateSquareRootCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useSquareRootCurveCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_percentage) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateSquareRootCalculator({
        tech_percentage: Number(formData.tech_percentage),
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
      tech_percentage: "4.567",
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
        <div className="w-full mx-auto p-4 lg:p-8 md:p-8 input_form rounded-lg shadow-md space-y-6 mb-3">
          {formError && (
            <p className="text-red-500 text-lg font-semibold w-full">
              {formError}
            </p>
          )}

          <div className="lg:w-[30%] md:w-[30%] mx-auto">
            <div className="grid grid-cols-12 mt-3   gap-2 md:gap-4 lg:gap-4">
              <div className="col-span-12 mx-auto relative">
                <label htmlFor="tech_percentage" className="label">
                  {data?.payload?.tech_lang_keys["1"]}:
                </label>
                <input
                  type="number"
                  name="tech_percentage"
                  id="tech_percentage"
                  className="input my-2"
                  aria-label="input"
                  value={formData.tech_percentage}
                  onChange={handleChange}
                />
                <span className="text-blue input_unit">%</span>
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
              <div className=" w-full h-[30px] bg-gray-200 animate-pulse rounded-[10px] mb-4"></div>
              <div className="w-[75%] h-[20px] bg-gray-200 animate-pulse rounded-[10px] mb-3"></div>
              <div className="w-[50%] h-[20px] bg-gray-200 animate-pulse rounded-[10px] mb-3"></div>
              <div className="w-[25%] h-[20px] bg-gray-200 animate-pulse rounded-[10px]"></div>
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
                        <div className="w-full md:w-[60%] lg:w-[60%] mt-2">
                          <table className="w-full lg:text-[18px] md:text-[18px] text-[14px]">
                            <tbody>
                              <tr>
                                <td className="py-2 border-b" width="60%">
                                  <strong>
                                    {data?.payload?.tech_lang_keys[2]}:
                                  </strong>
                                </td>
                                <td className="py-2 border-b">
                                  {Math.round(result.tech_answer * 1000) / 1000}{" "}
                                  %
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="w-full text-[16px] mt-2">
                          <p>
                            <strong>{data?.payload?.tech_lang_keys[3]}</strong>
                          </p>
                          <p className="mt-2">
                            {data?.payload?.tech_lang_keys[4]}
                          </p>
                          <p className="mt-2">
                            {data?.payload?.tech_lang_keys[2]} ={" "}
                            {data?.payload?.tech_lang_keys[5]} (
                            {data?.payload?.tech_lang_keys[1]}) × 10
                          </p>
                          <p className="mt-2">
                            {data?.payload?.tech_lang_keys[2]} = √(
                            {result.tech_percentage}) × 10
                          </p>
                          <p className="mt-2">
                            {data?.payload?.tech_lang_keys[2]} ={" "}
                            {Math.round(result.tech_answer * 1000) / 1000}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="rounded-lg  flex items-center justify-center">
                        <div className="w-full mt-3">
                            <div className="w-full">
                                <div className="w-full md:w-[60%] lg:w-[60%]  mt-2">
                                    <table className="w-full text-[18px]">
                                        <tr>
                                            <td className="py-2 border-b" width="60%"><strong>{{data?.payload?.tech_lang_keys[2]}}</strong></td>
                                            <td className="py-2 border-b">{{round($detail['answer'], 3)}} %</td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="w-full text-[16px] mt-2">          
                                    <p><strong>{data?.payload?.tech_lang_keys[3]}</strong></p>
                                    <p className="mt-2">{data?.payload?.tech_lang_keys[4]}</p>
                                    <p className="mt-2">{data?.payload?.tech_lang_keys[2]} = {{data?.payload?.tech_lang_keys[5]}} ({data?.payload?.tech_lang_keys[1]}) × 10</p>
                                    <p className="mt-2">{data?.payload?.tech_lang_keys[2]} = √({$_POST['percentage']}) × 10</p>
                                    <p className="mt-2">{data?.payload?.tech_lang_keys[2]} = {round(result['answer'], 3)}</p>
                                </div>
                            </div>
                        </div>
                    </div> */}
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

export default SquareRootCurveCalculator;
