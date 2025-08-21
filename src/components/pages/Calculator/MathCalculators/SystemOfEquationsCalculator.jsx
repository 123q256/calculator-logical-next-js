import React, { useEffect, useState } from "react";
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
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
// import {
//   useGetSingleCalculatorDetailsMutation,
//   useSystemOfEquationsCalculatorMutation,
// } from "../../../redux/services/calculator/calculatorApi";

import {
  useGetSingleCalculatorDetailsMutation,
} from "../../../redux/services/calculator/calculatorApi";

import {
  useSystemOfEquationsCalculatorMutation,
} from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const SystemOfEquationsCalculator = () => {
  const location = useLocation();
    const url = location.pathname.replace(/^\/+/,"");
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
    tech_operations : "1", //  1 2 
    tech_a1_f : "1",
    tech_b1_f : "3",
    tech_k1_f : "5",
    tech_a2_f : "7",
    tech_b2_f : "9",
    tech_k2_f : "11",
    tech_a1_s : "1",
    tech_b1_s : "2",
    tech_c1_s : "3",
    tech_k1_s : "4",
    tech_a2_s : "5",
    tech_b2_s : "6",
    tech_c2_s : "7",
    tech_k2_s : "12",
    tech_a3_s : "15",
    tech_b3_s : "17",
    tech_c3_s : "25",
    tech_k3_s : "2",
    tech_method : "1" // 1 2 3
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useSystemOfEquationsCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
        setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_operations) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_operations :formData.tech_operations, 
        tech_a1_f :formData.tech_a1_f,
        tech_b1_f :formData.tech_b1_f, 
        tech_k1_f :formData.tech_k1_f, 
        tech_a2_f :formData.tech_a2_f,
        tech_b2_f :formData.tech_b2_f, 
        tech_k2_f :formData.tech_k2_f, 
        tech_a1_s :formData.tech_a1_s,
        tech_b1_s :formData.tech_b1_s, 
        tech_c1_s :formData.tech_c1_s, 
        tech_k1_s :formData.tech_k1_s,
        tech_a2_s :formData.tech_a2_s, 
        tech_b2_s :formData.tech_b2_s,
        tech_c2_s :formData.tech_c2_s,
        tech_k2_s :formData.tech_k2_s, 
        tech_a3_s :formData.tech_a3_s,
        tech_b3_s :formData.tech_b3_s, 
        tech_c3_s :formData.tech_c3_s,
        tech_k3_s :formData.tech_k3_s, 
        tech_method :formData.tech_method,

      }).unwrap();
      setResult(response); // Assuming the response has 'lovePercentage'
      toast.success(
       "Successfully Calculated"
      );
    } catch (err) {
      setFormError(err.data.error);
    toast.error(err.data.error);
    }
  };

  // Handle reset form
  const handleReset = () => {
    setFormData({  

    tech_operations : "1", //  1 2 
    tech_a1_f : "1",
    tech_b1_f : "3",
    tech_k1_f : "5",
    tech_a2_f : "7",
    tech_b2_f : "9",
    tech_k2_f : "11",
    tech_a1_s : "1",
    tech_b1_s : "2",
    tech_c1_s : "3",
    tech_k1_s : "4",
    tech_a2_s : "5",
    tech_b2_s : "6",
    tech_c2_s : "7",
    tech_k2_s : "12",
    tech_a3_s : "15",
    tech_b3_s : "17",
    tech_c3_s : "25",
    tech_k3_s : "2",
    tech_method : "1" // 1 2 3

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

// result

  // Safe helpers for fallback values
  const val = (v, fallback = 0) => (v !== undefined && v !== null ? v : fallback);
  const round4 = (num) => (typeof num === "number" ? num.toFixed(4) : num);

  const round5 = (num) =>
    typeof num === "number" ? num.toFixed(5) : num ?? 0;

  const round = (num) =>
    typeof num === "number" ? num.toFixed(5) : num ?? 0;

    // const round4 = (num) =>
    // typeof num === "number" ? num.toFixed(4) : num ?? 0;
 const f = formData;
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
          <div className="w-full mx-auto p-4 lg:p-8 md:p-8 input_form rounded-lg  space-y-6 mb-3">
            {formError && (
              <p className="text-red-500 text-lg font-semibold w-full">
                {formError}
              </p>
            )}

            <div className="lg:w-[60%] md:w-[80%] w-full mx-auto ">
            <div className="grid grid-cols-12 mt-3   gap-2 md:gap-4 lg:gap-4">
                <div className="col-span-12">
                    <label htmlFor="tech_operations" className="label">
                      {data?.payload?.tech_lang_keys["1"]}:
                    </label>
                    <div className="mt-2">
                      <select
                        className="input"
                        aria-label="select"
                        name="tech_operations"
                        id="tech_operations"
                        value={formData.tech_operations}
                        onChange={handleChange}
                      >
                        <option value="1">{data?.payload?.tech_lang_keys["2"]} </option>
                        <option value="2">{data?.payload?.tech_lang_keys["3"]} </option>
                      </select>
                    </div>
                </div>
                {formData.tech_operations == "1" && (
                    <div className="col-span-12 text-center mt-2 text-[14px]" id="math_1">
                      <BlockMath math={`
                        \\begin{cases}
                          ${result?.a1 ?? 'a_1'}x + ${result?.b1 ?? 'b_1'}y = ${result?.k1 ?? 'k_1'} \\\\
                          ${result?.a2 ?? 'a_2'}x + ${result?.b2 ?? 'b_2'}y = ${result?.k2 ?? 'k_2'}
                        \\end{cases}
                      `} />
                    </div>
                  )}

                  {formData.tech_operations == "2" && (
                    <div className="col-span-12 text-center mt-2 text-[14px]" id="math_2">
                      <BlockMath math={`
                        \\begin{cases}
                          ${result?.a1 ?? 'a_1'}x + ${result?.b1 ?? 'b_1'}y + ${result?.c1 ?? 'c_1'}z = ${result?.k1 ?? 'k_1'} \\\\
                          ${result?.a2 ?? 'a_2'}x + ${result?.b2 ?? 'b_2'}y + ${result?.c2 ?? 'c_2'}z = ${result?.k2 ?? 'k_2'} \\\\
                          ${result?.a3 ?? 'a_3'}x + ${result?.b3 ?? 'b_3'}y + ${result?.c3 ?? 'c_3'}z = ${result?.k3 ?? 'k_3'}
                        \\end{cases}
                      `} />
                    </div>
                  )}
                  
                {formData.tech_operations == "1" && (
                  <>
                  <div className="col-span-12  twoInput">
                      <div className="grid grid-cols-12   gap-2 md:gap-4 lg:gap-4">
                          <div className="col-span-4">
                              <label for="a1_f" className="text-[14px] text-blue">a<sub className="font-s-12 text-blue">1</sub>:</label>
                              <div className="w-full py-2">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_a1_f"
                                      id="tech_a1_f"
                                      className="input my-2"
                                      aria-label="input"
                                        placeholder="00"
                                      value={formData.tech_a1_f}
                                      onChange={handleChange}
                                    />
                              </div>
                          </div>
                          <div className="col-span-4">
                              <label for="b1_f" className="text-[14px] text-blue">b<sub className="font-s-12 text-blue">1</sub>:</label>
                              <div className="w-full py-2">
                                <input
                                      type="number"
                                      step="any"
                                      name="tech_b1_f"
                                      id="tech_b1_f"
                                      className="input my-2"
                                      aria-label="input"
                                        placeholder="00"
                                      value={formData.tech_b1_f}
                                      onChange={handleChange}
                                    />
                              </div>
                          </div>
                          <div className="col-span-4">
                              <label for="k1_f" className="text-[14px] text-blue">k<sub className="font-s-12 text-blue">1</sub>:</label>
                              <div className="w-full py-2">
                                  <input
                                      type="number"
                                      step="any"
                                      name="tech_k1_f"
                                      id="tech_k1_f"
                                      className="input my-2"
                                      aria-label="input"
                                        placeholder="00"
                                      value={formData.tech_k1_f}
                                      onChange={handleChange}
                                    />
                              </div>
                          </div>
                          <div className="col-span-4">
                              <label for="a2_f" className="text-[14px] text-blue">a<sub className="font-s-12 text-blue">2</sub>:</label>
                              <div className="w-full py-2">
                                  <input
                                      type="number"
                                      step="any"
                                      name="tech_a2_f"
                                      id="tech_a2_f"
                                      className="input my-2"
                                      aria-label="input"
                                        placeholder="00"
                                      value={formData.tech_a2_f}
                                      onChange={handleChange}
                                    />
                              </div>
                          </div>
                          <div className="col-span-4">
                              <label for="b2_f" className="text-[14px] text-blue">b<sub className="font-s-12 text-blue">2</sub>:</label>
                              <div className="w-full py-2">
                                <input
                                      type="number"
                                      step="any"
                                      name="tech_b2_f"
                                      id="tech_b2_f"
                                      className="input my-2"
                                      aria-label="input"
                                        placeholder="00"
                                      value={formData.tech_b2_f}
                                      onChange={handleChange}
                                    />
                              </div>
                          </div>
                          <div className="col-span-4">
                              <label for="k2_f" className="text-[14px] text-blue">k<sub className="font-s-12 text-blue">2</sub>:</label>
                              <div className="w-full py-2">
                                  <input
                                      type="number"
                                      step="any"
                                      name="tech_k2_f"
                                      id="tech_k2_f"
                                      className="input my-2"
                                      aria-label="input"
                                        placeholder="00"
                                      value={formData.tech_k2_f}
                                      onChange={handleChange}
                                    />
                              </div>
                          </div>
                      </div>
                  </div>
                  </>
                )}
                {formData.tech_operations == "2" && (
                  <>
                  <div className="col-span-12 threeInput">
                      <div className="grid grid-cols-12   gap-2 md:gap-4 lg:gap-4">
                          <div className="col-span-3">
                              <label for="a1_s" className="text-[14px] text-blue">a<sub className="font-s-12 text-blue">1</sub>:</label>
                              <div className="w-full py-2">
                                  <input
                                      type="number"
                                      step="any"
                                      name="tech_a1_s"
                                      id="tech_a1_s"
                                      className="input my-2"
                                      aria-label="input"
                                        placeholder="00"
                                      value={formData.tech_a1_s}
                                      onChange={handleChange}
                                    />
                              </div>
                          </div>
                          <div className="col-span-3">
                              <label for="b1_s" className="text-[14px] text-blue">b<sub className="font-s-12 text-blue">1</sub>:</label>
                              <div className="w-full py-2">
                                  <input
                                      type="number"
                                      step="any"
                                      name="tech_b1_s"
                                      id="tech_b1_s"
                                      className="input my-2"
                                      aria-label="input"
                                        placeholder="00"
                                      value={formData.tech_b1_s}
                                      onChange={handleChange}
                                    />
                              </div>
                          </div>
                          <div className="col-span-3">
                              <label for="c1_s" className="text-[14px] text-blue">c<sub className="font-s-12 text-blue">1</sub>:</label>
                              <div className="w-full py-2">
                                <input
                                      type="number"
                                      step="any"
                                      name="tech_c1_s"
                                      id="tech_c1_s"
                                      className="input my-2"
                                      aria-label="input"
                                        placeholder="00"
                                      value={formData.tech_c1_s}
                                      onChange={handleChange}
                                    />
                              </div>
                          </div>
                          <div className="col-span-3">
                              <label for="k1_s" className="text-[14px] text-blue">k<sub className="font-s-12 text-blue">1</sub>:</label>
                              <div className="w-full py-2">
                                <input
                                      type="number"
                                      step="any"
                                      name="tech_k1_s"
                                      id="tech_k1_s"
                                      className="input my-2"
                                      aria-label="input"
                                        placeholder="00"
                                      value={formData.tech_k1_s}
                                      onChange={handleChange}
                                    />
                              </div>
                          </div>
                          <div className="col-span-3">
                              <label for="a2_s" className="text-[14px] text-blue">a<sub className="font-s-12 text-blue">2</sub>:</label>
                              <div className="w-full py-2">
                                <input
                                      type="number"
                                      step="any"
                                      name="tech_a2_s"
                                      id="tech_a2_s"
                                      className="input my-2"
                                      aria-label="input"
                                        placeholder="00"
                                      value={formData.tech_a2_s}
                                      onChange={handleChange}
                                    />
                              </div>
                          </div>
                          <div className="col-span-3">
                              <label for="b2_s" className="text-[14px] text-blue">b<sub className="font-s-12 text-blue">2</sub>:</label>
                              <div className="w-full py-2">
                                <input
                                      type="number"
                                      step="any"
                                      name="tech_b2_s"
                                      id="tech_b2_s"
                                      className="input my-2"
                                      aria-label="input"
                                        placeholder="00"
                                      value={formData.tech_b2_s}
                                      onChange={handleChange}
                                    />
                              </div>
                          </div>
                          <div className="col-span-3">
                              <label for="c2_s" className="text-[14px] text-blue">c<sub className="font-s-12 text-blue">2</sub>:</label>
                              <div className="w-full py-2">
                                <input
                                      type="number"
                                      step="any"
                                      name="tech_c2_s"
                                      id="tech_c2_s"
                                      className="input my-2"
                                      aria-label="input"
                                        placeholder="00"
                                      value={formData.tech_c2_s}
                                      onChange={handleChange}
                                    />
                              </div>
                          </div>
                          <div className="col-span-3">
                              <label for="k2_s" className="text-[14px] text-blue">k<sub className="font-s-12 text-blue">2</sub>:</label>
                              <div className="w-full py-2">
                                <input
                                      type="number"
                                      step="any"
                                      name="tech_k2_s"
                                      id="tech_k2_s"
                                      className="input my-2"
                                      aria-label="input"
                                        placeholder="00"
                                      value={formData.tech_k2_s}
                                      onChange={handleChange}
                                    />
                              </div>
                          </div>
                          <div className="col-span-3">
                              <label for="a3_s" className="text-[14px] text-blue">a<sub className="font-s-12 text-blue">3</sub>:</label>
                              <div className="w-full py-2">
                                <input
                                      type="number"
                                      step="any"
                                      name="tech_a3_s"
                                      id="tech_a3_s"
                                      className="input my-2"
                                      aria-label="input"
                                        placeholder="00"
                                      value={formData.tech_a3_s}
                                      onChange={handleChange}
                                    />
                              </div>
                          </div>
                          <div className="col-span-3">
                              <label for="b3_s" className="text-[14px] text-blue">b<sub className="font-s-12 text-blue">3</sub>:</label>
                              <div className="w-full py-2">
                                <input
                                      type="number"
                                      step="any"
                                      name="tech_b3_s"
                                      id="tech_b3_s"
                                      className="input my-2"
                                      aria-label="input"
                                        placeholder="00"
                                      value={formData.tech_b3_s}
                                      onChange={handleChange}
                                    />
                              </div>
                          </div>
                          <div className="col-span-3">
                              <label for="c3_s" className="text-[14px] text-blue">c<sub className="font-s-12 text-blue">3</sub>:</label>
                              <div className="w-full py-2">
                                  <input
                                      type="number"
                                      step="any"
                                      name="tech_c3_s"
                                      id="tech_c3_s"
                                      className="input my-2"
                                      aria-label="input"
                                        placeholder="00"
                                      value={formData.tech_c3_s}
                                      onChange={handleChange}
                                    />
                              </div>
                          </div>
                          <div className="col-span-3">
                              <label for="k3_s" className="text-[14px] text-blue">k<sub className="font-s-12 text-blue">3</sub>:</label>
                              <div className="w-full py-2">
                                  <input
                                      type="number"
                                      step="any"
                                      name="tech_k3_s"
                                      id="tech_k3_s"
                                      className="input my-2"
                                      aria-label="input"
                                        placeholder="00"
                                      value={formData.tech_k3_s}
                                      onChange={handleChange}
                                    />
                              </div>
                          </div>
                      </div>
                  </div>
                  </>
                )}
                <div className="col-span-12">
                     <label htmlFor="tech_method" className="label">
                      Method
                    </label>
                    <div className="mt-2">
                      <select
                        className="input"
                        aria-label="select"
                        name="tech_method"
                        id="tech_method"
                        value={formData.tech_method}
                        onChange={handleChange}
                      >
                        <option value="1">Gauss-Jordan Elimination </option>
                        <option value="2">Inverse Matrix Method </option>
                        <option value="3">Cramer's Rule </option>
                      </select>
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
                          <div className="w-full mt-3">
                              <div className="w-full">
                                    {(formData?.tech_operations==1) ? (
                                      <>
                                        <div className="w-full md:w-[90%] lg:w-[60%] overflow-auto mt-2">
                                            <table className="w-full text-[16px]">
                                                <tr>
                                                    <td className="py-2 border-b" width="30%"><strong>x =</strong></td>
                                                    <td className="py-2 border-b">{result?.tech_x}</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2 border-b" width="30%"><strong>y =</strong></td>
                                                    <td className="py-2 border-b">{result?.tech_y}</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <p className="mt-3"><strong>{data?.payload?.tech_lang_keys[5]}</strong></p>

                                       <div className="w-full overflow-auto mt-2">
                                        {(formData?.tech_method==1) ? (
                                          <>
                                          <p className="mt-3">
                                            {data?.payload?.tech_lang_keys[6]}{' '}
                                            <InlineMath math={`
                                              \\begin{cases}
                                                ${f?.tech_a1_f || 0}x ${f?.tech_b1_f ? `+ ${f?.tech_b1_f}y` : ''} = ${f?.tech_k1_f || 0} \\\\
                                                ${f?.tech_a2_f || 0}x ${f?.tech_b2_f ? `+ ${f?.tech_b2_f}y` : ''} = ${f?.tech_k2_f || 0}
                                              \\end{cases}
                                            `} />{' '}
                                            for <InlineMath math="x, y" /> {data?.payload?.tech_lang_keys[7]} Gauss-Jordan Elimination method.
                                          </p>

                                          <p className="mt-3">
                                            {data?.payload?.tech_lang_keys[8]}:{' '}
                                            <BlockMath math={`
                                              \\left[
                                                \\begin{array}{cc|c}
                                                  ${f?.tech_a1_f || 0} & ${f?.tech_b1_f || 0} & ${f?.tech_k1_f || 0} \\\\
                                                  ${f?.tech_a2_f || 0} & ${f?.tech_b2_f || 0} & ${f?.tech_k2_f || 0}
                                                \\end{array}
                                              \\right]
                                            `} />
                                          </p>

                                          <p className="mt-3">
                                            Apply Gauss-Jordan Elimination method: (
                                            {data?.payload?.tech_lang_keys[9]}{' '}
                                            <a
                                              href="https://calculator-logical.com/gaussian-elimination-calculator"
                                              className="text-blue-500 underline"
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              Gaussian Elimination Calculator
                                            </a>
                                            )
                                          </p>

                                          <p className="mt-3">
                                            <BlockMath math={`
                                              \\left[
                                                \\begin{array}{cc|c}
                                                  ${result?.tech_a1_f} & ${result?.tech_b1_f} & ${result?.tech_k1_f} \\\\
                                                  ${result?.tech_n1} & ${parseFloat(result?.tech_n2).toFixed(4)} & ${parseFloat(result?.tech_n3).toFixed(4)}
                                                \\end{array}
                                              \\right]
                                            `} />
                                          </p>

                                          <p className="mt-3">Now substitute:</p>

                                          <p className="mt-3">
                                            <BlockMath math={`
                                              y = \\dfrac{${parseFloat(result?.tech_n3).toFixed(4)}}{${parseFloat(result?.tech_n2).toFixed(4)}} = ${result?.tech_y}
                                            `} />
                                          </p>

                                          <p className="mt-3">
                                            <BlockMath math={`
                                              x = \\dfrac{${result?.tech_k1_f} - (${result?.tech_b1_f})(${parseFloat(result?.tech_y).toFixed(4)})}{${result?.tech_a1_f}} = ${result?.tech_x}
                                            `} />
                                          </p>
                                          </>
                                        ): (formData?.tech_method==2) ? (
                                          <>
                                          <p className="mt-3">
                                              {data?.payload?.tech_lang_keys[6]}{" "}
                                              <InlineMath
                                                math={String.raw`
                                                  \begin{cases}
                                                    ${val(formData?.tech_a1_f)}x ${formData?.tech_b1_f ? `+ (${formData.tech_b1_f})y` : ""} = ${val(formData?.tech_k1_f)} \\
                                                    ${val(formData?.tech_a2_f)}x ${formData?.tech_b2_f ? `+ (${formData.tech_b2_f})y` : ""} = ${val(formData?.tech_k2_f)}
                                                  \end{cases}
                                                `}
                                              />{" "}
                                              for <InlineMath math="x,y" /> {data?.payload?.tech_lang_keys[7]} inverse matrix method.
                                            </p>

                                            <p className="mt-3">
                                              {data?.payload?.tech_lang_keys[8]}:{" "}
                                              <BlockMath
                                                math={String.raw`
                                                  \begin{bmatrix}
                                                    ${val(formData?.tech_a1_f)} & ${val(formData?.tech_b1_f)} \\
                                                    ${val(formData?.tech_a2_f)} & ${val(formData?.tech_b2_f)}
                                                  \end{bmatrix}
                                                  \begin{bmatrix} x \\ y \end{bmatrix} =
                                                  \begin{bmatrix}
                                                    ${val(formData?.tech_k1_f)} \\
                                                    ${val(formData?.tech_k2_f)}
                                                  \end{bmatrix}
                                                `}
                                              />
                                            </p>

                                            <p className="mt-3">
                                              {data?.payload?.tech_lang_keys[11]}:{" "}
                                              <BlockMath
                                                math={String.raw`
                                                  \begin{bmatrix}
                                                    ${val(formData?.tech_a1_f)} & ${val(formData?.tech_b1_f)} \\
                                                    ${val(formData?.tech_a2_f)} & ${val(formData?.tech_b2_f)}
                                                  \end{bmatrix}^{-1}
                                                  \begin{bmatrix}
                                                    ${val(formData?.tech_a1_f)} & ${val(formData?.tech_b1_f)} \\
                                                    ${val(formData?.tech_a2_f)} & ${val(formData?.tech_b2_f)}
                                                  \end{bmatrix}
                                                  \begin{bmatrix} x \\ y \end{bmatrix} =
                                                  \begin{bmatrix}
                                                    ${val(formData?.tech_a1_f)} & ${val(formData?.tech_b1_f)} \\
                                                    ${val(formData?.tech_a2_f)} & ${val(formData?.tech_b2_f)}
                                                  \end{bmatrix}^{-1}
                                                  \begin{bmatrix}
                                                    ${val(formData?.tech_k1_f)} \\
                                                    ${val(formData?.tech_k2_f)}
                                                  \end{bmatrix}
                                                `}
                                              />
                                            </p>

                                            <p className="mt-3">
                                              Rewrite equation:{" "}
                                              <InlineMath
                                                math={String.raw`
                                                  \begin{bmatrix} x \\ y \end{bmatrix} =
                                                  \begin{bmatrix}
                                                    ${val(formData?.tech_a1_f)} & ${val(formData?.tech_b1_f)} \\
                                                    ${val(formData?.tech_a2_f)} & ${val(formData?.tech_b2_f)}
                                                  \end{bmatrix}^{-1}
                                                  \begin{bmatrix}
                                                    ${val(formData?.tech_k1_f)} \\
                                                    ${val(formData?.tech_k2_f)}
                                                  \end{bmatrix}
                                                `}
                                              />
                                            </p>

                                            <p className="mt-3">
                                              {data?.payload?.tech_lang_keys[13]}:{" "}
                                              <InlineMath
                                                math={String.raw`
                                                  \begin{bmatrix}
                                                    ${round4(result?.tech_inv?.[0]?.[0])} & ${round4(result?.tech_inv?.[0]?.[1])} \\
                                                    ${round4(result?.tech_inv?.[1]?.[0])} & ${round4(result?.tech_inv?.[1]?.[1])}
                                                  \end{bmatrix}
                                                `}
                                              />{" "}
                                              (
                                              {data?.payload?.tech_lang_keys[9]}{" "}
                                              <a
                                                href="https://calculator-logical.com/inverse-matrix-calculator"
                                                className="text-blue-500 underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                Inverse Matrix Calculator
                                              </a>
                                              )
                                            </p>

                                            <p className="mt-3">
                                              {data?.payload?.tech_lang_keys[12]}:{" "}
                                              <InlineMath
                                                math={String.raw`
                                                  \begin{bmatrix} x \\ y \end{bmatrix} =
                                                  \begin{bmatrix}
                                                    ${round4(result?.tech_inv?.[0]?.[0])} & ${round4(result?.tech_inv?.[0]?.[1])} \\
                                                    ${round4(result?.tech_inv?.[1]?.[0])} & ${round4(result?.tech_inv?.[1]?.[1])}
                                                  \end{bmatrix}
                                                  \begin{bmatrix}
                                                    ${val(formData?.tech_k1_f)} \\
                                                    ${val(formData?.tech_k2_f)}
                                                  \end{bmatrix} =
                                                  \begin{bmatrix}
                                                    ${result?.tech_x} \\
                                                    ${result?.tech_y}
                                                  \end{bmatrix}
                                                `}
                                              />{" "}
                                              (
                                              {data?.payload?.tech_lang_keys[9]}{" "}
                                              <a
                                                href="https://calculator-logical.com/matrix-multiplication-calculator"
                                                className="text-blue-500 underline"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                Matrix Multiplication Calculator
                                              </a>
                                              )
                                            </p>
                                          </>
                                        ): (formData?.tech_method==3) ? (
                                          <>
                                          <p className="mt-3">
                                            {data?.payload?.tech_lang_keys[6]}{" "}
                                            <InlineMath math={String.raw`
                                              \begin{cases}
                                                ${val(formData?.tech_a1_f)} x + ${val(formData?.tech_b1_f)} y = ${val(formData?.tech_k1_f)} \\
                                                ${val(formData?.tech_a2_f)} x + ${val(formData?.tech_b2_f)} y = ${val(formData?.tech_k2_f)}
                                              \end{cases}
                                            `} />{" "}
                                            for <InlineMath math="x,y" /> {data?.payload?.tech_lang_keys[7]} Cramer's rule.
                                          </p>

                                          <p className="mt-3">
                                            {data?.payload?.tech_lang_keys[8]}:{" "}
                                            <BlockMath math={String.raw`
                                              \left[
                                                \begin{array}{cc|c}
                                                  ${val(formData?.tech_a1_f)} & ${val(formData?.tech_b1_f)} & ${val(formData?.tech_k1_f)} \\
                                                  ${val(formData?.tech_a2_f)} & ${val(formData?.tech_b2_f)} & ${val(formData?.tech_k2_f)}
                                                \end{array}
                                              \right]
                                            `} />
                                          </p>

                                          <p className="mt-3">
                                            {data?.payload?.tech_lang_keys[10]} ({data?.payload?.tech_lang_keys[9]}{" "}
                                            <a
                                              href="https://calculator-logical.com/determinant-calculator"
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-blue-500 underline"
                                            >
                                              Determinant Calculator
                                            </a>
                                            )
                                            <InlineMath math={String.raw`
                                              D = \begin{vmatrix}
                                                ${val(formData?.tech_a1_f)} & ${val(formData?.tech_b1_f)} \\
                                                ${val(formData?.tech_a2_f)} & ${val(formData?.tech_b2_f)}
                                              \end{vmatrix} = ${result?.tech_det1}
                                            `} />
                                          </p>

                                          <p className="mt-3">
                                            Substitute the x-column with the Right Hand Side (RHS){" "}
                                            <InlineMath math={String.raw`
                                              D_x = \begin{vmatrix}
                                                ${val(formData?.tech_k1_f)} & ${val(formData?.tech_b1_f)} \\
                                                ${val(formData?.tech_k2_f)} & ${val(formData?.tech_b2_f)}
                                              \end{vmatrix} = ${result?.tech_det2}
                                            `} />
                                          </p>

                                          <p className="mt-3">
                                            Substitute the y-column with the Right Hand Side (RHS){" "}
                                            <InlineMath math={String.raw`
                                              D_y = \begin{vmatrix}
                                                ${val(formData?.tech_a1_f)} & ${val(formData?.tech_k1_f)} \\
                                                ${val(formData?.tech_a2_f)} & ${val(formData?.tech_k2_f)}
                                              \end{vmatrix} = ${result?.tech_det3}
                                            `} />
                                          </p>

                                          <p className="mt-3">{data?.payload?.tech_lang_keys[12]}:</p>

                                          <p className="mt-3">
                                            <InlineMath math={String.raw`
                                              x = \dfrac{D_x}{D} = \dfrac{${result?.tech_det2}}{${result?.tech_det1}} = ${result?.tech_x}
                                            `} />
                                          </p>

                                          <p className="mt-3">
                                            <InlineMath math={String.raw`
                                              y = \dfrac{D_y}{D} = \dfrac{${result?.tech_det3}}{${result?.tech_det1}} = ${result?.tech_y}
                                            `} />
                                          </p>
                                          </>
                                        ):null}
                                       </div>

                                          <p className="mt-3">
                                            <InlineMath math={`x = ${result?.tech_x ?? ''}`} />
                                          </p>
                                          <p className="mt-3">
                                            <InlineMath math={`y = ${result?.tech_y ?? ''}`} />
                                          </p>
                                      </>
                                    ):(
                                      <>
                                        <div className="w-full md:w-[60%] lg:w-[60%] mt-2">
                                            <table className="w-full font-s-18">
                                                <tr>
                                                    <td className="py-2 border-b" width="30%"><strong>x =</strong></td>
                                                    <td className="py-2 border-b">{round(result?.tech_x, 3)}</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2 border-b" width="30%"><strong>y =</strong></td>
                                                    <td className="py-2 border-b">{round(result?.tech_y, 3)}</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2 border-b" width="30%"><strong>z =</strong></td>
                                                    <td className="py-2 border-b">{round(result?.tech_z, 3)}</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <p className="mt-3"><strong>{data?.payload?.tech_lang_keys[5]}</strong></p>
                                        {(formData?.tech_method==1) ? (
                                          <>
                                          <div className="w-full overflow-auto">
                                          <p className="mt-3">
                                            {data?.payload?.tech_lang_keys[6]}{" "}
                                            <InlineMath math={String.raw`
                                              \begin{cases}
                                                ${val(formData?.tech_a1_s)}x ${formData?.tech_b1_s ? `+ (${formData.tech_b1_s})y` : ""} ${formData?.tech_c1_s ? `+ (${formData.tech_c1_s})z` : ""} = ${val(formData?.tech_k1_s)} \\
                                                ${val(formData?.tech_a2_s)}x ${formData?.tech_b2_s ? `+ (${formData.tech_b2_s})y` : ""} ${formData?.tech_c2_s ? `+ (${formData.tech_c2_s})z` : ""} = ${val(formData?.tech_k2_s)} \\
                                                ${val(formData?.tech_a3_s)}x ${formData?.tech_b3_s ? `+ (${formData.tech_b3_s})y` : ""} ${formData?.tech_c3_s ? `+ (${formData.tech_c3_s})z` : ""} = ${val(formData?.tech_k3_s)}
                                              \end{cases}
                                            `} />{" "}
                                            for <InlineMath math="x,y,z" /> {data?.payload?.tech_lang_keys[7]} Gauss-Jordan Elimination method.
                                          </p>

                                          <p className="mt-3">
                                            {data?.payload?.tech_lang_keys[8]}:{" "}
                                            <BlockMath math={String.raw`
                                              \left[
                                                \begin{array}{ccc|c}
                                                  ${val(formData?.tech_a1_s)} & ${val(formData?.tech_b1_s)} & ${val(formData?.tech_c1_s)} & ${val(formData?.tech_k1_s)} \\
                                                  ${val(formData?.tech_a2_s)} & ${val(formData?.tech_b2_s)} & ${val(formData?.tech_c2_s)} & ${val(formData?.tech_k2_s)} \\
                                                  ${val(formData?.tech_a3_s)} & ${val(formData?.tech_b3_s)} & ${val(formData?.tech_c3_s)} & ${val(formData?.tech_k3_s)}
                                                \end{array}
                                              \right]
                                            `} />
                                          </p>

                                          <p className="mt-3">
                                            Apply Gauss-Jordan Elimination method: ({data?.payload?.tech_lang_keys[9]}{" "}
                                            <a
                                              href="https://calculator-logical.com/gaussian-elimination-calculator"
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-blue-500 underline"
                                            >
                                              Gaussian Elimination Calculator
                                            </a>
                                            ){" "}
                                            <BlockMath math={String.raw`
                                              \left[
                                                \begin{array}{ccc|c}
                                                  1 & 0 & 0 & ${round5(result?.tech_x)} \\
                                                  0 & 1 & 0 & ${round5(result?.tech_y)} \\
                                                  0 & 0 & 1 & ${round5(result?.tech_z)}
                                                \end{array}
                                              \right]
                                            `} />
                                          </p>
                                          </div>
                                          </>
                                        ): (formData?.tech_method==2) ? (
                                          <>
                                           <div className="w-full overflow-auto">
                                            <p className="mt-3">
                                              {data?.payload?.tech_lang_keys[6]}{" "}
                                              <InlineMath math={String.raw`
                                                \begin{cases}
                                                  ${val(formData?.tech_a1_s)}x ${formData?.tech_b1_s ? `+ (${formData.tech_b1_s})y` : ""} ${formData?.tech_c1_s ? `+ (${formData.tech_c1_s})z` : ""} = ${val(formData?.tech_k1_s)} \\
                                                  ${val(formData?.tech_a2_s)}x ${formData?.tech_b2_s ? `+ (${formData.tech_b2_s})y` : ""} ${formData?.tech_c2_s ? `+ (${formData.tech_c2_s})z` : ""} = ${val(formData?.tech_k2_s)} \\
                                                  ${val(formData?.tech_a3_s)}x ${formData?.tech_b3_s ? `+ (${formData.tech_b3_s})y` : ""} ${formData?.tech_c3_s ? `+ (${formData.tech_c3_s})z` : ""} = ${val(formData?.tech_k3_s)}
                                                \end{cases}
                                              `} />{" "}
                                              for <InlineMath math="x,y,z" /> {data?.payload?.tech_lang_keys[7]} inverse matrix method.
                                            </p>

                                            <p className="mt-3">
                                              {data?.payload?.tech_lang_keys[8]}:{" "}
                                              <BlockMath math={String.raw`
                                                \begin{bmatrix}
                                                  ${val(formData?.tech_a1_s)} & ${val(formData?.tech_b1_s)} & ${val(formData?.tech_c1_s)} \\
                                                  ${val(formData?.tech_a2_s)} & ${val(formData?.tech_b2_s)} & ${val(formData?.tech_c2_s)} \\
                                                  ${val(formData?.tech_a3_s)} & ${val(formData?.tech_b3_s)} & ${val(formData?.tech_c3_s)}
                                                \end{bmatrix}
                                                \begin{bmatrix}
                                                  x \\ y \\ z
                                                \end{bmatrix}
                                                =
                                                \begin{bmatrix}
                                                  ${val(formData?.tech_k1_s)} \\
                                                  ${val(formData?.tech_k2_s)} \\
                                                  ${val(formData?.tech_k3_s)}
                                                \end{bmatrix}
                                              `} />
                                            </p>

                                            <p className="mt-3">
                                              {data?.payload?.tech_lang_keys[11]}:{" "}
                                              <BlockMath math={String.raw`
                                                \begin{bmatrix}
                                                  ${val(formData?.tech_a1_s)} & ${val(formData?.tech_b1_s)} & ${val(formData?.tech_c1_s)} \\
                                                  ${val(formData?.tech_a2_s)} & ${val(formData?.tech_b2_s)} & ${val(formData?.tech_c2_s)} \\
                                                  ${val(formData?.tech_a3_s)} & ${val(formData?.tech_b3_s)} & ${val(formData?.tech_c3_s)}
                                                \end{bmatrix}^1
                                                \begin{bmatrix}
                                                  ${val(formData?.tech_a1_s)} & ${val(formData?.tech_b1_s)} & ${val(formData?.tech_c1_s)} \\
                                                  ${val(formData?.tech_a2_s)} & ${val(formData?.tech_b2_s)} & ${val(formData?.tech_c2_s)} \\
                                                  ${val(formData?.tech_a3_s)} & ${val(formData?.tech_b3_s)} & ${val(formData?.tech_c3_s)}
                                                \end{bmatrix}
                                                \begin{bmatrix}
                                                  x \\ y \\ z
                                                \end{bmatrix}
                                                =
                                                \begin{bmatrix}
                                                  ${val(formData?.tech_a1_s)} & ${val(formData?.tech_b1_s)} & ${val(formData?.tech_c1_s)} \\
                                                  ${val(formData?.tech_a2_s)} & ${val(formData?.tech_b2_s)} & ${val(formData?.tech_c2_s)} \\
                                                  ${val(formData?.tech_a3_s)} & ${val(formData?.tech_b3_s)} & ${val(formData?.tech_c3_s)}
                                                \end{bmatrix}^1
                                                \begin{bmatrix}
                                                  ${val(formData?.tech_k1_s)} \\
                                                  ${val(formData?.tech_k2_s)} \\
                                                  ${val(formData?.tech_k3_s)}
                                                \end{bmatrix}
                                              `} />
                                            </p>

                                            <p className="mt-3">
                                              Rewrite equation:{" "}
                                              <InlineMath math={String.raw`
                                                \begin{bmatrix}
                                                  x \\ y \\ z
                                                \end{bmatrix}
                                                =
                                                \begin{bmatrix}
                                                  ${val(formData?.tech_a1_s)} & ${val(formData?.tech_b1_s)} & ${val(formData?.tech_c1_s)} \\
                                                  ${val(formData?.tech_a2_s)} & ${val(formData?.tech_b2_s)} & ${val(formData?.tech_c2_s)} \\
                                                  ${val(formData?.tech_a3_s)} & ${val(formData?.tech_b3_s)} & ${val(formData?.tech_c3_s)}
                                                \end{bmatrix}^1
                                                \begin{bmatrix}
                                                  ${val(formData?.tech_k1_s)} \\
                                                  ${val(formData?.tech_k2_s)} \\
                                                  ${val(formData?.tech_k3_s)}
                                                \end{bmatrix}
                                              `} />
                                            </p>

                                            <p className="mt-3">
                                              {data?.payload?.tech_lang_keys[13]}:{" "}
                                              <InlineMath math={String.raw`
                                                \begin{bmatrix}
                                                  ${round4(result?.tech_inv?.[0]?.[0])} & ${round4(result?.tech_inv?.[0]?.[1])} & ${round4(result?.tech_inv?.[0]?.[2])} \\
                                                  ${round4(result?.tech_inv?.[1]?.[0])} & ${round4(result?.tech_inv?.[1]?.[1])} & ${round4(result?.tech_inv?.[1]?.[2])} \\
                                                  ${round4(result?.tech_inv?.[2]?.[0])} & ${round4(result?.tech_inv?.[2]?.[1])} & ${round4(result?.tech_inv?.[2]?.[2])}
                                                \end{bmatrix}^1
                                              `} />{" "}
                                              (
                                              <a
                                                href="https://calculator-logical.com/inverse-matrix-calculator"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline"
                                              >
                                                {data?.payload?.tech_lang_keys[9]} Inverse Matrix Calculator
                                              </a>
                                              )
                                            </p>

                                            <p className="mt-3">
                                              {data?.payload?.tech_lang_keys[12]}:{" "}
                                              <InlineMath math={String.raw`
                                                \begin{bmatrix}
                                                  x \\ y \\ z
                                                \end{bmatrix}
                                                =
                                                \begin{bmatrix}
                                                  ${round4(result?.tech_inv?.[0]?.[0])} & ${round4(result?.tech_inv?.[0]?.[1])} & ${round4(result?.tech_inv?.[0]?.[2])} \\
                                                  ${round4(result?.tech_inv?.[1]?.[0])} & ${round4(result?.tech_inv?.[1]?.[1])} & ${round4(result?.tech_inv?.[1]?.[2])} \\
                                                  ${round4(result?.tech_inv?.[2]?.[0])} & ${round4(result?.tech_inv?.[2]?.[1])} & ${round4(result?.tech_inv?.[2]?.[2])}
                                                \end{bmatrix}
                                                \begin{bmatrix}
                                                  ${val(formData?.tech_k1_s)} \\
                                                  ${val(formData?.tech_k2_s)} \\
                                                  ${val(formData?.tech_k3_s)}
                                                \end{bmatrix}
                                                =
                                                \begin{bmatrix}
                                                  ${val(result?.tech_x)} \\
                                                  ${val(result?.tech_y)} \\
                                                  ${val(result?.tech_z)}
                                                \end{bmatrix}
                                              `} />{" "}
                                              (
                                              <a
                                                href="https://calculator-logical.com/matrix-multiplication-calculator"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline"
                                              >
                                                Matrix Multiplication Calculator
                                              </a>
                                              )
                                            </p>
                                            </div>
                                          </>
                                        ): (formData?.tech_method==3) ? (
                                          <>
                                            <div className="w-full overflow-auto">
                                        <p className="mt-3">
                                          {data?.payload?.tech_lang_keys[6]}{' '}
                                          <InlineMath math={String.raw`
                                            \begin{cases}
                                              ${val(formData?.tech_a1_s)}x ${formData?.tech_b1_s ? `+ (${formData.tech_b1_s})y` : ''} ${formData?.tech_c1_s ? `+ (${formData.tech_c1_s})z` : ''} = ${val(formData?.tech_k1_s)} \\
                                              ${val(formData?.tech_a2_s)}x ${formData?.tech_b2_s ? `+ (${formData.tech_b2_s})y` : ''} ${formData?.tech_c2_s ? `+ (${formData.tech_c2_s})z` : ''} = ${val(formData?.tech_k2_s)} \\
                                              ${val(formData?.tech_a3_s)}x ${formData?.tech_b3_s ? `+ (${formData.tech_b3_s})y` : ''} ${formData?.tech_c3_s ? `+ (${formData.tech_c3_s})z` : ''} = ${val(formData?.tech_k3_s)}
                                            \end{cases}
                                          `} />{' '}
                                          for <InlineMath math="x,y,z" /> {data?.payload?.tech_lang_keys[7]} Cramer's rule.
                                        </p>

                                        <p className="mt-3">
                                          {data?.payload?.tech_lang_keys[8]}:{' '}
                                          <BlockMath math={String.raw`
                                            \left[
                                            \begin{array}{ccc|c}
                                              ${val(formData?.tech_a1_s)} & ${val(formData?.tech_b1_s)} & ${val(formData?.tech_c1_s)} & ${val(formData?.tech_k1_s)} \\
                                              ${val(formData?.tech_a2_s)} & ${val(formData?.tech_b2_s)} & ${val(formData?.tech_c2_s)} & ${val(formData?.tech_k2_s)} \\
                                              ${val(formData?.tech_a3_s)} & ${val(formData?.tech_b3_s)} & ${val(formData?.tech_c3_s)} & ${val(formData?.tech_k3_s)}
                                            \end{array}
                                            \right]
                                          `} />
                                        </p>

                                        <p className="mt-3">
                                          {data?.payload?.tech_lang_keys[10]} ({data?.payload?.tech_lang_keys[9]}{' '}
                                          <a
                                            href="https://calculator-logical.com/determinant-calculator"
                                            className="text-blue-500 underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                          >
                                            Determinant Calculator
                                          </a>
                                          ){` `}
                                          <InlineMath math={String.raw`
                                            D = \begin{vmatrix}
                                              ${val(formData?.tech_a1_s)} & ${val(formData?.tech_b1_s)} & ${val(formData?.tech_c1_s)} \\
                                              ${val(formData?.tech_a2_s)} & ${val(formData?.tech_b2_s)} & ${val(formData?.tech_c2_s)} \\
                                              ${val(formData?.tech_a3_s)} & ${val(formData?.tech_b3_s)} & ${val(formData?.tech_c3_s)}
                                            \end{vmatrix} = ${val(result?.tech_det1)}
                                          `} />
                                        </p>

                                        <p className="mt-3">
                                          Substitute the x-column with RHS:{' '}
                                          <InlineMath math={String.raw`
                                            D_x = \begin{vmatrix}
                                              ${val(formData?.tech_k1_s)} & ${val(formData?.tech_b1_s)} & ${val(formData?.tech_c1_s)} \\
                                              ${val(formData?.tech_k2_s)} & ${val(formData?.tech_b2_s)} & ${val(formData?.tech_c2_s)} \\
                                              ${val(formData?.tech_k3_s)} & ${val(formData?.tech_b3_s)} & ${val(formData?.tech_c3_s)}
                                            \end{vmatrix} = ${val(result?.tech_det2)}
                                          `} />
                                        </p>

                                        <p className="mt-3">
                                          Substitute the y-column with RHS:{' '}
                                          <InlineMath math={String.raw`
                                            D_y = \begin{vmatrix}
                                              ${val(formData?.tech_a1_s)} & ${val(formData?.tech_k1_s)} & ${val(formData?.tech_c1_s)} \\
                                              ${val(formData?.tech_a2_s)} & ${val(formData?.tech_k2_s)} & ${val(formData?.tech_c2_s)} \\
                                              ${val(formData?.tech_a3_s)} & ${val(formData?.tech_k3_s)} & ${val(formData?.tech_c3_s)}
                                            \end{vmatrix} = ${val(result?.tech_det3)}
                                          `} />
                                        </p>

                                        <p className="mt-3">
                                          Substitute the z-column with RHS:{' '}
                                          <InlineMath math={String.raw`
                                            D_z = \begin{vmatrix}
                                              ${val(formData?.tech_a1_s)} & ${val(formData?.tech_b1_s)} & ${val(formData?.tech_k1_s)} \\
                                              ${val(formData?.tech_a2_s)} & ${val(formData?.tech_b2_s)} & ${val(formData?.tech_k2_s)} \\
                                              ${val(formData?.tech_a3_s)} & ${val(formData?.tech_b3_s)} & ${val(formData?.tech_k3_s)}
                                            \end{vmatrix} = ${val(result?.tech_det4)}
                                          `} />
                                        </p>

                                        <p className="mt-3">{data?.payload?.tech_lang_keys[12]}:</p>

                                        <p className="mt-3">
                                          <InlineMath math={String.raw`
                                            x = \frac{D_x}{D} = \frac{${val(result?.tech_det2)}}{${val(result?.tech_det1)}} = ${val(result?.tech_x)}
                                          `} />
                                        </p>

                                        <p className="mt-3">
                                          <InlineMath math={String.raw`
                                            y = \frac{D_y}{D} = \frac{${val(result?.tech_det3)}}{${val(result?.tech_det1)}} = ${val(result?.tech_y)}
                                          `} />
                                        </p>

                                        <p className="mt-3">
                                          <InlineMath math={String.raw`
                                            z = \frac{D_z}{D} = \frac{${val(result?.tech_det4)}}{${val(result?.tech_det1)}} = ${val(result?.tech_z)}
                                          `} />
                                        </p>
                                        </div>
                                          </>
                                        ):null}
                                        <p className="mt-3">
                                          <InlineMath math={`x = ${result?.tech_x ?? ''}`} />
                                        </p>
                                        <p className="mt-3">
                                          <InlineMath math={`y = ${result?.tech_y ?? ''}`} />
                                        </p>
                                        <p className="mt-3">
                                          <InlineMath math={`z = ${result?.tech_z ?? ''}`} />
                                        </p>
                                      
                                      </>
                                    )}
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

export default SystemOfEquationsCalculator;
