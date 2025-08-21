import React, { useEffect, useState } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
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
  useTangentCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useTangentCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const TangentCalculator = () => {
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
    tech_angle: 60,
      tech_angle_unit: "deg" //  deg  pirad  mrad  rad
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useTangentCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
        setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_angle || !formData.tech_angle_unit ) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_angle: formData.tech_angle,
        tech_angle_unit: formData.tech_angle_unit,

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

        tech_angle: 60,
      tech_angle_unit: "deg" //  deg  pirad  mrad  rad

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
  setFormData((prev) => ({ ...prev, tech_angle_unit: unit }));
  setDropdownVisible(false);
};

const toggleDropdown = () => {
  setDropdownVisible(!dropdownVisible);
};


// resut
 const degSymbol =
    formData?.tech_angle_unit === "deg"
      ? "°"
      : formData?.tech_angle_unit === "pirad"
      ? " * π"
      : "";

  const tan = result?.tech_tan;

  const table = {
    "1.73205081": "\\sqrt{3}",
    "-1.73205081": "-\\sqrt{3}",
    "0.57735027": "\\frac{1}{\\sqrt{3}} = \\frac{\\sqrt{3}}{3}",
    "-0.57735027": "-\\frac{1}{\\sqrt{3}} = -\\frac{\\sqrt{3}}{3}",
  };

  const formattedValue = table[parseFloat(tan)?.toFixed(8)] || null;


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

        <div className="lg:w-[60%] md:w-[80%] w-full mx-auto ">
                  <div className="grid grid-cols-12 mt-3 gap-2 md:gap-4 lg:gap-4">
                      <div className="col-span-12">
                          <label htmlFor="tech_angle" className="label" >
                      { data?.payload?.tech_lang_keys["1"]} (θ)
                        </label>
                        <div className="relative w-full ">
                          <input
                            type="number"
                            name="tech_angle"
                            step="any"
                            className="mt-1 input"
                            value={formData.tech_angle}
                            placeholder="00"
                            onChange={handleChange}
                          />
                          <label
                            className="absolute cursor-pointer text-sm underline right-6 top-4"
                            onClick={toggleDropdown}
                          >
                            {formData.tech_angle_unit} ▾
                          </label>
                          {dropdownVisible && (
                            <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                              {[
                                     { label: "degrees (deg)", value: "deg" },
                                       { label: "radians (rad)", value: "rad" },
                                       { label: "milliradians (mrad)", value: "mrad" },
                                    { label: "* π rad (pirad)", value: "pirad" },
                               
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
                      <div className="col-span-12 flex justify-center text-center">
                          <img  src="/images/tan_prop.svg"  height="100%" width="70%" alt="tangent Graph"  loading="lazy" decoding="async"/>
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
                <div className="w-full result mx-auto p-4 lg:p-8 md:p-8 result_calculator rounded-lg space-y-6 result">
                  <div>
                    <ResultActions lang={data?.payload?.tech_lang_keys} />
          
                      <div className="rounded-lg flex items-center justify-center">
                          <div className="w-full mt-3">
                            <div className="w-full">
                              <div className="w-full md:w-[60%] lg:w-[60%] overflow-auto mt-2">
                                <table className="w-full text-[16px]">
                                  <tbody>
                                  {formData?.tech_angle_unit === "deg" && formattedValue && (
                                    <tr>
                                      <td className="py-2 border-b" width="60%">
                                        <strong>
                                          tan({formData?.tech_angle}
                                          {degSymbol})
                                        </strong>
                                      </td>
                                      <td className="py-2 border-b">
                                        <BlockMath math={formattedValue} />
                                      </td>
                                    </tr>
                                  )}
                                  <tr>
                                    <td className="py-2 border-b" width="60%">
                                      <strong>
                                        tan({formData?.tech_angle}
                                        {degSymbol})
                                      </strong>
                                    </td>
                                    <td className="py-2 border-b">{tan}</td>
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

export default TangentCalculator;
