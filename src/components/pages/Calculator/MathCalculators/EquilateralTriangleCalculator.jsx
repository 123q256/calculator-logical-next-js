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
  useEquilateralTriangleCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useEquilateralTriangleCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const EquilateralTriangleCalculator = () => {
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
    tech_operations: "side", // side perimeter  semiperimeter   area  altitude
  tech_first: 12,
  tech_unit1: "cm"
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useEquilateralTriangleCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
        setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_operations ) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_operations: formData.tech_operations,
        tech_first: formData.tech_first,
        tech_unit1: formData.tech_unit1,

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

    tech_operations: "side", // side perimeter  semiperimeter   area  altitude
    tech_first: 12,
    tech_unit1: "cm"

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
  setFormData((prev) => ({ ...prev, tech_unit1: unit }));
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
          <div className="w-full mx-auto p-4 lg:p-8 md:p-8 input_form rounded-lg space-y-6 mb-3">
            {formError && (
              <p className="text-red-500 text-lg font-semibold w-full">
                {formError}
              </p>
            )}

            <div className="lg:w-[40%] md:w-[60%] w-full mx-auto ">
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
                        <option value="side" >{data?.payload?.tech_lang_keys[2]} P, s, K, h | {data?.payload?.tech_lang_keys[3]} a</option>
                        <option value="perimeter" >{data?.payload?.tech_lang_keys[2]} a, s, K, h | {data?.payload?.tech_lang_keys[3]} P</option>
                        <option value="semiperimeter" >{data?.payload?.tech_lang_keys[2]} a, P, K, h | {data?.payload?.tech_lang_keys[3]} s</option>
                        <option value="area" >{data?.payload?.tech_lang_keys[2]} a, P, s, h | {data?.payload?.tech_lang_keys[3]} K</option>
                        <option value="altitude" >{data?.payload?.tech_lang_keys[2]} a, P, s, K | {data?.payload?.tech_lang_keys[3]} h</option>
                      </select>
                    </div>
                </div>
                <div className="col-span-12">
                    {formData.tech_operations == "side" && (
                      <>
                      <label htmlFor="tech_first" className="label" > a:  </label>
                      </>
                      )}
                    {formData.tech_operations == "perimeter" && (
                      <>
                      <label htmlFor="tech_first" className="label" > P:  </label>
                      </>
                      )}
                    {formData.tech_operations == "semiperimeter" && (
                      <>
                      <label htmlFor="tech_first" className="label" > s:  </label>
                      </>
                      )}
                    {formData.tech_operations == "area" && (
                      <>
                      <label htmlFor="tech_first" className="label" > K:  </label>
                      </>
                      )}
                    {formData.tech_operations == "altitude" && (
                      <>
                      <label htmlFor="tech_first" className="label" > h:  </label>
                      </>
                      )}



                        <div className="relative w-full ">
                          <input
                            type="number"
                            name="tech_first"
                            step="any"
                            className="mt-1 input"
                            value={formData.tech_first}
                            placeholder="00"
                            onChange={handleChange}
                          />
                          <label
                            className="absolute cursor-pointer text-sm underline right-6 top-4"
                            onClick={toggleDropdown}
                          >
                            {formData.tech_unit1} ▾
                          </label>
                          {dropdownVisible && (
                            <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                              {[
                                     { label: "centimeters (cm)", value: "cm" },
                                       { label: "milimeters (mm)", value: "mm" },
                                       { label: "meters (m)", value: "m" },
                                    { label: "kilometers (km)", value: "km" },
                                    { label: "inches (in)", value: "in" },
                                    { label: "yards (yd)", value: "yd" },

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
                            <div className="w-full bg-light-blue result p-3 radius-10 mt-3">
                                <div className="w-full">
                                    <div className="w-full md:w-[60%] lg:w-[60%] overflow-auto mt-2">
                                        <table className="w-full text-[16px]">
                                            <tr>
                                                <td className="py-2 border-b" width="50%"><strong>{ data?.payload?.tech_lang_keys[4] }</strong></td>
                                                <td className="py-2 border-b">{Number(result?.tech_a).toFixed(3)} {result?.tech_unit}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 border-b" width="50%"><strong>{ data?.payload?.tech_lang_keys[5] }</strong></td>
                                                <td className="py-2 border-b">{Number(result?.tech_k).toFixed(3)} {result?.tech_unit}<sup>2</sup></td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 border-b" width="50%"><strong>{ data?.payload?.tech_lang_keys[6] }</strong></td>
                                                <td className="py-2 border-b">{Number(result?.tech_p).toFixed(3)} {result?.tech_unit}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 border-b" width="50%"><strong>{ data?.payload?.tech_lang_keys[7] }</strong></td>
                                                <td className="py-2 border-b">{Number(result?.tech_s).toFixed(3)} {result?.tech_unit}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-2 border-b" width="50%"><strong>{ data?.payload?.tech_lang_keys[8] }</strong></td>
                                                <td className="py-2 border-b">{Number(result?.tech_h).toFixed(3)} {result?.tech_unit}</td>
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

export default EquilateralTriangleCalculator;
