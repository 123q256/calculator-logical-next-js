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
  useECalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useECalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const ECalculator = () => {
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
    tech_cal: "ex",// ax  10x ex
    tech_x: 2,
    tech_a: 5
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useECalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
        setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_cal  ) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_cal: formData.tech_cal,
        tech_x: formData.tech_x,
        tech_a: formData.tech_a,


      }).unwrap();
      setResult(response?.payload); // Assuming the response has 'lovePercentage'
      toast.success(
       "Successfully Calculated"
      );
    } catch (err) {
 setFormError(err.data.payload.error);
      toast.error(err.data.payload.error);
    }
  };

  // Handle reset form
  const handleReset = () => {
    setFormData({  

      tech_cal: "ex",// ax  10x ex
    tech_x: 2,
    tech_a: 5

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

            <div class="lg:w-[40%] md:w-[60%] w-full mx-auto ">
            <div class="grid grid-cols-12 mt-3   gap-2 md:gap-4 lg:gap-4">
                <div class="col-span-12">
                     <label htmlFor="tech_cal" className="label">
                      {data?.payload?.tech_lang_keys["1"]}:
                    </label>
                    <div className="mt-2">
                      <select
                        className="input"
                        aria-label="select"
                        name="tech_cal"
                        id="tech_cal"
                        value={formData.tech_cal}
                        onChange={handleChange}
                      >
                        <option value="ex">eˣ</option>
                        <option value="10x">10x </option>
                        <option value="ax">aˣ </option>
                      </select>
                    </div>
                </div>
                {formData.tech_cal == "ax" && (
                  <>
                  <div class="col-span-12 angle_show">
                    <label htmlFor="tech_a" className="label">
                        {data?.payload?.tech_lang_keys["2"]}:
                          </label>
                          <div class=" relative">
                          <input
                            type="number"
                            step="any"
                            name="tech_a"
                            id="tech_a"
                            className="input my-2"
                            aria-label="input"
                            placeholder="00"
                            value={formData.tech_a}
                            onChange={handleChange}
                          />
                          </div>
                  </div>
                  </>
                )}
                <div class="col-span-12">
                   <label htmlFor="tech_x" className="label">
                         x:
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

                  <div class="rounded-lg  flex items-center justify-center">
                      <div class="w-full mt-3">
                          <div class="w-full">
                              <div class="w-full md:w-[80%] lg:w-[60%] mt- overflow-auto">
                                  <table class="w-full font-s-18">
                                    <tbody>
                                      <tr>
                                          <td class="py-2 border-b" width="60%">
                                              <strong>
                                                  {(formData?.tech_cal==='ex') ? (
                                                    <>
                                                    <span>e</span>
                                                    </>
                                                  ): (formData?.tech_cal==='10x') ? (
                                                    <>
                                                     <span>10</span>
                                                    </>
                                                  ):(
                                                    <>
                                                     <span>{formData?.tech_a}</span>
                                                    </>
                                                  ) }
                                                  <sup class="text-[16px]">{formData?.tech_x}</sup>
                                              </strong>
                                          </td>
                                          <td class="py-2 border-b">{Number(result?.tech_exp).toFixed(2)}</td>
                                      </tr>
                                      </tbody>
                                  </table>
                              </div>
                              <div class="col-12 text-[16px] mt-2 overflow-auto">
                                  <p><strong>{data?.payload?.tech_lang_keys[3]}</strong></p>
                                  {(formData?.tech_cal==='ex') ? (
                                    <>
                                    <p class="mt-2">e<sup class="text-[16px]">x</sup> = ?</p>
                                    <p class="mt-2">(2.71828)<sup class="text-[16px]">{formData?.tech_x}</sup> = {Number(result?.tech_exp).toFixed(2)}</p>
                                    </>
                                  ): (formData?.tech_cal==='10x') ? (
                                    <>
                                    <p class="mt-2">10<sup class="text-[16px]">x</sup> = ?</p>
                                    <p class="mt-2">(10)<sup class="text-[16px]">{formData?.tech_x}</sup> = {Number(result?.tech_exp).toFixed(2)}</p>
                                    </>
                                  ):(
                                    <>
                                    <p class="mt-2">a<sup class="text-[16px]">x</sup> = ?</p>
                                    <p class="mt-2">({formData?.tech_a})<sup class="text-[16px]">{formData?.tech_x}</sup> = {Number(result?.tech_exp).toFixed(2)}</p>
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

export default ECalculator;
