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
//   useTangentPlaneCalculatorMutation,
// } from "../../../redux/services/calculator/calculatorApi";

import {
  useGetSingleCalculatorDetailsMutation,
} from "../../../redux/services/calculator/calculatorApi";

import {
  useTangentPlaneCalculatorMutation,
} from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const TangentPlaneCalculator = () => {
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
    tech_type : "two", //two three
    tech_eq : "x^3 - 3xy + y^3",
    tech_x : 1,
    tech_y : 2,
    tech_z : 5
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useTangentPlaneCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
        setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_type  ) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_type: formData.tech_type,
        tech_eq: formData.tech_eq,
        tech_x: formData.tech_x,
        tech_y: formData.tech_y,
        tech_z: formData.tech_z,

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

        tech_type : "two", //two three
      tech_eq : "x^3 - 3xy + y^3",
      tech_x : 1,
      tech_y : 2,
      tech_z : 5

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

const x = formData?.tech_x ?? '';
const y = formData?.tech_y ?? '';
const z = formData?.tech_z ?? '';

const s1 = result?.tech_diffa?.replace(/x/g, `(${x})`).replace(/y/g, `(${y})`);
const s2 = result?.tech_diffb?.replace(/x/g, `(${x})`).replace(/y/g, `(${y})`);
const s3 = result?.tech_eq?.replace(/x/g, `(${x})`).replace(/y/g, `(${y})`);


// const x = formData?.tech_x ?? '';
// const y = formData?.tech_y ?? '';
// const z = formData?.tech_z ?? '';

function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}


const rawDiffa = result?.tech_diffa || '';
const rawDiffb = result?.tech_diffb || '';
const rawDiffc = result?.tech_diffc || '';
const rawAns   = result?.tech_ans || '';

const diffa = decodeHtml(rawDiffa);
const diffb = decodeHtml(rawDiffb);
const diffc = decodeHtml(rawDiffc);
const ans   = decodeHtml(rawAns).replace(/frac/g, 'dfrac');

const a = result?.tech_a ?? '';
const b = result?.tech_b ?? '';
const c = result?.tech_c ?? '';
const t = result?.tech_t ?? '';

// Substitute values
const ss1 = diffa.replace(/x/g, `(${x})`).replace(/y/g, `(${y})`).replace(/z/g, `(${z})`);
const ss2 = diffb.replace(/x/g, `(${x})`).replace(/y/g, `(${y})`).replace(/z/g, `(${z})`);
const ss3 = diffc.replace(/x/g, `(${x})`).replace(/y/g, `(${y})`).replace(/z/g, `(${z})`);





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
             <div class="lg:w-[50%] md:w-[50%] w-full mx-auto ">
              <div class="col-12 col-lg-9 mx-auto mt-2 w-full">
                 <input
                  type="hidden"
                  name="tech_type"
                  id="calculator_time"
                  value={formData.tech_type}
                />
                <div className="flex flex-wrap items-center bg-green-100 border border-green-500 text-center rounded-lg px-1">
                  {/* Date Cal Tab */}
                <div class="lg:w-1/2 w-full px-2 py-1">
                    <div
                      className={`bg-white px-3 py-2 cursor-pointer rounded-md transition-colors duration-300 hover_tags hover:text-white pacetab  ${
                        formData.tech_type === "two" ? "tagsUnit" : ""
                      }`}
                      id="two"
                       onClick={() => {
                        setFormData({ ...formData, tech_type: "two" });
                        setResult(null);
                        setFormError(null);
                      } }
                      
                    >
                      { data?.payload?.tech_lang_keys['10'] }
                    </div>
                  </div>
                  {/* Time Cal Tab */}
                <div class="lg:w-1/2 w-full px-2 py-1">
                    <div
                      className={`bg-white px-3 py-2 cursor-pointer rounded-md transition-colors duration-300 hover_tags hover:text-white pacetab ${
                        formData.tech_type === "three" ? "tagsUnit" : ""
                      }`}
                      id="three"
                       onClick={() => {
                        setFormData({ ...formData, tech_type: "three" });
                        setResult(null);
                        setFormError(null);
                      } }
                    >
                        { data?.payload?.tech_lang_keys['11'] }
                    </div>
                  </div>
                </div>
            </div>
                <div class="grid grid-cols-12 mt-3   gap-2 md:gap-4 lg:gap-4">

                <div class="col-span-12">
                   <label htmlFor="tech_eq" className="label">
                      {data?.payload?.tech_lang_keys["1"]}:
                        </label>
                        <div class=" relative">
                        <input
                          type="text"
                          step="any"
                          name="tech_eq"
                          id="tech_eq"
                          className="input my-2"
                          aria-label="input"
                  	      placeholder="00"
                          value={formData.tech_eq}
                          onChange={handleChange}
                        />
                        </div>
                </div>

                <div className={formData.tech_type === "three" ? "col-span-4" : "col-span-6"}  id="xValue">
                   <label htmlFor="tech_x" className="label">
                      {data?.payload?.tech_lang_keys["2"]}  x:
                        </label>
                        <div class=" relative">
                        <input
                          type="number"
                          step="any"
                          name="tech_x"
                          id="tech_x"
                          className="input my-2"
                          aria-label="input"
                     	  placeholder="00"
                          value={formData.tech_x}
                          onChange={handleChange}
                        />
                        </div>
                </div>
                <div className={formData.tech_type === "three" ? "col-span-4" : "col-span-6"} id="yValue">
                   <label htmlFor="tech_y" className="label">
                      {data?.payload?.tech_lang_keys["2"]}  y:
                        </label>
                        <div class=" relative">
                        <input
                          type="number"
                          step="any"
                          name="tech_y"
                          id="tech_y"
                          className="input my-2"
                          aria-label="input"
                     	  placeholder="00"
                          value={formData.tech_y}
                          onChange={handleChange}
                        />
                        </div>
                </div>
                {formData.tech_type == "three" && (
                  <>
                  <div class="col-span-4 " id="zValue">
                      <label htmlFor="tech_z" className="label">
                        {data?.payload?.tech_lang_keys["2"]}  z:
                          </label>
                          <div class=" relative">
                          <input
                            type="number"
                            step="any"
                            name="tech_z"
                            id="tech_z"
                            className="input my-2"
                            aria-label="input"
                          placeholder="00"
                            value={formData.tech_z}
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
                              <div class="w-full text-[16px]">
                                  {(formData?.tech_type==='two') ? (
                                    <>
                                   <div className="mt-3 text-[18px]">
                                    <BlockMath math={`z = ${result?.tech_t?.replace(/frac/g, 'dfrac')}`} />

                                    <p className="mt-3"><strong>{data?.payload?.tech_lang_keys['5']}:</strong></p>
                                    <p className="mt-3">{data?.payload?.tech_lang_keys['6']}:</p>
                                    <BlockMath math={`z = a(x - x_0) + b(y - y_0) + z_0`} />

                                    <p className="mt-3">{data?.payload?.tech_lang_keys['7']} w.r.t (x): f'(x)</p>
                                    <BlockMath math={result?.tech_diffa} />

                                    <div className="w-full my-3">
                                      <button type="button" className="calculate repeat">{data?.payload?.tech_lang_keys['13']}</button>
                                    </div>
                                    <div className="w-full res_step hidden" id="step_cal" dangerouslySetInnerHTML={{ __html: result?.tech_stepsx }} />

                                    <p className="mt-3">{data?.payload?.tech_lang_keys['7']} w.r.t (y): f'(y)</p>
                                    <BlockMath math={result?.tech_diffb} />

                                    <div className="w-full my-3">
                                      <button type="button" className="calculate repeat1">{data?.payload?.tech_lang_keys['13']}</button>
                                    </div>
                                    <div className="w-full res_step hidden" id="step_cal1" dangerouslySetInnerHTML={{ __html: result?.tech_stepsy }} />

                                    <p className="mt-3">{data?.payload?.tech_lang_keys['8']} (a):</p>
                                    <BlockMath math={`f_x = ${result?.tech_diffa}`} />
                                    <BlockMath math={`f_x(${x}, ${y}) = ${s1}`} />
                                    <BlockMath math={`f_x(${x}, ${y}) = ${result?.tech_a}`} />

                                    <p className="mt-3">{data?.payload?.tech_lang_keys['8']} (b):</p>
                                    <BlockMath math={`f_y = ${result?.tech_diffb}`} />
                                    <BlockMath math={`f_y(${x}, ${y}) = ${s2}`} />
                                    <BlockMath math={`f_y(${x}, ${y}) = ${result?.tech_b}`} />

                                    <p className="mt-3">{data?.payload?.tech_lang_keys['8']} (z₀):</p>
                                    <BlockMath math={`f(x, y) = ${result?.tech_eq}`} />
                                    <BlockMath math={`f(${x}, ${y}) = ${s3}`} />
                                    <BlockMath math={`f(${x}, ${y}) = ${result?.tech_c}`} />

                                    <p className="mt-3">Finally, {data?.payload?.tech_lang_keys['8']} (z):</p>
                                    <BlockMath math={`x_0 = ${x}, \\quad y_0 = ${y}, \\quad z_0 = ${result?.tech_c}`} />
                                    <BlockMath math={`z = a(x - x_0) + b(y - y_0) + z_0`} />
                                    <BlockMath
                                      math={`z = (${result?.tech_a})(x - (${x})) + (${result?.tech_b})(y - (${y})) + (${result?.tech_c})`}
                                    />
                                    <BlockMath math={`z = \\color{#1670a7}{${result?.tech_t}}`} />
                                  </div>
                                    
                                    </>
                                  ):(
                                    <>

                                      <div className="text-[18px] mt-3 space-y-4">
  <BlockMath math={`z = ${ans}`} />
  <p><strong>{data?.payload?.tech_lang_keys['5']}:</strong></p>
  <p>{data?.payload?.tech_lang_keys['6']}:</p>
  <BlockMath math={`a(x - x_0) + b(y - y_0) + c(z - z_0) = 0`} />

  <p>{data?.payload?.tech_lang_keys['7']} w.r.t (x): f'(x)</p>
  <BlockMath math={diffa} />

  <p>{data?.payload?.tech_lang_keys['7']} w.r.t (y): f'(y)</p>
  <BlockMath math={diffb} />

  <p>{data?.payload?.tech_lang_keys['7']} w.r.t (z): f'(z)</p>
  <BlockMath math={diffc} />

  <p>{data?.payload?.tech_lang_keys['8']} (a):</p>
  <BlockMath math={`f_x = ${diffa}`} />
  <BlockMath math={`f_x(${x}, ${y}, ${z}) = ${ss1}`} />
  <BlockMath math={`f_x(${x}, ${y}, ${z}) = ${a}`} />

  <p>{data?.payload?.tech_lang_keys['8']} (b):</p>
  <BlockMath math={`f_y = ${diffb}`} />
  <BlockMath math={`f_y(${x}, ${y}, ${z}) = ${ss2}`} />
  <BlockMath math={`f_y(${x}, ${y}, ${z}) = ${b}`} />

  <p>{data?.payload?.tech_lang_keys['8']} (c):</p>
  <BlockMath math={`f_z = ${diffc}`} />
  <BlockMath math={`f_z(${x}, ${y}, ${z}) = ${ss3}`} />
  <BlockMath math={`f_z(${x}, ${y}, ${z}) = ${c}`} />

  <p>{data?.payload?.tech_lang_keys['9']}, {data?.payload?.tech_lang_keys['8']} {data?.payload?.tech_lang_keys['4']}:</p>
  <BlockMath math={`x_0 = ${x}, \\quad y_0 = ${y}, \\quad z_0 = ${z}`} />
  <BlockMath math={`a(x - x_0) + b(y - y_0) + c(z - z_0) = 0`} />
  <BlockMath math={`(${a})(x - (${x})) + (${b})(y - (${y})) + (${c})(z - (${z})) = 0`} />
  <BlockMath math={`${t} = 0`} />

  <p>{data?.payload?.tech_lang_keys['12']}:</p>
  <BlockMath math={`z = \\textcolor{orange}{${ans}}`} />
</div>

                                      
                                    
                                    </>
                                  )}
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

export default TangentPlaneCalculator;
