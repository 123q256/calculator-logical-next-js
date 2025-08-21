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
  useExpectedValueCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useExpectedValueCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const ExpectedValueCalculator = () => {
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
    tech_check: "txtar",
    tech_xx: [1, 2, 4],
    tech_px: [0.2, 0.5, 0.3],
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useExpectedValueCalculatorMutation();

  const handleChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedArray = [...prevData[field]];
      updatedArray[index] = value;
      return {
        ...prevData,
        [field]: updatedArray,
      };
    });

    setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_check) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_check: formData.tech_check,
        tech_xx: formData.tech_xx,
        tech_px: formData.tech_px,
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
      tech_check: "txtar",
      tech_xx: [1, 2, 4],
      tech_px: [0.2, 0.5, 0.3],
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

  const addRow = () => {
    if (formData.tech_xx.length < 500) {
      setFormData((prev) => ({
        ...prev,
        tech_xx: [...prev.tech_xx, ""],
        tech_px: [...prev.tech_px, ""],
      }));
    }
  };

  const deleteRow = (index) => {
    if (formData.tech_xx.length > 2) {
      setFormData((prev) => ({
        ...prev,
        tech_xx: prev.tech_xx.filter((_, i) => i !== index),
        tech_px: prev.tech_px.filter((_, i) => i !== index),
      }));
    }
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
            <div className="grid grid-cols-12  gap-2">
              <div className="col-span-12">
                <table className="text-center w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2">X</th>
                      <th className="p-2">P(x)</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.tech_xx.map((_, index) => (
                      <tr key={index}>
                        <td className="pe-2">
                          <input
                            type="number"
                            className="input"
                            placeholder="00"
                            required
                            value={formData.tech_xx[index]}
                            onChange={(e) =>
                              handleChange(index, "tech_xx", e.target.value)
                            }
                          />
                        </td>
                        <td className="ps-2">
                          <input
                            type="number"
                            step="0.01"
                            className="input"
                            placeholder="00"
                            required
                            value={formData.tech_px[index]}
                            onChange={(e) =>
                              handleChange(index, "tech_px", e.target.value)
                            }
                          />
                        </td>
                        <td>
                          {formData.tech_xx.length >= 3 && (
                            <>
                              <img
                                src="/belete_btn.png"
                                width="18px"
                                height="18px"
                                className="cursor-pointer remove"
                                alt="Remove Row"
                                onClick={() => deleteRow(index)}
                              />
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-between items-center mt-4">
                  <p
                    onClick={addRow}
                    className="bg-[#2845F5] text-white cursor-pointer px-4 py-2 rounded-lg text-sm"
                  >
                    Add Row
                  </p>
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
                        <div className="text-center">
                          <p className="text-[20px]">
                            <strong>
                              {data?.payload?.tech_lang_keys["4"]}
                            </strong>
                          </p>
                          <div class="flex justify-center">
                            <p className="text-[25px] bg-[#2845F5] text-white rounded-lg px-3 py-2  my-3">
                              <strong className="text-blue">
                                {Number(result?.tech_ress).toFixed(4)}
                              </strong>
                            </p>
                          </div>
                        </div>
                        <div className="w-full mt-2">
                          <table className="w-full text-[16px]">
                            <tr className="bg-[#2845F5] text-white">
                              <td
                                colspan="3"
                                className="border p-2 text-center"
                              >
                                <strong className="text-blue">
                                  {data?.payload?.tech_lang_keys["5"]}
                                </strong>
                              </td>
                            </tr>
                            <tr className="bg-gray-100">
                              <td className="border p-2">
                                <strong className="text-blue">x</strong>
                              </td>
                              <td className="border p-2">
                                <strong className="text-blue">P(x)</strong>
                              </td>
                              <td className="border p-2">
                                <strong className="text-blue">x * P(x)</strong>
                              </td>
                            </tr>
                            {formData.tech_xx.map((x, i) => (
                              <tr
                                key={i}
                                className="bg-white"
                                dangerouslySetInnerHTML={{
                                  __html: result?.[`show_val${i}`] || "",
                                }}
                              ></tr>
                            ))}
                            <tr className="bg-sky bordered">
                              <td className="border p-2">
                                <strong className="text-blue">
                                  ∑ xi = {result?.tech_sum1}
                                </strong>
                              </td>
                              <td className="border p-2">
                                <strong className="text-blue">
                                  ∑ P(xi) = {result?.tech_sum2}
                                </strong>
                              </td>
                              <td className="border p-2">
                                <strong className="text-blue">
                                  ∑ xi * P(xi) ={" "}
                                  {Number(result?.tech_ress).toFixed(4)}
                                </strong>
                              </td>
                            </tr>
                          </table>
                        </div>
                        <p className="w-full font-s-20 mt-3">
                          {data?.payload?.tech_lang_keys["6"]}
                        </p>
                        <p className="w-full mt-2">
                          {data?.payload?.tech_lang_keys["7"]}:
                        </p>
                        <p className="w-full mt-2">
                          <span className="color_blue font_size20">
                            {" "}
                            {data?.payload?.tech_lang_keys["8"]} 1.{" "}
                          </span>
                          E(X) = μX = ∑ [ xi * P(xi) ]
                        </p>
                        <p className="w-full mt-2">
                          {" "}
                          <span className="color_blue font_size20">
                            {" "}
                            {data?.payload?.tech_lang_keys["8"]} 2.{" "}
                          </span>
                          E(X) = {result?.tech_show_res}
                        </p>
                        <p className="w-full mt-2">
                          {" "}
                          <span className="color_blue font_size20">
                            {" "}
                            {data?.payload?.tech_lang_keys["8"]} 3.{" "}
                          </span>
                          E(X) = {result?.tech_show_res1}
                        </p>
                        <p className="w-full mt-2">
                          {" "}
                          <span className="color_blue font_size20">
                            {" "}
                            {data?.payload?.tech_lang_keys["8"]} 4.{" "}
                          </span>
                          E(X) = {Number(result?.tech_ress).toFixed(4)}
                        </p>
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

export default ExpectedValueCalculator;
