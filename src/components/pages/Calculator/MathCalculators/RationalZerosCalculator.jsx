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
//   useRationalZerosCalculatorMutation,
// } from "../../../redux/services/calculator/calculatorApi";

import {
  useGetSingleCalculatorDetailsMutation,
} from "../../../redux/services/calculator/calculatorApi";

import {
  useRationalZerosCalculatorMutation,
} from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const RationalZerosCalculator = () => {
  const location = useLocation();
    const url = location.pathname.replace(/^\/+|\/+$/g, "");
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
    tech_no_of : "2", // 2 3 4 5  6 7 8 9
    tech_v1 : "1",
    tech_v2 : "5",
    tech_v3 : "6",
    tech_v4 : "4",
    tech_v5 : "5",
    tech_v6 : "6",
    tech_v7 : "7",
    tech_v8 : "8",
    tech_v9 : "9",
    tech_v10 : "10"
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useRationalZerosCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
        setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_no_of ) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
          tech_no_of :formData.tech_no_of, 
          tech_v1 :formData.tech_v1, 
          tech_v2 :formData.tech_v2, 
          tech_v3 :formData.tech_v3, 
          tech_v4 :formData.tech_v4, 
          tech_v5 :formData.tech_v5, 
          tech_v6 :formData.tech_v6, 
          tech_v7 :formData.tech_v7, 
          tech_v8 :formData.tech_v8, 
          tech_v9 :formData.tech_v9, 
          tech_v10 :formData.tech_v10,

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

        tech_no_of : "2", // 2 3 4 5  6 7 8 9
    tech_v1 : "1",
    tech_v2 : "5",
    tech_v3 : "6",
    tech_v4 : "4",
    tech_v5 : "5",
    tech_v6 : "6",
    tech_v7 : "7",
    tech_v8 : "8",
    tech_v9 : "9",
    tech_v10 : "10"

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
          <div className="w-full mx-auto p-4 lg:p-8 md:p-8 bg-white rounded-lg shadow-md space-y-6 mb-3">
            {formError && (
              <p className="text-red-500 text-lg font-semibold w-full">
                {formError}
              </p>
            )}

            <div class="lg:w-[70%] md:w-[90%] w-full mx-auto ">
              <div class="grid grid-cols-12 mt-3   gap-2 ">
                  <div class="col-span-12">
                      <label htmlFor="tech_no_of" className="label">
                        {data?.payload?.tech_lang_keys["17"]}:
                      </label>
                      <div className="mt-2">
                        <select
                          className="input"
                          aria-label="select"
                          name="tech_no_of"
                          id="tech_no_of"
                          value={formData.tech_no_of}
                          onChange={handleChange}
                        >
                           <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </select>
                      </div>
                  </div>
                  {formData.tech_no_of === "2" && (
                      <p className="col-span-12 text-center mt-2 text-[14px] p2">
                        <BlockMath math={`P(x) = a_{1}x^2 \\pm a_{2}x \\pm a_{3}`} />
                      </p>
                    )}

                    {formData.tech_no_of === "3" && (
                      <p className="col-span-12 text-center mt-2 text-[14px] p3">
                        <BlockMath math={`P(x) = a_{1}x^3 \\pm a_{2}x^2 \\pm a_{3}x \\pm a_{4}`} />
                      </p>
                    )}

                    {formData.tech_no_of === "4" && (
                      <p className="col-span-12 text-center mt-2 text-[14px] p4">
                        <BlockMath math={`P(x) = a_{1}x^4 \\pm a_{2}x^3 \\pm a_{3}x^2 \\pm a_{4}x \\pm a_{5}`} />
                      </p>
                    )}

                    {formData.tech_no_of === "5" && (
                      <p className="col-span-12 text-center mt-2 text-[14px] p5">
                        <BlockMath math={`P(x) = a_{1}x^5 \\pm a_{2}x^4 \\pm a_{3}x^3 \\pm a_{4}x^2 \\pm a_{5}x \\pm a_{6}`} />
                      </p>
                    )}

                    {formData.tech_no_of === "6" && (
                      <p className="col-span-12 text-center mt-2 text-[14px] p6">
                        <BlockMath math={`P(x) = a_{1}x^6 \\pm a_{2}x^5 \\pm a_{3}x^4 \\pm a_{4}x^3 \\pm a_{5}x^2 \\pm a_{6}x \\pm a_{7}`} />
                      </p>
                    )}

                    {formData.tech_no_of === "7" && (
                      <p className="col-span-12 text-center mt-2 text-[14px] p7">
                        <BlockMath math={`P(x) = a_{1}x^7 \\pm a_{2}x^6 \\pm a_{3}x^5 \\pm a_{4}x^4 \\pm a_{5}x^3 \\pm a_{6}x^2 \\pm a_{7}x \\pm a_{8}`} />
                      </p>
                    )}

                    {formData.tech_no_of === "8" && (
                      <p className="col-span-12 text-center mt-2 text-[14px] p8">
                        <BlockMath math={`P(x) = a_{1}x^8 \\pm a_{2}x^7 \\pm a_{3}x^6 \\pm a_{4}x^5 \\pm a_{5}x^4 \\pm a_{6}x^3 \\pm a_{7}x^2 \\pm a_{8}x \\pm a_{9}`} />
                      </p>
                    )}

                    {formData.tech_no_of === "9" && (
                      <p className="col-span-12 text-center mt-2 text-[14px] p9">
                        <BlockMath math={`P(x) = a_{1}x^9 \\pm a_{2}x^8 \\pm a_{3}x^7 \\pm a_{4}x^6 \\pm a_{5}x^5 \\pm a_{6}x^4 \\pm a_{7}x^3 \\pm a_{8}x^2 \\pm a_{9}x \\pm a_{10}`} />
                      </p>
                    )}
            
                  </div>
                  <div class="grid grid-cols-12 mt-3   gap-2 ">

                  <div class="col-span-4">
                      <label for="v1" class="text-[14px] text-blue-800">a<sub class="text-[12px] text-blue-800">1</sub>:</label>
                      <div class="w-full py-2">
                           <input
                              type="number"
                              step="any"
                              name="tech_v1"
                              id="tech_v1"
                              className="input my-2"
                              aria-label="input"
                               placeholder="00"
                              value={formData.tech_v1}
                              onChange={handleChange}
                            />
                      </div>
                  </div>
                  <div class="col-span-4">
                      <label for="v2" class="text-[14px] text-blue-800">a<sub class="text-[12px] text-blue-800">2</sub>:</label>
                      <div class="w-full py-2">
                         <input
                              type="number"
                              step="any"
                              name="tech_v2"
                              id="tech_v2"
                              className="input my-2"
                              aria-label="input"
                               placeholder="00"
                              value={formData.tech_v2}
                              onChange={handleChange}
                            />
                      </div>
                  </div>
                  <div class="col-span-4">
                      <label for="v3" class="text-[14px] text-blue-800">a<sub class="text-[12px] text-blue-800">3</sub>:</label>
                      <div class="w-full py-2">
                        <input
                              type="number"
                              step="any"
                              name="tech_v3"
                              id="tech_v3"
                              className="input my-2"
                              aria-label="input"
                               placeholder="00"
                              value={formData.tech_v3}
                              onChange={handleChange}
                            />
                      </div>
                  </div>
                  {parseInt(formData.tech_no_of) >= 3 && (
                    <>
                    <div class="col-span-4  vc4" id="a4">
                        <label for="v4" class="text-[14px] text-blue-800">a<sub class="text-[12px] text-blue-800">4</sub>:</label>
                        <div class="w-full py-2">
                            <input
                                type="number"
                                step="any"
                                name="tech_v4"
                                id="tech_v4"
                                className="input my-2"
                                aria-label="input"
                                placeholder="00"
                                value={formData.tech_v4}
                                onChange={handleChange}
                              />
                        </div>
                    </div>
                    </>
                   )}
                   {parseInt(formData.tech_no_of) >= 4 && (
                    <>
                    <div class="col-span-4 vc5" id="a5">
                        <label for="v5" class="text-[14px] text-blue-800">a<sub class="text-[12px] text-blue-800">5</sub>:</label>
                        <div class="w-full py-2">
                            <input
                                type="number"
                                step="any"
                                name="tech_v5"
                                id="tech_v5"
                                className="input my-2"
                                aria-label="input"
                                placeholder="00"
                                value={formData.tech_v5}
                                onChange={handleChange}
                              />
                        </div>
                    </div>
                    </>
                   )}
                   {parseInt(formData.tech_no_of) >= 5 && (
                    <>
                    <div class="col-span-4  vc6" id="a6">
                        <label for="v6" class="text-[14px] text-blue-800">a<sub class="text-[12px] text-blue-800">6</sub>:</label>
                        <div class="w-full py-2">
                            <input
                                type="number"
                                step="any"
                                name="tech_v6"
                                id="tech_v6"
                                className="input my-2"
                                aria-label="input"
                                placeholder="00"
                                value={formData.tech_v6}
                                onChange={handleChange}
                              />
                        </div>
                    </div>
                    </>
                   )}
                  {parseInt(formData.tech_no_of) >= 6 && (
                    <>
                    <div class="col-span-4  vc7" id="a7">
                        <label for="v7" class="text-[14px] text-blue-800">a<sub class="text-[12px] text-blue-800">7</sub>:</label>
                        <div class="w-full py-2">
                            <input
                                type="number"
                                step="any"
                                name="tech_v7"
                                id="tech_v7"
                                className="input my-2"
                                aria-label="input"
                                placeholder="00"
                                value={formData.tech_v7}
                                onChange={handleChange}
                              />
                        </div>
                    </div>
                    </>
                   )}
                  {parseInt(formData.tech_no_of) >= 7 && (
                    <>
                    <div class="col-span-4  vc8" id="a8">
                        <label for="v8" class="text-[14px] text-blue-800">a<sub class="text-[12px] text-blue-800">8</sub>:</label>
                        <div class="w-full py-2">
                            <input
                                type="number"
                                step="any"
                                name="tech_v8"
                                id="tech_v8"
                                className="input my-2"
                                aria-label="input"
                                placeholder="00"
                                value={formData.tech_v8}
                                onChange={handleChange}
                              />
                        </div>
                    </div>
                    </>
                   )}
                  {parseInt(formData.tech_no_of) >= 8 && (
                    <>
                    <div class="col-span-4 vc9" id="a9">
                        <label for="v9" class="text-[14px] text-blue-800">a<sub class="text-[12px] text-blue-800">9</sub>:</label>
                        <div class="w-full py-2">
                          <input
                                type="number"
                                step="any"
                                name="tech_v9"
                                id="tech_v9"
                                className="input my-2"
                                aria-label="input"
                                placeholder="00"
                                value={formData.tech_v9}
                                onChange={handleChange}
                              />
                        </div>
                    </div>
                    </>
                   )}
                  {parseInt(formData.tech_no_of) >= 9 && (
                    <>
                    <div class="col-span-4  vc10" id="a10">
                        <label for="v10" class="text-[14px] text-blue-800">a<sub class="text-[12px] text-blue-800">10</sub>:</label>
                        <div class="w-full py-2">
                            <input
                                type="number"
                                step="any"
                                name="tech_v10"
                                id="tech_v10"
                                className="input my-2"
                                aria-label="input"
                                placeholder="00"
                                value={formData.tech_v10}
                                onChange={handleChange}
                              />
                        </div>
                    </div>
                    </>
                   )}
            
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
            <div className="w-full mx-auto p-4 lg:p-8 md:p-8 bg-white rounded-lg shadow-md space-y-6 result">
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
                <div className="w-full result mx-auto p-4 lg:p-8 md:p-8 bg-white rounded-lg shadow-md space-y-6 result">
                  <div>
                    <ResultActions lang={data?.payload?.tech_lang_keys} />

                    <div class="rounded-lg  flex items-center justify-center">
                        <div class="w-full mt-3">
                            <div class="w-full">
                                <div class="w-full text-[16px] overflow-auto">
                                <p className="mt-3 text-[18px]">
                                <strong>{data?.payload?.tech_lang_keys[2]}</strong>
                              </p>

                              <p className="mt-3">
                                <strong>
                                  <InlineMath math={
                                    result?.tech_final_result?.includes(0)
                                      ? result.tech_final_result
                                          .map((val, i) => (val === 0 ? result.tech_ans[i] : null))
                                          .filter(Boolean)
                                          .join(", ")
                                      : 'No \\ Rational \\ Roots'
                                  } />
                                </strong>
                              </p>

                              <p className="mt-3 font-s-18">
                                <strong>{data?.payload?.tech_lang_keys[15]}</strong>
                              </p>

                              <p className="mt-3">
                                <strong>
                                  <InlineMath math={result?.tech_uq?.join(", ") || ""} />
                                </strong>
                              </p>

                              <p className="mt-3">
                                <strong>{data?.payload?.tech_lang_keys[3]}</strong>
                              </p>

                              <p className="mt-3">{data?.payload?.tech_lang_keys[4]}</p>

                              <p className="mt-3">
                                {data?.payload?.tech_lang_keys[5]} {result?.tech_p}
                              </p>

                              <p className="mt-3">{data?.payload?.tech_lang_keys[6]}</p>

                              <p className="mt-3">
                                <InlineMath math={result?.tech_final_p?.join(", ") || ""} />
                              </p>

                              <p className="mt-3">
                                {data?.payload?.tech_lang_keys[7]} {result?.tech_q}
                              </p>

                              <p className="mt-3">
                                <InlineMath math={result?.tech_final_q?.join(", ") || ""} />
                              </p>

                              <p className="mt-3">{data?.payload?.tech_lang_keys[9]}</p>
                              <p className="mt-3">{data?.payload?.tech_lang_keys[10]}</p>

                              <p className="mt-3">
                                <InlineMath math={result?.tech_main_ans?.join(", ") || ""} />
                              </p>

                              <p className="mt-3">{data?.payload?.tech_lang_keys[11]}</p>
                              <p className="mt-3">{data?.payload?.tech_lang_keys[12]}</p>

                              <p className="col s12 margin_zero center padding_0 font_size16">
                                <InlineMath math={result?.tech_uq?.join(", ") || ""} />
                              </p>

                              <p className="mt-3">{data?.payload?.tech_lang_keys[13]}</p>
                            {result?.tech_uq?.map((val, i) => (
                              <React.Fragment key={i}>
                                <p className="mt-3">
                                  <InlineMath math={`\\text{${data?.payload?.tech_lang_keys[18]}}\\ ${val}`} />
                                </p>

                              <p className="mt-3">
                                {data?.payload?.tech_lang_keys[19]}: <InlineMath math={result?.tech_eq?.[i] || ""} />
                              </p>


                                <p className="mt-3">{result?.tech_result?.[i]}</p>

                                <p className="mt-3">
                                  <InlineMath math={`\\text{${data?.payload?.tech_lang_keys[14]}}\\ ${result?.tech_final_result?.[i] || ""}`} />
                                </p>
                              </React.Fragment>
                            ))}

                              <p className="mt-3">{data?.payload?.tech_lang_keys[16]}</p>
                              <p className="mt-3">
                                <InlineMath
                                  math={(() => {
                                    const indexes = result?.tech_final_result?.reduce(
                                      (acc, val, i) => (val === 0 ? [...acc, i] : acc),
                                      []
                                    );
                                    if (indexes?.length > 0) {
                                      return indexes
                                        .map((idx) => result?.tech_ans?.[idx])
                                        .join(", ");
                                    } else {
                                      return "No \\ Rational \\ Roots";
                                    }
                                  })()}
                                />
                              </p>

                              <p className="mt-3">{data?.payload?.tech_lang_keys[15]}</p>
                              <p className="mt-3">
                                <InlineMath math={result?.tech_uq?.join(", ") || ""} />
                              </p>

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

export default RationalZerosCalculator;
