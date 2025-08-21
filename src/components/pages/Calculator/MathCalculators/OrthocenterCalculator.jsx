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
  useOrthocenterCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useOrthocenterCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const OrthocenterCalculator = () => {
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
     tech_x1: 4,
     tech_y1: 3,
     tech_x2: 7,
     tech_y2: 5,
     tech_x3: 9,
     tech_y3: 1
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useOrthocenterCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
        setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_x1: formData.tech_x1,
        tech_y1: formData.tech_y1,
        tech_x2: formData.tech_x2,
        tech_y2: formData.tech_y2,
        tech_x3: formData.tech_x3,
        tech_y3: formData.tech_y3,

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
      tech_x1: 4,
     tech_y1: 3,
     tech_x2: 7,
     tech_y2: 5,
     tech_x3: 9,
     tech_y3: 1

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
          <div className="w-full mx-auto p-4 lg:p-8 md:p-8 input_form rounded-lg  space-y-6 mb-3">
            {formError && (
              <p className="text-red-500 text-lg font-semibold w-full">
                {formError}
              </p>
            )}

             <div className="lg:w-[50%] md:w-[80%] w-full mx-auto ">
                <div className="grid grid-cols-12 mt-3 gap-2 md:gap-4 lg:gap-4">
                    <p className="col-span-12"><strong>{data?.payload?.tech_lang_keys[1]} A:</strong></p>
                    <div className="col-span-6">
                         <label htmlFor="tech_x1" className="label">
                          x₁
                          </label>
                          <div className=" relative">
                          <input
                            type="number"
                            step="any"
                            name="tech_x1"
                            id="tech_x1"
                            className="input my-2"
                            aria-label="input"
                            placeholder="00"
                            value={formData.tech_x1}
                            onChange={handleChange}
                          />
                          </div>
                    </div>
                    <div className="col-span-6">
                        <label htmlFor="tech_y1" className="label">
                          y₁
                          </label>
                          <div className=" relative">
                          <input
                            type="number"
                            step="any"
                            name="tech_y1"
                            id="tech_y1"
                            className="input my-2"
                            aria-label="input"
                            placeholder="00"
                            value={formData.tech_y1}
                            onChange={handleChange}
                          />
                          </div>
                    </div>
                    <p className="col-span-12"><strong>{data?.payload?.tech_lang_keys[1]} B:</strong></p>
                    <div className="col-span-6">
                       <label htmlFor="tech_x2" className="label">
                          x₂
                          </label>
                          <div className=" relative">
                          <input
                            type="number"
                            step="any"
                            name="tech_x2"
                            id="tech_x2"
                            className="input my-2"
                            aria-label="input"
                            placeholder="00"
                            value={formData.tech_x2}
                            onChange={handleChange}
                          />
                          </div>
                     
                    </div>
                    <div className="col-span-6">
                      <label htmlFor="tech_y2" className="label">
                          y₂
                          </label>
                          <div className=" relative">
                          <input
                            type="number"
                            step="any"
                            name="tech_y2"
                            id="tech_y2"
                            className="input my-2"
                            aria-label="input"
                            placeholder="00"
                            value={formData.tech_y2}
                            onChange={handleChange}
                          />
                          </div>
                     
                    </div>
                    <p className="col-span-12"><strong>{data?.payload?.tech_lang_keys[1]} C:</strong></p>
                    <div className="col-span-6">
                        <label htmlFor="tech_x3" className="label">
                          x₃
                          </label>
                          <div className=" relative">
                          <input
                            type="number"
                            step="any"
                            name="tech_x3"
                            id="tech_x3"
                            className="input my-2"
                            aria-label="input"
                            placeholder="00"
                            value={formData.tech_x3}
                            onChange={handleChange}
                          />
                          </div>
                  
                    </div>
                    <div className="col-span-6">
                       <label htmlFor="tech_y3" className="label">
                          y₃
                          </label>
                          <div className=" relative">
                          <input
                            type="number"
                            step="any"
                            name="tech_y3"
                            id="tech_y3"
                            className="input my-2"
                            aria-label="input"
                            placeholder="00"
                            value={formData.tech_y3}
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
                <div className="w-full h-[30px] bg-gray-300 animate-pulse rounded-[10px] mb-4"></div>
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
                                  <div className="w-full md:w-[60%] lg:w-[60%] mt-2 overflow-auto">
                                      <table className="w-full text-[16px]">
                                        <tbody>
                                          <tr>
                                              <td className="py-2 border-b" width="60%"><strong>x = </strong></td>
                                              <td className="py-2 border-b">{result?.tech_x}</td>
                                          </tr>
                                          <tr>
                                              <td className="py-2 border-b" width="60%"><strong>y = </strong></td>
                                              <td className="py-2 border-b">{result?.tech_y}</td>
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

export default OrthocenterCalculator;
