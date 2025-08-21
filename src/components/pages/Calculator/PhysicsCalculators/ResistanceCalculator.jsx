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
//   useResistanceCalculatorMutation,
// } from "../../../redux/services/calculator/calculatorApi";

import {
  useGetSingleCalculatorDetailsMutation,
} from "../../../redux/services/calculator/calculatorApi";

import {
  useResistanceCalculatorMutation,
} from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const ResistanceCalculator = () => {
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
    tech_operations : "1", //  1 2 3
    tech_band : "4",
    tech_first : "yellow",
    tech_second : "red",
    tech_third : "blue",
    tech_multi : "violet",
    tech_tolerance : "orange",
    tech_temp : "green",
    tech_x : "12,32,12,4,55,12,13,5",
    tech_length : "100",
    tech_l_unit : "m",
    tech_diameter : "0.05",
    tech_d_unit : "cm",
    tech_material : "58000000",
    tech_conductivity : "58000000"
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useResistanceCalculatorMutation();

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prevData) => {
    // Agar material select ho toh conductivity bhi set kare
    if (name === "tech_material") {
      return {
        ...prevData,
        [name]: value,
        tech_conductivity: value,  // select ki value ko input mein set kare
      };
    }

    return {
      ...prevData,
      [name]: value,
    };
  });

  setResult(null);
  setFormError(null);
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_operations) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({

        tech_operations :formData.tech_operations, 
        tech_band :formData.tech_band, 
        tech_first :formData.tech_first, 
        tech_second :formData.tech_second, 
        tech_third :formData.tech_third,
        tech_multi :formData.tech_multi, 
        tech_tolerance :formData.tech_tolerance, 
        tech_temp :formData.tech_temp, 
        tech_x :formData.tech_x, 
        tech_length :formData.tech_length,
        tech_l_unit :formData.tech_l_unit, 
        tech_diameter :formData.tech_diameter,
        tech_d_unit :formData.tech_d_unit,
        tech_material :formData.tech_material, 
        tech_conductivity :formData.tech_conductivity, 


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

     tech_operations : "1", //  1 2 3
    tech_band : "4",
    tech_first : "yellow",
    tech_second : "red",
    tech_third : "blue",
    tech_multi : "violet",
    tech_tolerance : "orange",
    tech_temp : "green",
    tech_x : "12,32,12,4,55,12,13,5",
    tech_length : "100",
    tech_l_unit : "m",
    tech_diameter : "0.05",
    tech_d_unit : "cm",
    tech_material : "58000000",
    tech_conductivity : "58000000"

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
  // majax
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-AMS_HTML";
    script.async = true;
    script.type = "text/javascript";
    script.onload = () => {
      window.MathJax &&
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [result]);
// majax

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


            <div class="lg:w-[60%] md:w-[80%] w-full mx-auto ">
              <div class="grid grid-cols-12 mt-3  gap-2">
                  <div class="col-span-12 mx-auto">
                     <label htmlFor="tech_operations" className="label">
                        {data?.payload?.tech_lang_keys["7"]}:
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
                          <option value="1">{data?.payload?.tech_lang_keys["2"]}</option>
                          <option value="2">{data?.payload?.tech_lang_keys["3"]}</option>
                          <option value="3">{data?.payload?.tech_lang_keys["4"]}</option>
                        </select>
                      </div>
                  </div>
                     {formData.tech_operations == "1" && (
                      <>

                    <div class="col-span-12" id="f_op">
                        <div class="w-full">
                          <label htmlFor="tech_band" className="label">
                          {data?.payload?.tech_lang_keys["7"]}:
                        </label>
                        <div className="mt-2">
                          <select
                            className="input"
                            aria-label="select"
                            name="tech_band"
                            id="tech_band"
                            value={formData.tech_band}
                            onChange={handleChange}
                          >
                            <option value="2">2 {data?.payload?.tech_lang_keys["6"]}</option>
                            <option value="3">3 {data?.payload?.tech_lang_keys["6"]}</option>
                            <option value="4">4 {data?.payload?.tech_lang_keys["6"]}</option>
                            <option value="5">5 {data?.payload?.tech_lang_keys["6"]}</option>
                            <option value="6">6 {data?.payload?.tech_lang_keys["6"]}</option>
                          </select>
                        </div>
                        
                        </div>
                        <div class="w-full overflow-auto">
                            <table>
                            <tr>
                                <td colspan="5"><p class="font_size20 color_blue padding_left_only"><strong>1<sup>st</sup> {data?.payload?.tech_lang_keys[7]}:</strong></p></td>
                            </tr>
                            <tr >
                                <td class="py-2">
                                <label>
                                 <input
                                      type="radio"
                                      name="tech_first"
                                      value="black"
                                      id="black"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_first === 'black'}
                                    />
                                    <span><font class="black w_text">black</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                   <input
                                      type="radio"
                                      name="tech_first"
                                      value="brown"
                                      id="brown"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_first === 'brown'}
                                    />
                                    <span><font class="brown w_text">brown</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                   <input
                                      type="radio"
                                      name="tech_first"
                                      value="red"
                                      id="red"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_first === 'red'}
                                    />

                                    <span><font class="red w_text">red</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                    <input
                                      type="radio"
                                      name="tech_first"
                                      value="orange"
                                      id="orange"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_first === 'orange'}
                                    />

                                    <span><font class="orange b_text">orange</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                     <input
                                      type="radio"
                                      name="tech_first"
                                      value="yellow"
                                      id="yellow"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_first === 'yellow'}
                                    />
                                    <span><font class="yellow b_text">yellow</font></span>
                                </label>
                                </td>
                            </tr>
                            <tr>
                                <td class="py-2">
                                <label>
                                   <input
                                      type="radio"
                                      name="tech_first"
                                      value="green"
                                      id="green"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_first === 'green'}
                                    />

                                    <span><font class="green b_text">green</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                    <input
                                      type="radio"
                                      name="tech_first"
                                      value="blue"
                                      id="blue"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_first === 'blue'}
                                    />
                                    <span><font class="blue b_text">blue</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                   <input
                                      type="radio"
                                      name="tech_first"
                                      value="violet"
                                      id="violet"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_first === 'violet'}
                                    />

                                    <span><font class="violet w_text">violet</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                    <input
                                      type="radio"
                                      name="tech_first"
                                      value="grey"
                                      id="grey"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_first === 'grey'}
                                    />
                                    <span><font class="grey b_text">grey</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                      <input
                                      type="radio"
                                      name="tech_first"
                                      value="white"
                                      id="white"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_first === 'white'}
                                    />
                                    <span><font class="white b_text">white</font></span>
                                </label>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="5"><p class="font_size20 color_blue padding_left_only"><strong>2<sup>nd</sup> {data?.payload?.tech_lang_keys[7]}:</strong></p></td>
                            </tr>
                            <tr>
                                <td class="py-2">
                                <label>
                                      <input
                                      type="radio"
                                      name="tech_second"
                                      value="black"
                                      id="black"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_second === 'black'}
                                    />

                                    <span><font class="black w_text">black</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                      <input
                                      type="radio"
                                      name="tech_second"
                                      value="brown"
                                      id="brown"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_second === 'brown'}
                                    />
                                    <span><font class="brown w_text">brown</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                    <input
                                      type="radio"
                                      name="tech_second"
                                      value="red"
                                      id="red"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_second === 'red'}
                                    />
                                    <span><font class="red w_text">red</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                      <input
                                      type="radio"
                                      name="tech_second"
                                      value="orange"
                                      id="orange"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_second === 'orange'}
                                    />

                                    <span><font class="orange b_text">orange</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                       <input
                                      type="radio"
                                      name="tech_second"
                                      value="yellow"
                                      id="yellow"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_second === 'yellow'}
                                    />
                                    <span><font class="yellow b_text">yellow</font></span>
                                </label>
                                </td>
                            </tr>
                            <tr>
                                <td class="py-2">
                                <label>
                                     <input
                                      type="radio"
                                      name="tech_second"
                                      value="green"
                                      id="green"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_second === 'green'}
                                    />

                                    <span><font class="green b_text">green</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                         <input
                                      type="radio"
                                      name="tech_second"
                                      value="blue"
                                      id="blue"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_second === 'blue'}
                                    />
                                    <span><font class="blue b_text">blue</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                      <input
                                      type="radio"
                                      name="tech_second"
                                      value="violet"
                                      id="violet"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_second === 'violet'}
                                    />
                                    <span><font class="violet w_text">violet</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                    <input
                                      type="radio"
                                      name="tech_second"
                                      value="grey"
                                      id="grey"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_second === 'grey'}
                                    />
                                    <span><font class="grey b_text">grey</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                   <input
                                      type="radio"
                                      name="tech_second"
                                      value="white"
                                      id="white"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_second === 'white'}
                                    />
                                    <span><font class="white b_text">white</font></span>
                                </label>
                                </td>
                            </tr>
                        
                          {(formData.tech_band == "3" ||  formData.tech_band == "4" || formData.tech_band == "5" || formData.tech_band == "6") && (
                            <>
                            <tr class=" hide_third1">
                                <td colspan="5"><p class="font_size20 color_blue padding_left_only"><strong>3<sup>rd</sup> {data?.payload?.tech_lang_keys[7]}:</strong></p></td>
                            </tr>
                            <tr class=" hide_third1">
                                <td class="py-2">
                                <label>
                                    <input
                                      type="radio"
                                      name="tech_third"
                                      value="black"
                                      id="black"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_third === 'black'}
                                    />
                                    <span><font class="black w_text">black</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                    <input
                                      type="radio"
                                      name="tech_third"
                                      value="brown"
                                      id="brown"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_third === 'brown'}
                                    />
                                    <span><font class="brown w_text">brown</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                    <input
                                      type="radio"
                                      name="tech_third"
                                      value="red"
                                      id="red"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_third === 'red'}
                                    />
                                    <span><font class="red w_text">red</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                    <input
                                      type="radio"
                                      name="tech_third"
                                      value="orange"
                                      id="orange"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_third === 'orange'}
                                    />
                                    <span><font class="orange b_text">orange</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                      <input
                                      type="radio"
                                      name="tech_third"
                                      value="yellow"
                                      id="yellow"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_third === 'yellow'}
                                    />
                                    <span><font class="yellow b_text">yellow</font></span>
                                </label>
                                </td>
                            </tr>
                            <tr class=" hide_third1">
                                <td class="py-2">
                                <label>
                                     <input
                                      type="radio"
                                      name="tech_third"
                                      value="green"
                                      id="green"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_third === 'green'}
                                    />
                                    <span><font class="green b_text">green</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                      <input
                                      type="radio"
                                      name="tech_third"
                                      value="blue"
                                      id="blue"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_third === 'blue'}
                                    />

                                    <span><font class="blue b_text">blue</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                    <input
                                      type="radio"
                                      name="tech_third"
                                      value="violet"
                                      id="violet"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_third === 'violet'}
                                    />
                                    
                                    <span><font class="violet w_text">violet</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                   <input
                                      type="radio"
                                      name="tech_third"
                                      value="grey"
                                      id="grey"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_third === 'grey'}
                                    />
                                    <span><font class="grey b_text">grey</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                   <input
                                      type="radio"
                                      name="tech_third"
                                      value="white"
                                      id="white"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_third === 'white'}
                                    />
                                    <span><font class="white b_text">white</font></span>
                                </label>
                                </td>
                            </tr>
                            </>
                          )}
                          {( formData.tech_band == "4" || formData.tech_band == "5" || formData.tech_band == "6" ) && (
                            <>
                            <tr class=" hide_mul1">
                                <td colspan="5"><p class="font_size20 color_blue padding_left_only"><strong>{data?.payload?.tech_lang_keys[8]}:</strong></p></td>
                            </tr>
                            <tr class=" hide_mul1">
                                <td class="py-2">
                                <label>
                                   <input
                                      type="radio"
                                      name="tech_multi"
                                      value="black"
                                      id="black"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_multi === 'black'}
                                    />

                                    <span><font class="black w_text">black</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                     <input
                                      type="radio"
                                      name="tech_multi"
                                      value="brown"
                                      id="brown"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_multi === 'brown'}
                                    />

                                    <span><font class="brown w_text">brown</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                    <input
                                      type="radio"
                                      name="tech_multi"
                                      value="red"
                                      id="red"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_multi === 'red'}
                                    />

                                    <span><font class="red w_text">red</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                    <input
                                      type="radio"
                                      name="tech_multi"
                                      value="orange"
                                      id="orange"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_multi === 'orange'}
                                    />
                                    <span><font class="orange b_text">orange</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                  <input
                                      type="radio"
                                      name="tech_multi"
                                      value="yellow"
                                      id="yellow"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_multi === 'yellow'}
                                    />
                                    <span><font class="yellow b_text">yellow</font></span>
                                </label>
                                </td>
                            </tr>
                            <tr class=" hide_mul1">
                                <td class="py-2">
                                <label>
                                   <input
                                      type="radio"
                                      name="tech_multi"
                                      value="green"
                                      id="green"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_multi === 'green'}
                                    />
                                    <span><font class="green b_text">green</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                      <input
                                      type="radio"
                                      name="tech_multi"
                                      value="blue"
                                      id="blue"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_multi === 'blue'}
                                    />
                                    <span><font class="blue b_text">blue</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                      <input
                                      type="radio"
                                      name="tech_multi"
                                      value="violet"
                                      id="violet"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_multi === 'violet'}
                                    />
                                    <span><font class="violet w_text">violet</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                     <input
                                      type="radio"
                                      name="tech_multi"
                                      value="grey"
                                      id="grey"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_multi === 'grey'}
                                    />
                                    <span><font class="grey b_text">grey</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                     <input
                                      type="radio"
                                      name="tech_multi"
                                      value="white"
                                      id="white"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_multi === 'white'}
                                    />
                                    <span><font class="white b_text">white</font></span>
                                </label>
                                </td>
                            </tr>
                            <tr class=" hide_mul1">
                                <td class="py-2">
                                <label>
                                     <input
                                      type="radio"
                                      name="tech_multi"
                                      value="gold"
                                      id="gold"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_multi === 'gold'}
                                    />
                                    <span><font class="gold b_text">gold</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                     <input
                                      type="radio"
                                      name="tech_multi"
                                      value="silver"
                                      id="silver"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_multi === 'silver'}
                                    />

                                    <span><font class="silver b_text">silver</font></span>
                                </label>
                                </td>
                            </tr>
                            </>
                          )}
                          {( formData.tech_band == "5"  || formData.tech_band == "6" ) && (
                            <>
                            <tr class=" hide_tol1">
                                <td colspan="5"><p class="font_size20 color_blue padding_left_only"><strong>{data?.payload?.tech_lang_keys[9]}:</strong></p></td>
                            </tr>
                            <tr class=" hide_tol1">
                                <td class="py-2">
                                <label>
                                     <input
                                      type="radio"
                                      name="tech_tolerance"
                                      value="brown"
                                      id="brown"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_tolerance === 'brown'}
                                    />

                                    <span><font class="brown w_text">brown</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                       <input
                                      type="radio"
                                      name="tech_tolerance"
                                      value="red"
                                      id="red"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_tolerance === 'red'}
                                    />
                                    <span><font class="red w_text">red</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                      <input
                                      type="radio"
                                      name="tech_tolerance"
                                      value="orange"
                                      id="orange"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_tolerance === 'orange'}
                                    />
                                    <span><font class="orange b_text">orange</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                     <input
                                      type="radio"
                                      name="tech_tolerance"
                                      value="yellow"
                                      id="yellow"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_tolerance === 'yellow'}
                                    />

                                    <span><font class="yellow b_text">yellow</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                     <input
                                      type="radio"
                                      name="tech_tolerance"
                                      value="green"
                                      id="green"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_tolerance === 'green'}
                                    />
                                    <span><font class="green b_text">green</font></span>
                                </label>
                                </td>
                            </tr>
                            <tr class=" hide_tol1">
                                <td class="py-2">
                                <label>
                                    <input
                                      type="radio"
                                      name="tech_tolerance"
                                      value="blue"
                                      id="blue"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_tolerance === 'blue'}
                                    />

                                    <span><font class="blue b_text">blue</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                     <input
                                      type="radio"
                                      name="tech_tolerance"
                                      value="violet"
                                      id="violet"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_tolerance === 'violet'}
                                    />

                                    <span><font class="violet w_text">violet</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                    <input
                                      type="radio"
                                      name="tech_tolerance"
                                      value="grey"
                                      id="grey"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_tolerance === 'grey'}
                                    />
                                    <span><font class="grey b_text">grey</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                     <input
                                      type="radio"
                                      name="tech_tolerance"
                                      value="gold"
                                      id="gold"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_tolerance === 'gold'}
                                    />
                                    <span><font class="gold b_text">gold</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                     <input
                                      type="radio"
                                      name="tech_tolerance"
                                      value="silver"
                                      id="silver"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_tolerance === 'silver'}
                                    />

                                    <span><font class="silver b_text">silver</font></span>
                                </label>
                                </td>
                            </tr>
                            </>
                          )}
                            {( formData.tech_band == "6") && (
                            <>
                            <tr class=" hide_temp1">
                                <td colspan="5"><p class="font_size20 color_blue padding_left_only"><strong>{data?.payload?.tech_lang_keys[10]}:</strong></p></td>
                            </tr>
                            <tr class=" hide_temp1">
                                <td class="py-2">
                                <label>
                                      <input
                                      type="radio"
                                      name="tech_temp"
                                      value="black"
                                      id="black"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_temp === 'black'}
                                    />
                                    <span><font class="black w_text">black</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                    <input
                                      type="radio"
                                      name="tech_temp"
                                      value="brown"
                                      id="brown"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_temp === 'brown'}
                                    />
                                    <span><font class="brown w_text">brown</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                   <input
                                      type="radio"
                                      name="tech_temp"
                                      value="red"
                                      id="red"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_temp === 'red'}
                                    />
                                    <span><font class="red w_text">red</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                  <input
                                      type="radio"
                                      name="tech_temp"
                                      value="orange"
                                      id="orange"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_temp === 'orange'}
                                    />

                                    <span><font class="orange b_text">orange</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                   <input
                                      type="radio"
                                      name="tech_temp"
                                      value="yellow"
                                      id="yellow"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_temp === 'yellow'}
                                    />

                                    <span><font class="yellow b_text">yellow</font></span>
                                </label>
                                </td>
                            </tr>
                            <tr class=" hide_temp1">
                                <td class="py-2">
                                <label>
                                     <input
                                      type="radio"
                                      name="tech_temp"
                                      value="green"
                                      id="green"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_temp === 'green'}
                                    />
                                    <span><font class="green b_text">green</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                    <input
                                      type="radio"
                                      name="tech_temp"
                                      value="blue"
                                      id="blue"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_temp === 'blue'}
                                    />

                                    <span><font class="blue b_text">blue</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                      <input
                                      type="radio"
                                      name="tech_temp"
                                      value="violet"
                                      id="violet"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_temp === 'violet'}
                                    />
                                    <span><font class="violet w_text">violet</font></span>
                                </label>
                                </td>
                                <td>
                                <label>
                                    <input
                                      type="radio"
                                      name="tech_temp"
                                      value="grey"
                                      id="grey"
                                      className="mr-2 border with-gap"
                                      onChange={handleChange}
                                      checked={formData.tech_temp === 'grey'}
                                    />
                                    <span><font class="grey b_text">grey</font></span>
                                </label>
                                </td>
                            </tr>
                            
                            </>
                          )}

                            </table>
                        </div>
                    </div>
                    </>
                    )}

                    {formData.tech_operations == "2" && (
                      <>
                    <div class="col-span-12 " id="s_op">
                          <label htmlFor="tech_x" className="label">
                            {data?.payload?.tech_lang_keys["11"]}:
                          </label>
                          <div class="w-full py-2">
                          <textarea
                            name="tech_x"
                            id="tech_x"
                            className="input textareaInput"
                            aria-label="textarea input"
                            placeholder="e.g. 6, 7, 7, 8, 12, 14, 15, 16, 16, 19"
                            value={formData.tech_x || ""}
                            onChange={handleChange}
                          />
                          </div>
                    </div>
                      </>
                    )}
                    {formData.tech_operations == "3" && (
                      <>
                      <div class=" col-span-12" id="l_op">
                        <div class="grid grid-cols-12 mt-3  gap-4">
                            <div class="col-span-12 md:col-span-6">
                                  <label htmlFor="tech_length" className="label">
                                      {data?.payload?.tech_lang_keys["12"]}:
                                        </label>
                             
                                <div id="f1" class="grid grid-cols-12 mt-3  gap-2">
                                    <div class="col-span-6">
                                          <div class=" relative">
                                        <input
                                          type="number"
                                          step="any"
                                          name="tech_length"
                                          id="tech_length"
                                          className="input "
                                          aria-label="input"
                                            placeholder="00"
                                          value={formData.tech_length}
                                          onChange={handleChange}
                                        />
                                        </div>
                                    </div>
                                    <div class="col-span-6">
                                          <select
                                        className="input"
                                        aria-label="select"
                                        name="tech_l_unit"
                                        id="tech_l_unit"
                                        value={formData.tech_l_unit}
                                        onChange={handleChange}
                                      >
                                      <option value="ft">ft</option>
                                        <option value="yd">yd</option>
                                        <option value="in">in</option>
                                        <option value="mile">mile</option>
                                        <option value="m" selected>m</option>
                                        <option value="km">km</option>
                                        <option value="cm">cm</option>
                                      </select>
                                      
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-12 md:col-span-6">
                                <label htmlFor="tech_diameter" className="label">
                                      {data?.payload?.tech_lang_keys["13"]}:
                                        </label>
                                    <div class="grid grid-cols-12 mt-3  gap-2">
                                        <div class="col-span-6 pe-2">
                                            <div class=" relative">
                                            <input
                                              type="number"
                                              step="any"
                                              name="tech_diameter"
                                              id="tech_diameter"
                                              className="input  "
                                              aria-label="input"
                                              placeholder="00"
                                              value={formData.tech_diameter}
                                              onChange={handleChange}
                                            />
                                            </div>
                                      
                                        </div>
                                        <div class="col-span-6">
                                              <select
                                            className="input"
                                            aria-label="select"
                                            name="tech_d_unit"
                                            id="tech_d_unit"
                                            value={formData.tech_d_unit}
                                            onChange={handleChange}
                                          >
                                        <option value="ft">ft</option>
                                                <option value="yd">yd</option>
                                                <option value="in">in</option>
                                                <option value="mile">mile</option>
                                                <option value="m">m</option>
                                                <option value="km">km</option>
                                                <option value="cm" selected>cm</option>
                                          </select>

                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div class="grid grid-cols-12 mt-3  gap-2">
                            <div class="col-span-6">

                                <label htmlFor="tech_material" className="label">
                                {data?.payload?.tech_lang_keys["14"]}:
                              </label>
                              <div className="mt-2">
                                <select
                                  className="input"
                                  aria-label="select"
                                  name="tech_material"
                                  id="tech_material"
                                  value={formData.tech_material}
                                  onChange={handleChange}
                                >
                                  <option value="63000000">{data?.payload?.tech_lang_keys[15]}</option>
                                    <option value="59600000">{data?.payload?.tech_lang_keys[16]}</option>
                                    <option value="58000000" selected>{data?.payload?.tech_lang_keys[17]}</option>
                                    <option value="45200000">{data?.payload?.tech_lang_keys[18]}</option>
                                    <option value="37800000">{data?.payload?.tech_lang_keys[19]}</option>
                                </select>
                              </div>
                            </div>
                            <div class="col-span-6">

                                <label htmlFor="tech_conductivity" className="label">
                                  {data?.payload?.tech_lang_keys["20"]}:
                                    </label>
                                    <div class=" relative">
                                    <input
                                      type="number"
                                      step="any"
                                      name="tech_conductivity"
                                      id="tech_conductivity"
                                      className="input my-2"
                                      aria-label="input"
                                      placeholder="00"
                                      value={formData.tech_conductivity}
                                      onChange={handleChange}
                                    />
                                    <span class="input_unit">S/m</span>
                                    </div>
                            </div>
                        </div>
                    </div>
                      </>
                    )}
                    
                  <div class="col-span-12">
                      <p class="my-2">
                      <span class="font_size18">{data?.payload?.tech_lang_keys[21]}:</span>
                      <span><a href="/ohms-law-calculator" target="_blank" rel="noopener">Ohms Law Calculator</a></span>,
                      <span><a href="/parallel-resistor-calculator" target="_blank" rel="noopener">Parallel Resistor Calculator</a></span>
                      </p>
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
                 
                    <div className="rounded-lg flex items-center justify-center">
                        <div className="w-full mt-3">
                          <div className="w-full text-center">
                            {formData?.tech_operations === "1" ? (
                              <>
                                <div className="col-12 text-center">
                                  <div className="div_center overflow-auto">
                                    <img
                                      src="/images/Resistor.svg"
                                      id="im"
                                      alt="Resistor Image"
                                      width="500px"
                                      height="300px"
                                    />

                                    <div className={`color_div color1 ${formData?.tech_first}`}></div>
                                    <div className={`color_div color2 ${formData?.tech_second}`}></div>

                                    {(formData?.tech_band === "5" || formData?.tech_band === "6") && (
                                      <div className={`color_div color4 ${formData?.tech_third}`}></div>
                                    )}

                                    <div className={`color_div color3 ${formData?.tech_multi}`}></div>

                                    {(formData?.tech_band === "5" || formData?.tech_band === "4" || formData?.tech_band === "6") && (
                                      <div className={`color_div color5 ${formData?.tech_tolerance}`}></div>
                                    )}

                                    {formData?.tech_band === "6" && (
                                      <div className={`color_div color6 ${formData?.tech_temp}`}></div>
                                    )}
                                  </div>
                                </div>

                                <p className="text-[25px] bg-w-auto bg-sku px-3 py-2 d-inline-block my-3">
                                  <strong className="text-blue">{result?.tech_answer}</strong>
                                </p>
                              </>
                            ) : formData?.tech_operations === "2" ? (
                              <>
                                <div className="text-center">
                                  <p className="font-s-20">
                                    <strong>{data?.payload?.tech_lang_keys["23"]}</strong>
                                  </p>
                                  <p className="text-[25px] bg-w-auto bg-sky-100 px-3 py-2 d-inline-block my-3">
                                    <strong className="text-blue">{result?.tech_answer}</strong>
                                  </p>
                                </div>
                              </>
                            ) : formData?.tech_operations === "3" ? (
                              <>
                                <div className="text-center">
                                  <p className="font-s-20">
                                    <strong>{data?.payload?.tech_lang_keys["24"]}</strong>
                                  </p>
                                  <p className="text-[25px] bg-w-auto bg-sky-100 px-3 py-2 d-inline-block my-3">
                                    <strong className="text-blue">{result?.tech_answer} ohm (Ω)</strong>
                                  </p>
                                </div>
                              </>
                            ) : null}
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

export default ResistanceCalculator;
