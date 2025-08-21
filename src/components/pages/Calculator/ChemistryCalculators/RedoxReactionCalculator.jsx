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
  useRedoxReactionCalculatorMutation,
} from "../../../redux/services/calculator/calculatorApi";


// import {
//   useGetSingleCalculatorDetailsMutation,
// } from "../../../redux/services/calculator/calculatorApi";

// import {
//   useRedoxReactionCalculatorMutation,
// } from "../../../redux/services/datecalculator/dateCalculatorApi";


import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import { getUserCurrency } from "../../../components/Calculator/GetCurrency"; //currency import class
import Button from "../../../components/Calculator/Button";
import ResetButton from "../../../components/Calculator/ResetButton";

const RedoxReactionCalculator = () => {
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
   tech_eq: "Mg + HCl = MgCl2 + H2"
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateActivationCalculator,
    { isLoading: roundToTheNearestLoading, isError, error: calculateLoveError },
  ] = useRedoxReactionCalculatorMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
       setResult(null);
    setFormError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.tech_eq) {
      setFormError("Please fill in input.");
      return;
    }

    setFormError("");
    try {
      const response = await calculateActivationCalculator({
        tech_eq: formData.tech_eq,
      }).unwrap();
      setResult(response?.payload); // Assuming the response'
      toast.success(
       "Successfully Calculated"
      );
    } catch (err) {
   setFormError(err.data.payload.error);
      toast.error(err.data.payload.error);
    }
  };

  // Handle reset form
  const handleReset = () => {
    setFormData({  
   tech_eq: "Mg + HCl = MgCl2 + H2"
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
  {/* <span class="text-blue input_unit">{currency.symbol}</span> */}
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
                  <div class="grid grid-cols-1    gap-4">
                      <div class="space-y-2 relative">
                          <label for="eq" class="font-s-14 text-blue">&nbsp;</label>
                          <button type="button" class="bt_set text-white" id="load_example">{ data?.payload?.tech_lang_keys['2'] }</button>
                      </div>
                      <div class="space-y-2 relative">
                          <label htmlFor="tech_eq" className="label">
                          {data?.payload?.tech_lang_keys["1"]}:
                            </label>
                            <div class=" relative">
                            <input
                              type="text"
                              step="any"
                              name="tech_eq"
                              id="tech_eq"
                              className="input my-2"
                              aria-label="input"
                              placeholder="00"
                              value={formData.tech_eq}
                              onChange={handleChange}
                            />
                            <span class="input_unit">{currency.symbol }</span>
                            </div>
                      </div>
                  </div>
            </div>
            <div class="lg:w-[80%] md:w-[80%] w-full mx-auto ">
                      <div class="w-full overflow-auto px-2">
                          <table class="w-full t_set text-center" cellpadding="7">
                          <tbody>
                              <tr>
                              <td class="check t3">H</td>
                              <td colspan="16"></td>
                              <td class="check t6">He</td>
                              </tr>
                              <tr>
                              <td class="check t4">Li</td>
                              <td class="check t5">Be</td>
                              <td colspan="10"></td>
                              <td class="check t9">B</td>
                              <td class="check t3">C</td>
                              <td class="check t3">N</td>
                              <td class="check t3">O</td>
                              <td class="check t3">F</td>
                              <td class="check t6">Ne</td>
                              </tr>
                              <tr>
                              <td class="check t4">Na</td>
                              <td class="check t5">Mg</td>
                              <td colspan="10"></td>
                              <td class="check t2">Al</td>
                              <td class="check t9">Si</td>
                              <td class="check t3">P</td>
                              <td class="check t3">S</td>
                              <td class="check t3">Cl</td>
                              <td class="check t6">Ar</td>
                              </tr>
                              <tr>
                              <td class="check t4">K</td>
                              <td class="check t5">Ca</td>
                              <td class="check t1">Sc</td>
                              <td class="check t1">Ti</td>
                              <td class="check t1">V</td>
                              <td class="check t1">Cr</td>
                              <td class="check t1">Mn</td>
                              <td class="check t1">Fe</td>
                              <td class="check t1">Co</td>
                              <td class="check t1">Ni</td>
                              <td class="check t1">Cu</td>
                              <td class="check t1">Zn</td>
                              <td class="check t2">Ga</td>
                              <td class="check t9">Ge</td>
                              <td class="check t9">As</td>
                              <td class="check t3">Se</td>
                              <td class="check t3">Br</td>
                              <td class="check t6">Kr</td>
                              </tr>
                              <tr>
                              <td class="check t4">Rb</td>
                              <td class="check t5">Sr</td>
                              <td class="check t1">Y</td>
                              <td class="check t1">Zr</td>
                              <td class="check t1">Nb</td>
                              <td class="check t1">Mo</td>
                              <td class="check t1">Tc</td>
                              <td class="check t1">Ru</td>
                              <td class="check t1">Rh</td>
                              <td class="check t1">Pd</td>
                              <td class="check t1">Ag</td>
                              <td class="check t1">Cd</td>
                              <td class="check t2">In</td>
                              <td class="check t2">Sn</td>
                              <td class="check t9">Sb</td>
                              <td class="check t9">Te</td>
                              <td class="check t3">I</td>
                              <td class="check t6">Xe</td>
                              </tr>
                              <tr>
                              <td class="check t4">Cs</td>
                              <td class="check t5">Ba</td>
                              <td class="check t7">La</td>
                              <td class="check t1">Hf</td>
                              <td class="check t1">Ta</td>
                              <td class="check t1">W</td>
                              <td class="check t1">Re</td>
                              <td class="check t1">Os</td>
                              <td class="check t1">Ir</td>
                              <td class="check t1">Pt</td>
                              <td class="check t1">Au</td>
                              <td class="check t1">Hg</td>
                              <td class="check t2">TI</td>
                              <td class="check t2">Pb</td>
                              <td class="check t2">Bi</td>
                              <td class="check t9">Po</td>
                              <td class="check t9">At</td>
                              <td class="check t6">Rn</td>
                              </tr>
                              <tr>
                              <td class="check t4">Fr</td>
                              <td class="check t5">Ra</td>
                              <td class="check t8">Ac</td>
                              <td class="check t1">Rf</td>
                              <td class="check t1">Db</td>
                              <td class="check t1">Sg</td>
                              <td class="check t1">Bh</td>
                              <td class="check t1">Hs</td>
                              <td class="check t10">Mt</td>
                              <td class="check t10">Ds</td>
                              <td class="check t10">Rg</td>
                              <td class="check t10">Cn</td>
                              <td class="check t10">Nh</td>
                              <td class="check t10">FI</td>
                              <td class="check t10">Mc</td>
                              <td class="check t10">Lv</td>
                              <td class="check t10">Ts</td>
                              <td class="check t10">Og</td>
                              </tr>
                              <tr>
                              <td colspan="18"></td>
                              </tr>
                              <tr>
                              <td colspan="4" class="text-start"><strong>{ data?.payload?.tech_lang_keys['3'] }</strong></td>
                              <td class="check t7">Ce</td>
                              <td class="check t7">Pr</td>
                              <td class="check t7">Nd</td>
                              <td class="check t7">Pm</td>
                              <td class="check t7">Sm</td>
                              <td class="check t7">Eu</td>
                              <td class="check t7">Gd</td>
                              <td class="check t7">Tb</td>
                              <td class="check t7">Dy</td>
                              <td class="check t7">Ho</td>
                              <td class="check t7">Er</td>
                              <td class="check t7">Tm</td>
                              <td class="check t7">Yb</td>
                              <td class="check t7">Lu</td>
                              </tr>
                              <tr>
                              <td colspan="4" class="text-start"><strong>{ data?.payload?.tech_lang_keys['4'] }</strong></td>
                              <td class="check t8">Th</td>
                              <td class="check t8">Pa</td>
                              <td class="check t8">U</td>
                              <td class="check t8">Np</td>
                              <td class="check t8">Pu</td>
                              <td class="check t8">Am</td>
                              <td class="check t8">Cm</td>
                              <td class="check t8">Bk</td>
                              <td class="check t8">Cf</td>
                              <td class="check t8">Es</td>
                              <td class="check t8">Fm</td>
                              <td class="check t8">Md</td>
                              <td class="check t8">No</td>
                              <td class="check t8">Lr</td>
                              </tr>
                          </tbody>
                          </table>
                          <div class="col-10">
                          <table class="w-full mt-3 text-center t_set" cellpadding="7">
                              <tbody>
                              <tr>
                                  <td id="spc" class="text-white radius-20 bt_set">{ data?.payload?.tech_lang_keys['5'] }</td>
                                  <td class="check t6">1</td>
                                  <td class="check t6">2</td>
                                  <td class="check t6">3</td>
                                  <td class="check t6">4</td>
                                  <td class="check t6">5</td>
                                  <td class="check t6">6</td>
                                  <td class="check t6">7</td>
                                  <td class="check t6">8</td>
                                  <td class="check t6">9</td>
                                  <td class="check t6">0</td>
                                  <td class="check t6">+</td>
                                  <td class="check t6">=</td>
                                  <td id="clr" class="text-white radius-20 bt_set mt-3">{ data?.payload?.tech_lang_keys['6'] }</td>
                              </tr>
                              </tbody>
                          </table>
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


                    <div class="rounded-lg  flex items-center justify-center">
                        <div class="w-full mt-3">
                            <div class="w-full text-center">
                                <input type="hidden" id="input_equ" value="{ result?.tech_eq }"/>
                                <p><strong>{ data?.payload?.tech_lang_keys[7] }</strong></p>
                                <p class="md:text-[20px] lg:text-[20px] ">{ result?.tech_eq }</p>
                                <b><span id="message" class="text-red"></span></b>
                                <code id="codevalid"></code>
                                <p class=""><strong>{ data?.payload?.tech_lang_keys[8] }:</strong></p>
                                <div class="md:text-[20px] lg:text-[20px]" id="result"></div>
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

export default RedoxReactionCalculator;
