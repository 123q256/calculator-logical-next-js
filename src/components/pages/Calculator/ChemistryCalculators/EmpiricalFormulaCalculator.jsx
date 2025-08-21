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
  useEmpiricalFormulaCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useEmpiricalFormulaCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const EmpiricalFormulaCalculator = () => {
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
    tech_e1: "C",
    tech_e2: "H",
    tech_e3: "O",
    tech_e4: "P",
    tech_e5: "Fr",
    tech_e6: "Ba",
    tech_m1: "40.00",
    tech_m2: "6.67",
    tech_m3: "53.3",
    tech_m4: "40.00",
    tech_m5: "6.67",
    tech_m6: "137.33",
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateActivationCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useEmpiricalFormulaCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!formData.tech_x || !formData.tech_y ) {
    //   setFormError("Please fill in input.");
    //   return;
    // }

    setFormError("");
    try {
      const response = await calculateActivationCalculator({
        tech_e1: formData.tech_e1,
        tech_e2: formData.tech_e2,
        tech_e3: formData.tech_e3,
        tech_e4: formData.tech_e4,
        tech_e5: formData.tech_e5,
        tech_e6: formData.tech_e6,
        tech_m1: formData.tech_m1,
        tech_m2: formData.tech_m2,
        tech_m3: formData.tech_m3,
        tech_m4: formData.tech_m4,
        tech_m5: formData.tech_m5,
        tech_m6: formData.tech_m6,
      }).unwrap();
      setResult(response?.payload); // Assuming the response'
      toast.success("Successfully Calculated");
    } catch (err) {
      setFormError(err.data.payload.error);
      toast.error(err.data.payload.error);
    }
  };

  // Handle reset form
  const handleReset = () => {
    setFormData({
      tech_e1: "C",
      tech_e2: "H",
      tech_e3: "O",
      tech_e4: "P",
      tech_e5: "Fr",
      tech_e6: "Ba",
      tech_m1: "40.00",
      tech_m2: "6.67",
      tech_m3: "53.3",
      tech_m4: "40.00",
      tech_m5: "6.67",
      tech_m6: "137.33",
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
  {
    /* <span className="text-blue input_unit">{currency.symbol}</span> */
  }
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

          <div className="lg:w-[50%] md:w-[80%] w-full mx-auto ">
            <div className="grid grid-cols-2   gap-2">
              <div>
                <p className="my-4 lg:text-[16px] md:text-[16px] text-[14px] font-bold">
                  {data?.payload?.tech_lang_keys["1"]}:
                </p>
                <div className="grid grid-cols-1  gap-2">
                  <div className="">
                    <input
                      type="text"
                      step="any"
                      name="tech_e1"
                      id="tech_e1"
                      className="input my-2"
                      aria-label="input"
                      value={formData.tech_e1}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      step="any"
                      name="tech_e2"
                      id="tech_e2"
                      className="input my-2"
                      aria-label="input"
                      value={formData.tech_e2}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      step="any"
                      name="tech_e3"
                      id="tech_e3"
                      className="input my-2"
                      aria-label="input"
                      value={formData.tech_e3}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      step="any"
                      name="tech_e4"
                      id="tech_e4"
                      className="input my-2"
                      aria-label="input"
                      value={formData.tech_e4}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      step="any"
                      name="tech_e5"
                      id="tech_e5"
                      className="input my-2"
                      aria-label="input"
                      value={formData.tech_e5}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      step="any"
                      name="tech_e6"
                      id="tech_e6"
                      className="input my-2"
                      aria-label="input"
                      value={formData.tech_e6}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="my-4 lg:text-[16px] md:text-[16px] text-[13px] font-bold">
                  {data?.payload?.tech_lang_keys["2"]}:
                </p>
                <div className="grid grid-cols-1   gap-2">
                  <div className="">
                    <input
                      type="number"
                      step="any"
                      name="tech_m1"
                      id="tech_m1"
                      className="input my-2"
                      aria-label="input"
                      placeholder="00"
                      value={formData.tech_m1}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <input
                      type="number"
                      step="any"
                      name="tech_m2"
                      id="tech_m2"
                      className="input my-2"
                      aria-label="input"
                      placeholder="00"
                      value={formData.tech_m2}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <input
                      type="number"
                      step="any"
                      name="tech_m3"
                      id="tech_m3"
                      className="input my-2"
                      aria-label="input"
                      placeholder="00"
                      value={formData.tech_m3}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <input
                      type="number"
                      step="any"
                      name="tech_m4"
                      id="tech_m4"
                      className="input my-2"
                      aria-label="input"
                      placeholder="00"
                      value={formData.tech_m4}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <input
                      type="number"
                      step="any"
                      name="tech_m5"
                      id="tech_m5"
                      className="input my-2"
                      aria-label="input"
                      placeholder="00"
                      value={formData.tech_m5}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="">
                    <input
                      type="number"
                      step="any"
                      name="tech_m6"
                      id="tech_m6"
                      className="input my-2"
                      aria-label="input"
                      placeholder="00"
                      value={formData.tech_m6}
                      onChange={handleChange}
                    />
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
              <div className=" w-full h-[30px] bg-gray-200 animate-pulse rounded-[10px] mb-4"></div>
              <div className="w-[75%] h-[20px] bg-gray-200 animate-pulse rounded-[10px] mb-3"></div>
              <div className="w-[50%] h-[20px] bg-gray-200 animate-pulse rounded-[10px] mb-3"></div>
              <div className="w-[25%] h-[20px] bg-gray-200 animate-pulse rounded-[10px]"></div>
            </div>
          </div>
        ) : (
          result && (
            <>
              <div className="w-full mx-auto p-4 lg:p-8 md:p-8 result_calculator rounded-lg  space-y-6 result">
                <div>
                  <ResultActions lang={data?.payload?.tech_lang_keys} />

                  <div className="rounded-lg flex items-center justify-center">
                    <div className="w-full p-3 rounded-[10px] mt-3">
                      <div className="w-full mt-2">
                        <div className="bg-sky bordered rounded-lg px-3 py-2">
                          <strong>
                            {data?.payload?.tech_lang_keys["3"]} =
                          </strong>
                          <strong
                            className="text-[#119154] text-[20px]"
                            dangerouslySetInnerHTML={{
                              __html: result?.tech_formula,
                            }}
                          />
                        </div>

                        <p className="text-[20px] px-2 mt-3">
                          <strong>Solution</strong>
                        </p>

                        <div className="w-full overflow-auto text-[16px]">
                          <table className="w-full" cellSpacing="0">
                            <tbody>
                              <tr
                                id="s1Ans"
                                dangerouslySetInnerHTML={{
                                  __html: `<td className="border-b p-2">${data?.payload?.tech_lang_keys["1"]}</td>${result?.tech_s1}`,
                                }}
                              />
                              <tr
                                id="s2Ans"
                                dangerouslySetInnerHTML={{
                                  __html: `<td className="border-b p-2">${data?.payload?.tech_lang_keys["4"]}</td>${result?.tech_s2}`,
                                }}
                              />
                              <tr
                                id="s3Ans"
                                dangerouslySetInnerHTML={{
                                  __html: `<td className="border-b p-2">${data?.payload?.tech_lang_keys["5"]}</td>${result?.tech_s3}`,
                                }}
                              />
                              <tr
                                id="s4Ans"
                                dangerouslySetInnerHTML={{
                                  __html: `<td className="border-b p-2">${data?.payload?.tech_lang_keys["5"]}</td>${result?.tech_s4}`,
                                }}
                              />
                              <tr
                                id="s5Ans"
                                dangerouslySetInnerHTML={{
                                  __html: `<td className="border-b p-2">${data?.payload?.tech_lang_keys["6"]}</td>${result?.tech_s5}`,
                                }}
                              />
                              <tr
                                id="s6Ans"
                                dangerouslySetInnerHTML={{
                                  __html: `<td className="border-b p-2">${data?.payload?.tech_lang_keys["7"]}</td>${result?.tech_s6}`,
                                }}
                              />
                              <tr>
                                <td className="p-2">
                                  {data?.payload?.tech_lang_keys["3"]}
                                </td>
                                <td id="defineColspan" colSpan={6}>
                                  <strong
                                    className="text-[#119154]"
                                    dangerouslySetInnerHTML={{
                                      __html: result?.tech_formula,
                                    }}
                                  />
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

export default EmpiricalFormulaCalculator;
