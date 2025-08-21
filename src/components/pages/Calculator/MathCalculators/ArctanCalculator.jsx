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
  useArctanCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useArctanCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const ArctanCalculator = () => {
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
    tech_arctan: 45,
    tech_round: 5
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useArctanCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
        setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_arctan || !formData.tech_round ) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_arctan: formData.tech_arctan,
        tech_round: formData.tech_round,

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

     tech_arctan: 45,
    tech_round: 5

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

 const angle = result?.tech_angle || 0;
  const radian = result?.tech_rad || 0;
  const roundTo = parseInt(formData?.tech_round || 2);

  const angleResults = [
    (angle + -1 * 180).toFixed(roundTo),
    (angle + 0 * 180).toFixed(roundTo),
    (angle + 1 * 180).toFixed(roundTo),
  ];

  const piRad = radian / Math.PI;
  const radianResults = [
    (piRad - 1).toFixed(roundTo),
    piRad.toFixed(roundTo),
    (piRad + 1).toFixed(roundTo),
  ];

  
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
                <div className="grid grid-cols-12 mt-3 gap-2 md:gap-4 lg:gap-4">
                    <div className="col-span-12">
                         <label htmlFor="tech_arctan" className="label">
                          {data?.payload?.tech_lang_keys["1"]}:
                            </label>
                            <div className=" relative">
                            <input
                              type="number"
                              step="any"
                              name="tech_arctan"
                              id="tech_arctan"
                              className="input my-2"
                              aria-label="input"
                             placeholder="00"
                              value={formData.tech_arctan}
                              onChange={handleChange}
                            />
                            </div>
                    </div>
                    <div className="col-span-12">
                         <label htmlFor="tech_round" className="label">
                          {data?.payload?.tech_lang_keys["2"]}:
                            </label>
                            <div className=" relative">
                            <input
                              type="number"
                              step="any"
                              min="0" max="15"
                              name="tech_round"
                              id="tech_round"
                              className="input my-2"
                              aria-label="input"
                             placeholder="00"
                              value={formData.tech_round}
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
                 
                    <div className="rounded-lg  flex items-center justify-center">
                      <div className="w-full mt-3">
                          <div className="w-full">
                              <div className="w-full md:w-[60%] lg:w-[60%] overflow-auto mt-2">
                                  <table className="w-full text-[16px]">
                                    <tbody>
                                      <tr>
                                          <td className="py-2 border-b" width="60%"><strong>{data?.payload?.tech_lang_keys['3']}</strong></td>
                                          <td className="py-2 border-b">{result?.tech_angle}°</td>
                                      </tr>
                                      <tr>
                                          <td className="py-2 border-b" width="60%"><strong>{data?.payload?.tech_lang_keys['4']}</strong></td>
                                          <td className="py-2 border-b">{result?.tech_rad} rad</td>
                                      </tr>
                                      </tbody>
                                  </table>
                              </div>
                              <p className="mt-3 text-[18px]"><strong>{ data?.payload?.tech_lang_keys['5'] }</strong></p>
                             <div className="w-full md:w-[60%] lg:w-[60%] overflow-auto mt-3">
                                  <table className="w-full text-[16px]">
                                    <tbody>
                                      <tr>
                                          <td className="py-2 border-b" width="40%">arctan ({formData?.tech_arctan})</td>
                                          <td className="py-2 border-b"><strong>{result?.tech_gon} (gradians)</strong></td>
                                      </tr>
                                      <tr>
                                          <td className="py-2 border-b" width="40%">arctan ({formData?.tech_arctan})</td>
                                          <td className="py-2 border-b"><strong>{result?.tech_tr} (turns)</strong></td>
                                      </tr>
                                      <tr>
                                          <td className="py-2 border-b" width="40%">arctan ({formData?.tech_arctan})</td>
                                          <td className="py-2 border-b"><strong>{result?.tech_arcmin} (minutes of)</strong></td>
                                      </tr>
                                      <tr>
                                          <td className="py-2 border-b" width="40%">arctan ({formData?.tech_arctan})</td>
                                          <td className="py-2 border-b"><strong>{result?.tech_arcsec} (seconds of)</strong></td>
                                      </tr>
                                      <tr>
                                          <td className="py-2 border-b" width="40%">arctan ({formData?.tech_arctan})</td>
                                          <td className="py-2 border-b"><strong>{result?.tech_mrad} (miliradians)</strong></td>
                                      </tr>
                                      <tr>
                                          <td className="py-2 border-b" width="40%">arctan ({formData?.tech_arctan})</td>
                                          <td className="py-2 border-b"><strong>{result?.tech_urad} (microradians)</strong></td>
                                      </tr>
                                      <tr>
                                          <td className="py-2 border-b" width="40%">arctan ({formData?.tech_arctan})</td>
                                          <td className="py-2 border-b"><strong>{result?.tech_pirad} (π radians)</strong></td>
                                      </tr>
                                      </tbody>
                                  </table>
                              </div>
                            <div className="col-12 text-[16px] mt-3 overflow-auto">
                            <p><strong>{data?.payload?.tech_lang_keys[6]}</strong></p>
                            <p className="mt-2">
                              arctan {formData?.tech_arctan} = tan<sup className="text-sm">-1</sup> {formData?.tech_arctan} = {result?.tech_deg}° {result?.tech_min}' {result?.tech_sec}"
                            </p>
                            <p className="mt-2">
                              = {angle} + k * 180° (k = -1,0,1,...)
                            </p>
                            <p className="mt-2">
                              = {angleResults.join('°, ')}°, ...
                            </p>
                            <p className="mt-2">
                              = {result?.tech_rad} rad + k * π (k = -1,0,1,...)
                            </p>
                            <p className="mt-2">
                              = {radianResults.map(val => `${val}π`).join(', ')}, ...
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

export default ArctanCalculator;
