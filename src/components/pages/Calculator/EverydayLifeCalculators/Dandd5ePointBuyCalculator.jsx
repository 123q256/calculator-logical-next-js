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
//   usePointBuyCalculatorMutation,
// } from "../../../redux/services/calculator/calculatorApi";

import { useGetSingleCalculatorDetailsMutation } from "../../../redux/services/calculator/calculatorApi";

import { usePointBuyCalculatorMutation } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import ResetButton from "../../../components/Calculator/ResetButton";
import Button from "../../../components/Calculator/Button";

const Dandd5ePointBuyCalculator = () => {
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
    tech_choice: "2", // 1 2
    tech_racial_choice: "1.1.1.1.1.1",
    tech_points_budget: "27",
    tech_smallest_score: "8",
    tech_largest_score: "15",
    tech_s1: "-9",
    tech_s2: "-6",
    tech_s3: "-4",
    tech_s4: "-2",
    tech_s5: "-1",
    tech_s6: "0",
    tech_s7: "1",
    tech_s8: "2",
    tech_s9: "3",
    tech_s10: "4",
    tech_s11: "5",
    tech_s12: "7",
    tech_s13: "9",
    tech_s14: "12",
    tech_s15: "15",
    tech_s16: "19",
    tech_strength: "8",
    tech_dexerity: "8",
    tech_intelligence: "8",
    tech_wisdom: "8",
    tech_charisma: "8",
    tech_constitution: "8",
    tech_strength1: "6",
    tech_dexerity1: "6",
    tech_intelligence1: "6",
    tech_wisdom1: "6",
    tech_charisma1: "6",
    tech_constitution1: "6",
    tech_submit: "calculate",
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = usePointBuyCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_x) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_choice: formData.tech_choice,
        tech_racial_choice: formData.tech_racial_choice,
        tech_points_budget: formData.tech_points_budget,
        tech_smallest_score: formData.tech_smallest_score,
        tech_largest_score: formData.tech_largest_score,
        tech_s1: formData.tech_s1,
        tech_s2: formData.tech_s2,
        tech_s3: formData.tech_s3,
        tech_s4: formData.tech_s4,
        tech_s5: formData.tech_s5,
        tech_s6: formData.tech_s6,
        tech_s7: formData.tech_s7,
        tech_s8: formData.tech_s8,
        tech_s9: formData.tech_s9,
        tech_s10: formData.tech_s10,
        tech_s11: formData.tech_s11,
        tech_s12: formData.tech_s12,
        tech_s13: formData.tech_s13,
        tech_s14: formData.tech_s14,
        tech_s15: formData.tech_s15,
        tech_s16: formData.tech_s16,
        tech_strength: formData.tech_strength,
        tech_dexerity: formData.tech_dexerity,
        tech_intelligence: formData.tech_intelligence,
        tech_wisdom: formData.tech_wisdom,
        tech_charisma: formData.tech_charisma,
        tech_constitution: formData.tech_constitution,
        tech_strength1: formData.tech_strength1,
        tech_dexerity1: formData.tech_dexerity1,
        tech_intelligence1: formData.tech_intelligence1,
        tech_wisdom1: formData.tech_wisdom1,
        tech_charisma1: formData.tech_charisma1,
        tech_constitution1: formData.tech_constitution1,
        tech_submit: formData.tech_submit,
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
      tech_choice: "2", // 1 2
      tech_racial_choice: "1.1.1.1.1.1",
      tech_points_budget: "27",
      tech_smallest_score: "8",
      tech_largest_score: "15",
      tech_s1: "-9",
      tech_s2: "-6",
      tech_s3: "-4",
      tech_s4: "-2",
      tech_s5: "-1",
      tech_s6: "0",
      tech_s7: "1",
      tech_s8: "2",
      tech_s9: "3",
      tech_s10: "4",
      tech_s11: "5",
      tech_s12: "7",
      tech_s13: "9",
      tech_s14: "12",
      tech_s15: "15",
      tech_s16: "19",
      tech_strength: "8",
      tech_dexerity: "8",
      tech_intelligence: "8",
      tech_wisdom: "8",
      tech_charisma: "8",
      tech_constitution: "8",
      tech_strength1: "6",
      tech_dexerity1: "6",
      tech_intelligence1: "6",
      tech_wisdom1: "6",
      tech_charisma1: "6",
      tech_constitution1: "6",
      tech_submit: "calculate",
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

          <div class="lg:w-[60%] md:w-[60%] w-full mx-auto ">
            <div class="grid grid-cols-12 mt-3   gap-2 md:gap-4 lg:gap-4">
              <div class="col-span-12 md:col-span-6 lg:col-span-6">
                <label htmlFor="tech_choice" className="label">
                  {data?.payload?.tech_lang_keys["1"]}:
                </label>
                <div className="mt-2">
                  <select
                    className="input"
                    aria-label="select"
                    name="tech_choice"
                    id="tech_choice"
                    value={formData.tech_choice}
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

              <div class="col-span-12 md:col-span-6 lg:col-span-6">
                <label htmlFor="tech_racial_choice" className="label">
                  {data?.payload?.tech_lang_keys["4"]}:
                </label>
                <div className="mt-2">
                  <select
                    className="input"
                    aria-label="select"
                    name="tech_racial_choice"
                    id="tech_racial_choice"
                    value={formData.tech_racial_choice}
                    onChange={handleChange}
                  >
                    {[
                      data?.payload?.tech_lang_keys[5],
                      `${data?.payload?.tech_lang_keys[6]} (${data?.payload?.tech_lang_keys[7]})`,
                      `Elf (${data?.payload?.tech_lang_keys[8]})`,
                      `${data?.payload?.tech_lang_keys[9]} (${data?.payload?.tech_lang_keys[10]})`,
                      `${data?.payload?.tech_lang_keys[11]}-Elf`,
                      `${data?.payload?.tech_lang_keys[11]}-Orc`,
                      `${data?.payload?.tech_lang_keys[12]} (${data?.payload?.tech_lang_keys[13]})`,
                      data?.payload?.tech_lang_keys[14],
                      data?.payload?.tech_lang_keys[15],
                      data?.payload?.tech_lang_keys[16],
                      data?.payload?.tech_lang_keys[17],
                      data?.payload?.tech_lang_keys[18],
                      data?.payload?.tech_lang_keys[19],
                      data?.payload?.tech_lang_keys[20],
                      data?.payload?.tech_lang_keys[21],
                      data?.payload?.tech_lang_keys[22],
                      data?.payload?.tech_lang_keys[23],
                      data?.payload?.tech_lang_keys[24],
                      data?.payload?.tech_lang_keys[25],
                      data?.payload?.tech_lang_keys[26],
                      data?.payload?.tech_lang_keys[12],
                      data?.payload?.tech_lang_keys[27],
                      data?.payload?.tech_lang_keys[28],
                      data?.payload?.tech_lang_keys[29],
                      data?.payload?.tech_lang_keys[30],
                      data?.payload?.tech_lang_keys[31],
                      data?.payload?.tech_lang_keys[32],
                      data?.payload?.tech_lang_keys[33],
                      data?.payload?.tech_lang_keys[34],
                      data?.payload?.tech_lang_keys[35],
                      data?.payload?.tech_lang_keys[36],
                      data?.payload?.tech_lang_keys[37],
                      data?.payload?.tech_lang_keys[38],
                      data?.payload?.tech_lang_keys[39],
                      data?.payload?.tech_lang_keys[40],
                    ].map((label, index) => {
                      const values = [
                        "2.0.0.0.0.1",
                        "0.0.2.0.1.0",
                        "0.2.0.1.0.0",
                        "0.0.1.0.2.0",
                        "0.0.0.0.0.2",
                        "2.0.1.0.0.0",
                        "0.2.0.0.0.1",
                        "1.1.1.1.1.1",
                        "0.0.0.1.0.2",
                        "0.2.0.0.0.1",
                        "0.0.0.0.0.2",
                        "2.1.0.0.0.0",
                        "2.0.0.0.1.0",
                        "1.0.0.0.2.0",
                        "0.0.2.0.0.0",
                        "0.0.0.1.0.0",
                        "0.0.0.2.0.0",
                        "0.2.1.0.0.0",
                        "2.0.1.0.0.0",
                        "0.2.1.0.0.0",
                        "0.2.0.0.0.0",
                        "0.0.2.1.0.0",
                        "0.0.0.0.2.1",
                        "0.2.0.0.1.0",
                        "0.2.0.0.0.0",
                        "1.0.2.0.0.0",
                        "0.0.2.0.1.0",
                        "2.1.0.0.0.0",
                        "0.0.2.0.1.0",
                        "2.0.1.0.0.0",
                        "0.1.0.0.0.2",
                        "0.2.0.0.0.1",
                        "2.0.0.0.1.0",
                        "1.0.1.0.0.1",
                        "39",
                      ];

                      return (
                        <option key={index} value={values[index]}>
                          {label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div class="col-span-12 custmize hidden">
                <div class="grid grid-cols-12 mt-3   gap-2 md:gap-4 lg:gap-4">
                  <div class="col-span-4 md:col-span-4 lg:col-span-4">
                    <label htmlFor="tech_points_budget" className="label">
                      {data?.payload?.tech_lang_keys["41"]}:
                    </label>
                    <div class=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_points_budget"
                        id="tech_points_budget"
                        className="input my-2"
                        aria-label="input"
                        placeholder="00"
                        value={formData.tech_points_budget}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div class="col-span-4 md:col-span-4 lg:col-span-4">
                    <label htmlFor="tech_smallest_score" className="label">
                      {data?.payload?.tech_lang_keys["42"]}:
                    </label>
                    <div class=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_smallest_score"
                        id="tech_smallest_score"
                        className="input my-2"
                        aria-label="input"
                        placeholder="00"
                        value={formData.tech_smallest_score}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div class="col-span-4 md:col-span-4 lg:col-span-4">
                    <label htmlFor="tech_largest_score" className="label">
                      {data?.payload?.tech_lang_keys["43"]}:
                    </label>
                    <div class=" relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_largest_score"
                        id="tech_largest_score"
                        className="input my-2"
                        aria-label="input"
                        placeholder="00"
                        value={formData.tech_largest_score}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-span-4 md:col-span-3 lg:col-span-3">
                    <label htmlFor="tech_s0" className="label">
                      3:
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_s[]"
                        id="tech_s0"
                        className="input my-2"
                        placeholder="00"
                        value={formData.tech_s[0]}
                        onChange={(e) => handleChange(e, 0)}
                      />
                    </div>
                  </div>

                  <div className="col-span-4 md:col-span-3 lg:col-span-3">
                    <label htmlFor="tech_s1" className="label">
                      4:
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="any"
                        name="tech_s[]"
                        id="tech_s1"
                        className="input my-2"
                        placeholder="00"
                        value={formData.tech_s[1]}
                        onChange={(e) => handleChange(e, 1)}
                      />
                    </div>
                  </div>

                  <div class="col-span-4 md:col-span-3 lg:col-span-3">
                    <label for="s3" class="label">
                      5:
                    </label>
                    <div class="w-full py-2 relative">
                      <input
                        type="number"
                        step="any"
                        name="s[]"
                        id="s3"
                        class="input"
                        aria-label="input"
                        value="{isset(request()->s3)?request()->s3:'-4'}"
                      />
                      <span class="text-blue input_unit">
                        {data?.payload?.tech_lang_keys[44]}
                      </span>
                    </div>
                  </div>
                  <div class="col-span-4 md:col-span-3 lg:col-span-3">
                    <label for="s4" class="label">
                      6:
                    </label>
                    <div class="w-full py-2 relative">
                      <input
                        type="number"
                        step="any"
                        name="s[]"
                        id="s4"
                        class="input"
                        aria-label="input"
                        value="{isset(request()->s4)?request()->s4:'-2'}"
                      />
                      <span class="text-blue input_unit">
                        {data?.payload?.tech_lang_keys[44]}
                      </span>
                    </div>
                  </div>
                  <div class="col-span-4 md:col-span-3 lg:col-span-3">
                    <label for="s5" class="label">
                      7:
                    </label>
                    <div class="w-full py-2 relative">
                      <input
                        type="number"
                        step="any"
                        name="s[]"
                        id="s5"
                        class="input"
                        aria-label="input"
                        value="{isset(request()->s5)?request()->s5:'-1'}"
                      />
                      <span class="text-blue input_unit">
                        {data?.payload?.tech_lang_keys[44]}
                      </span>
                    </div>
                  </div>
                  <div class="col-span-4 md:col-span-3 lg:col-span-3">
                    <label for="s6" class="label">
                      8:
                    </label>
                    <div class="w-full py-2 relative">
                      <input
                        type="number"
                        step="any"
                        name="s[]"
                        id="s6"
                        class="input"
                        aria-label="input"
                        value="{isset(request()->s6)?request()->s6:'0'}"
                      />
                      <span class="text-blue input_unit">
                        {data?.payload?.tech_lang_keys[44]}
                      </span>
                    </div>
                  </div>
                  <div class="col-span-4 md:col-span-3 lg:col-span-3">
                    <label for="s7" class="label">
                      9:
                    </label>
                    <div class="w-full py-2 relative">
                      <input
                        type="number"
                        step="any"
                        name="s[]"
                        id="s7"
                        class="input"
                        aria-label="input"
                        value="{isset(request()->s7)?request()->s7:'1'}"
                      />
                      <span class="text-blue input_unit">
                        {data?.payload?.tech_lang_keys[44]}
                      </span>
                    </div>
                  </div>
                  <div class="col-span-4 md:col-span-3 lg:col-span-3">
                    <label for="s8" class="label">
                      10:
                    </label>
                    <div class="w-full py-2 relative">
                      <input
                        type="number"
                        step="any"
                        name="s[]"
                        id="s8"
                        class="input"
                        aria-label="input"
                        value="{isset(request()->s8)?request()->s8:'2'}"
                      />
                      <span class="text-blue input_unit">
                        {data?.payload?.tech_lang_keys[44]}
                      </span>
                    </div>
                  </div>
                  <div class="col-span-4 md:col-span-3 lg:col-span-3">
                    <label for="s9" class="label">
                      11:
                    </label>
                    <div class="w-full py-2 relative">
                      <input
                        type="number"
                        step="any"
                        name="s[]"
                        id="s9"
                        class="input"
                        aria-label="input"
                        value="{isset(request()->s9)?request()->s9:'3'}"
                      />
                      <span class="text-blue input_unit">
                        {data?.payload?.tech_lang_keys[44]}
                      </span>
                    </div>
                  </div>
                  <div class="col-span-4 md:col-span-3 lg:col-span-3">
                    <label for="s10" class="label">
                      12:
                    </label>
                    <div class="w-full py-2 relative">
                      <input
                        type="number"
                        step="any"
                        name="s[]"
                        id="s10"
                        class="input"
                        aria-label="input"
                        value="{isset(request()->s10)?request()->s10:'4'}"
                      />
                      <span class="text-blue input_unit">
                        {data?.payload?.tech_lang_keys[44]}
                      </span>
                    </div>
                  </div>
                  <div class="col-span-4 md:col-span-3 lg:col-span-3">
                    <label for="s11" class="label">
                      13:
                    </label>
                    <div class="w-full py-2 relative">
                      <input
                        type="number"
                        step="any"
                        name="s[]"
                        id="s11"
                        class="input"
                        aria-label="input"
                        value="{isset(request()->s11)?request()->s11:'5'}"
                      />
                      <span class="text-blue input_unit">
                        {data?.payload?.tech_lang_keys[44]}
                      </span>
                    </div>
                  </div>
                  <div class="col-span-4 md:col-span-3 lg:col-span-3">
                    <label for="s12" class="label">
                      14:
                    </label>
                    <div class="w-full py-2 relative">
                      <input
                        type="number"
                        step="any"
                        name="s[]"
                        id="s12"
                        class="input"
                        aria-label="input"
                        value="{isset(request()->s12)?request()->s12:'7'}"
                      />
                      <span class="text-blue input_unit">
                        {data?.payload?.tech_lang_keys[44]}
                      </span>
                    </div>
                  </div>
                  <div class="col-span-4 md:col-span-3 lg:col-span-3">
                    <label for="s13" class="label">
                      15:
                    </label>
                    <div class="w-full py-2 relative">
                      <input
                        type="number"
                        step="any"
                        name="s[]"
                        id="s13"
                        class="input"
                        aria-label="input"
                        value="{isset(request()->s13)?request()->s13:'9'}"
                      />
                      <span class="text-blue input_unit">
                        {data?.payload?.tech_lang_keys[44]}
                      </span>
                    </div>
                  </div>
                  <div class="col-span-4 md:col-span-3 lg:col-span-3">
                    <label for="s14" class="label">
                      16:
                    </label>
                    <div class="w-full py-2 relative">
                      <input
                        type="number"
                        step="any"
                        name="s[]"
                        id="s14"
                        class="input"
                        aria-label="input"
                        value="{isset(request()->s14)?request()->s14:'12'}"
                      />
                      <span class="text-blue input_unit">
                        {data?.payload?.tech_lang_keys[44]}
                      </span>
                    </div>
                  </div>
                  <div class="col-span-4 md:col-span-3 lg:col-span-3">
                    <label for="s15" class="label">
                      17:
                    </label>
                    <div class="w-full py-2 relative">
                      <input
                        type="number"
                        step="any"
                        name="s[]"
                        id="s15"
                        class="input"
                        aria-label="input"
                        value="{isset(request()->s15)?request()->s15:'15'}"
                      />
                      <span class="text-blue input_unit">
                        {data?.payload?.tech_lang_keys[44]}
                      </span>
                    </div>
                  </div>
                  <div class="col-span-4 md:col-span-3 lg:col-span-3">
                    <label for="s16" class="label">
                      18:
                    </label>
                    <div class="w-full py-2 relative">
                      <input
                        type="number"
                        step="any"
                        name="s[]"
                        id="s16"
                        class="input"
                        aria-label="input"
                        value="{isset(request()->s16)?request()->s16:'19'}"
                      />
                      <span class="text-blue input_unit">
                        {data?.payload?.tech_lang_keys[44]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-span-6 md:col-span-6 lg:col-span-6">
                <label for="strength" class="label">
                  {data?.payload?.tech_lang_keys[46]}:
                </label>
                <div class="w-full py-2">
                  <input
                    type="number"
                    step="any"
                    name="strength"
                    id="strength"
                    class="input"
                    aria-label="input"
                    value="{ isset(request()->strength)?request()->strength:'8' }"
                  />
                </div>
              </div>
              <div class="col-span-6 md:col-span-6 lg:col-span-6">
                <label for="dexerity" class="label">
                  {data?.payload?.tech_lang_keys[47]}:
                </label>
                <div class="w-full py-2">
                  <input
                    type="number"
                    step="any"
                    name="dexerity"
                    id="dexerity"
                    class="input"
                    aria-label="input"
                    value="{ isset(request()->dexerity)?request()->dexerity:'8' }"
                  />
                </div>
              </div>
              <div class="col-span-6 md:col-span-6 lg:col-span-6">
                <label for="intelligence" class="label">
                  {data?.payload?.tech_lang_keys[48]}:
                </label>
                <div class="w-full py-2">
                  <input
                    type="number"
                    step="any"
                    name="intelligence"
                    id="intelligence"
                    class="input"
                    aria-label="input"
                    value="{ isset(request()->intelligence)?request()->intelligence:'8' }"
                  />
                </div>
              </div>
              <div class="col-span-6 md:col-span-6 lg:col-span-6">
                <label for="wisdom" class="label">
                  {data?.payload?.tech_lang_keys[49]}:
                </label>
                <div class="w-full py-2">
                  <input
                    type="number"
                    step="any"
                    name="wisdom"
                    id="wisdom"
                    class="input"
                    aria-label="input"
                    value="{ isset(request()->wisdom)?request()->wisdom:'8' }"
                  />
                </div>
              </div>
              <div class="col-span-6 md:col-span-6 lg:col-span-6">
                <label for="charisma" class="label">
                  {data?.payload?.tech_lang_keys[50]}:
                </label>
                <div class="w-full py-2">
                  <input
                    type="number"
                    step="any"
                    name="charisma"
                    id="charisma"
                    class="input"
                    aria-label="input"
                    value="{ isset(request()->charisma)?request()->charisma:'8' }"
                  />
                </div>
              </div>
              <div class="col-span-6 md:col-span-6 lg:col-span-6">
                <label for="constitution" class="label">
                  {data?.payload?.tech_lang_keys[51]}:
                </label>
                <div class="w-full py-2">
                  <input
                    type="number"
                    step="any"
                    name="constitution"
                    id="constitution"
                    class="input"
                    aria-label="input"
                    value="{ isset(request()->constitution)?request()->constitution:'8' }"
                  />
                </div>
              </div>
              <div class="col-span-12 others hidden">
                <div class="grid grid-cols-12 mt-3   gap-2 md:gap-4 lg:gap-4">
                  <p class="col-span-12">{data?.payload?.tech_lang_keys[52]}</p>
                  <div class="col-span-6 md:col-span-6 lg:col-span-6">
                    <label for="strength1" class="label">
                      {data?.payload?.tech_lang_keys[46]}:
                    </label>
                    <div class="w-full py-2">
                      <input
                        type="number"
                        step="any"
                        name="strength1"
                        id="strength1"
                        class="input"
                        aria-label="input"
                        value="{ isset(request()->strength1)?request()->strength1:'6' }"
                      />
                    </div>
                  </div>
                  <div class="col-span-6 md:col-span-6 lg:col-span-6">
                    <label for="dexerity1" class="label">
                      {data?.payload?.tech_lang_keys[47]}:
                    </label>
                    <div class="w-full py-2">
                      <input
                        type="number"
                        step="any"
                        name="dexerity1"
                        id="dexerity1"
                        class="input"
                        aria-label="input"
                        value="{ isset(request()->dexerity1)?request()->dexerity1:'6' }"
                      />
                    </div>
                  </div>
                  <div class="col-span-6 md:col-span-6 lg:col-span-6">
                    <label for="intelligence1" class="label">
                      {data?.payload?.tech_lang_keys[48]}:
                    </label>
                    <div class="w-full py-2">
                      <input
                        type="number"
                        step="any"
                        name="intelligence1"
                        id="intelligence1"
                        class="input"
                        aria-label="input"
                        value="{ isset(request()->intelligence1)?request()->intelligence1:'6' }"
                      />
                    </div>
                  </div>
                  <div class="col-span-6 md:col-span-6 lg:col-span-6">
                    <label for="wisdom1" class="label">
                      {data?.payload?.tech_lang_keys[49]}:
                    </label>
                    <div class="w-full py-2">
                      <input
                        type="number"
                        step="any"
                        name="wisdom1"
                        id="wisdom1"
                        class="input"
                        aria-label="input"
                        value="{ isset(request()->wisdom1)?request()->wisdom1:'6' }"
                      />
                    </div>
                  </div>
                  <div class="col-span-6 md:col-span-6 lg:col-span-6">
                    <label for="charisma1" class="label">
                      {data?.payload?.tech_lang_keys[50]}:
                    </label>
                    <div class="w-full py-2">
                      <input
                        type="number"
                        step="any"
                        name="charisma1"
                        id="charisma1"
                        class="input"
                        aria-label="input"
                        value="{ isset(request()->charisma1)?request()->charisma1:'6' }"
                      />
                    </div>
                  </div>
                  <div class="col-span-6 md:col-span-6 lg:col-span-6">
                    <label for="constitution1" class="label">
                      {data?.payload?.tech_lang_keys[51]}:
                    </label>
                    <div class="w-full py-2">
                      <input
                        type="number"
                        step="any"
                        name="constitution1"
                        id="constitution1"
                        class="input"
                        aria-label="input"
                        value="{ isset(request()->constitution1)?request()->constitution1:'6' }"
                      />
                    </div>
                  </div>
                </div>
              </div>
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

export default Dandd5ePointBuyCalculator;
