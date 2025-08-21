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
  useEquilibriumConstantCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useEquilibriumConstantCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const EquilibriumConstantCalculator = () => {
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
    tech_selection: "1", // 1 2
    tech_concentration_one: "8",
    tech_concentration_one_unit: "fM",
    tech_a: "3",
    tech_concentration_two: "4",
    tech_concentration_two_unit: "mM",
    tech_b: "5",
    tech_concentration_three: "4",
    tech_concentration_three_unit: "aM",
    tech_c: "7",
    tech_concentration_four: "8",
    tech_concentration_four_unit: "yM",
    tech_d: "9",
    tech_chemical_equation: "4NO2 + O2 = 2N2O5",
    tech_total_pressure: "1.00794",
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateActivationCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useEquilibriumConstantCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_selection) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateActivationCalculator({
        tech_selection: formData.tech_selection,
        tech_concentration_one: formData.tech_concentration_one,
        tech_concentration_one_unit: formData.tech_concentration_one_unit,
        tech_a: formData.tech_a,
        tech_concentration_two: formData.tech_concentration_two,
        tech_concentration_two_unit: formData.tech_concentration_two_unit,
        tech_b: formData.tech_b,
        tech_concentration_three: formData.tech_concentration_three,
        tech_concentration_three_unit: formData.tech_concentration_three_unit,
        tech_c: formData.tech_c,
        tech_concentration_four: formData.tech_concentration_four,
        tech_concentration_four_unit: formData.tech_concentration_four_unit,
        tech_d: formData.tech_d,
        tech_chemical_equation: formData.tech_chemical_equation,
        tech_total_pressure: formData.tech_total_pressure,
      }).unwrap();
      setResult(response?.payload); // Assuming the response'
      toast.success("Successfully Calculated");
    } catch (err) {
      setFormError(err.data.payload.error);
      toast.error(err.data.payload.error);
    }
  };

  // Handle reset form
  const handleReset = () => {
    setFormData({
      tech_selection: "1", // 1 2
      tech_concentration_one: "8",
      tech_concentration_one_unit: "fM",
      tech_a: "3",
      tech_concentration_two: "4",
      tech_concentration_two_unit: "mM",
      tech_b: "5",
      tech_concentration_three: "4",
      tech_concentration_three_unit: "aM",
      tech_c: "7",
      tech_concentration_four: "8",
      tech_concentration_four_unit: "yM",
      tech_d: "9",
      tech_chemical_equation: "4NO2 + O2 = 2N2O5",
      tech_total_pressure: "1.00794",
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
  {
    /* <span className="text-blue input_unit">{currency.symbol}</span> */
  }
  // currency code

  //dropdown states
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const setUnitHandler = (unit) => {
    setFormData((prev) => ({ ...prev, tech_concentration_one_unit: unit }));
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  //dropdown states
  const [dropdownVisible1, setDropdownVisible1] = useState(false);

  const setUnitHandler1 = (unit) => {
    setFormData((prev) => ({ ...prev, tech_concentration_two_unit: unit }));
    setDropdownVisible1(false);
  };

  const toggleDropdown1 = () => {
    setDropdownVisible1(!dropdownVisible1);
  };

  //dropdown states
  const [dropdownVisible2, setDropdownVisible2] = useState(false);

  const setUnitHandler2 = (unit) => {
    setFormData((prev) => ({ ...prev, tech_concentration_three_unit: unit }));
    setDropdownVisible2(false);
  };

  const toggleDropdown2 = () => {
    setDropdownVisible2(!dropdownVisible2);
  };

  //dropdown states
  const [dropdownVisible3, setDropdownVisible3] = useState(false);

  const setUnitHandler3 = (unit) => {
    setFormData((prev) => ({ ...prev, tech_concentration_four_unit: unit }));
    setDropdownVisible3(false);
  };

  const toggleDropdown3 = () => {
    setDropdownVisible3(!dropdownVisible3);
  };

  // result

  const opt = result?.tech_opt;
  const chemical_equation = result?.tech_equation;
  const total_pressure = result?.tech_total_pressure;

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

          <div className="lg:w-[85%] md:w-[100%] w-full mx-auto ">
            <div className="grid grid-cols-12 gap-1 md:gap-3">
              <div className="col-span-12 md:col-span-6 relative">
                <label htmlFor="tech_selection" className="label">
                  {data?.payload?.tech_lang_keys["1"]}:
                </label>
                <div className="mt-1">
                  <select
                    className="input"
                    aria-label="select"
                    name="tech_selection"
                    id="tech_selection"
                    value={formData.tech_selection}
                    onChange={handleChange}
                  >
                    <option value="1">
                      {data?.payload?.tech_lang_keys["2"]}
                    </option>
                    <option value="2">
                      {data?.payload?.tech_lang_keys["3"]}
                    </option>
                  </select>
                </div>
              </div>

              {formData.tech_selection == "1" && (
                <>
                  <div className="col-span-12 md:col-span-6 concentration1">
                    <label htmlFor="tech_concentration_one" className="label">
                      {data?.payload?.tech_lang_keys["2"]} [A]:
                    </label>
                    <div className="relative w-full ">
                      <input
                        type="number"
                        name="tech_concentration_one"
                        step="any"
                        className="mt-1 input"
                        value={formData.tech_concentration_one}
                        placeholder="00"
                        onChange={handleChange}
                      />
                      <label
                        className="absolute cursor-pointer text-sm underline right-6 top-3"
                        onClick={toggleDropdown}
                      >
                        {formData.tech_concentration_one_unit} ▾
                      </label>
                      {dropdownVisible && (
                        <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                          {[
                            { label: "M", value: "M" },
                            { label: "mM", value: "mM" },
                            { label: "μM", value: "μM" },
                            { label: "nM", value: "nM" },
                            { label: "pM", value: "pM" },
                            { label: "fM", value: "fM" },
                            { label: "aM", value: "aM" },
                            { label: "zM", value: "zM" },
                            { label: "yM", value: "yM" },
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
                  <div className="col-span-12 md:col-span-6 a">
                    <label htmlFor="tech_a" className="label">
                      {data?.payload?.tech_lang_keys["4"]} a:
                    </label>
                    <div className=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_a"
                        id="tech_a"
                        className="input my-1"
                        aria-label="input"
                        placeholder="00"
                        value={formData.tech_a}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 concentration2">
                    <label htmlFor="tech_concentration_two" className="label">
                      {data?.payload?.tech_lang_keys["2"]} [B]:
                    </label>
                    <div className="relative w-full ">
                      <input
                        type="number"
                        name="tech_concentration_two"
                        step="any"
                        className="mt-1 input"
                        value={formData.tech_concentration_two}
                        placeholder="00"
                        onChange={handleChange}
                      />
                      <label
                        className="absolute cursor-pointer text-sm underline right-6 top-3"
                        onClick={toggleDropdown1}
                      >
                        {formData.tech_concentration_two_unit} ▾
                      </label>
                      {dropdownVisible1 && (
                        <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                          {[
                            { label: "M", value: "M" },
                            { label: "mM", value: "mM" },
                            { label: "μM", value: "μM" },
                            { label: "nM", value: "nM" },
                            { label: "pM", value: "pM" },
                            { label: "fM", value: "fM" },
                            { label: "aM", value: "aM" },
                            { label: "zM", value: "zM" },
                            { label: "yM", value: "yM" },
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
                  <div className="col-span-12 md:col-span-6 b">
                    <label htmlFor="tech_b" className="label">
                      {data?.payload?.tech_lang_keys["4"]} b:
                    </label>
                    <div className=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_b"
                        id="tech_b"
                        className="input my-1"
                        aria-label="input"
                        placeholder="00"
                        value={formData.tech_b}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 concentration3">
                    <label htmlFor="tech_concentration_three" className="label">
                      {data?.payload?.tech_lang_keys["2"]} [C]:
                    </label>
                    <div className="relative w-full ">
                      <input
                        type="number"
                        name="tech_concentration_three"
                        step="any"
                        className="mt-1 input"
                        value={formData.tech_concentration_three}
                        placeholder="00"
                        onChange={handleChange}
                      />
                      <label
                        className="absolute cursor-pointer text-sm underline right-6 top-3"
                        onClick={toggleDropdown2}
                      >
                        {formData.tech_concentration_three_unit} ▾
                      </label>
                      {dropdownVisible2 && (
                        <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                          {[
                            { label: "M", value: "M" },
                            { label: "mM", value: "mM" },
                            { label: "μM", value: "μM" },
                            { label: "nM", value: "nM" },
                            { label: "pM", value: "pM" },
                            { label: "fM", value: "fM" },
                            { label: "aM", value: "aM" },
                            { label: "zM", value: "zM" },
                            { label: "yM", value: "yM" },
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
                  <div className="col-span-12 md:col-span-6 c">
                    <label htmlFor="tech_c" className="label">
                      {data?.payload?.tech_lang_keys["4"]} c:
                    </label>
                    <div className=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_c"
                        id="tech_c"
                        className="input my-1"
                        aria-label="input"
                        placeholder="00"
                        value={formData.tech_c}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 concentration4">
                    <label htmlFor="tech_concentration_four" className="label">
                      {data?.payload?.tech_lang_keys["2"]} [D]:
                    </label>
                    <div className="relative w-full ">
                      <input
                        type="number"
                        name="tech_concentration_four"
                        step="any"
                        className="mt-1 input"
                        value={formData.tech_concentration_four}
                        placeholder="00"
                        onChange={handleChange}
                      />
                      <label
                        className="absolute cursor-pointer text-sm underline right-6 top-3"
                        onClick={toggleDropdown3}
                      >
                        {formData.tech_concentration_four_unit} ▾
                      </label>
                      {dropdownVisible3 && (
                        <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-auto mt-1 right-0">
                          {[
                            { label: "M", value: "M" },
                            { label: "mM", value: "mM" },
                            { label: "μM", value: "μM" },
                            { label: "nM", value: "nM" },
                            { label: "pM", value: "pM" },
                            { label: "fM", value: "fM" },
                            { label: "aM", value: "aM" },
                            { label: "zM", value: "zM" },
                            { label: "yM", value: "yM" },
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
                  <div className="col-span-12 md:col-span-6 d">
                    <label htmlFor="tech_d" className="label">
                      {data?.payload?.tech_lang_keys["4"]} d:
                    </label>
                    <div className=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_d"
                        id="tech_d"
                        className="input my-1"
                        aria-label="input"
                        placeholder="00"
                        value={formData.tech_d}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </>
              )}

              {formData.tech_selection == "2" && (
                <>
                  <div className="col-span-12 md:col-span-6 equation ">
                    <label htmlFor="tech_chemical_equation" className="label">
                      {data?.payload?.tech_lang_keys["5"]} :
                    </label>
                    <div className=" relative">
                      <input
                        type="text"
                        step="any"
                        name="tech_chemical_equation"
                        id="tech_chemical_equation"
                        className="input my-1"
                        aria-label="input"
                        placeholder="00"
                        value={formData.tech_chemical_equation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6 pressure  ">
                    <label htmlFor="tech_total_pressure" className="label">
                      {data?.payload?.tech_lang_keys["5"]} :
                    </label>
                    <div className=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_total_pressure"
                        id="tech_total_pressure"
                        className="input my-1"
                        aria-label="input"
                        placeholder="00"
                        value={formData.tech_total_pressure}
                        onChange={handleChange}
                      />
                      <span className="text-blue input_unit">atm</span>
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
                    <div className="w-full mt-3">
                      <div className="w-full">
                        <div className="equi"></div>

                        {result?.tech_answer && result?.tech_answer != "" ? (
                          <>
                            <p className="text-center">
                              <strong>
                                {data?.payload?.tech_lang_keys?.["7"]} (Kc)
                              </strong>
                            </p>
                            <p className="text-center my-1">
                              <strong className="text-green-600 text-[25px]">
                                {Math.round(result?.tech_answer)}
                              </strong>
                            </p>
                          </>
                        ) : null}

                        <div className="result hidden" id="resid">
                          <div className="text-center mt-3 mb-1">
                            <strong id="re"></strong>
                          </div>
                          <div id="eqre" className="text-center">
                            <span id="equ"></span>
                          </div>
                          <span id="message" style={{ color: "red" }}></span>
                          <code id="result"></code>
                          <div className="table mt-3">
                            <table
                              id="tabledata"
                              className="col-12"
                              cellSpacing="0"
                            ></table>
                          </div>
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

export default EquilibriumConstantCalculator;
