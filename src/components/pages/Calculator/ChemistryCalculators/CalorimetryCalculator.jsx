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
// import {
//   useGetSingleCalculatorDetailsMutation,
//   useCalorimetryCalculatorMutation,
// } from "../../../redux/services/calculator/calculatorApi";


import {
  useGetSingleCalculatorDetailsMutation,
} from "../../../redux/services/calculator/calculatorApi";

import {
  useCalorimetryCalculatorMutation,
} from "../../../redux/services/datecalculator/dateCalculatorApi";


import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const CalorimetryCalculator = () => {
  const location = useLocation();
  const url = location.pathname.split("/")[1];
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
    tech_state_change: "heat exchange between several objects",
    tech_obj_units: "2",
    tech_state: "No",
    tech_formula: "Enthalpy_change",
    tech_type: "temp_change",
    tech_mass: "10",
    tech_m_units: "grams (g)",
    tech_heat_capacity: "25",
    tech_s_heat_units: "joules per gram per kelvin (J/(g.k)",
    tech_temp_change: "20",
    tech_t_c_units: "kelvin K",
    tech_energy: "20",
    tech_units: "joules (J)",
    tech_subtance_mass: "15",
    tech_s_m_units: "grams (g)",
    tech_molar_mass: "20",
    tech_in_temp: "20",
    tech_i_t_units: "kelvin K",
    tech_s_fin_temp: "30",
    tech_S_f_t_units: "kelvin K",
    tech_formula_2obj: "m1",
    tech_two_time: "m1_two",
    tech_mass_1: "10",
    tech_m_units1: "grams (g)",
    tech_mass_2: "20",
    tech_m_units2: "grams (g)",
    tech_heat_capacity_1: "25",
    tech_s_heat_units1: "joules per gram per kelvin (J/(g.k)",
    tech_heat_capacity_2: "50",
    tech_s_heat_units2: "joules per gram per kelvin (J/(g.k)",
    tech_in_temp_1: "20",
    tech_i_t_units1: "kelvin K",
    tech_in_temp_2: "20",
    tech_i_t_units2: "kelvin K",
    tech_fin_temp_1: "30",
    tech_f_t_units1: "kelvin K",
    tech_fin_temp_2: "30",
    tech_f_t_units2: "kelvin K",
    tech_fin_temp: "50",
    tech_f_t_units: "kelvin K",
    tech_t_fusion: "40",
    tech_t_units: "kelvin K",
    tech_h_fusion: "30",
    tech_h_fusion_unit: "joules per gram per kelvin (J/(g.k)",
    tech_formula_3obj: "m1",
    tech_three_time: "m1",
    tech_mass_1_3: "10",
    tech_m_units1_3: "grams (g)",
    tech_mass_2_3: "10",
    tech_m_units2_3: "grams (g)",
    tech_mass_3_3: "40",
    tech_m_units3_3: "grams (g)",
    tech_heat_capacity_1_3: "25",
    tech_s_heat_units1_3: "joules per gram per kelvin (J/(g.k)",
    tech_heat_capacity_2_3: "50",
    tech_s_heat_units2_3: "joules per gram per kelvin (J/(g.k)",
    tech_heat_capacity_3_3: "70",
    tech_s_heat_units3_3: "joules per gram per kelvin (J/(g.k)",
    tech_in_temp_1_3: "60",
    tech_i_t_units1_3: "kelvin K",
    tech_in_temp_2_3: "40",
    tech_i_t_units2_3: "kelvin K",
    tech_in_temp_3_3: "20",
    tech_i_t_units3_3: "kelvin K",
    tech_fin_temp_1_3: "80",
    tech_f_t_units1_3: "kelvin K",
    tech_fin_temp_2_3: "10",
    tech_f_t_units2_3: "kelvin K",
    tech_fin_temp_3_3: "25",
    tech_f_t_units3_3: "kelvin K",
    tech_fin_temp_3: "50",
    tech_f_t_units_3: "kelvin K",
    tech_t_fusion_3: "30",
    tech_t_units_3: "kelvin K",
    tech_h_fusion_3: "30",
    tech_h_units3: "joules per gram per kelvin (J/(g.k)"
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateActivationCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useCalorimetryCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
      setFormError(err.data.error);
    toast.error(err.data.error);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_state_change) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateActivationCalculator({
        tech_state_change:formData.tech_state_change, 
        tech_obj_units:formData.tech_obj_units, 
        tech_state:formData.tech_state, 
        tech_formula:formData.tech_formula, 
        tech_type:formData.tech_type,
        tech_mass:formData.tech_mass, 
        tech_m_units:formData.tech_m_units, 
        tech_heat_capacity:formData.tech_heat_capacity, 
        tech_s_heat_units:formData.tech_s_heat_units, 
        tech_temp_change:formData.tech_temp_change, 
        tech_t_c_units:formData.tech_t_c_units, 
        tech_energy:formData.tech_energy, 
        tech_units:formData.tech_units, 
        tech_subtance_mass:formData.tech_subtance_mass, 
        tech_s_m_units:formData.tech_s_m_units, 
        tech_molar_mass:formData.tech_molar_mass, 
        tech_in_temp:formData.tech_in_temp, 
        tech_i_t_units:formData.tech_i_t_units, 
        tech_s_fin_temp:formData.tech_s_fin_temp, 
        tech_S_f_t_units:formData.tech_S_f_t_units, 
        tech_formula_2obj:formData.tech_formula_2obj, 
        tech_two_time:formData.tech_two_time, 
        tech_mass_1:formData.tech_mass_1, 
        tech_m_units1:formData.tech_m_units1, 
        tech_mass_2:formData.tech_mass_2, 
        tech_m_units2:formData.tech_m_units2, 
        tech_heat_capacity_1:formData.tech_heat_capacity_1,
        tech_s_heat_units1:formData.tech_s_heat_units1, 
        tech_heat_capacity_2:formData.tech_heat_capacity_2,
        tech_s_heat_units2:formData.tech_s_heat_units2, 
        tech_in_temp_1:formData.tech_in_temp_1, 
        tech_i_t_units1:formData.tech_i_t_units1, 
        tech_in_temp_2:formData.tech_in_temp_2, 
        tech_i_t_units2:formData.tech_i_t_units2, 
        tech_fin_temp_1:formData.tech_fin_temp_1, 
        tech_f_t_units1:formData.tech_f_t_units1, 
        tech_fin_temp_2:formData.tech_fin_temp_2, 
        tech_f_t_units2:formData.tech_f_t_units2, 
        tech_fin_temp:formData.tech_fin_temp, 
        tech_f_t_units:formData.tech_f_t_units, 
        tech_t_fusion:formData.tech_t_fusion, 
        tech_t_units:formData.tech_t_units, 
        tech_h_fusion:formData.tech_h_fusion, 
        tech_h_fusion_unit:formData.tech_h_fusion_unit, 
        tech_formula_3obj:formData.tech_formula_3obj, 
        tech_three_time:formData.tech_three_time, 
        tech_mass_1_3:formData.tech_mass_1_3, 
        tech_m_units1_3:formData.tech_m_units1_3, 
        tech_mass_2_3:formData.tech_mass_2_3, 
        tech_m_units2_3:formData.tech_m_units2_3, 
        tech_mass_3_3:formData.tech_mass_3_3, 
        tech_m_units3_3:formData.tech_m_units3_3, 
        tech_heat_capacity_1_3:formData.tech_heat_capacity_1_3,
        tech_s_heat_units1_3:formData.tech_s_heat_units1_3, 
        tech_heat_capacity_2_3:formData.tech_heat_capacity_2_3, 
        tech_s_heat_units2_3:formData.tech_s_heat_units2_3, 
        tech_heat_capacity_3_3:formData.tech_heat_capacity_3_3, 
        tech_s_heat_units3_3:formData.tech_s_heat_units3_3, 
        tech_in_temp_1_3:formData.tech_in_temp_1_3, 
        tech_i_t_units1_3:formData.tech_i_t_units1_3, 
        tech_in_temp_2_3:formData.tech_in_temp_2_3, 
        tech_i_t_units2_3:formData.tech_i_t_units2_3, 
        tech_in_temp_3_3:formData.tech_in_temp_3_3,
        tech_i_t_units3_3:formData.tech_i_t_units3_3, 
        tech_fin_temp_1_3:formData.tech_fin_temp_1_3, 
        tech_f_t_units1_3:formData.tech_f_t_units1_3, 
        tech_fin_temp_2_3:formData.tech_fin_temp_2_3, 
        tech_f_t_units2_3:formData.tech_f_t_units2_3, 
        tech_fin_temp_3_3:formData.tech_fin_temp_3_3, 
        tech_f_t_units3_3:formData.tech_f_t_units3_3, 
        tech_fin_temp_3:formData.tech_fin_temp_3, 
        tech_f_t_units_3:formData.tech_f_t_units_3, 
        tech_t_fusion_3:formData.tech_t_fusion_3, 
        tech_t_units_3:formData.tech_t_units_3, 
        tech_h_fusion_3:formData.tech_h_fusion_3, 
        tech_h_units3:formData.tech_h_units3, 
        
      }).unwrap();
      setResult(response); // Assuming the response'
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
    tech_state_change: "heat exchange between several objects",
    tech_obj_units: "2",
    tech_state: "No",
    tech_formula: "Enthalpy_change",
    tech_type: "temp_change",
    tech_mass: "10",
    tech_m_units: "grams (g)",
    tech_heat_capacity: "25",
    tech_s_heat_units: "joules per gram per kelvin (J/(g.k)",
    tech_temp_change: "20",
    tech_t_c_units: "kelvin K",
    tech_energy: "20",
    tech_units: "joules (J)",
    tech_subtance_mass: "15",
    tech_s_m_units: "grams (g)",
    tech_molar_mass: "20",
    tech_in_temp: "20",
    tech_i_t_units: "kelvin K",
    tech_s_fin_temp: "30",
    tech_S_f_t_units: "kelvin K",
    tech_formula_2obj: "m1",
    tech_two_time: "m1_two",
    tech_mass_1: "10",
    tech_m_units1: "grams (g)",
    tech_mass_2: "20",
    tech_m_units2: "grams (g)",
    tech_heat_capacity_1: "25",
    tech_s_heat_units1: "joules per gram per kelvin (J/(g.k)",
    tech_heat_capacity_2: "50",
    tech_s_heat_units2: "joules per gram per kelvin (J/(g.k)",
    tech_in_temp_1: "20",
    tech_i_t_units1: "kelvin K",
    tech_in_temp_2: "20",
    tech_i_t_units2: "kelvin K",
    tech_fin_temp_1: "30",
    tech_f_t_units1: "kelvin K",
    tech_fin_temp_2: "30",
    tech_f_t_units2: "kelvin K",
    tech_fin_temp: "50",
    tech_f_t_units: "kelvin K",
    tech_t_fusion: "40",
    tech_t_units: "kelvin K",
    tech_h_fusion: "30",
    tech_h_fusion_unit: "joules per gram per kelvin (J/(g.k)",
    tech_formula_3obj: "m1",
    tech_three_time: "m1",
    tech_mass_1_3: "10",
    tech_m_units1_3: "grams (g)",
    tech_mass_2_3: "10",
    tech_m_units2_3: "grams (g)",
    tech_mass_3_3: "40",
    tech_m_units3_3: "grams (g)",
    tech_heat_capacity_1_3: "25",
    tech_s_heat_units1_3: "joules per gram per kelvin (J/(g.k)",
    tech_heat_capacity_2_3: "50",
    tech_s_heat_units2_3: "joules per gram per kelvin (J/(g.k)",
    tech_heat_capacity_3_3: "70",
    tech_s_heat_units3_3: "joules per gram per kelvin (J/(g.k)",
    tech_in_temp_1_3: "60",
    tech_i_t_units1_3: "kelvin K",
    tech_in_temp_2_3: "40",
    tech_i_t_units2_3: "kelvin K",
    tech_in_temp_3_3: "20",
    tech_i_t_units3_3: "kelvin K",
    tech_fin_temp_1_3: "80",
    tech_f_t_units1_3: "kelvin K",
    tech_fin_temp_2_3: "10",
    tech_f_t_units2_3: "kelvin K",
    tech_fin_temp_3_3: "25",
    tech_f_t_units3_3: "kelvin K",
    tech_fin_temp_3: "50",
    tech_f_t_units_3: "kelvin K",
    tech_t_fusion_3: "30",
    tech_t_units_3: "kelvin K",
    tech_h_fusion_3: "30",
    tech_h_units3: "joules per gram per kelvin (J/(g.k)"
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
  {/* <span className="text-blue input_unit">{currency.symbol}</span> */}
// currency code

// majax

 useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS_HTML";
    script.async = true;
    script.type = "text/javascript";
    script.onload = () => {
      window.MathJax && window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [result]);

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
                  <div className="grid grid-cols-1   gap-4">
                      <div className="space-y-2 relative">
                         <label htmlFor="tech_state_change" className="label">
                          {data?.payload?.tech_lang_keys["50"]}:
                        </label>
                        <div className="mt-2">
                          <select
                            className="input"
                            aria-label="select"
                            name="tech_state_change"
                            id="tech_state_change"
                            value={formData.tech_state_change}
                            onChange={handleChange}
                          >
                            <option value="a chemical reaction in a cofee cup calorimeter">{data?.payload?.tech_lang_keys["2"]}</option>
                            <option value="heat exchange between several objects">{data?.payload?.tech_lang_keys["3"]}</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2  fimg3 hidden">
                         <label htmlFor="tech_obj_units" className="label">
                          {data?.payload?.tech_lang_keys["4"]}:
                        </label>
                        <div className="mt-2">
                          <select
                            className="input"
                            aria-label="select"
                            name="tech_obj_units"
                            id="tech_obj_units"
                            value={formData.tech_obj_units}
                            onChange={handleChange}
                          >
                            <option value="2">{data?.payload?.tech_lang_keys["5"]}</option>
                            <option value="3">{data?.payload?.tech_lang_keys["6"]} </option>
                          </select>
                        </div>
                        
                      </div>
                      <div className="space-y-2  state hidden">

                           <label htmlFor="tech_obj_change" className="label">
                              {data?.payload?.tech_lang_keys["7"]}:
                            </label>
                            <div className="mt-2">
                              <select
                                className="input"
                                aria-label="select"
                                name="tech_obj_change"
                                id="tech_obj_change"
                                value={formData.tech_obj_change}
                                onChange={handleChange}
                              >
                                <option value="No">{data?.payload?.tech_lang_keys["8"]}</option>
                                <option value="Yes,two times">{data?.payload?.tech_lang_keys["10"]} </option>
                              </select>
                            </div>
                       
                      </div>
                      <div className="space-y-2  single_object">
                          <div className="grid grid-cols-1   gap-4">
                              <div className="space-y-2">
                                  <label htmlFor="tech_formula_change" className="label">
                                    {data?.payload?.tech_lang_keys["1"]}:
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_formula_change"
                                      id="tech_formula_change"
                                      value={formData.tech_formula_change}
                                      onChange={handleChange}
                                    >
                                      <option value="Heat Energy">{data?.payload?.tech_lang_keys["12"]}</option>
                                      <option value="Specific Heat">{data?.payload?.tech_lang_keys["13"]} </option>
                                      <option value="Mass">{data?.payload?.tech_lang_keys["14"]} </option>
                                      <option value="Initial_Temperature">{data?.payload?.tech_lang_keys["15"]} </option>
                                      <option value="Final_Temperature">{data?.payload?.tech_lang_keys["16"]} </option>
                                      <option value="Time_of_isolation">{data?.payload?.tech_lang_keys["17"]} </option>
                                      <option value="Enthalpy_change">{data?.payload?.tech_lang_keys["18"]} </option>
                                    </select>
                                  </div>
                                  
                              </div>
                              <div className="space-y-2 my-2 by">
                                  <label className="pe-2" htmlFor="temp_change">
                                  <input
                                    type="radio"
                                    name="tech_type"
                                    value="temp_change"
                                    id="temp_change"
                                    className="mr-2 border"
                                    onChange={handleChange}
                                    checked={formData.tech_type === 'temp_change'}
                                  />
                                  <span>{ data?.payload?.tech_lang_keys['19'] } (\(\Delta T\)):</span>
                                </label>
                                
                              </div>
                              <div className="space-y-2 px-[10px]  by">
                                   <label htmlFor="i_f_temp">
                                    <input
                                      type="radio"
                                      name="tech_type"
                                      className="mr-2 border"
                                      value="i_f_temp"
                                      id="i_f_temp"
                                      onChange={handleChange}
                                      checked={formData.tech_type === 'i_f_temp'}
                                    />
                                    <span>{ data?.payload?.tech_lang_keys['21'] }</span>
                                  </label>
                              </div>
                          </div>
                           <div className="grid grid-cols-4   gap-4">
                              <div className="col-span-3 mass">
                                 <label htmlFor="tech_mass" className="label">
                                    {data?.payload?.tech_lang_keys["23"]} (m):
                                      </label>
                                      <div className=" relative">
                                      <input
                                        type="number"
                                        step="any"
                                        name="tech_mass"
                                        id="tech_mass"
                                        className="input my-2"
                                        aria-label="input"
                                         placeholder="00"
                                        value={formData.tech_mass}
                                        onChange={handleChange}
                                      />
                                      </div>
                              </div>
                              <div className="col-span-1 mass">
                                <label htmlFor="tech_m_units" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_m_units"
                                      id="tech_m_units"
                                      value={formData.tech_m_units}
                                      onChange={handleChange}
                                      >
                                      <option value="grams (g)">g</option>
                                      <option value="picograms (pg)">pg</option>
                                      <option value="nanograms (ng)">ng</option>
                                      <option value="μg">μg</option>
                                      <option value="milligrams (mg)">mg</option>
                                      <option value="decagrams (dag)">dag</option>
                                      <option value="kilograms (kg)">kg</option>
                                      <option value="metric tons (t)">t</option>
                                      <option value="grains (gr)">gr</option>
                                      <option value="drachms (dr)">dr</option>
                                      <option value="ounces (oz)">oz</option>
                                      <option value="pounds (lb)">lb</option>
                                      <option value="stones (stone)">stone</option>
                                      <option value="US short tones (US ton)">US ton</option>
                                      <option value="imperial tons (Long ton)">Long ton</option>
                                      <option value="atomic mass unit (u)">u</option>
                                      <option value="troy ounce (oz t)">oz t</option>
                                    </select>
                                  </div>
                              </div>
                              <div className="col-span-3 s_h_c">
                                  <label htmlFor="tech_heat_capacity" className="label">
                                    {data?.payload?.tech_lang_keys["24"]} (c):
                                      </label>
                                      <div className=" relative">
                                      <input
                                        type="number"
                                        step="any"
                                        name="tech_heat_capacity"
                                        id="tech_heat_capacity"
                                        className="input my-2"
                                        aria-label="input"
                                         placeholder="00"
                                        value={formData.tech_heat_capacity}
                                        onChange={handleChange}
                                      />
                                      </div>
                              
                              </div>
                              <div className="col-span-1 s_h_c">
                                 <label htmlFor="tech_s_heat_units" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_s_heat_units"
                                      id="tech_s_heat_units"
                                      value={formData.tech_s_heat_units}
                                      onChange={handleChange}
                                    >
                                      <option value="joules per gram per kelvin (J/(g.k)">J/(g.K)</option>
                                      <option value="joules per kilogram per kelvin J/(kg.k)">J/(kg.K)</option>
                                      <option value="calories per kilogram per kelvin cal/(kg.k)">cal/(kg.K)</option>
                                      <option value="cal/g.K">cal/g.K</option>
                                      <option value="kilocalories per kilogram per kelvin kcal/(kg.k)">kcal/(kg.K)</option>
                                      <option value="joules per kilogram per celsius J/(kg·°C)">J/(kg·°C)</option>
                                      <option value="joules per gram per celsius J/(g·°C)">J/(g·°C)</option>
                                      <option value="calories per kilogram per celsius cal/(kg·°C)">cal/(kg·°C)</option>
                                      <option value="calories per gram per celsius cal/(g·°C)">cal/(g·°C)</option>
                                      <option value="kilocalories per kilogram per celsius kcal/(kg·°C)">kcal/(kg·°C)</option>
                                    </select>
                                  </div>
                              </div>
                              <div className="col-span-3 temp_change">
                                  <label htmlFor="tech_temp_change" className="label">
                                      {data?.payload?.tech_lang_keys["30"]} (\(\Delta T\)):
                                        </label>
                                        <div className=" relative">
                                        <input
                                          type="number"
                                          step="any"
                                          name="tech_temp_change"
                                          id="tech_temp_change"
                                          className="input my-2"
                                          aria-label="input"
                                          placeholder="00"
                                          value={formData.tech_temp_change}
                                          onChange={handleChange}
                                        />
                                        </div>
                                  
                              </div>
                              <div className="col-span-1 temp_change">

                                <label htmlFor="tech_t_c_units" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_t_c_units"
                                      id="tech_t_c_units"
                                      value={formData.tech_t_c_units}
                                      onChange={handleChange}
                                    >
                                      <option value="kelvin K">K</option>
                                      <option value="celsius °C">°C</option>
                                      <option value="Fahrenheit °F">°F</option>
                                    </select>
                                  </div>
                              </div>
                          </div>
                          <div className="grid grid-cols-4   gap-4">
                              <div className="col-lg-4 px-2 en hidden">

                                 <label htmlFor="tech_energy" className="label">
                                      {data?.payload?.tech_lang_keys["22"]} (\(\Delta Q\)):
                                        </label>
                                        <div className=" relative">
                                        <input
                                          type="number"
                                          step="any"
                                          name="tech_energy"
                                          id="tech_energy"
                                          className="input my-2"
                                          aria-label="input"
                                          placeholder="00"
                                          value={formData.tech_energy}
                                          onChange={handleChange}
                                        />
                                        </div>
                              </div>
                              <div className="col-lg-2 px-2 en hidden">

                                  <label htmlFor="tech_units" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_units"
                                      id="tech_units"
                                      value={formData.tech_units}
                                      onChange={handleChange}
                                    >
                                      <option value="joules (J)">J</option>
                                      <option value="nanojoules (nj)">nj</option>
                                      <option value="microjoules (μJ)">μJ</option>
                                      <option value="millijoules (mJ)">mJ</option>
                                      <option value="kilojoules (kJ)">kJ</option>
                                      <option value="megajoules (MJ)">MJ</option>
                                      <option value="watt hours (Wh)">Wh</option>
                                      <option value="kilowatt hours (kWh)">kWh</option>
                                      <option value="foot-pounds (ft-lbs)">ft-lbs</option>
                                      <option value="calories (cal)">cal</option>
                                      <option value="kilocalories (Kcal)">Kcal</option>
                                      <option value="megacalories (Mcal)">Mcal</option>
                                      <option value="nanoelectronovolts (neV)">neV</option>
                                      <option value="microelectronovolts (μeV)">μeV</option>
                                      <option value="millielectronovolts (meV)">meV</option>
                                      <option value="electronvolts (eV)">eV</option>
                                      <option value="kiloelectronovolts (KeV)">KeV</option>
                                      <option value="megaelectronovolts (MeV)">MeV</option>
                                    </select>
                                  </div>
                              </div>
                              <div className="col-lg-4 px-2 s_m hidden">

                                    <label htmlFor="tech_subtance_mass" className="label">
                                      {data?.payload?.tech_lang_keys["25"]} :
                                        </label>
                                        <div className=" relative">
                                        <input
                                          type="number"
                                          step="any"
                                          name="tech_subtance_mass"
                                          id="tech_subtance_mass"
                                          className="input my-2"
                                          aria-label="input"
                                          placeholder="00"
                                          value={formData.tech_subtance_mass}
                                          onChange={handleChange}
                                        />
                                        </div>
                                 
                              </div>
                              <div className="col-lg-2 px-2 s_m hidden">
                                    <label htmlFor="tech_s_m_units" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_s_m_units"
                                      id="tech_s_m_units"
                                      value={formData.tech_s_m_units}
                                      onChange={handleChange}
                                    >
                                      <option value="grams (g)">g</option>
                                      <option value="picograms (pg)">pg</option>
                                      <option value="nanograms (ng)">ng</option>
                                      <option value="μg">μg</option>
                                      <option value="milligrams (mg)">mg</option>
                                      <option value="decagrams (dag)">dag</option>
                                      <option value="kilograms (kg)">kg</option>
                                      <option value="metric tons (t)">t</option>
                                      <option value="grains (gr)">gr</option>
                                      <option value="drachms (dr)">dr</option>
                                      <option value="ounces (oz)">oz</option>
                                      <option value="pounds (lb)">lb</option>
                                      <option value="stones (stone)">stone</option>
                                      <option value="US short tones (US ton)">US ton</option>
                                      <option value="imperial tons (Long ton)">Long ton</option>
                                      <option value="atomic mass unit (u)">u</option>
                                      <option value="troy ounce (oz t)">oz t</option>
                                    </select>
                                  </div>
                                
                              </div>
                              <div className="col-lg-6 px-2 m_m hidden">

                                 <label htmlFor="tech_molar_mass" className="label">
                                  {data?.payload?.tech_lang_keys["26"]}:
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_molar_mass"
                                      id="tech_molar_mass"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_molar_mass}
                                      onChange={handleChange}
                                    />
                                    <span className="input_unit">g/mol</span>
                                    </div>
                                 
                              </div>
                              <div className="col-lg-4 px-2 i_temp hidden">
                                   <label htmlFor="tech_in_temp" className="label">
                                      {data?.payload?.tech_lang_keys["28"]} :
                                        </label>
                                        <div className=" relative">
                                        <input
                                          type="number"
                                          step="any"
                                          name="tech_in_temp"
                                          id="tech_in_temp"
                                          className="input my-2"
                                          aria-label="input"
                                          placeholder="00"
                                          value={formData.tech_in_temp}
                                          onChange={handleChange}
                                        />
                                        </div>
                                
                              </div>
                              <div className="col-lg-2 px-2 i_temp hidden">
                                  <label htmlFor="tech_i_t_units" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_i_t_units"
                                      id="tech_i_t_units"
                                      value={formData.tech_i_t_units}
                                      onChange={handleChange}
                                    >
                                      <option value="kelvin K">K</option>
                                      <option value="celsius °C">°C</option>
                                      <option value="Fahrenheit °F">°F</option>
                                    </select>
                                  </div>

                              </div>
                              <div className="col-lg-4 px-2 f_temp hidden">
                                   <label htmlFor="tech_s_fin_temp" className="label">
                                  {data?.payload?.tech_lang_keys["29"]}:
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_s_fin_temp"
                                      id="tech_s_fin_temp"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_s_fin_temp}
                                      onChange={handleChange}
                                    />
                                    </div>
                                
                              </div>
                              <div className="col-lg-2 px-2 f_temp hidden">
                                 <label htmlFor="tech_S_f_t_units" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_S_f_t_units"
                                      id="tech_S_f_t_units"
                                      value={formData.tech_S_f_t_units}
                                      onChange={handleChange}
                                    >
                                      <option value="kelvin K">K</option>
                                      <option value="celsius °C">°C</option>
                                      <option value="Fahrenheit °F">°F</option>
                                    </select>
                                  </div>
                                 
                              </div>
                          </div>
                      </div>
                      <div className="space-y-2 obj_1 hidden">
                          <div className="row">
                              <div className="col-lg-6 px-2">
                                  <label htmlFor="tech_object_formula_change" className="label">
                                    {data?.payload?.tech_lang_keys["31"]}
                                  </label>
                                  <div className="mt-2">
                                      <select
                                        className="input"
                                        aria-label="select"
                                        name="tech_object_formula_change"
                                        id="tech_object_formula_change"
                                        value={formData.tech_object_formula_change}
                                        onChange={handleChange}
                                      >
                                        <option value="m1">{data?.payload?.tech_lang_keys["23"]} (m₁)</option>
                                        <option value="c1">{data?.payload?.tech_lang_keys["24"]} (c₁)</option>
                                        <option value="Ti(1)">{data?.payload?.tech_lang_keys["28"]} (Tᵢ₁)</option>
                                        <option value="Tf(1)">{data?.payload?.tech_lang_keys["29"]} (T𝒻₁)</option>
                                        <option value="m2">{data?.payload?.tech_lang_keys["23"]} (m₂)</option>
                                        <option value="c2">{data?.payload?.tech_lang_keys["24"]} (c₂)</option>
                                        <option value="Ti(2)">{data?.payload?.tech_lang_keys["28"]} (Tᵢ₂)</option>
                                        <option value="Tf(2)">{data?.payload?.tech_lang_keys["29"]} (T𝒻₂)</option>
                                        <option value="q1">{data?.payload?.tech_lang_keys["22"]} (ΔQ₁)</option>
                                        <option value="q2">{data?.payload?.tech_lang_keys["22"]} (ΔQ₂)</option>
                                      </select>

                                      <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_two_time"
                                      id="tech_two_time"
                                      value={formData.tech_two_time}
                                      onChange={handleChange}
                                    >
                                      <option value="m1_two">{data?.payload?.tech_lang_keys["23"]} (m₁)</option>
                                      <option value="c1_two">{data?.payload?.tech_lang_keys["24"]} (c₁)</option>
                                      <option value="Ti(1)">{data?.payload?.tech_lang_keys["28"]} (Tᵢ₁)</option>
                                      <option value="Tfusion">{data?.payload?.tech_lang_keys["32"]} (T𝒻ᵤₛᵢₒₙ)</option>
                                      <option value="ΔHfusion">{data?.payload?.tech_lang_keys["33"]} (ΔH𝒻ᵤₛᵢₒₙ)</option>
                                      <option value="c2">{data?.payload?.tech_lang_keys["24"]} (c₂)</option>
                                      <option value="m2">{data?.payload?.tech_lang_keys["23"]} (m₂)</option>
                                      <option value="Ti(2)">{data?.payload?.tech_lang_keys["28"]} (Tᵢ₂)</option>
                                      <option value="Tf">{data?.payload?.tech_lang_keys["29"]} (T𝒻)</option>
                                    </select>


                                  </div>
                              </div>
                              <div className="col-lg-6 by">
                                  <div className="temp"></div>
                              </div>
                              <div className="col-lg-4 px-2 mass1">
                                   <label htmlFor="tech_mass_1" className="label">
                                  {data?.payload?.tech_lang_keys["23"]} (\(m_1\)):
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_mass_1"
                                      id="tech_mass_1"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_mass_1}
                                      onChange={handleChange}
                                    />
                                    </div>

                              </div>
                              <div className="col-lg-2 px-2 mass1">
                                    <label htmlFor="tech_m_units1" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_m_units1"
                                      id="tech_m_units1"
                                      value={formData.tech_m_units1}
                                      onChange={handleChange}
                                    >
                                      <option value="grams (g)">g</option>
                                      <option value="picograms (pg)">pg</option>
                                      <option value="nanograms (ng)">ng</option>
                                      <option value="μg">μg</option>
                                      <option value="milligrams (mg)">mg</option>
                                      <option value="decagrams (dag)">dag</option>
                                      <option value="kilograms (kg)">kg</option>
                                      <option value="metric tons (t)">t</option>
                                      <option value="grains (gr)">gr</option>
                                      <option value="drachms (dr)">dr</option>
                                      <option value="ounces (oz)">oz</option>
                                      <option value="pounds (lb)">lb</option>
                                      <option value="stones (stone)">stone</option>
                                      <option value="US short tones (US ton)">US ton</option>
                                      <option value="imperial tons (Long ton)">Long ton</option>
                                      <option value="atomic mass unit (u)">u</option>
                                      <option value="troy ounce (oz t)">oz t</option>
                                    </select>
                                  </div>

                              </div>
                              <div className="col-lg-4 px-2 mass2">
                                   <label htmlFor="tech_mass_2" className="label">
                                  {data?.payload?.tech_lang_keys["23"]} (\(m_2\)):
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_mass_2"
                                      id="tech_mass_2"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_mass_2}
                                      onChange={handleChange}
                                    />
                                    </div>
                                 
                              </div>
                              <div className="col-lg-2 px-2 mass2">
                                   <label htmlFor="tech_m_units2" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_m_units2"
                                      id="tech_m_units2"
                                      value={formData.tech_m_units2}
                                      onChange={handleChange}
                                    >
                                      <option value="grams (g)">g</option>
                                      <option value="picograms (pg)">pg</option>
                                      <option value="nanograms (ng)">ng</option>
                                      <option value="μg">μg</option>
                                      <option value="milligrams (mg)">mg</option>
                                      <option value="decagrams (dag)">dag</option>
                                      <option value="kilograms (kg)">kg</option>
                                      <option value="metric tons (t)">t</option>
                                      <option value="grains (gr)">gr</option>
                                      <option value="drachms (dr)">dr</option>
                                      <option value="ounces (oz)">oz</option>
                                      <option value="pounds (lb)">lb</option>
                                      <option value="stones (stone)">stone</option>
                                      <option value="US short tones (US ton)">US ton</option>
                                      <option value="imperial tons (Long ton)">Long ton</option>
                                      <option value="atomic mass unit (u)">u</option>
                                      <option value="troy ounce (oz t)">oz t</option>
                                    </select>
                                  </div>
                                
                              </div>
                              <div className="col-lg-4 px-2 s_h_c1">
                                 <label htmlFor="tech_heat_capacity_1" className="label">
                                  {data?.payload?.tech_lang_keys["24"]} (\(c_1\)):
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_heat_capacity_1"
                                      id="tech_heat_capacity_1"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_heat_capacity_1}
                                      onChange={handleChange}
                                    />
                                    </div>
                              </div>
                              <div className="col-lg-2 px-2 s_h_c1">
                                  <label htmlFor="tech_s_heat_units1" className="label">
                                  {data?.payload?.tech_lang_keys["1"]}:
                                </label>
                                <div className="mt-2">
                                  <select
                                    className="input"
                                    aria-label="select"
                                    name="tech_s_heat_units1"
                                    id="tech_s_heat_units1"
                                    value={formData.tech_s_heat_units1}
                                    onChange={handleChange}
                                  >
                                    <option value="joules per gram per kelvin (J/(g.k)">J/(g.K)</option>
                                    <option value="joules per kilogram per kelvin J/(kg.k)">J/(kg.K)</option>
                                    <option value="calories per kilogram per kelvin cal/(kg.k)">cal/(kg.K)</option>
                                    <option value="kilocalories per kilogram per kelvin kcal/(kg.k)">kcal/(kg.K)</option>
                                    <option value="joules per kilogram per celsius J/(kg·°C)">J/(kg·°C)</option>
                                    <option value="joules per gram per celsius J/(g·°C)">J/(g·°C)</option>
                                    <option value="calories per kilogram per celsius cal/(kg·°C)">cal/(kg·°C)</option>
                                    <option value="calories per gram per celsius cal/(g·°C)">cal/(g·°C)</option>
                                    <option value="kilocalories per kilogram per celsius kcal/(kg·°C)">kcal/(kg·°C)</option>
                                  </select>
                                </div>

                              </div>
                              <div className="col-lg-4 px-2 s_h_c2">

                                <label htmlFor="tech_heat_capacity_2" className="label">
                                  {data?.payload?.tech_lang_keys["24"]} (\(c_2\)):
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_heat_capacity_2"
                                      id="tech_heat_capacity_2"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_heat_capacity_2}
                                      onChange={handleChange}
                                    />
                                    </div>
                                
                              </div>
                              <div className="col-lg-2 px-2 s_h_c2">
                                    <label htmlFor="tech_s_heat_units2" className="label">
                                  {data?.payload?.tech_lang_keys["1"]}:
                                </label>
                                <div className="mt-2">
                                  <select
                                    className="input"
                                    aria-label="select"
                                    name="tech_s_heat_units2"
                                    id="tech_s_heat_units2"
                                    value={formData.tech_s_heat_units2}
                                    onChange={handleChange}
                                  >
                                    <option value="joules per gram per kelvin (J/(g.k)">J/(g.K)</option>
                                    <option value="joules per kilogram per kelvin J/(kg.k)">J/(kg.K)</option>
                                    <option value="calories per kilogram per kelvin cal/(kg.k)">cal/(kg.K)</option>
                                    <option value="kilocalories per kilogram per kelvin kcal/(kg.k)">kcal/(kg.K)</option>
                                    <option value="joules per kilogram per celsius J/(kg·°C)">J/(kg·°C)</option>
                                    <option value="joules per gram per celsius J/(g·°C)">J/(g·°C)</option>
                                    <option value="calories per kilogram per celsius cal/(kg·°C)">cal/(kg·°C)</option>
                                    <option value="calories per gram per celsius cal/(g·°C)">cal/(g·°C)</option>
                                    <option value="kilocalories per kilogram per celsius kcal/(kg·°C)">kcal/(kg·°C)</option>
                                  </select>
                                 </div>
                              </div>
                              <div className="col-lg-4 px-2 i_temp1">
                                  <label htmlFor="tech_in_temp_1" className="label">
                                 {/* {data?.payload?.tech_lang_keys["28"]} ("\\(T_{i1}\\)"): */}
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_in_temp_1"
                                      id="tech_in_temp_1"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_in_temp_1}
                                      onChange={handleChange}
                                    />
                                    </div>
                              
                              </div>
                              <div className="col-lg-2 px-2 i_temp1">
                                   <label htmlFor="tech_i_t_units1" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_i_t_units1"
                                      id="tech_i_t_units1"
                                      value={formData.tech_i_t_units1}
                                      onChange={handleChange}
                                    >
                                      <option value="kelvin K">K</option>
                                      <option value="celsius °C">°C</option>
                                      <option value="Fahrenheit °F">°F</option>
                                    </select>
                                  </div>
                                 
                              </div>
                              <div className="col-lg-4 px-2 i_temp2">

                                  <label htmlFor="tech_in_temp_2" className="label">
                                  {/* {data?.payload?.tech_lang_keys["28"]} (\(T_{i2}\)): */}
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_in_temp_2"
                                      id="tech_in_temp_2"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_in_temp_2}
                                      onChange={handleChange}
                                    />
                                    </div>
                                 
                              </div>
                              <div className="col-lg-2 px-2 i_temp2">

                                   <label htmlFor="tech_i_t_units2" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_i_t_units2"
                                      id="tech_i_t_units2"
                                      value={formData.tech_i_t_units2}
                                      onChange={handleChange}
                                    >
                                      <option value="kelvin K">K</option>
                                      <option value="celsius °C">°C</option>
                                      <option value="Fahrenheit °F">°F</option>
                                    </select>
                                  </div>
                                 
                              </div>
                              <div className="col-lg-4 px-2 f_temp1">
                                 <label htmlFor="tech_fin_temp_1" className="label">
                                  {/* {data?.payload?.tech_lang_keys["29"]} (\(T_{f1}\)): */}
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_fin_temp_1"
                                      id="tech_fin_temp_1"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_fin_temp_1}
                                      onChange={handleChange}
                                    />
                                    </div>
                                
                              </div>
                              <div className="col-lg-2 px-2 f_temp1">

                                 <label htmlFor="tech_f_t_units1" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_f_t_units1"
                                      id="tech_f_t_units1"
                                      value={formData.tech_f_t_units1}
                                      onChange={handleChange}
                                    >
                                      <option value="kelvin K">K</option>
                                      <option value="celsius °C">°C</option>
                                      <option value="Fahrenheit °F">°F</option>
                                    </select>
                                  </div>
                                 
                              </div>
                              <div className="col-lg-4 px-2 f_temp2">
                                  <label htmlFor="tech_fin_temp_2" className="label">
                                  {/* {data?.payload?.tech_lang_keys["29"]} (\(T_{f2}\)): */}
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_fin_temp_2"
                                      id="tech_fin_temp_2"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_fin_temp_2}
                                      onChange={handleChange}
                                    />
                                    </div>
                                  
                              </div>
                              <div className="col-lg-2 px-2 f_temp2">
                                  <label htmlFor="tech_f_t_units2" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_f_t_units2"
                                      id="tech_f_t_units2"
                                      value={formData.tech_f_t_units2}
                                      onChange={handleChange}
                                    >
                                      <option value="kelvin K">K</option>
                                      <option value="celsius °C">°C</option>
                                      <option value="Fahrenheit °F">°F</option>
                                    </select>
                                  </div>

                              </div>
                              <div className="col-lg-4 px-2 f_temp_two">

                                  <label htmlFor="tech_fin_temp" className="label">
                                  {data?.payload?.tech_lang_keys["29"]} (\(T_f\)):
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_fin_temp"
                                      id="tech_fin_temp"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_fin_temp}
                                      onChange={handleChange}
                                    />
                                    </div>
                                
                              </div>
                              <div className="col-lg-2 px-2 f_temp_two">
                                 <label htmlFor="tech_f_t_units" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_f_t_units"
                                      id="tech_f_t_units"
                                      value={formData.tech_f_t_units}
                                      onChange={handleChange}
                                    >
                                      <option value="kelvin K">K</option>
                                      <option value="celsius °C">°C</option>
                                      <option value="Fahrenheit °F">°F</option>
                                    </select>
                                  </div>
                                 
                              </div>
                              <div className="col-lg-4 px-2 t_fusion">

                                  <label htmlFor="tech_t_fusion" className="label">
                                  {data?.payload?.tech_lang_keys["32"]}:
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_t_fusion"
                                      id="tech_t_fusion"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_t_fusion}
                                      onChange={handleChange}
                                    />
                                    </div>
                               
                              </div>
                              <div className="col-lg-2 px-2 t_fusion">

                                  <label htmlFor="tech_t_units" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_t_units"
                                      id="tech_t_units"
                                      value={formData.tech_t_units}
                                      onChange={handleChange}
                                    >
                                      <option value="kelvin K">K</option>
                                      <option value="celsius °C">°C</option>
                                      <option value="Fahrenheit °F">°F</option>
                                    </select>
                                  </div>
                                 
                              </div>
                              <div className="col-lg-4 px-2 h_fusion">
                                  <label htmlFor="tech_h_fusion" className="label">
                                  {data?.payload?.tech_lang_keys["33"]}:
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_h_fusion"
                                      id="tech_h_fusion"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_h_fusion}
                                      onChange={handleChange}
                                    />
                                    </div>
                                
                              </div>
                              <div className="col-lg-2 px-2 h_fusion">
                               <label htmlFor="tech_h_fusion_unit" className="label">
                                &nbsp;
                              </label>
                              <div className="mt-2">
                                <select
                                  className="input"
                                  aria-label="select"
                                  name="tech_h_fusion_unit"
                                  id="tech_h_fusion_unit"
                                  value={formData.tech_h_fusion_unit}
                                  onChange={handleChange}
                                >
                                  <option value="joules per gram per kelvin (J/(g.k)">J/(g.K)</option>
                                  <option value="joules per kilogram per kelvin J/(kg.k)">J/(kg.K)</option>
                                  <option value="calories per kilogram per kelvin cal/(kg.k)">cal/(kg.K)</option>
                                  <option value="cal/g.K">cal/g.K</option>
                                  <option value="kilocalories per kilogram per kelvin kcal/(kg.k)">kcal/(kg.K)</option>
                                  <option value="joules per kilogram per celsius J/(kg·°C)">J/(kg·°C)</option>
                                  <option value="joules per gram per celsius J/(g·°C)">J/(g·°C)</option>
                                  <option value="calories per kilogram per celsius cal/(kg·°C)">cal/(kg·°C)</option>
                                  <option value="calories per gram per celsius cal/(g·°C)">cal/(g·°C)</option>
                                  <option value="kilocalories per kilogram per celsius kcal/(kg·°C)">kcal/(kg·°C)</option>
                                </select>
                              </div>
                              </div>
                          </div>
                      </div>
                      <div className="space-y-2  obj_3 hidden">
                          <div className="row">
                              <div className="col-lg-6 px-2">

                               <label htmlFor="tech_object3_formula_change" className="label">
                                {data?.payload?.tech_lang_keys["31"]}
                              </label>
                              <div className="mt-2">
                                  <select
                                    className="input"
                                    aria-label="select"
                                    name="tech_object3_formula_change"
                                    id="tech_object3_formula_change"
                                    value={formData.tech_object3_formula_change}
                                    onChange={handleChange}
                                  >
                                    <option value="m1">{data?.payload?.tech_lang_keys["23"]} (m₁)</option>
                                    <option value="c1">{data?.payload?.tech_lang_keys["24"]} (c₁)</option>
                                    <option value="Tf(1)">{data?.payload?.tech_lang_keys["29"]} (T𝒻₁)</option>
                                    <option value="Ti(1)">{data?.payload?.tech_lang_keys["28"]} (Tᵢ₁)</option>
                                    <option value="m2">{data?.payload?.tech_lang_keys["23"]} (m₂)</option>
                                    <option value="c2">{data?.payload?.tech_lang_keys["24"]} (c₂)</option>
                                    <option value="Tf(2)">{data?.payload?.tech_lang_keys["29"]} (T𝒻₂)</option>
                                    <option value="Ti(2)">{data?.payload?.tech_lang_keys["28"]} (Tᵢ₂)</option>
                                    <option value="m3">{data?.payload?.tech_lang_keys["23"]} (m₃)</option>
                                    <option value="c3">{data?.payload?.tech_lang_keys["24"]} (c₃)</option>
                                    <option value="Tf(3)">{data?.payload?.tech_lang_keys["29"]} (T𝒻₃)</option>
                                    <option value="Ti(3)">{data?.payload?.tech_lang_keys["28"]} (Tᵢ₃)</option>
                                  </select>

                                  <select
                                        className="input"
                                        aria-label="select"
                                        name="tech_three_time"
                                        id="tech_three_time"
                                        value={formData.tech_three_time}
                                        onChange={handleChange}
                                      >
                                    <option value="m1">{data?.payload?.tech_lang_keys["23"]} (m₁)</option>
                                    <option value="c1">{data?.payload?.tech_lang_keys["24"]} (c₁)</option>
                                    <option value="Tfusion">{data?.payload?.tech_lang_keys["32"]} (T𝒻ᵤₛᵢₒₙ)</option>
                                    <option value="Ti(1)">{data?.payload?.tech_lang_keys["28"]} (Tᵢ₁)</option>
                                    <option value="Hfusion">{data?.payload?.tech_lang_keys["33"]} (H𝒻ᵤₛᵢₒₙ)</option>
                                    <option value="c2">{data?.payload?.tech_lang_keys["24"]} (c₂)</option>
                                    <option value="m2">{data?.payload?.tech_lang_keys["23"]} (m₂)</option>
                                    <option value="Ti(2)">{data?.payload?.tech_lang_keys["28"]} (Tᵢ₂)</option>
                                    <option value="m3">{data?.payload?.tech_lang_keys["23"]} (m₃)</option>
                                    <option value="c3">{data?.payload?.tech_lang_keys["24"]} (c₃)</option>
                                    <option value="Tf">{data?.payload?.tech_lang_keys["29"]} (Tf)</option>
                                  </select>
                               </div>
                              </div>
                              <div className="col-lg-6 by">
                                  <div className="temp"></div>
                              </div>
                              <div className="col-lg-4 px-2 mass1">
                                   <label htmlFor="tech_mass_1_3" className="label">
                                  {data?.payload?.tech_lang_keys["23"]} (\(m_1\)):
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_mass_1_3"
                                      id="tech_mass_1_3"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_mass_1_3}
                                      onChange={handleChange}
                                    />
                                    </div>
                              
                              </div>
                              <div className="col-lg-2 px-2 mass1">
                                 <label htmlFor="tech_m_units1_3" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_m_units1_3"
                                      id="tech_m_units1_3"
                                      value={formData.tech_m_units1_3}
                                      onChange={handleChange}
                                    >
                                      <option value="grams (g)">g</option>
                                      <option value="picograms (pg)">pg</option>
                                      <option value="nanograms (ng)">ng</option>
                                      <option value="μg">μg</option>
                                      <option value="milligrams (mg)">mg</option>
                                      <option value="decagrams (dag)">dag</option>
                                      <option value="kilograms (kg)">kg</option>
                                      <option value="metric tons (t)">t</option>
                                      <option value="grains (gr)">gr</option>
                                      <option value="drachms (dr)">dr</option>
                                      <option value="ounces (oz)">oz</option>
                                      <option value="pounds (lb)">lb</option>
                                      <option value="stones (stone)">stone</option>
                                      <option value="US short tones (US ton)">US ton</option>
                                      <option value="imperial tons (Long ton)">Long ton</option>
                                      <option value="atomic mass unit (u)">u</option>
                                      <option value="troy ounce (oz t)">oz t</option>
                                    </select>
                                  </div>

                              </div>
                              <div className="col-lg-4 px-2 mass2">

                                  <label htmlFor="tech_mass_2_3" className="label">
                                  {data?.payload?.tech_lang_keys["23"]} (\(m_2\)):
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_mass_2_3"
                                      id="tech_mass_2_3"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_mass_2_3}
                                      onChange={handleChange}
                                    />
                                    </div>
                              
                              </div>
                              <div className="col-lg-2 px-2 mass2">

                                  <label htmlFor="tech_m_units2_3" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_m_units2_3"
                                      id="tech_m_units2_3"
                                      value={formData.tech_m_units2_3}
                                      onChange={handleChange}
                                    >
                                      <option value="grams (g)">g</option>
                                      <option value="picograms (pg)">pg</option>
                                      <option value="nanograms (ng)">ng</option>
                                      <option value="μg">μg</option>
                                      <option value="milligrams (mg)">mg</option>
                                      <option value="decagrams (dag)">dag</option>
                                      <option value="kilograms (kg)">kg</option>
                                      <option value="metric tons (t)">t</option>
                                      <option value="grains (gr)">gr</option>
                                      <option value="drachms (dr)">dr</option>
                                      <option value="ounces (oz)">oz</option>
                                      <option value="pounds (lb)">lb</option>
                                      <option value="stones (stone)">stone</option>
                                      <option value="US short tones (US ton)">US ton</option>
                                      <option value="imperial tons (Long ton)">Long ton</option>
                                      <option value="atomic mass unit (u)">u</option>
                                      <option value="troy ounce (oz t)">oz t</option>
                                    </select>
                                  </div>
                                 
                              </div>
                              <div className="col-lg-4 px-2 mass3">

                                   <label htmlFor="tech_mass_3_3" className="label">
                                  {data?.payload?.tech_lang_keys["23"]} (\(m_3\)):
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_mass_3_3"
                                      id="tech_mass_3_3"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_mass_3_3}
                                      onChange={handleChange}
                                    />
                                    </div>

                              </div>
                              <div className="col-lg-2 px-2 mass3">
                                  <label htmlFor="tech_m_units3_3" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_m_units3_3"
                                      id="tech_m_units3_3"
                                      value={formData.tech_m_units3_3}
                                      onChange={handleChange}
                                    >
                                      <option value="grams (g)">g</option>
                                      <option value="picograms (pg)">pg</option>
                                      <option value="nanograms (ng)">ng</option>
                                      <option value="μg">μg</option>
                                      <option value="milligrams (mg)">mg</option>
                                      <option value="decagrams (dag)">dag</option>
                                      <option value="kilograms (kg)">kg</option>
                                      <option value="metric tons (t)">t</option>
                                      <option value="grains (gr)">gr</option>
                                      <option value="drachms (dr)">dr</option>
                                      <option value="ounces (oz)">oz</option>
                                      <option value="pounds (lb)">lb</option>
                                      <option value="stones (stone)">stone</option>
                                      <option value="US short tones (US ton)">US ton</option>
                                      <option value="imperial tons (Long ton)">Long ton</option>
                                      <option value="atomic mass unit (u)">u</option>
                                      <option value="troy ounce (oz t)">oz t</option>
                                    </select>
                                  </div>

                                
                              </div>
                              <div className="col-lg-4 px-2 s_h_c1">
                                  <label htmlFor="tech_heat_capacity_1_3" className="label">
                                  {data?.payload?.tech_lang_keys["24"]} (\(c_1\)):
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_heat_capacity_1_3"
                                      id="tech_heat_capacity_1_3"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_heat_capacity_1_3}
                                      onChange={handleChange}
                                    />
                                    </div>
                               
                              </div>
                               <div className="col-lg-2 px-2 s_h_c1">

                                   <label htmlFor="tech_s_heat_units1_3" className="label">
                                  {data?.payload?.tech_lang_keys["1"]}:
                                </label>
                                <div className="mt-2">
                                  <select
                                    className="input"
                                    aria-label="select"
                                    name="tech_s_heat_units1_3"
                                    id="tech_s_heat_units1_3"
                                    value={formData.tech_s_heat_units1_3}
                                    onChange={handleChange}
                                  >
                                    <option value="joules per gram per kelvin (J/(g.k)">J/(g.K)</option>
                                    <option value="joules per kilogram per kelvin J/(kg.k)">J/(kg.K)</option>
                                    <option value="calories per kilogram per kelvin cal/(kg.k)">cal/(kg.K)</option>
                                    <option value="kilocalories per kilogram per kelvin kcal/(kg.k)">kcal/(kg.K)</option>
                                    <option value="joules per kilogram per celsius J/(kg·°C)">J/(kg·°C)</option>
                                    <option value="joules per gram per celsius J/(g·°C)">J/(g·°C)</option>
                                    <option value="calories per kilogram per celsius cal/(kg·°C)">cal/(kg·°C)</option>
                                    <option value="calories per gram per celsius cal/(g·°C)">cal/(g·°C)</option>
                                    <option value="kilocalories per kilogram per celsius kcal/(kg·°C)">kcal/(kg·°C)</option>
                                  </select>
                                 </div>
                              </div>
                              <div className="col-lg-4 px-2 s_h_c2">

                                   <label htmlFor="tech_heat_capacity_2_3" className="label">
                                  {data?.payload?.tech_lang_keys["24"]} (\(c_2\)):
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_heat_capacity_2_3"
                                      id="tech_heat_capacity_2_3"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_heat_capacity_2_3}
                                      onChange={handleChange}
                                    />
                                    </div>
                               
                              </div>
                              <div className="col-lg-2 px-2 s_h_c2">
                                
                                   <label htmlFor="tech_s_heat_units2_3" className="label">
                                  {data?.payload?.tech_lang_keys["1"]}:
                                </label>
                                <div className="mt-2">
                                  <select
                                    className="input"
                                    aria-label="select"
                                    name="tech_s_heat_units2_3"
                                    id="tech_s_heat_units2_3"
                                    value={formData.tech_s_heat_units2_3}
                                    onChange={handleChange}
                                  >
                                    <option value="joules per gram per kelvin (J/(g.k)">J/(g.K)</option>
                                    <option value="joules per kilogram per kelvin J/(kg.k)">J/(kg.K)</option>
                                    <option value="calories per kilogram per kelvin cal/(kg.k)">cal/(kg.K)</option>
                                    <option value="kilocalories per kilogram per kelvin kcal/(kg.k)">kcal/(kg.K)</option>
                                    <option value="joules per kilogram per celsius J/(kg·°C)">J/(kg·°C)</option>
                                    <option value="joules per gram per celsius J/(g·°C)">J/(g·°C)</option>
                                    <option value="calories per kilogram per celsius cal/(kg·°C)">cal/(kg·°C)</option>
                                    <option value="calories per gram per celsius cal/(g·°C)">cal/(g·°C)</option>
                                    <option value="kilocalories per kilogram per celsius kcal/(kg·°C)">kcal/(kg·°C)</option>
                                  </select>
                                 </div>
                              </div>
                              <div className="col-lg-4 px-2 s_h_c3">
                                  <label htmlFor="tech_heat_capacity_3_3" className="label">
                                  {data?.payload?.tech_lang_keys["24"]} (\(c_3\)):
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_heat_capacity_3_3"
                                      id="tech_heat_capacity_3_3"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_heat_capacity_3_3}
                                      onChange={handleChange}
                                    />
                                    </div>
                               
                              </div>
                              <div className="col-lg-2 px-2 s_h_c3">

                                
                                   <label htmlFor="tech_s_heat_units3_3" className="label">
                                  {data?.payload?.tech_lang_keys["1"]}:
                                </label>
                                <div className="mt-2">
                                  <select
                                    className="input"
                                    aria-label="select"
                                    name="tech_s_heat_units3_3"
                                    id="tech_s_heat_units3_3"
                                    value={formData.tech_s_heat_units3_3}
                                    onChange={handleChange}
                                  >
                                    <option value="joules per gram per kelvin (J/(g.k)">J/(g.K)</option>
                                    <option value="joules per kilogram per kelvin J/(kg.k)">J/(kg.K)</option>
                                    <option value="calories per kilogram per kelvin cal/(kg.k)">cal/(kg.K)</option>
                                    <option value="kilocalories per kilogram per kelvin kcal/(kg.k)">kcal/(kg.K)</option>
                                    <option value="joules per kilogram per celsius J/(kg·°C)">J/(kg·°C)</option>
                                    <option value="joules per gram per celsius J/(g·°C)">J/(g·°C)</option>
                                    <option value="calories per kilogram per celsius cal/(kg·°C)">cal/(kg·°C)</option>
                                    <option value="calories per gram per celsius cal/(g·°C)">cal/(g·°C)</option>
                                    <option value="kilocalories per kilogram per celsius kcal/(kg·°C)">kcal/(kg·°C)</option>
                                  </select>
                                 </div>
                              </div>
                              <div className="col-lg-4 px-2 i_temp1">

                                    <label htmlFor="tech_in_temp_1_3" className="label">
                                  {/* {data?.payload?.tech_lang_keys["28"]} (\(T_{i1}\)): */}
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_in_temp_1_3"
                                      id="tech_in_temp_1_3"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_in_temp_1_3}
                                      onChange={handleChange}
                                    />
                                    </div>
                                
                              </div>
                              <div className="col-lg-2 px-2 i_temp1">

                                  <label htmlFor="tech_i_t_units1_3" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_i_t_units1_3"
                                      id="tech_i_t_units1_3"
                                      value={formData.tech_i_t_units1_3}
                                      onChange={handleChange}
                                    >
                                      <option value="kelvin K">K</option>
                                      <option value="celsius °C">°C</option>
                                      <option value="Fahrenheit °F">°F</option>
                                    </select>
                                  </div>
                                 
                              </div>
                              <div className="col-lg-4 px-2 i_temp2">
                                     <label htmlFor="tech_in_temp_2_3" className="label">
                                  {/* {data?.payload?.tech_lang_keys["28"]} (\(T_{i2}\)): */}
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_in_temp_2_3"
                                      id="tech_in_temp_2_3"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_in_temp_2_3}
                                      onChange={handleChange}
                                    />
                                    </div>
                                
                              </div>
                              <div className="col-lg-2 px-2 i_temp2">
                                 <label htmlFor="tech_i_t_units2_3" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_i_t_units2_3"
                                      id="tech_i_t_units2_3"
                                      value={formData.tech_i_t_units2_3}
                                      onChange={handleChange}
                                    >
                                      <option value="kelvin K">K</option>
                                      <option value="celsius °C">°C</option>
                                      <option value="Fahrenheit °F">°F</option>
                                    </select>
                                  </div>
                                 
                              </div>
                              <div className="col-lg-4 px-2 i_temp3">
                                     <label htmlFor="tech_in_temp_3_3" className="label">
                                  {/* {data?.payload?.tech_lang_keys["28"]} (\(T_{i3}\)): */}
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_in_temp_3_3"
                                      id="tech_in_temp_3_3"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_in_temp_3_3}
                                      onChange={handleChange}
                                    />
                                    </div>
                                 
                              </div>
                              <div className="col-lg-2 px-2 i_temp3">

                                   <label htmlFor="tech_i_t_units3_3" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_i_t_units3_3"
                                      id="tech_i_t_units3_3"
                                      value={formData.tech_i_t_units3_3}
                                      onChange={handleChange}
                                    >
                                      <option value="kelvin K">K</option>
                                      <option value="celsius °C">°C</option>
                                      <option value="Fahrenheit °F">°F</option>
                                    </select>
                                  </div>
                               
                              </div>
                              <div className="col-lg-4 px-2 f_temp1">
                                     <label htmlFor="tech_fin_temp_1_3" className="label">
                                  {/* {data?.payload?.tech_lang_keys["29"]} (\(T_{f1}\)): */}
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_fin_temp_1_3"
                                      id="tech_fin_temp_1_3"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_fin_temp_1_3}
                                      onChange={handleChange}
                                    />
                                    </div>

                                
                              </div>
                              <div className="col-lg-2 px-2 f_temp1">

                                 <label htmlFor="tech_f_t_units1_3" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_f_t_units1_3"
                                      id="tech_f_t_units1_3"
                                      value={formData.tech_f_t_units1_3}
                                      onChange={handleChange}
                                    >
                                      <option value="kelvin K">K</option>
                                      <option value="celsius °C">°C</option>
                                      <option value="Fahrenheit °F">°F</option>
                                    </select>
                                  </div>
                                 
                              </div>
                              <div className="col-lg-4 px-2 f_temp2">
                                    <label htmlFor="tech_fin_temp_2_3" className="label">
                                  {/* {data?.payload?.tech_lang_keys["29"]} (\(T_{f2}\)): */}
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_fin_temp_2_3"
                                      id="tech_fin_temp_2_3"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_fin_temp_2_3}
                                      onChange={handleChange}
                                    />
                                    </div>
                                 
                              </div>
                              <div className="col-lg-2 px-2 f_temp2">

                                  <label htmlFor="tech_f_t_units2_3" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_f_t_units2_3"
                                      id="tech_f_t_units2_3"
                                      value={formData.tech_f_t_units2_3}
                                      onChange={handleChange}
                                    >
                                      <option value="kelvin K">K</option>
                                      <option value="celsius °C">°C</option>
                                      <option value="Fahrenheit °F">°F</option>
                                    </select>
                                  </div>
                              </div>
                              <div className="col-lg-4 px-2 f_temp3">
                                  <label htmlFor="tech_fin_temp_3_3" className="label">
                                  {/* {data?.payload?.tech_lang_keys["29"]} (\(T_{f3}\)): */}
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_fin_temp_3_3"
                                      id="tech_fin_temp_3_3"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_fin_temp_3_3}
                                      onChange={handleChange}
                                    />
                                    </div>
                                 
                              </div>
                              <div className="col-lg-2 px-2 f_temp3">
                                
                                  <label htmlFor="tech_f_t_units3_3" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_f_t_units3_3"
                                      id="tech_f_t_units3_3"
                                      value={formData.tech_f_t_units3_3}
                                      onChange={handleChange}
                                    >
                                      <option value="kelvin K">K</option>
                                      <option value="celsius °C">°C</option>
                                      <option value="Fahrenheit °F">°F</option>
                                    </select>
                                  </div>
                               
                              </div>
                              <div className="col-lg-4 px-2 f_temp_two">
                                 <label htmlFor="tech_fin_temp_3" className="label">
                                  {data?.payload?.tech_lang_keys["29"]} (\(T_f\)):
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_fin_temp_3"
                                      id="tech_fin_temp_3"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_fin_temp_3}
                                      onChange={handleChange}
                                    />
                                    </div>
                                 
                              </div>
                              <div className="col-lg-2 px-2 f_temp_two">

                                  <label htmlFor="tech_f_t_units_3" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_f_t_units_3"
                                      id="tech_f_t_units_3"
                                      value={formData.tech_f_t_units_3}
                                      onChange={handleChange}
                                    >
                                      <option value="kelvin K">K</option>
                                      <option value="celsius °C">°C</option>
                                      <option value="Fahrenheit °F">°F</option>
                                    </select>
                                  </div>

                               
                              </div>
                              <div className="col-lg-4 px-2 t_fusion">
                                   <label htmlFor="tech_t_fusion_3" className="label">
                                   {/* \(T_{fusion}\): */}
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_t_fusion_3"
                                      id="tech_t_fusion_3"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_t_fusion_3}
                                      onChange={handleChange}
                                    />
                                    </div>
                                  
                              </div>
                              <div className="col-lg-2 px-2 t_fusion">

                                 <label htmlFor="tech_t_units_3" className="label">
                                    &nbsp;
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      className="input"
                                      aria-label="select"
                                      name="tech_t_units_3"
                                      id="tech_t_units_3"
                                      value={formData.tech_t_units_3}
                                      onChange={handleChange}
                                    >
                                      <option value="kelvin K">K</option>
                                      <option value="celsius °C">°C</option>
                                      <option value="Fahrenheit °F">°F</option>
                                    </select>
                                  </div>
                                
                              </div>
                              <div className="col-lg-4 px-2 h_fusion">
                                  <label htmlFor="tech_h_fusion_3" className="label">
                                  {data?.payload?.tech_lang_keys["33"]} :
                                    </label>
                                    <div className=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_h_fusion_3"
                                      id="tech_h_fusion_3"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_h_fusion_3}
                                      onChange={handleChange}
                                    />
                                    </div>
                                 
                              </div>
                              <div className="col-lg-2 px-2 h_fusion">
                                   <label htmlFor="tech_h_units3" className="label">
                                    {data?.payload?.tech_lang_keys["1"]}:
                                  </label>
                                    <div className="mt-2">
                                      <select
                                        className="input"
                                        aria-label="select"
                                        name="tech_h_units3"
                                        id="tech_h_units3"
                                        value={formData.tech_h_units3}
                                        onChange={handleChange}
                                      >
                                        <option value="joules per gram per kelvin (J/(g.k)">J/(g.K)</option>
                                        <option value="joules per kilogram per kelvin J/(kg.k)">J/(kg.K)</option>
                                        <option value="calories per kilogram per kelvin cal/(kg.k)">cal/(kg.K)</option>
                                        <option value="kilocalories per kilogram per kelvin kcal/(kg.k)">kcal/(kg.K)</option>
                                        <option value="joules per kilogram per celsius J/(kg·°C)">J/(kg·°C)</option>
                                        <option value="joules per gram per celsius J/(g·°C)">J/(g·°C)</option>
                                        <option value="calories per kilogram per celsius cal/(kg·°C)">cal/(kg·°C)</option>
                                        <option value="calories per gram per celsius cal/(g·°C)">cal/(g·°C)</option>
                                        <option value="kilocalories per kilogram per celsius kcal/(kg·°C)">kcal/(kg·°C)</option>
                                      </select>
                                  </div>
                              </div>
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
                <div className="w-full result mx-auto p-4 lg:p-8 md:p-8 result_calculator rounded-lg space-y-6 result">
                  <div>
                    <ResultActions lang={data?.payload?.tech_lang_keys} />





                    
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

export default CalorimetryCalculator;
