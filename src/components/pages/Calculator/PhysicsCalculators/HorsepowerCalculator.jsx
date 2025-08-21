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
//   useHorsepowerCalculatorMutation,
// } from "../../../redux/services/calculator/calculatorApi";

import {
  useGetSingleCalculatorDetailsMutation,
} from "../../../redux/services/calculator/calculatorApi";

import {
  useHorsepowerCalculatorMutation,
} from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const HorsepowerCalculator = () => {
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
      tech_method : "1", // 1 2 3 4
      tech_weight : "12",
      tech_unit_w : "lbs",
      tech_time : "12",
      tech_unit_t : "sec",
      tech_speed : "12",
      tech_unit_s : "mph",
      tech_force : "12",
      tech_for_u : "N",
      tech_distance : "12",
      tech_dis_u : "m",
      tech_btime : "12",
      tech_unit_bt : "sec",
      tech_to : "1",
      tech_rpm : "00",
      tech_tor : "00",
      tech_hors : "00"
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useHorsepowerCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
        setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_method) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({

          tech_method :formData.tech_method, 
          tech_weight :formData.tech_weight, 
          tech_unit_w :formData.tech_unit_w, 
          tech_time :formData.tech_time, 
          tech_unit_t :formData.tech_unit_t,
          tech_speed :formData.tech_speed, 
          tech_unit_s :formData.tech_unit_s,
          tech_force :formData.tech_force, 
          tech_for_u :formData.tech_for_u, 
          tech_distance :formData.tech_distance, 
          tech_dis_u :formData.tech_dis_u, 
          tech_btime :formData.tech_btime, 
          tech_unit_bt :formData.tech_unit_bt, 
          tech_to :formData.tech_to, 
          tech_rpm :formData.tech_rpm, 
          tech_tor :formData.tech_tor, 
          tech_hors :formData.tech_hors, 


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

   tech_method : "1", // 1 2 3 4
      tech_weight : "12",
      tech_unit_w : "lbs",
      tech_time : "12",
      tech_unit_t : "sec",
      tech_speed : "12",
      tech_unit_s : "mph",
      tech_force : "12",
      tech_for_u : "N",
      tech_distance : "12",
      tech_dis_u : "m",
      tech_btime : "12",
      tech_unit_bt : "sec",
      tech_to : "1",
      tech_rpm : "00",
      tech_tor : "00",
      tech_hors : "00"

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
  setFormData((prev) => ({ ...prev, tech_unit_w: unit }));
  setDropdownVisible(false);
};

const toggleDropdown = () => {
  setDropdownVisible(!dropdownVisible);
};



//dropdown states
  const [dropdownVisible1, setDropdownVisible1] = useState(false);

const setUnitHandler1 = (unit) => {
  setFormData((prev) => ({ ...prev, tech_unit_t: unit }));
  setDropdownVisible1(false);
};

const toggleDropdown1 = () => {
  setDropdownVisible1(!dropdownVisible1);
};



//dropdown states
  const [dropdownVisible2, setDropdownVisible2] = useState(false);

const setUnitHandler2 = (unit) => {
  setFormData((prev) => ({ ...prev, tech_unit_s: unit }));
  setDropdownVisible2(false);
};

const toggleDropdown2 = () => {
  setDropdownVisible2(!dropdownVisible2);
};



//dropdown states
  const [dropdownVisible3, setDropdownVisible3] = useState(false);

const setUnitHandler3 = (unit) => {
  setFormData((prev) => ({ ...prev, tech_for_u: unit }));
  setDropdownVisible3(false);
};

const toggleDropdown3 = () => {
  setDropdownVisible3(!dropdownVisible3);
};



//dropdown states
  const [dropdownVisible4, setDropdownVisible4] = useState(false);

const setUnitHandler4 = (unit) => {
  setFormData((prev) => ({ ...prev, tech_dis_u: unit }));
  setDropdownVisible4(false);
};

const toggleDropdown4 = () => {
  setDropdownVisible4(!dropdownVisible4);
};


//dropdown states
  const [dropdownVisible5, setDropdownVisible5] = useState(false);

const setUnitHandler5 = (unit) => {
  setFormData((prev) => ({ ...prev, tech_unit_bt: unit }));
  setDropdownVisible5(false);
};

const toggleDropdown5 = () => {
  setDropdownVisible5(!dropdownVisible5);
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
            <div className="lg:w-[60%] md:w-[80%] w-full mx-auto ">

            <div className="grid grid-cols-12  gap-4">
                <div className="col-span-12">
                     <label htmlFor="tech_method" className="label">
                      {data?.payload?.tech_lang_keys["method"]}:
                    </label>
                    <div className="mt-2">
                      <select
                        className="input"
                        aria-label="select"
                        name="tech_method"
                        id="tech_method"
                        value={formData.tech_method}
                        onChange={handleChange}
                      >
                        <option value="1">{data?.payload?.tech_lang_keys["et"]}</option>
                        <option value="2">{data?.payload?.tech_lang_keys["ts"]} </option>
                        <option value="3">{data?.payload?.tech_lang_keys["rpm"]} </option>
                        <option value="4">{data?.payload?.tech_lang_keys["base"]} </option>
                      </select>
                    </div>
                </div>

                  {(formData.tech_method == "1" || formData.tech_method == "2") && (
                    <>
                    <div className="col-span-12 md:col-span-6 lg:col-span-6 weight">

                      <label htmlFor="tech_weight" className="label" >
                          {data?.payload?.tech_lang_keys["weight"]}
                            </label>
                            <div className="relative w-full ">
                              <input
                                type="number"
                                name="tech_weight"
                                step="any"
                                className="mt-1 input"
                                min="1" 
                                value={formData.tech_weight}
                                placeholder="00"
                                onChange={handleChange}
                              />
                              <label
                                className="absolute cursor-pointer text-sm underline right-6 top-4"
                                onClick={toggleDropdown}
                              >
                                {formData.tech_unit_w} ▾
                              </label>
                              {dropdownVisible && (
                                <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                                  {[
                                    { label: "lbs", value: "lbs" },
                                    { label: "min", value: "min" },
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
                    </>
                   )}
                 {(formData.tech_method == "1") && (
                  <>
                <div className="col-span-12 md:col-span-6 lg:col-span-6 trap">

                     <label htmlFor="tech_time" className="label" >
                      {data?.payload?.tech_lang_keys["time"]}
                        </label>
                        <div className="relative w-full ">
                          <input
                            type="number"
                            name="tech_time"
                            min="1" 
                            step="any"
                            className="mt-1 input"
                            value={formData.tech_time}
                            placeholder="00"
                            onChange={handleChange}
                          />
                          <label
                            className="absolute cursor-pointer text-sm underline right-6 top-4"
                            onClick={toggleDropdown1}
                          >
                            {formData.tech_unit_t} ▾
                          </label>
                          {dropdownVisible1 && (
                            <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                              {[
                                { label: "sec", value: "sec" },
                                { label: "min", value: "min" },
                                { label: "h", value: "h" },
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
                  </>
                  )}
                   {(formData.tech_method == "2") && (
                  <>
                  <div className="col-span-12 md:col-span-6 lg:col-span-6 elapsed ">

                    <label htmlFor="tech_speed" className="label" >
                        {data?.payload?.tech_lang_keys["speed"]}
                          </label>
                          <div className="relative w-full ">
                            <input
                              type="number"
                              name="tech_speed"
                              min="1" 
                              step="any"
                              className="mt-1 input"
                              value={formData.tech_speed}
                              placeholder="00"
                              onChange={handleChange}
                            />
                            <label
                              className="absolute cursor-pointer text-sm underline right-6 top-4"
                              onClick={toggleDropdown2}
                            >
                              {formData.tech_unit_s} ▾
                            </label>
                            {dropdownVisible2 && (
                              <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                                {[
                                  { label: "mph", value: "mph" },
                                  { label: "km/s", value: "km/s" },
                                  { label: "km/h", value: "km/h" },
                                  { label: "m/s", value: "m/s" },
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
                  </>
                  )}

            </div>

            {formData.tech_method == "4" && (
              <>
              <div className="grid grid-cols-12 gap-2 mt-3 based ">
                  <div className="col-span-6">
                    <label htmlFor="tech_force" className="label" >
                        {data?.payload?.tech_lang_keys["for"]}
                          </label>
                          <div className="relative w-full ">
                            <input
                              type="number"
                              name="tech_force"
                              min="1" 
                              step="any"
                              className="mt-1 input"
                              value={formData.tech_force}
                              placeholder="00"
                              onChange={handleChange}
                            />
                            <label
                              className="absolute cursor-pointer text-sm underline right-6 top-4"
                              onClick={toggleDropdown3}
                            >
                              {formData.tech_for_u} ▾
                            </label>
                            {dropdownVisible3 && (
                              <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                                {[
                                  { label: "mph", value: "N" },
                                  { label: "kN", value: "kN" },
                                  { label: "MN", value: "MN" },
                                  { label: "GN", value: "GN" },
                                  { label: "TN", value: "TN" },
                                ].map((unit, index) => (
                                  <p
                                    key={index}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => setUnitHandler3(unit.value)}
                                  >
                                    {unit.label}
                                  </p>
                                ))}
                              </div>
                              )}
                          </div>
                  
                  </div>
                  <div className="col-span-6">

                      <label htmlFor="tech_distance" className="label" >
                        {data?.payload?.tech_lang_keys["dis"]}
                          </label>
                          <div className="relative w-full ">
                            <input
                              type="number"
                              name="tech_distance"
                              min="1" 
                              step="any"
                              className="mt-1 input"
                              value={formData.tech_distance}
                              placeholder="00"
                              onChange={handleChange}
                            />
                            <label
                              className="absolute cursor-pointer text-sm underline right-6 top-4"
                              onClick={toggleDropdown4}
                            >
                              {formData.tech_dis_u} ▾
                            </label>
                            {dropdownVisible4 && (
                              <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                                {[
                                  { label: "m", value: "m" },
                                  { label: "km", value: "km" },
                                  { label: "yd", value: "yd" },
                                ].map((unit, index) => (
                                  <p
                                    key={index}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => setUnitHandler4(unit.value)}
                                  >
                                    {unit.label}
                                  </p>
                                ))}
                              </div>
                              )}
                          </div>
                    
                  </div>
                  <div className="col-span-6">
                    <label htmlFor="tech_btime" className="label" >
                        {data?.payload?.tech_lang_keys["time"]}
                          </label>
                          <div className="relative w-full ">
                            <input
                              type="number"
                              name="tech_btime"
                              min="1" 
                              step="any"
                              className="mt-1 input"
                              value={formData.tech_btime}
                              placeholder="00"
                              onChange={handleChange}
                            />
                            <label
                              className="absolute cursor-pointer text-sm underline right-6 top-4"
                              onClick={toggleDropdown5}
                            >
                              {formData.tech_unit_bt} ▾
                            </label>
                            {dropdownVisible5 && (
                              <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                                {[
                                  { label: "sec", value: "sec" },
                                  { label: "min", value: "min" },
                                  { label: "h", value: "h" },
                                ].map((unit, index) => (
                                  <p
                                    key={index}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => setUnitHandler5(unit.value)}
                                  >
                                    {unit.label}
                                  </p>
                                ))}
                              </div>
                              )}
                          </div>
                  </div>
              </div>
              </>
            )}
              {formData.tech_method == "3" && (
              <>
              <div className="grid grid-cols-12 gap-3  mt-3 torque ">
                  <div className="col-span-6">
                      <label htmlFor="tech_to" className="label">
                        To Calculate:
                      </label>
                      <div className="mt-2">
                        <select
                          className="input"
                          aria-label="select"
                          name="tech_to"
                          id="tech_to"
                          value={formData.tech_to}
                          onChange={handleChange}
                        >
                          <option value="1">{data?.payload?.tech_lang_keys["eh"]}</option>
                          <option value="2">{data?.payload?.tech_lang_keys["tor"]} </option>
                        </select>
                      </div>
                  
                  </div>
                  <div className="col-span-6">
                      <label htmlFor="tech_rpm" className="label">
                      Engine RPM:
                          </label>
                          <div className=" relative">
                          <input
                            type="number"
                            step="any"
                            name="tech_rpm"
                            id="tech_rpm"
                            className="input my-2"
                            aria-label="input"
                            placeholder="00"
                            value={formData.tech_rpm}
                            onChange={handleChange}
                          />
                          </div>
                  </div>

                  {formData.tech_to == "1" && (
                    <>
                    <div className="col-span-6 tor">

                        <label htmlFor="tech_tor" className="label">
                          {data?.payload?.tech_lang_keys["tor"]}:
                            </label>
                            <div className=" relative">
                            <input
                              type="number"
                              step="any"
                              name="tech_tor"
                              id="tech_tor"
                              className="input my-2"
                              aria-label="input"
                              placeholder="00"
                              value={formData.tech_tor}
                              onChange={handleChange}
                            />
                             <span className="input_unit">ft-lb</span>
                            </div>
                
                    </div>
                    </>
                  )}
                   {formData.tech_to == "2" && (
                    <>
                    <div className="col-span-6  hors">
                        <label htmlFor="tech_hors" className="label">
                          {data?.payload?.tech_lang_keys["eh"]}:
                            </label>
                            <div className=" relative">
                            <input
                              type="number"
                              step="any"
                              name="tech_hors"
                              id="tech_hors"
                              className="input my-2"
                              aria-label="input"
                              placeholder="00"
                              value={formData.tech_hors}
                              onChange={handleChange}
                            />
                            </div>
                    </div>
                    </>
                  )}
              </div>
              </>
            )}
        </div>
        

          <div className="mb-6 mt-10 text-center space-x-2">
                <Button type="submit" isLoading={roundToTheNearestLoading}>
                  {data?.payload?.tech_lang_keys["calculate"]}
                </Button>
                {result && (
                  <ResetButton type="button" onClick={handleReset}>
                    {data?.payload?.tech_lang_keys["locale"] == "en"
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
                          <div className="w-full md:w-[60%] lg:w-[60%] mt-2">
                            {(formData?.tech_method == 1 ||
                              formData?.tech_method == 2 ||
                              (formData?.tech_method == 3 && formData?.tech_to == 1)) && (
                              <>
                                <p className="mt-2">{data?.payload?.tech_lang_keys['pow']}</p>
                                <p className="mt-2 py-2 border-b">
                                  <strong>
                                    {result?.tech_hpm} {data?.payload?.tech_lang_keys['hpm']}
                                  </strong>
                                </p>
                                <p className="my-2">It is equivalent to</p>
                                <table className="w-full lg:text-[18px] md:text-[18px] text-[16px]">
                                  <tbody>
                                    <tr>
                                      <td className="py-2 border-b">
                                        <strong>
                                          {result?.tech_hpmet} {data?.payload?.tech_lang_keys['hpmet']}
                                        </strong>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="py-2 border-b">
                                        <strong>
                                          {result?.tech_hpkw} {data?.payload?.tech_lang_keys['kilo']}
                                        </strong>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="py-2 border-b">
                                        <strong>
                                          {result?.tech_hpm * 550} {data?.payload?.tech_lang_keys['ft']}
                                        </strong>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </>
                            )}

                            {formData?.tech_method == 4 && (
                              <>
                                <p className="mt-2">{data?.payload?.tech_lang_keys['pow']}</p>
                                <p className="mt-2">
                                  <strong>
                                    {result?.tech_hp} {data?.payload?.tech_lang_keys['wat']}
                                  </strong>
                                </p>
                                <p className="mt-2">It is equivalent to</p>
                                <table className="w-full lg:text-[18px] md:text-[18px] text-[16px]">
                                  <tbody>
                                    <tr>
                                      <td className="py-2 border-b">
                                        <strong>
                                          {result?.tech_hp / 100} {data?.payload?.tech_lang_keys['kilo']}
                                        </strong>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="py-2 border-b">
                                        <strong>
                                          {Number((result?.tech_hp * 0.001341).toFixed(7))}{' '}
                                          {data?.payload?.tech_lang_keys['hpm']}
                                        </strong>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="py-2 border-b">
                                        <strong>
                                          {Number((result?.tech_hp * 0.00136).toFixed(7))}{' '}
                                          {data?.payload?.tech_lang_keys['hpmet']}
                                        </strong>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="py-2 border-b">
                                        <strong>
                                          {Number((result?.tech_hp / 746).toFixed(7))}{' '}
                                          {data?.payload?.tech_lang_keys['hpel']}
                                        </strong>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="py-2 border-b">
                                        <strong>
                                          {Number((result?.tech_hp / 9810).toFixed(7))}{' '}
                                          {data?.payload?.tech_lang_keys['hpb']}
                                        </strong>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="py-2 border-b">
                                        <strong>
                                          {Number((result?.tech_hp * 0.7376).toFixed(7))}{' '}
                                          {data?.payload?.tech_lang_keys['ft']}
                                        </strong>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </>
                            )}

                            {formData?.tech_method == 3 && formData?.tech_to == 2 && (
                              <p className="mt-2">
                                {data?.payload?.tech_lang_keys['tor']} ={' '}
                                <strong>
                                  {result?.tech_tor} <sub>ft-lb</sub>
                                </strong>
                              </p>
                            )}
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

export default HorsepowerCalculator;
