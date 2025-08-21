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
  useLoveCalculatorCalculationMutation,
  useRecessedLightingCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useRecessedLightingCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import ResetButton from "../../../components/Calculator/ResetButton";
import Button from "../../../components/Calculator/Button";

const RecessedLightingCalculator = () => {
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
    tech_a: 45,
    tech_b: 28,
    tech_columns_fixture: 3,
    tech_rows_fixture: 1,
    tech_include: "yes",
    tech_units: "m",
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useRecessedLightingCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.tech_a ||
      !formData.tech_b ||
      !formData.tech_columns_fixture ||
      !formData.tech_rows_fixture ||
      !formData.tech_include ||
      !formData.tech_units
    ) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_a: formData.tech_a,
        tech_b: formData.tech_b,
        tech_columns_fixture: formData.tech_columns_fixture,
        tech_rows_fixture: formData.tech_rows_fixture,
        tech_include: formData.tech_include,
        tech_units: formData.tech_units,
      }).unwrap();
      setResult(response?.payload); // Assuming the response has 'lovePercentage'
      toast.success("Successfully Calculated");
    } catch (err) {
      setFormError(err.data.payload.error);
      toast.error(err.data.payload.error);
    }
  };

  // Handle reset form
  const handleReset = () => {
    setFormData({
      tech_a: 45,
      tech_b: 28,
      tech_columns_fixture: 3,
      tech_rows_fixture: 1,
      tech_include: "yes",
      tech_units: "m",
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
        <div className="w-full mx-auto p-4 lg:p-8 md:p-8 input_form rounded-lg space-y-6 mb-3">
          {formError && (
            <p className="text-red-500 text-lg font-semibold w-full">
              {formError}
            </p>
          )}

          <div className="lg:w-[60%] md:w-[80%] w-full mx-auto ">
            <div className="grid grid-cols-12 mt-3  gap-4">
              <div className="lg:col-span-6 md:col-span-6 col-span-12">
                <div className="col-12 mt-0 mt-lg-2">
                  <label htmlFor="tech_a" className="label">
                    {data?.payload?.tech_lang_keys["1"]}:
                  </label>
                  <div className=" relative">
                    <input
                      type="number"
                      step="any"
                      name="tech_a"
                      id="tech_a"
                      className="input my-2"
                      aria-label="input"
                      placeholder="00"
                      value={formData.tech_a}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-12 mt-0 mt-lg-2">
                  <label htmlFor="tech_b" className="label">
                    {data?.payload?.tech_lang_keys["2"]}:
                  </label>
                  <div className=" relative">
                    <input
                      type="number"
                      step="any"
                      name="tech_b"
                      id="tech_b"
                      className="input my-2"
                      aria-label="input"
                      placeholder="00"
                      value={formData.tech_b}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-12 mt-0 mt-lg-2">
                  <label htmlFor="tech_columns_fixture" className="label">
                    {data?.payload?.tech_lang_keys["3"]}:
                  </label>
                  <div className="mt-2">
                    <select
                      className="input"
                      aria-label="select"
                      name="tech_columns_fixture"
                      id="tech_columns_fixture"
                      value={formData.tech_columns_fixture}
                      onChange={handleChange}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 mt-0 mt-lg-2">
                  <label htmlFor="tech_rows_fixture" className="label">
                    {data?.payload?.tech_lang_keys["4"]}:
                  </label>
                  <div className="mt-2">
                    <select
                      className="input"
                      aria-label="select"
                      name="tech_rows_fixture"
                      id="tech_rows_fixture"
                      value={formData.tech_rows_fixture}
                      onChange={handleChange}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                </div>
                {formData.tech_columns_fixture == "2" && (
                  <>
                    <div className="col-12 mt-0 mt-lg-2 include">
                      <label htmlFor="tech_include" className="label">
                        {data?.payload?.tech_lang_keys["5"]}:
                      </label>
                      <div className="mt-2">
                        <select
                          className="input"
                          aria-label="select"
                          name="tech_include"
                          id="tech_include"
                          value={formData.tech_include}
                          onChange={handleChange}
                        >
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="lg:col-span-6 md:col-span-6 col-span-12">
                <div className="col-12 mt-0 mt-lg-2">
                  <label htmlFor="tech_units" className="label">
                    {data?.payload?.tech_lang_keys["6"]}:
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
                      <option value="mm">mm</option>
                      <option value="cm">cm</option>
                      <option value="m">m</option>
                      <option value="in">in</option>
                      <option value="ft">ft</option>
                      <option value="yd">yd</option>
                    </select>
                  </div>
                </div>
                <div className="p-2  mt-4 radius-5">
                  <>
                    {formData.tech_columns_fixture == "1" &&
                      formData.tech_rows_fixture == "1" && (
                        <img
                          src="/images/recessed_image/1_1.webp"
                          alt="Stack log"
                          className="set_img max-width"
                          width="300px"
                          height="250px"
                        />
                      )}

                    {formData.tech_columns_fixture == "2" &&
                      formData.tech_rows_fixture == "2" &&
                      formData.tech_include == "yes" && (
                        <img
                          src="/images/recessed_image/2_2_yes.webp"
                          alt="Stack log"
                          className="set_img max-width"
                          width="300px"
                          height="250px"
                        />
                      )}

                    {formData.tech_columns_fixture == "2" &&
                      formData.tech_rows_fixture == "2" &&
                      formData.tech_include == "no" && (
                        <img
                          src="/images/recessed_image/2_2.webp"
                          alt="Stack log"
                          className="set_img max-width"
                          width="300px"
                          height="250px"
                        />
                      )}

                    {formData.tech_columns_fixture == "3" &&
                      formData.tech_rows_fixture == "3" && (
                        <img
                          src="/images/recessed_image/3_3.webp"
                          alt="Stack log"
                          className="set_img max-width"
                          width="300px"
                          height="250px"
                        />
                      )}

                    {formData.tech_columns_fixture == "2" &&
                      formData.tech_rows_fixture == "1" && (
                        <img
                          src="/images/recessed_image/2_1.webp"
                          alt="Stack log"
                          className="set_img max-width"
                          width="300px"
                          height="250px"
                        />
                      )}

                    {formData.tech_columns_fixture == "2" &&
                      formData.tech_rows_fixture == "3" && (
                        <img
                          src="/images/recessed_image/2_3.webp"
                          alt="Stack log"
                          className="set_img max-width"
                          width="300px"
                          height="250px"
                        />
                      )}

                    {formData.tech_columns_fixture == "3" &&
                      formData.tech_rows_fixture == "1" && (
                        <img
                          src="/images/recessed_image/3_1.webp"
                          alt="Stack log"
                          className="set_img max-width"
                          width="300px"
                          height="250px"
                        />
                      )}

                    {formData.tech_columns_fixture == "3" &&
                      formData.tech_rows_fixture == "2" && (
                        <img
                          src="/images/recessed_image/3_2.webp"
                          alt="Stack log"
                          className="set_img max-width"
                          width="300px"
                          height="250px"
                        />
                      )}

                    {formData.tech_columns_fixture == "1" &&
                      formData.tech_rows_fixture == "2" && (
                        <img
                          src="/images/recessed_image/1_2.webp"
                          alt="Stack log"
                          className="set_img max-width"
                          width="300px"
                          height="250px"
                        />
                      )}

                    {formData.tech_columns_fixture == "1" &&
                      formData.tech_rows_fixture == "3" && (
                        <img
                          src="/images/recessed_image/1_3.webp"
                          alt="Stack log"
                          className="set_img max-width"
                          width="300px"
                          height="250px"
                        />
                      )}
                  </>
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
                {data?.payload?.tech_lang_keys["locale"] == "en"
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
              <div className="w-full mx-auto p-4 lg:p-8 md:p-8 result_calculator rounded-lg  space-y-6 result">
                <div>
                  <ResultActions lang={data?.payload?.tech_lang_keys} />

                  <div className="rounded-lg  flex items-center justify-center">
                    <div className="w-full mt-3">
                      <div className="w-full">
                        <div className="w-full md:w-[60%] lg:w-[60%] overflow-auto text-[16px]">
                          <table className="w-full">
                            {formData?.tech_columns_fixture == "1" &&
                            formData?.tech_rows_fixture == "1" ? (
                              <>
                                <tr>
                                  <td className="border-b py-2">
                                    <strong>
                                      {data?.payload?.tech_lang_keys["7"]} :
                                    </strong>
                                  </td>
                                  <td className="border-b py-2">
                                    {Number(result?.tech_a_not).toFixed(2)}{" "}
                                    {formData?.tech_units}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border-b py-2">
                                    <strong>
                                      {data?.payload?.tech_lang_keys["8"]} :
                                    </strong>
                                  </td>
                                  <td className="border-b py-2">
                                    {Number(result?.tech_b_not).toFixed(2)}{" "}
                                    {formData?.tech_units}
                                  </td>
                                </tr>
                              </>
                            ) : (formData?.tech_columns_fixture == "1" &&
                                formData?.tech_rows_fixture == "2") ||
                              (formData?.tech_columns_fixture == "1" &&
                                formData?.tech_rows_fixture == "3") ? (
                              <>
                                <tr>
                                  <td className="border-b py-2">
                                    <strong>
                                      {data?.payload?.tech_lang_keys["7"]} :
                                    </strong>
                                  </td>
                                  <td className="border-b py-2">
                                    {Number(result?.tech_a_not).toFixed(2)}{" "}
                                    {formData?.tech_units}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border-b py-2">
                                    <strong>
                                      {data?.payload?.tech_lang_keys["9"]} :
                                    </strong>
                                  </td>
                                  <td className="border-b py-2">
                                    {Number(result?.tech_a_i).toFixed(2)}{" "}
                                    {formData?.tech_units}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border-b py-2">
                                    <strong>
                                      {data?.payload?.tech_lang_keys["8"]} :
                                    </strong>
                                  </td>
                                  <td className="border-b py-2">
                                    {Number(result?.tech_b_not).toFixed(2)}{" "}
                                    {formData?.tech_units}
                                  </td>
                                </tr>
                              </>
                            ) : (formData?.tech_columns_fixture == "2" &&
                                formData?.tech_rows_fixture == "1") ||
                              (formData?.tech_columns_fixture == "3" &&
                                formData?.tech_rows_fixture == "1") ? (
                              <>
                                <tr>
                                  <td className="border-b py-2">
                                    <strong>
                                      {data?.payload?.tech_lang_keys["7"]} :
                                    </strong>
                                  </td>
                                  <td className="border-b py-2">
                                    {Number(result?.tech_a_not).toFixed(2)}{" "}
                                    {formData?.tech_units}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border-b py-2">
                                    <strong>
                                      {data?.payload?.tech_lang_keys["8"]} :
                                    </strong>
                                  </td>
                                  <td className="border-b py-2">
                                    {Number(result?.tech_b_not).toFixed(2)}{" "}
                                    {formData?.tech_units}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border-b py-2">
                                    <strong>
                                      {data?.payload?.tech_lang_keys["11"]} :
                                    </strong>
                                  </td>
                                  <td className="border-b py-2">
                                    {Number(result?.tech_b_i).toFixed(2)}{" "}
                                    {formData?.tech_units}
                                  </td>
                                </tr>
                              </>
                            ) : formData?.tech_columns_fixture == "2" &&
                              formData?.tech_rows_fixture == "2" ? (
                              <>
                                {formData?.tech_include == "yes" ? (
                                  <>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["7"]} :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_a_not).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["9"]} :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_a_i).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["8"]} :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_b_not).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["11"]}{" "}
                                          :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_b_i).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["12"]}{" "}
                                          :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_y_not).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["13"]}{" "}
                                          :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_x_not).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                  </>
                                ) : (
                                  <>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["7"]} :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_a_not).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="font_size20">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["9"]} :
                                        </strong>
                                      </td>
                                      <td className="clr_blue">
                                        {Number(result?.tech_a_i).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["8"]} :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_b_not).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="font_size20">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["11"]}{" "}
                                          :
                                        </strong>
                                      </td>
                                      <td className="clr_blue">
                                        {Number(result?.tech_b_i).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                  </>
                                )}
                              </>
                            ) : formData?.tech_columns_fixture == "2" &&
                              formData?.tech_rows_fixture == "3" ? (
                              <>
                                {formData?.tech_include == "yes" ? (
                                  <>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["7"]} :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_a_not).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["9"]} :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_a_i).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["8"]} :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_b_not).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["11"]}{" "}
                                          :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_b_i).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["12"]}{" "}
                                          :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_y_not).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["15"]}{" "}
                                          :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_y_i).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["14"]}{" "}
                                          :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_x_i).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                  </>
                                ) : (
                                  <>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["7"]} :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_a_not).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["9"]} :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_a_i).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["8"]} :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_b_not).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["11"]}{" "}
                                          :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_b_i).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                  </>
                                )}
                              </>
                            ) : formData?.tech_columns_fixture == "3" &&
                              formData?.tech_rows_fixture == "2" ? (
                              <>
                                {formData?.tech_include == "yes" ? (
                                  <>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["7"]} :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_a_not).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["9"]} :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_a_i).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["8"]} :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_b_not).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["11"]}{" "}
                                          :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_b_i).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["12"]}{" "}
                                          :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_y_not).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["13"]}{" "}
                                          :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_x_not).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["14"]}{" "}
                                          :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_x_i).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                  </>
                                ) : (
                                  <>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["7"]} :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_a_not).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["9"]} :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_a_i).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["8"]} :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_b_not).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="border-b py-2">
                                        <strong>
                                          {data?.payload?.tech_lang_keys["11"]}{" "}
                                          :
                                        </strong>
                                      </td>
                                      <td className="border-b py-2">
                                        {Number(result?.tech_b_i).toFixed(2)}{" "}
                                        {formData?.tech_units}
                                      </td>
                                    </tr>
                                  </>
                                )}
                              </>
                            ) : formData?.tech_columns_fixture == "3" &&
                              formData?.tech_rows_fixture == "3" ? (
                              <>
                                <tr>
                                  <td className="border-b py-2">
                                    <strong>
                                      {data?.payload?.tech_lang_keys["7"]} :
                                    </strong>
                                  </td>
                                  <td className="border-b py-2">
                                    {Number(result?.tech_a_not).toFixed(2)}{" "}
                                    {formData?.tech_units}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border-b py-2">
                                    <strong>
                                      {data?.payload?.tech_lang_keys["9"]} :
                                    </strong>
                                  </td>
                                  <td className="border-b py-2">
                                    {Number(result?.tech_a_i).toFixed(2)}{" "}
                                    {formData?.tech_units}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border-b py-2">
                                    <strong>
                                      {data?.payload?.tech_lang_keys["8"]} :
                                    </strong>
                                  </td>
                                  <td className="border-b py-2">
                                    {Number(result?.tech_b_not).toFixed(2)}{" "}
                                    {formData?.tech_units}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="border-b py-2">
                                    <strong>
                                      {data?.payload?.tech_lang_keys["11"]} :
                                    </strong>
                                  </td>
                                  <td className="border-b py-2">
                                    {Number(result?.tech_b_i).toFixed(2)}{" "}
                                    {formData?.tech_units}
                                  </td>
                                </tr>
                              </>
                            ) : null}
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

export default RecessedLightingCalculator;
