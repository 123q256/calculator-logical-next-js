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
  useCharacteristicPolynomialCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";

// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useCharacteristicPolynomialCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";

import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const CharacteristicPolynomialCalculator = () => {
  const location = useLocation();
    const url = location.pathname.replace(/^\/+|\/+$/g, "");
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
    tech_matrix22: 2,
    tech_matrix31_1: 32,
    tech_matrix31_2: 52,
    tech_matrix32_1: 72,
    tech_matrix32_2: 92
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateEbitCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useCharacteristicPolynomialCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
        setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_matrix22) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateEbitCalculator({
        tech_matrix22: formData.tech_matrix22,
        tech_matrix31_1: formData.tech_matrix31_1,
        tech_matrix31_2: formData.tech_matrix31_2,
        tech_matrix32_1: formData.tech_matrix32_1,
        tech_matrix32_2: formData.tech_matrix32_2,

      }).unwrap();
      setResult(response?.payload); // Assuming the response has 'lovePercentage'
      toast.success(
       "Successfully Calculated"
      );
    } catch (err) {
      setFormError("Error in calculating.");
      toast.error("Error in calculating.");
    }
  };

  // Handle reset form
  const handleReset = () => {
    setFormData({  

        tech_matrix22: 2,
    tech_matrix31_1: 32,
    tech_matrix31_2: 52,
    tech_matrix32_1: 72,
    tech_matrix32_2: 92

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

            {/* <div class="lg:w-[60%] md:w-[60%] w-full mx-auto ">
                    <div class="grid grid-cols-12 mt-3   gap-2 md:gap-4 lg:gap-4">
                    <p class="col-span-12 text-[16px] "><strong>{lang[1]}:</strong></p>
                    <div class="col-span-4">
                        <input type="number" min="1" max="10" onchange="addFields()" id="columns2" name="matrix22" class="input" value="<?=isset($request->matrix22)?$request->matrix22:'2'}"  required>
                    </div>
                    <p class="col-span-12 text-[16px] "><strong>{lang[2]}</strong></p>
                    <div class="col-span-12">
                        <table class="w-full" id="matrix2">
                            <tr>
                                <td>
                                    <div class="px-1 pt-2">
                                        <input type="number" step="any" name="matrix31_1" class="input" value="<?=isset($request->matrix31_1)?$request->matrix31_1:'3'}"  required>
                                    </div>
                                </td>
                                <td>
                                    <div class="px-1 pt-2">
                                        <input type="number" step="any" name="matrix31_2" class="input"  value="<?=isset($request->matrix31_2)?$request->matrix31_2:'5'}" required>
                                    </div>
                                </td>
                                @for ($j = 3; $j <= $request->matrix22; $j++)
                                    <td>
                                        <div class="px-1 pt-2">
                                            @php $mat = 'matrix31_' . $j; @endphp
                                            <input type="number" step="any" name="{{ 'matrix31_' . $j }}" class="input" value="{{$request->$mat}}"  required>
                                        </div>
                                    </td>
                                @endfor
                            </tr>
                            <tr>
                                <td>
                                    <div class="px-1 pt-2">
                                        <input type="number" step="any" name="matrix32_1" class="input" value="<?=isset($request->matrix32_1)?$request->matrix32_1:'7'}"  required>
                                    </div>
                                </td>
                                <td>
                                    <div class="px-1 pt-2">
                                        <input type="number" step="any" name="matrix32_2" class="input"  value="<?=isset($request->matrix32_2)?$request->matrix32_2:'9'}"  required>
                                    </div>
                                </td>
                                @for ($j = 3; $j <= $request->matrix22; $j++)
                                    <td>
                                        <div class="px-1 pt-2">
                                            @php $mat = 'matrix32_' . $j; @endphp
                                            <input type="number" step="any" name="{{ 'matrix32_' . $j }}" class="input" value="{{$request->$mat}}"  required>
                                        </div>
                                    </td>
                                @endfor
                            </tr>
                            @isset($request->submit)
                                @for ($i = 3; $i <= $request->matrix22; $i++)
                                    <tr>
                                        @for ($j = 1; $j <= $request->matrix22; $j++)
                                            <td>
                                                <div class="px-1 pt-2">
                                                    @php $mat = 'matrix3' . $i . '_' . $j; @endphp
                                                    <input type="number" step="any" name="{{ 'matrix3' . $i . '_' . $j }}" class="input" value="{{$request->$mat}}"  required>
                                                </div>
                                            </td>
                                        @endfor
                                    </tr>
                                @endfor
                            @endisset
                        </table>
                    </div>
                </div>
            </div> */}

           

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

export default CharacteristicPolynomialCalculator;
