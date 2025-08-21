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
  useVolumeOfSquareMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useVolumeOfSquareMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const VolumeOfSquareCalculator = () => {
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
      tech_length: 545,
      tech_length_unit: "ft",
      tech_height: 435,
      tech_height_unit: "in",
      tech_width: 235,
      tech_width_unit: "cm"
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useVolumeOfSquareMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
        setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_length || !formData.tech_height ) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_length: formData.tech_length,
        tech_length_unit: formData.tech_length_unit,
        tech_height: formData.tech_height,
        tech_height_unit: formData.tech_height_unit,
        tech_width: formData.tech_width,
        tech_width_unit: formData.tech_width_unit,

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

        tech_length: 545,
      tech_length_unit: "ft",
      tech_height: 435,
      tech_height_unit: "in",
      tech_width: 235,
      tech_width_unit: "cm"

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
  setFormData((prev) => ({ ...prev, tech_length_unit: unit }));
  setDropdownVisible(false);
};

const toggleDropdown = () => {
  setDropdownVisible(!dropdownVisible);
};



//dropdown states
  const [dropdownVisible1, setDropdownVisible1] = useState(false);

const setUnitHandler1 = (unit) => {
  setFormData((prev) => ({ ...prev, tech_height_unit: unit }));
  setDropdownVisible1(false);
};

const toggleDropdown1 = () => {
  setDropdownVisible1(!dropdownVisible1);
};



//dropdown states
  const [dropdownVisible2, setDropdownVisible2] = useState(false);

const setUnitHandler2 = (unit) => {
  setFormData((prev) => ({ ...prev, tech_width_unit: unit }));
  setDropdownVisible2(false);
};

const toggleDropdown2 = () => {
  setDropdownVisible2(!dropdownVisible2);
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
          <div className="w-full mx-auto p-4 lg:p-8 md:p-8 bg-white rounded-lg shadow-md space-y-6 mb-3">
            {formError && (
              <p className="text-red-500 text-lg font-semibold w-full">
                {formError}
              </p>
            )}

             <div class="lg:w-[50%] md:w-[50%] w-full mx-auto ">
                <div class="grid grid-cols-12 mt-3   gap-2 md:gap-4 lg:gap-4">
                    <div class="col-span-12">
                      <label htmlFor="tech_length" className="label" >
                          { data?.payload?.tech_lang_keys["1"]}
                            </label>
                            <div className="relative w-full ">
                              <input
                                type="number"
                                name="tech_length"
                                step="any"
                                className="mt-1 input"
                                value={formData.tech_length}
                                placeholder="00"
                                onChange={handleChange}
                              />
                              <label
                                className="absolute cursor-pointer text-sm underline right-6 top-3"
                                onClick={toggleDropdown}
                              >
                                {formData.tech_length_unit} ▾
                              </label>
                              {dropdownVisible && (
                                <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                                  {[
                                        { label: "centimeters (cm)", value: "cm" },
                                        { label: "milimeters (mm)", value: "mm" },
                                        { label: "meters (m)", value: "m" },
                                        { label: "kilometers (km)", value: "km" },
                                        { label: "inches (in)", value: "in" },
                                        { label: "feets (ft)", value: "ft" },
                                        { label: "yards (yd)", value: "yd" },
                                        { label: "miles (mi)", value: "mi" },
                                        { label: "nautical mile (nmi)", value: "nmi" },
                                  
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
                    <div class="col-span-12">
                        <label htmlFor="tech_height" className="label" >
                          { data?.payload?.tech_lang_keys["2"]}
                            </label>
                            <div className="relative w-full ">
                              <input
                                type="number"
                                name="tech_height"
                                step="any"
                                className="mt-1 input"
                                value={formData.tech_height}
                                placeholder="00"
                                onChange={handleChange}
                              />
                              <label
                                className="absolute cursor-pointer text-sm underline right-6 top-3"
                                onClick={toggleDropdown1}
                              >
                                {formData.tech_height_unit} ▾
                              </label>
                              {dropdownVisible1 && (
                                <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                                  {[
                                        { label: "centimeters (cm)", value: "cm" },
                                        { label: "milimeters (mm)", value: "mm" },
                                        { label: "meters (m)", value: "m" },
                                        { label: "kilometers (km)", value: "km" },
                                        { label: "inches (in)", value: "in" },
                                        { label: "feets (ft)", value: "ft" },
                                        { label: "yards (yd)", value: "yd" },
                                        { label: "miles (mi)", value: "mi" },
                                        { label: "nautical mile (nmi)", value: "nmi" },
                                  
                                  ].map((unit, index) => (
                                    <p
                                      key={index}
                                      className="p-2 hover:bg-gray-100 cursor-pointer"
                                      onClick={() => setUnitHandler1(unit.value)}
                                    >
                                      {unit.label}
                                    </p>
                                  ))}
                                </div>
                                )}
                            </div>

                    </div>
                    <div class="col-span-12">
                      <label htmlFor="tech_width" className="label" >
                          { data?.payload?.tech_lang_keys["3"]}
                            </label>
                            <div className="relative w-full ">
                              <input
                                type="number"
                                name="tech_width"
                                step="any"
                                className="mt-1 input"
                                value={formData.tech_width}
                                placeholder="00"
                                onChange={handleChange}
                              />
                              <label
                                className="absolute cursor-pointer text-sm underline right-6 top-3"
                                onClick={toggleDropdown2}
                              >
                                {formData.tech_width_unit} ▾
                              </label>
                              {dropdownVisible2 && (
                                <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                                  {[
                                        { label: "centimeters (cm)", value: "cm" },
                                        { label: "milimeters (mm)", value: "mm" },
                                        { label: "meters (m)", value: "m" },
                                        { label: "kilometers (km)", value: "km" },
                                        { label: "inches (in)", value: "in" },
                                        { label: "feets (ft)", value: "ft" },
                                        { label: "yards (yd)", value: "yd" },
                                        { label: "miles (mi)", value: "mi" },
                                        { label: "nautical mile (nmi)", value: "nmi" },
                                  
                                  ].map((unit, index) => (
                                    <p
                                      key={index}
                                      className="p-2 hover:bg-gray-100 cursor-pointer"
                                      onClick={() => setUnitHandler2(unit.value)}
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
                            <div class="w-full md:w-[60%] lg:w-[60%] mt-2">
                                <table class="w-full text-[18px]">
                                    <tr>
                                        <td class="py-2 border-b" width="60%"><strong>{ data?.payload?.tech_lang_keys[4] }</strong></td>
                                        <td class="py-2 border-b">{Number(result?.tech_answer).toFixed(4)} in³</td>
                                    </tr>
                                </table>
                            </div>
                            <p class="col-12 mt-3"><strong>{ data?.payload?.tech_lang_keys['5'] }</strong></p>
                            <div class="w-full md:w-[60%] lg:w-[60%]">                    
                                <table class="w-full text-[16px]">
                                    <tr>
                                        <td class="py-2 border-b" width="60%">mm³</td>
                                        <td class="py-2 border-b"><strong>{ Number(result?.tech_answer * 16390 ).toFixed(4)}</strong></td>
                                    </tr>
                                    <tr>
                                        <td class="py-2 border-b">m³</td>
                                        <td class="py-2 border-b"><strong>{Number(result?.tech_answer / 61020).toFixed(4)}</strong></td>
                                    </tr>
                                    <tr>
                                        <td class="py-2 border-b">ft³</td>
                                        <td class="py-2 border-b"><strong>{Number(result?.tech_answer / 1728).toFixed(4)}</strong></td>
                                    </tr>
                                    <tr>
                                        <td class="py-2 border-b">cm³</td>
                                        <td class="py-2 border-b"><strong>{Number(result?.tech_answer * 16.387).toFixed(4)}</strong></td>
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

export default VolumeOfSquareCalculator;
