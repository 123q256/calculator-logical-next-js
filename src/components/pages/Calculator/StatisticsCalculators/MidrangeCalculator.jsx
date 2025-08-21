import React, { useEffect, useState } from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";
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
  useMidrangeCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useMidrangeCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const MidrangeCalculator = () => {
  const location = useLocation();
  const url = location.pathname.split("/")[1];
  const [getSingleCalculatorDetails, { data, error, isLoading }] =
    useGetSingleCalculatorDetailsMutation();
  const handleFetchDetails = async () => {
    try {
      // Call the mutation with the `tech_calculator_link`
      await getSingleCalculatorDetails({ tech_calculator_link: url });
    } catch (err) {
      console.error("Error fetching calculator results:tech_", err);
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
  ] = useMidrangeCalculatorMutation();

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

          <div class="lg:w-[60%] md:w-[80%] w-full mx-auto ">
            <div class="grid grid-cols-12 mt-3  gap-4">
              <div class="col-span-12">
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
                    <div className="w-full  result p-3 radius-10 mt-3">
                      <div className="w-full text-center">
                        <p className="text-[20px] font-bold">
                          {data?.payload?.tech_lang_keys["3"]}
                        </p>
                        <div class="flex justify-center">
                          <p className="text-[25px] bg-[#2845F5] text-white rounded-lg px-3 py-2  my-3">
                            <strong className="text-blue">
                              {Number(result?.tech_ans).toFixed(2)}
                            </strong>
                          </p>
                        </div>
                      </div>

                      <p className="w-full mt-3 text-[20px]">
                        {data?.payload?.tech_lang_keys["4"]}:
                      </p>
                      <p className="w-full mt-2">
                        {data?.payload?.tech_lang_keys["5"]}:
                      </p>

                      <div className="w-full mt-2">
                        <InlineMath
                          math={`${data?.payload?.tech_lang_keys["3"]} = \\frac{\\text{Max} + \\text{Min}}{2}`}
                        />
                      </div>
                      <div className="w-full mt-2">
                        <InlineMath
                          math={`\\text{Max} = ${result?.tech_max}`}
                        />
                      </div>
                      <div className="w-full mt-2">
                        <InlineMath
                          math={`\\text{Min} = ${result?.tech_min}`}
                        />
                      </div>
                      <div className="w-full mt-2">
                        <InlineMath
                          math={`${data?.payload?.tech_lang_keys["3"]} = \\frac{${result?.tech_max} + ${result?.tech_min}}{2}`}
                        />
                      </div>
                      <div className="w-full mt-2">
                        <InlineMath
                          math={`${data?.payload?.tech_lang_keys["3"]} = ${result?.tech_ans}`}
                        />
                      </div>

                      <p className="w-full mt-3 text-[20px] text-blue">
                        {data?.payload?.tech_lang_keys["6"]}:
                      </p>

                      <div className="w-full md:w-[80%] lg:w-[60%] mt-2">
                        <table className="w-full text-[16px]">
                          <tbody>
                            <tr>
                              <td className="py-2 border-b">
                                {data?.payload?.tech_lang_keys["7"]}
                              </td>
                              <td className="py-2 border-b">
                                {result?.tech_min}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b">
                                {data?.payload?.tech_lang_keys["8"]}
                              </td>
                              <td className="py-2 border-b">
                                {result?.tech_max}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b">
                                {data?.payload?.tech_lang_keys["9"]}
                              </td>
                              <td className="py-2 border-b">
                                {result?.tech_range}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b">
                                {data?.payload?.tech_lang_keys["10"]}
                              </td>
                              <td className="py-2 border-b">
                                {result?.tech_count}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b">
                                {data?.payload?.tech_lang_keys["11"]}
                              </td>
                              <td className="py-2 border-b">
                                {result?.tech_sum}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b">
                                {data?.payload?.tech_lang_keys["12"]}
                              </td>
                              <td className="py-2 border-b">
                                {result?.tech_median}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b">Mode</td>
                              <td className="py-2 border-b">
                                {result?.tech_mode?.join(", ")}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b">
                                {data?.payload?.tech_lang_keys["13"]}
                              </td>
                              <td className="py-2 border-b">
                                {Number(result?.tech_SD).toFixed(2)}
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 border-b">
                                {data?.payload?.tech_lang_keys["14"]}
                              </td>
                              <td className="py-2 border-b">
                                {Number(result?.tech_var).toFixed(2)}
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

export default MidrangeCalculator;
