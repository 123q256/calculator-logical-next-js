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
  useBsaCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useBsaCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import ResetButton from "../../../components/Calculator/ResetButton";
import Button from "../../../components/Calculator/Button";

const BSACalculator = () => {
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
    tech_weight: 530,
    tech_unit: "lbs",
    tech_unit_h: "cm",
    tech_gender: "Male", // Female  Male
    tech_height_ft: 34,
    tech_height_in: 23,
    tech_height_cm: "123",
    tech_unit_h_cm: "ft/in",
    tech_unit_ft_in: "cm",
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useBsaCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_weight || !formData.tech_unit) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_weight: formData.tech_weight,
        tech_unit: formData.tech_unit,
        tech_unit_h: formData.tech_unit_h,
        tech_gender: formData.tech_gender,
        tech_height_ft: formData.tech_height_ft,
        tech_height_in: formData.tech_height_in,
        tech_height_cm: formData.tech_height_cm,
        tech_unit_h_cm: formData.tech_unit_h_cm,
        tech_unit_ft_in: formData.tech_unit_ft_in,
      }).unwrap();
      setResult(response?.payload); // Assuming the response has 'lovePercentage'
      toast.success("Successfully Calculated");
    } catch (err) {
      setFormError("Error in calculating.");
      toast.error("Error in calculating.");
    }
  };

  // Handle reset form
  const handleReset = () => {
    setFormData({
      tech_weight: 530,
      tech_unit: "lbs",
      tech_unit_h: "cm",
      tech_gender: "Male", // Female  Male
      tech_height_ft: 34,
      tech_height_in: 23,
      tech_height_cm: "123",
      tech_unit_h_cm: "ft/in",
      tech_unit_ft_in: "cm",
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
    setFormData((prev) => ({ ...prev, tech_unit: unit }));
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  //dropdown states 2
  const [dropdownVisible1, setDropdownVisible1] = useState(false);

  const setUnitHandler1 = (unit) => {
    setFormData((prev) => ({
      ...prev,
      tech_unit_h: unit,
      tech_unit_ft_in: unit, // hidden input bhi update ho jaega
    }));
    setDropdownVisible1(false);
  };

  const toggleDropdown1 = () => {
    setDropdownVisible1(!dropdownVisible1);
  };

  //dropdown states 3
  const [dropdownVisible2, setDropdownVisible2] = useState(false);

  const setUnitHandler2 = (unit) => {
    setFormData((prev) => ({
      ...prev,
      tech_unit_h_cm: unit,
      tech_unit_ft_in: unit, // hidden input bhi update ho jaega
    }));
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
        <div className="w-full mx-auto p-4 lg:p-8 md:p-8 input_form rounded-lg space-y-6 mb-3">
          {formError && (
            <p className="text-red-500 text-lg font-semibold w-full">
              {formError}
            </p>
          )}

          <div className="lg:w-[60%] md:w-[80%] w-full mx-auto ">
            <div className="grid grid-cols-12   gap-2 md:gap-4 lg:gap-4">
              <div className="col-span-12 ">
                <div className="grid grid-cols-12   gap-2 md:gap-4 lg:gap-4">
                  <div className="col-span-12 md:col-span-6 lg:col-span-6">
                    <label htmlFor="tech_gender" className="label">
                      {data?.payload?.tech_lang_keys["gender"]}:
                    </label>
                    <div className="mt-2">
                      <select
                        className="input"
                        aria-label="select"
                        name="tech_gender"
                        id="tech_gender"
                        value={formData.tech_gender}
                        onChange={handleChange}
                      >
                        <option value="Male">
                          {data?.payload?.tech_lang_keys["male"]}
                        </option>
                        <option value="Female">
                          {data?.payload?.tech_lang_keys["female"]}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-6">
                <label htmlFor="tech_weight" className="label">
                  {data?.payload?.tech_lang_keys["weight"]}
                </label>
                <div className="relative w-full ">
                  <input
                    type="number"
                    name="tech_weight"
                    step="any"
                    className="mt-1 input"
                    value={formData.tech_weight}
                    placeholder="00"
                    onChange={handleChange}
                  />
                  <label
                    className="absolute cursor-pointer text-sm underline right-6 top-4"
                    onClick={toggleDropdown}
                  >
                    {formData.tech_unit} ▾
                  </label>
                  {dropdownVisible && (
                    <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                      {[
                        { label: "pounds (lbs)", value: "lbs" },
                        { label: "kilograms (kg)", value: "kg" },
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

              <input
                type="hidden"
                step="any"
                name="tech_unit_ft_in"
                id="tech_unit_ft_in"
                className="input my-2"
                aria-label="input"
                value={formData.tech_unit_ft_in}
                onChange={handleChange}
              />

              {formData.tech_unit_ft_in == "ft/in" && (
                <>
                  <div className="col-span-6 md:col-span-3 lg:col-span-3 ft_in">
                    <label htmlFor="tech_height_ft" className="label">
                      {data?.payload?.tech_lang_keys["height"]}:
                    </label>
                    <div className=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_height_ft"
                        id="tech_height_ft"
                        className="input my-2"
                        aria-label="input"
                        placeholder="00"
                        value={formData.tech_height_ft}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-3 lg:col-span-3  ft_in">
                    <label htmlFor="tech_height_in" className="label">
                      &nbsp;
                    </label>
                    <div className="relative w-full ">
                      <input
                        type="number"
                        name="tech_height_in"
                        step="any"
                        className="mt-1 input"
                        value={formData.tech_height_in}
                        placeholder="00"
                        onChange={handleChange}
                      />
                      <label
                        className="absolute cursor-pointer text-sm underline right-6 top-5"
                        onClick={toggleDropdown1}
                      >
                        {formData.tech_unit_h} ▾
                      </label>
                      {dropdownVisible1 && (
                        <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                          {[
                            { label: "feet / inches (ft/in)", value: "ft/in" },
                            { label: "centimeters (cm)", value: "cm" },
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
              {formData.tech_unit_ft_in == "cm" && (
                <>
                  <div className="col-span-12 md:col-span-6 lg:col-span-6  h_cm">
                    <label htmlFor="tech_height_cm" className="label">
                      {data?.payload?.tech_lang_keys["height"]} (cm):
                    </label>
                    <div className="relative w-full ">
                      <input
                        type="number"
                        name="tech_height_cm"
                        step="any"
                        className="mt-1 input"
                        value={formData.tech_height_cm}
                        placeholder="00"
                        onChange={handleChange}
                      />
                      <label
                        className="absolute cursor-pointer text-sm underline right-6 top-4"
                        onClick={toggleDropdown2}
                      >
                        {formData.tech_unit_h_cm} ▾
                      </label>
                      {dropdownVisible2 && (
                        <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                          {[
                            { label: "feet / inches (ft/in)", value: "ft/in" },
                            { label: "centimeters (cm)", value: "cm" },
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

          <div className="flex justify-center gap-3 mb-6 mt-10">
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
          <div className="w-full mx-auto p-4 lg:p-8 md:p-8 result_calculator rounded-lg  space-y-6 result">
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
              <div className="w-full  mx-auto p-4 lg:p-8 md:p-8 result_calculator rounded-lg  space-y-6 result">
                <div>
                  <ResultActions lang={data?.payload?.tech_lang_keys} />

                  <div className="rounded-lg  flex items-center justify-center">
                    <div className="w-full mt-3">
                      <div className="w-full mt-2 overflow-auto">
                        <table className="w-full" cellspacing="0">
                          <tr>
                            <th className="text-blue text-start font-s-18 border-b py-3">
                              {data?.payload?.tech_lang_keys["formula"]}
                            </th>
                            <th className="text-blue text-start font-s-18 border-b py-3">
                              m<sup>2</sup>
                            </th>
                            <th className="text-blue text-start font-s-18 border-b py-3">
                              ft<sup>2</sup>
                            </th>
                            <th className="text-blue text-start font-s-18 border-b py-3">
                              in<sup>2</sup>
                            </th>
                          </tr>
                          <tr>
                            <td className="border-b py-3">
                              <strong>DuBois</strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {result?.tech_DuBois != ""
                                  ? result?.tech_DuBois
                                  : "0"}
                              </strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {(result?.tech_DuBois != ""
                                  ? Number(result?.tech_DuBois * 10.764, 2)
                                  : "0"
                                ).toFixed(2)}
                              </strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {(result?.tech_DuBois != ""
                                  ? Number(result?.tech_DuBois * 1550.003, 2)
                                  : "0"
                                ).toFixed(2)}
                              </strong>
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b py-3">
                              <strong>Mosteller</strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {result?.tech_Mosteller != ""
                                  ? result?.tech_Mosteller
                                  : "0"}
                              </strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {(result?.tech_Mosteller != ""
                                  ? Number(result?.tech_Mosteller * 10.764, 2)
                                  : "0"
                                ).toFixed(2)}
                              </strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {(result?.tech_Mosteller != ""
                                  ? Number(result?.tech_Mosteller * 1550.003, 2)
                                  : "0"
                                ).toFixed(2)}
                              </strong>
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b py-3">
                              <strong>Haycock</strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {result?.tech_Haycock != ""
                                  ? result?.tech_Haycock
                                  : "0"}
                              </strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {(result?.tech_Haycock != ""
                                  ? Number(result?.tech_Haycock * 10.764, 2)
                                  : "0"
                                ).toFixed(2)}
                              </strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {(result?.tech_Haycock != ""
                                  ? Number(result?.tech_Haycock * 1550.003, 2)
                                  : "0"
                                ).toFixed(2)}
                              </strong>
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b py-3">
                              <strong>Gehan</strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {result?.tech_Gehan != ""
                                  ? result?.tech_Gehan
                                  : "0"}
                              </strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {(result?.tech_Gehan != ""
                                  ? Number(result?.tech_Gehan * 10.764, 2)
                                  : "0"
                                ).toFixed(2)}
                              </strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {(result?.tech_Gehan != ""
                                  ? Number(result?.tech_Gehan * 1550.003, 2)
                                  : "0"
                                ).toFixed(2)}
                              </strong>
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b py-3">
                              <strong>Boyd</strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {result?.tech_Boyd != ""
                                  ? result?.tech_Boyd
                                  : "0"}
                              </strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {(result?.tech_Boyd != ""
                                  ? Number(result?.tech_Boyd * 10.764, 2)
                                  : "0"
                                ).toFixed(2)}
                              </strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {(result?.tech_Boyd != ""
                                  ? Number(result?.tech_Boyd * 1550.003, 2)
                                  : "0"
                                ).toFixed(2)}
                              </strong>
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b py-3">
                              <strong>Fujimoto</strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {result?.tech_Fujimoto != ""
                                  ? result?.tech_Fujimoto
                                  : "0"}
                              </strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {(result?.tech_Fujimoto != ""
                                  ? Number(result?.tech_Fujimoto * 10.764, 2)
                                  : "0"
                                ).toFixed(2)}
                              </strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {(result?.tech_Fujimoto != ""
                                  ? Number(result?.tech_Fujimoto * 1550.003, 2)
                                  : "0"
                                ).toFixed(2)}
                              </strong>
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b py-3">
                              <strong>Takahira</strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {result?.tech_Takahira != ""
                                  ? result?.tech_Takahira
                                  : "0"}
                              </strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {(result?.tech_Takahira != ""
                                  ? Number(result?.tech_Takahira * 10.764, 2)
                                  : "0"
                                ).toFixed(2)}
                              </strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {(result?.tech_Takahira != ""
                                  ? Number(result?.tech_Takahira * 1550.003, 2)
                                  : "0"
                                ).toFixed(2)}
                              </strong>
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b py-3">
                              <strong>Schlich</strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {result?.tech_Schlich != ""
                                  ? result?.tech_Schlich
                                  : "0"}
                              </strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {(result?.tech_Schlich != ""
                                  ? Number(result?.tech_Schlich * 10.764, 2)
                                  : "0"
                                ).toFixed(2)}
                              </strong>
                            </td>
                            <td className="border-b">
                              <strong>
                                {(result?.tech_Schlich != ""
                                  ? Number(result?.tech_Schlich * 1550.003, 2)
                                  : "0"
                                ).toFixed(2)}
                              </strong>
                            </td>
                          </tr>
                        </table>
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

export default BSACalculator;
