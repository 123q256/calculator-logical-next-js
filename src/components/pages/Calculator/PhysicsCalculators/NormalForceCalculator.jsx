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
//   useNormalForceCalculatorMutation,
// } from "../../../redux/services/calculator/calculatorApi";

import { useGetSingleCalculatorDetailsMutation } from "../../../redux/services/calculator/calculatorApi";

import { useNormalForceCalculatorMutation } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const NormalForceCalculator = () => {
  const location = useLocation();
  const url = location.pathname.replace(/^\/+/, "");
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
    stech_urface: "horizontal", // inclined  horizontal
    tech_external: "downward",
    tech_mass: "45",
    tech_mass_units: "kg",
    tech_outside_force: "45",
    tech_outside_force_units: "GN",
    tech_angle: "30",
    tech_angle_units: "tr",
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useNormalForceCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.stech_urface) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        stech_urface: formData.stech_urface,
        tech_external: formData.tech_external,
        tech_mass: formData.tech_mass,
        tech_mass_units: formData.tech_mass_units,
        tech_outside_force: formData.tech_outside_force,
        tech_outside_force_units: formData.tech_outside_force_units,
        tech_angle: formData.tech_angle,
        tech_angle_units: formData.tech_angle_units,
      }).unwrap();
      setResult(response); // Assuming the response has 'lovePercentage'
      toast.success("Successfully Calculated");
    } catch (err) {
      setFormError(err.data.error);
      toast.error(err.data.error);
    }
  };

  // Handle reset form
  const handleReset = () => {
    setFormData({
      stech_urface: "horizontal", // inclined  horizontal
      tech_external: "downward",
      tech_mass: "45",
      tech_mass_units: "kg",
      tech_outside_force: "45",
      tech_outside_force_units: "GN",
      tech_angle: "30",
      tech_angle_units: "tr",
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
    setFormData((prev) => ({ ...prev, tech_mass_units: unit }));
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  //dropdown states
  const [dropdownVisible1, setDropdownVisible1] = useState(false);

  const setUnitHandler1 = (unit) => {
    setFormData((prev) => ({ ...prev, tech_outside_force_units: unit }));
    setDropdownVisible1(false);
  };

  const toggleDropdown1 = () => {
    setDropdownVisible1(!dropdownVisible1);
  };

  //dropdown states
  const [dropdownVisible2, setDropdownVisible2] = useState(false);

  const setUnitHandler2 = (unit) => {
    setFormData((prev) => ({ ...prev, tech_angle_units: unit }));
    setDropdownVisible2(false);
  };

  const toggleDropdown2 = () => {
    setDropdownVisible2(!dropdownVisible2);
  };

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

          <div className="lg:w-[60%] md:w-[80%] w-full mx-auto ">
            <div className="grid grid-cols-12 mt-3  gap-4">
              <div className="col-span-12 md:col-span-6">
                <div className="grid grid-cols-12   gap-4">
                  <div className="col-span-6 md:col-span-12">
                    <label htmlFor="stech_urface" className="label">
                      {data?.payload?.tech_lang_keys["1"]}:
                    </label>
                    <div className="mt-2">
                      <select
                        className="input"
                        aria-label="select"
                        name="stech_urface"
                        id="stech_urface"
                        value={formData.stech_urface}
                        onChange={handleChange}
                      >
                        <option value="inclined">Inclined</option>
                        <option value="horizontal">Horizontal</option>
                      </select>
                    </div>
                  </div>
                  {formData.stech_urface == "horizontal" && (
                    <>
                      <div
                        className="col-span-6 md:col-span-12 "
                        id="external_hidde"
                      >
                        <label htmlFor="tech_external" className="label">
                          {data?.payload?.tech_lang_keys["2"]}:
                        </label>
                        <div className="mt-2">
                          <select
                            className="input"
                            aria-label="select"
                            name="tech_external"
                            id="tech_external"
                            value={formData.tech_external}
                            onChange={handleChange}
                          >
                            <option value="no">No</option>
                            <option value="downward">Downward</option>
                            <option value="upward">Upward</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="col-span-6 md:col-span-12">
                    <label htmlFor="tech_mass" className="label">
                      {data?.payload?.tech_lang_keys["3"]}
                    </label>
                    <div className="relative w-full ">
                      <input
                        type="number"
                        name="tech_mass"
                        step="any"
                        className="mt-1 input"
                        value={formData.tech_mass}
                        placeholder="00"
                        onChange={handleChange}
                      />
                      <label
                        className="absolute cursor-pointer text-sm underline right-6 top-4"
                        onClick={toggleDropdown}
                      >
                        {formData.tech_mass_units} ▾
                      </label>
                      {dropdownVisible && (
                        <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                          {[
                            { label: "µg", value: "µg" },
                            { label: "mg", value: "mg" },
                            { label: "g", value: "g" },
                            { label: "dag", value: "dag" },
                            { label: "kg", value: "kg" },
                            { label: "t", value: "t" },
                            { label: "gr", value: "gr" },
                            { label: "dr", value: "dr" },
                            { label: "oz", value: "oz" },
                            { label: "lb", value: "lb" },
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

                  {((formData.tech_external == "downward" &&
                    formData.stech_urface == "horizontal") ||
                    (formData.tech_external == "upward" &&
                      formData.stech_urface == "horizontal")) && (
                    <>
                      <div
                        className="col-span-6 md:col-span-12 "
                        id="outside_force"
                      >
                        <label htmlFor="tech_outside_force" className="label">
                          {data?.payload?.tech_lang_keys["4"]}
                        </label>
                        <div className="relative w-full ">
                          <input
                            type="number"
                            name="tech_outside_force"
                            step="any"
                            className="mt-1 input"
                            value={formData.tech_outside_force}
                            placeholder="00"
                            onChange={handleChange}
                          />
                          <label
                            className="absolute cursor-pointer text-sm underline right-6 top-4"
                            onClick={toggleDropdown1}
                          >
                            {formData.tech_outside_force_units} ▾
                          </label>
                          {dropdownVisible1 && (
                            <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                              {[
                                { label: "N", value: "N" },
                                { label: "KN", value: "KN" },
                                { label: "MN", value: "MN" },
                                { label: "GN", value: "GN" },
                                { label: "TN", value: "TN" },
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

                  {(formData.stech_urface == "inclined" ||
                    (formData.stech_urface == "horizontal" &&
                      formData.tech_external == "downward") ||
                    (formData.stech_urface == "horizontal" &&
                      formData.tech_external == "upward")) && (
                    <>
                      <div className="col-span-6 md:col-span-12" id="angle">
                        {(formData.tech_external == "downward" &&
                          formData.stech_urface == "horizontal") ||
                        (formData.tech_external == "upward" &&
                          formData.stech_urface == "horizontal") ? (
                          <>
                            <label htmlFor="tech_angle" className="label">
                              {" "}
                              Angle of the outside force{" "}
                            </label>
                          </>
                        ) : (
                          <>
                            <label htmlFor="tech_angle" className="label">
                              {" "}
                              Angle:{" "}
                            </label>
                          </>
                        )}

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
                            onClick={toggleDropdown2}
                          >
                            {formData.tech_angle_units} ▾
                          </label>
                          {dropdownVisible2 && (
                            <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                              {[
                                { label: "deg", value: "deg" },
                                { label: "ran", value: "ran" },
                                { label: "gon", value: "gon" },
                                { label: "tr", value: "tr" },
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
              </div>
              <div className="col-span-12 md:col-span-6 text-center pt-2 overflow-auto">
                {formData.stech_urface == "inclined" ? (
                  <>
                    <img
                      src="/images/inclined.png"
                      alt="inclined"
                      width="200px"
                      height="182px"
                      id="inclined"
                    />
                  </>
                ) : (
                  <>
                    {formData.stech_urface == "horizontal" &&
                      formData.tech_external == "no" && (
                        <>
                          <img
                            src="/images/horizontal_no.png"
                            alt="horizontal_no"
                            width="200px"
                            height="265px"
                            id="horizontal_no"
                            className=""
                          />
                        </>
                      )}
                    {formData.stech_urface == "horizontal" &&
                      formData.tech_external == "downward" && (
                        <>
                          <img
                            src="/images/horizontal_downward.png"
                            alt="horizontal_downward"
                            width="200px"
                            height="265px"
                            id="horizontal_downward"
                            className=""
                          />
                        </>
                      )}

                    {formData.stech_urface == "horizontal" &&
                      formData.tech_external == "upward" && (
                        <>
                          <img
                            src="/images/horizontal_upward.png"
                            alt="horizontal_upward"
                            width="200px"
                            height="auto"
                            id="horizontal_upward"
                            className=""
                          />
                        </>
                      )}
                  </>
                )}
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
                        <div className="text-center">
                          <p className="text-[20px]">
                            <strong>
                              {data?.payload?.tech_lang_keys["6"]}
                            </strong>
                          </p>
                          <div class="flex justify-center">
                            <p className="text-[25px] bg-[#2845F5] text-white rounded-lg px-3 py-2  my-3">
                              <strong className="">
                                {Number(result?.tech_normal_force).toFixed(2)}
                              </strong>
                            </p>
                          </div>
                        </div>
                        <p className="w-full my-3 text-[18px] ">
                          {data?.payload?.tech_lang_keys[7]}
                        </p>
                        <div className="w-full overflow-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-sky-100">
                                <td className="p-2 border text-center">
                                  <strong className="">KN</strong>
                                </td>
                                <td className="p-2 border text-center">
                                  <strong className="">MN</strong>
                                </td>
                                <td className="p-2 border text-center">
                                  <strong className="">GN</strong>
                                </td>
                                <td className="p-2 border text-center">
                                  <strong className="">TN</strong>
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="bg-white">
                                <td className="text-center p-2 border">
                                  {Number(
                                    result?.tech_normal_force * 0.001
                                  ).toFixed(3)}
                                </td>
                                <td className="text-center p-2 border">
                                  {Number(
                                    result?.tech_normal_force * 0.000001
                                  ).toFixed(5)}
                                </td>
                                <td className="text-center p-2 border">
                                  {Number(
                                    result?.tech_normal_force * 0.000000001
                                  ).toFixed(8)}
                                </td>
                                <td className="text-center p-2 border">
                                  {Number(
                                    result?.tech_normal_force * 0.000000000001
                                  ).toFixed(10)}
                                </td>
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

export default NormalForceCalculator;
