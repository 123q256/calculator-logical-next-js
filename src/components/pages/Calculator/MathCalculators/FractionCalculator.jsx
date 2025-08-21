import React, { useEffect, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
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
// import {
//   useGetSingleCalculatorDetailsMutation,
//   useFractionCalculatorMutation,
// } from "../../../redux/services/calculator/calculatorApi";

import {
  useGetSingleCalculatorDetailsMutation,
} from "../../../redux/services/calculator/calculatorApi";

import {
  useFractionCalculatorMutation,
} from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const FractionCalculator = () => {
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
      tech_calculate_type : "fraction_type", // fraction_type  mixed_type
      tech_stype : "one_frac",  // simple_frac one_frac three_frac four_frac
      tech_fraction_types : "one_frac",  // simple_frac  one_frac  three_frac  four_frac
      tech_ne1 : "1",
      tech_neo2 : "5",
      tech_du1 : "6",
      tech_N1 : "3",
      tech_action : "+",
      tech_N2 : "5",
      tech_action1 : "+",
      tech_N3 : "7",
      tech_action2 : "+",
      tech_N4 : "9",
      tech_D1 : "13",
      tech_D2 : "15",
      tech_D3 : "17",
      tech_D4 : "19",
      tech_s1 : "-3",
      tech_nu1 : "2",
      tech_de1 : "5",
      tech_actions : "+",
      tech_s2 : "5",
      tech_nu2 : "2",
      tech_de2 : "7"
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useFractionCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
        setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_stype ) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
      tech_calculate_type: formData.tech_calculate_type,
      tech_stype: formData.tech_stype,
      tech_fraction_types: formData.tech_fraction_types,
      tech_ne1: formData.tech_ne1,
      tech_neo2: formData.tech_neo2,
      tech_du1: formData.tech_du1,
      tech_N1: formData.tech_N1,
      tech_action: formData.tech_action,
      tech_N2: formData.tech_N2,
      tech_action1: formData.tech_action1,
      tech_N3: formData.tech_N3,
      tech_action2: formData.tech_action2,
      tech_N4: formData.tech_N4,
      tech_D1: formData.tech_D1,
      tech_D2: formData.tech_D2,
      tech_D3: formData.tech_D3,
      tech_D4: formData.tech_D4,
      tech_s1: formData.tech_s1,
      tech_nu1: formData.tech_nu1,
      tech_de1: formData.tech_de1,
      tech_actions: formData.tech_actions,
      tech_s2: formData.tech_s2,
      tech_nu2: formData.tech_nu2,
      tech_de2: formData.tech_de2,
  });




      setResult(response); // Assuming the response has 'lovePercentage'
      toast.success(
       "Successfully Calculated"
      );
      
// console.log(result?.data?.tech_btm);
    } catch (err) {
      setFormError(err.data.error);
    toast.error(err.data.error);
    }
  };

  // Handle reset form
  const handleReset = () => {
    setFormData({  
 
        tech_calculate_type : "fraction_type", // fraction_type  mixed_type
      tech_stype : "one_frac",  // simple_frac one_frac three_frac four_frac
      tech_fraction_types : "one_frac",  // simple_frac  one_frac  three_frac  four_frac
      tech_ne1 : "1",
      tech_neo2 : "5",
      tech_du1 : "6",
      tech_N1 : "3",
      tech_action : "+",
      tech_N2 : "5",
      tech_action1 : "+",
      tech_N3 : "7",
      tech_action2 : "+",
      tech_N4 : "9",
      tech_D1 : "13",
      tech_D2 : "15",
      tech_D3 : "17",
      tech_D4 : "19",
      tech_s1 : "-3",
      tech_nu1 : "2",
      tech_de1 : "5",
      tech_actions : "+",
      tech_s2 : "5",
      tech_nu2 : "2",
      tech_de2 : "7"


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



  
    const isFraction = result?.data?.tech_btm !== '1' && result?.data?.tech_pr !== 0;

  const decimalValue = result?.data?.tech_btm !== 0 ? (result?.data?.tech_pr / result?.data?.tech_btm).toFixed(4) : 'Undefined';

  const equation = `
    \\frac{${formData?.tech_N1}}{${formData?.tech_D1}} ${formData?.tech_action} \\frac{${formData?.tech_N2}}{${formData?.tech_D2}} ${formData?.tech_action1} \\frac{${formData?.tech_N3}}{${formData?.tech_D3}} = ${
      result?.data?.tech_btm !== 1 && result?.data?.tech_pr !== 0
        ? `\\frac{${result?.data?.tech_pr}}{${result?.data?.tech_btm}}`
        : result?.data?.tech_pr
    }
  `;


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

               <div className="lg:w-[80%] md:w-[80%] w-full mx-auto ">
                  <div className="grid grid-cols-12 mt-3   gap-2 md:gap-4 lg:gap-4">
                       <div className="col-span-12 text-center overflow-auto">
                          <div className="flex velocitytab border-b-dark border-b relative">
                              <p className="cursor-pointer veloTabs px-2 v_active"><strong>
                              {  data?.payload?.tech_lang_keys['43'] ?? 'Fraction Calculator' }</strong></p>
                              <p className="cursor-pointer veloTabs  px-2"><strong>
                                <a href="/mixed-number-calculator" className="cursor-pointer veloTabs  text-decoration-none ">
                                {  data?.payload?.tech_lang_keys['44'] ??  'Mixed Number' }
                                </a></strong></p>
                              <p className="cursor-pointer veloTabs px-2 "><strong>
                             <a href="/fraction-simplifier-calculator" className="cursor-pointer veloTabs  text-decoration-none ">
                             { data?.payload?.tech_lang_keys['45'] ?? 'Fraction Simplifier' }
                             </a> </strong></p>
                          </div>
                       </div>
                            <input
                          type="hidden"
                          name="tech_calculate_type"
                          value={formData.tech_calculate_type}
                          onChange={handleChange}
                        />

                        <div className="col-span-12 overflow-auto">
                            <div className="my-2 md:flex justify-center items-center gap-3 ">
                                <label className="pe-2" htmlFor="one_frac">
                                <input
                                  type="radio"
                                  name="tech_stype"
                                  value="one_frac"
                                  id="one_frac"
                                  className="mr-2 border"
                                  onChange={handleChange}
                                  checked={formData.tech_stype === 'one_frac'}
                                />
                                <span>1 Fraction</span>
                              </label>
                                <label className="pe-2" htmlFor="simple_frac">
                                <input
                                  type="radio"
                                  name="tech_stype"
                                  value="simple_frac"
                                  id="simple_frac"
                                  className="mr-2 border"
                                  onChange={handleChange}
                                  checked={formData.tech_stype === 'simple_frac'}
                                />
                                <span>2 { data?.payload?.tech_lang_keys[47] }</span>
                              </label>
                                  <label className="pe-2" htmlFor="three_frac">
                                <input
                                  type="radio"
                                  name="tech_stype"
                                  value="three_frac"
                                  id="three_frac"
                                  className="mr-2 border"
                                  onChange={handleChange}
                                  checked={formData.tech_stype === 'three_frac'}
                                />
                                <span>3 { data?.payload?.tech_lang_keys[47] }</span>
                              </label>
                                <label className="pe-2" htmlFor="four_frac">
                                <input
                                  type="radio"
                                  name="tech_stype"
                                  value="four_frac"
                                  id="four_frac"
                                  className="mr-2 border"
                                  onChange={handleChange}
                                  checked={formData.tech_stype === 'four_frac'}
                                />
                                <span>4 { data?.payload?.tech_lang_keys[47] }</span>
                              </label>
                            </div>
                        </div>
                        {formData.tech_stype == "one_frac" && (
                          <>
                          <div className="col-span-12">
                              <div className="grid grid-cols-12 gap-3 overflow-auto">
                                  <div className="col-span-12 col-span-12 flex items-center justify-center">
                                      <div className="pe-2">
                                          <input
                                              type="number"
                                              step="any"
                                              name="tech_ne1"
                                              id="tech_ne1"
                                              className="input"
                                              aria-label="input"
                                              placeholder="optional"
                                              value={formData.tech_ne1}
                                              onChange={handleChange}
                                            />
                                      </div>
                                      <div className="ps-2">
                                          <input
                                              type="number"
                                              step="any"
                                              name="tech_neo2"
                                              id="tech_neo2"
                                              className="input"
                                              aria-label="input"
                                              value={formData.tech_neo2}
                                              onChange={handleChange}
                                            />
                                          <hr className="bdr-top my-2"/>
                                          <input
                                              type="number"
                                              step="any"
                                              name="tech_du1"
                                              id="tech_du1"
                                              oninput="validateInput(this)" pattern="^(?!0$).+" 
                                              className="input"
                                              aria-label="input"
                                              value={formData.tech_du1}
                                              onChange={handleChange}
                                            />
                                      </div>
                                  </div>
                              </div>
                          </div>
                          </>
                        )}

                        <div className="col-span-12 overflow-auto">
                            <table className="mx-auto" width={600}>
                                <tbody>
                                    <tr>

                                       {(formData.tech_stype == "three_frac"  || formData.tech_stype == "four_frac" )&& (
                                            <>
                                              <td>
                                                <input
                                                    type="number"
                                                    step="any"
                                                    name="tech_N1"
                                                    id="tech_N1"
                                                    oninput="validateInput(this)" pattern="^(?!0$).+" 
                                                    className="input"
                                                    aria-label="input"
                                                      placeholder="00"
                                                    value={formData.tech_N1}
                                                    onChange={handleChange}
                                                  />
                                              </td>
                                              <td rowspan="2"  className="w-[90px]">
                                                  <select
                                                    className="input"
                                                    aria-label="select"
                                                    name="tech_action"
                                                    id="tech_action"
                                                    value={formData.tech_action}
                                                    onChange={handleChange}
                                                  >
                                                    <option value="+">+ </option>
                                                    <option value="-">- </option>
                                                    <option value="×">× </option>
                                                    <option value="÷">÷ </option>
                                                  </select>
                                              </td>
                                              <td>
                                                  <input
                                                        type="number"
                                                        step="any"
                                                        name="tech_N2"
                                                        id="tech_N2"
                                                        className="input"
                                                        aria-label="input"
                                                        placeholder="00"
                                                        oninput="validateInput(this)" pattern="^(?!0$).+" required 
                                                        value={formData.tech_N2}
                                                        onChange={handleChange}
                                                      />
                                              </td>
                                              <td rowspan="2"   className="w-[90px]">
                                                  <select
                                                      className="input"
                                                      aria-label="select"
                                                      name="tech_action1"
                                                      id="tech_action1"
                                                      value={formData.tech_action1}
                                                      onChange={handleChange}
                                                    >
                                                      <option value="+">+ </option>
                                                      <option value="-">- </option>
                                                      <option value="×">× </option>
                                                      <option value="÷">÷ </option>
                                                  </select>
                                              </td>
                                            <td className=" ">
                                                <input
                                                      type="number"
                                                      step="any"
                                                      name="tech_N3"
                                                      id="tech_N3"
                                                  
                                                      className="input"
                                                      aria-label="input"
                                                      placeholder="00"
                                                      oninput="validateInput(this)" pattern="^(?!0$).+" required 
                                                      value={formData.tech_N3}
                                                      onChange={handleChange}
                                                    />
                                            </td>
                                            </>
                                         )}

                                        

                                         {(formData.tech_stype == "four_frac" || formData.tech_stype == "four_frac") && (
                                          <>
                                            <td rowspan="2"   className="w-[90px]">
                                                <select
                                                  className="input"
                                                  aria-label="select"
                                                  name="tech_action2"
                                                  id="tech_action2"
                                                  value={formData.tech_action2}
                                                  onChange={handleChange}
                                                >
                                                  <option value="+">+ </option>
                                                  <option value="-">- </option>
                                                  <option value="×">× </option>
                                                  <option value="÷">÷ </option>
                                                </select>
                                            </td>
                                            <td className=" ">
                                                  <input
                                                  type="number"
                                                  step="any"
                                                  name="tech_N4"
                                                  id="tech_N4"
                                                
                                                  className="input"
                                                  aria-label="input"
                                                    placeholder="00"
                                                    oninput="validateInput(this)" pattern="^(?!0$).+" required 
                                                  value={formData.tech_N4}
                                                  onChange={handleChange}
                                                />
                                            </td>
                                          </>   
                                           )} 
                                        
                                    </tr>
                                    <tr>
                                        {(formData.tech_stype == "three_frac" || formData.tech_stype == "four_frac") && (
                                          <>
                                          <td className="bdr-top">
                                              <input
                                                type="number"
                                                step="any"
                                                name="tech_D1"
                                                id="tech_D1"
                                                className="input"
                                                aria-label="input"
                                                  placeholder="00"
                                                oninput="validateInput(this)" pattern="^(?!0$).+" required 
                                                value={formData.tech_D1}
                                                onChange={handleChange}
                                              />
                                          </td>
                                          <td className="bdr-top">
                                              <input
                                                type="number"
                                                step="any"
                                                name="tech_D2"
                                                id="tech_D2"
                                                className="input"
                                                aria-label="input"
                                                  placeholder="00"
                                                  oninput="validateInput(this)" pattern="^(?!0$).+" required 
                                                value={formData.tech_D2}
                                                onChange={handleChange}
                                              />
                                          </td>
                                          <td className="bdr-top  ">
                                              <input
                                                type="number"
                                                step="any"
                                                name="tech_D3"
                                                id="tech_D3"
                                                className="input"
                                                aria-label="input"
                                                  placeholder="00"
                                                  oninput="validateInput(this)" pattern="^(?!0$).+" required 
                                                value={formData.tech_D3}
                                                onChange={handleChange}
                                              />
                                          </td>
                                          </>
                                        )}
                                           {(formData.tech_stype == "four_frac" || formData.tech_stype == "four_frac") && (
                                          <>
                                          <td className="bdr-top  ">
                                              <input
                                                type="number"
                                                step="any"
                                                name="tech_D4"
                                                id="tech_D4"
                                                className="input"
                                                aria-label="input"
                                                  placeholder="00"
                                                  oninput="validateInput(this)" pattern="^(?!0$).+" required 
                                                value={formData.tech_D4}
                                                onChange={handleChange}
                                              />
                                          </td>
                                          </>
                                          )}
                                     
                                        

                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {(formData.tech_stype == "simple_frac" ) && (
                          <>
                            <div className="col-span-12">
                                <div className="grid grid-cols-12 gap-3 mx-auto overflow-auto">
                                  <div className="col-span-1"></div>
                                    <div className="col-span-4 ">
                                        <div className="flex items-center">
                                            <div className="pe-2">
                                                <input
                                                    type="number"
                                                    step="any"
                                                    name="tech_s1"
                                                    id="tech_s1"
                                                    className="input"
                                                    aria-label="input"
                                                    placeholder="00"
                                                    value={formData.tech_s1}
                                                    onChange={handleChange}
                                                  />
                                            </div>
                                            <div className="ps-lg-2 ">
                                                <input
                                                    type="number"
                                                    step="any"
                                                    name="tech_nu1"
                                                    id="tech_nu1"
                                                    className="input"
                                                    aria-label="input"
                                                    placeholder="00"
                                                    value={formData.tech_nu1}
                                                    onChange={handleChange}
                                                  />
                                                <hr className="bdr-top my-2"/>
                                                  <input
                                                    type="number"
                                                    step="any"
                                                    name="tech_de1"
                                                    id="tech_de1"
                                                    oninput="validateInput(this)" pattern="^(?!0$).+"
                                                    className="input"
                                                    aria-label="input"
                                                    placeholder="00"
                                                    value={formData.tech_de1}
                                                    onChange={handleChange}
                                                  />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2 " >
                                        <label for="actions" className="font-s-14 text-blue">&nbsp;</label>
                                        <div className="w-full py-2">
                                          <select
                                                  className="input"
                                                  aria-label="select"
                                                  name="tech_actions"
                                                  id="tech_actions"
                                                  value={formData.tech_actions}
                                                  onChange={handleChange}
                                                >
                                                  <option value="+">+ </option>
                                                  <option value="-">- </option>
                                                  <option value="×">× </option>
                                                  <option value="÷">÷ </option>
                                                </select>
                                        </div>
                                    </div>
                                    <div className="col-span-4 ">
                                        <div className="flex items-center">
                                            <div className="pe-2">
                                                <input
                                                    type="number"
                                                    step="any"
                                                    name="tech_s2"
                                                    id="tech_s2"
                                                    className="input"
                                                    aria-label="input"
                                                    placeholder="00"
                                                    value={formData.tech_s2}
                                                    onChange={handleChange}
                                                  />
                                            </div>
                                            <div className="ps-lg-2">
                                              <input
                                                    type="number"
                                                    step="any"
                                                    name="tech_nu2"
                                                    id="tech_nu2"
                                                    className="input"
                                                    aria-label="input"
                                                    placeholder="00"
                                                    value={formData.tech_nu2}
                                                    onChange={handleChange}
                                                  />
                                                <hr className="bdr-top my-2"/>
                                                  <input
                                                    type="number"
                                                    step="any"
                                                    name="tech_de2"
                                                    id="tech_de2"
                                                    oninput="validateInput(this)" pattern="^(?!0$).+"
                                                    className="input"
                                                    aria-label="input"
                                                    placeholder="00"
                                                    value={formData.tech_de2}
                                                    onChange={handleChange}
                                                  />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-1"></div>
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

                      <div className="rounded-lg flex items-center justify-center">
                          <div className="w-full overflow-auto">
                            <div className="w-full">
                              <div className="w-full md:w-[60%]  mt-2">
                                 
                                  
                             {(formData?.tech_calculate_type == 'fraction_type') ? (

                              <>
                                <div className="grid grid-cols-12 gap-3">
                                    {(formData?.tech_stype == "simple_frac") ? (
                                      <>
                                      
                                        <p>Result Coming Soon</p>                                      
                                      </>
                                    ): (formData?.tech_stype == "three_frac") ? (
                                      <>
                                     
                                       <p>Result Coming Soon</p>       
                                      </>
                                    ): (formData?.tech_stype == "four_frac") ? (
                                      <>
                                       <p>Result Coming Soon</p>       
                                      </>
                                    ):(
                                      <>

                                     <div className="col-span-12 text-[16px]">
                                      <p className="mt-2 text-[18px]">
                                        <BlockMath math={`${formData?.tech_ne1 || ''} \\dfrac{${formData?.tech_neo2}}{${formData?.tech_du1}} = \\dfrac{${result?.data?.tech_pr}}{${result?.data?.tech_btm}}`} />
                                      </p>  

                                      <p className="mt-2 font-bold">{data?.payload?.tech_lang_keys['ex']}:</p>

                                      <p className="mt-2">
                                        {data?.payload?.tech_lang_keys['input']}:
                                        <InlineMath math={`${formData?.tech_ne1 || ''} \\dfrac{${formData?.tech_neo2}}{${formData?.tech_du1}}`} />
                                      </p>

                                      <p className="mt-2">
                                        {data?.payload?.tech_lang_keys['step']} #1:
                                        <BlockMath math={`= \\dfrac{${result?.data?.tech_totalN}}{${result?.data?.tech_totalD}}`} />
                                      </p>

                                      <p className="mt-2">
                                        {data?.payload?.tech_lang_keys['step']} #2:
                                        <BlockMath math={`= \\dfrac{${result?.data?.tech_totalN} \\div ${result?.data?.tech_g}}{${result?.data?.tech_totalD} \\div ${result?.data?.tech_g}}`} />
                                      </p>

                                      {result?.data?.tech_btm === '1' ? (
                                        <p className="mt-2">
                                          {data?.payload?.tech_lang_keys['an']} = {result?.data?.tech_pr}
                                        </p>
                                      ) : (
                                        <p className="mt-2">
                                          {data?.payload?.tech_lang_keys['an']}
                                          <BlockMath math={`= \\dfrac{${result?.data?.tech_pr}}{${result?.data?.tech_btm}}`} />
                                        </p>
                                      )}

                                      {parseInt(result?.data?.tech_pr) > parseInt(result?.data?.tech_btm) && result?.data?.tech_btm !== '1' && (() => {
                                        const shi = Math.floor(result?.data?.tech_pr / result?.data?.tech_btm);
                                        const bta = result?.data?.tech_pr % result?.data?.tech_btm;
                                        return (
                                          <p className="mt-2">
                                            {data?.payload?.tech_lang_keys['or']}
                                            <BlockMath math={`= ${shi} \\dfrac{${bta}}{${result?.data?.tech_btm}}`} />
                                          </p>
                                        );
                                      })()}

                                      {result?.data?.tech_btm !== '1' && (
                                        <p className="mt-2">
                                          {data?.payload?.tech_lang_keys['dec']} = {parseFloat(result?.data?.tech_pr / result?.data?.tech_btm).toFixed(1)}
                                        </p>
                                      )}
                                    </div>

                                      </>
                                    )}
                                </div>
                              </>
                             ):(
                              <>
                                 

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

export default FractionCalculator;
