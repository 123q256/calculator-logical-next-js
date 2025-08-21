import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
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
//   useTodaysdateCalculationMutation,
// } from "../../../redux/services/calculator/calculatorApi";

import {
  useGetSingleCalculatorDetailsMutation,
} from "../../../redux/services/calculator/calculatorApi";

import {
  useTodaysdateCalculationMutation,
} from "../../../redux/services/datecalculator/dateCalculatorApi";



import { toast } from "react-toastify";
import ResultActions from "../../../components/Calculator/ResultActions";
import CalculatorFeedback from "../../../components/Calculator/CalculatorFeedback";
import Calculator from "../Calculator";
import ResetButton from "../../../components/Calculator/ResetButton";
import Button from "../../../components/Calculator/Button";

const WhatIsTodaysDate = () => {
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

  // 

  const [formData, setFormData] = useState({
  });

  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  // RTK mutation hook
  const [
    calculateLovePercentage,
    { isLoading: calculateWhattodayLoading, isError, error: calculateLoveError },
  ] = useTodaysdateCalculationMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!formData.tech_start_date || !formData.tech_end_date || !formData.tech_period || !formData.tech_include_end_date) {
    //   setFormError("Please fill in fields.");
    //   return;
    // }
    setFormError("");
    try {
      const response = await calculateLovePercentage({
      
      }).unwrap();
      setResult(response); // Assuming the response has 'lovePercentage'
       toast.success("Calculate Successfully");
    } catch (err) {
      setFormError("Error calculating");
      toast.error("Error calculating");
    }
  };

  // Handle reset form
  const handleReset = () => {
    setFormData({
     
    });
    setResult(null);
    setFormError(null);
  };

    // Set current date on mount
    // useEffect(() => {
    //   const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    //   setFormData((prev) => ({ ...prev, tech_start_date: today }));
    //   setFormData((prev) => ({ ...prev, tech_end_date: today }));

      
    // }, []);
        


      const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isLeapYear = now.isLeapYear?.() || ((now.year() % 4 === 0 && now.year() % 100 !== 0) || now.year() % 400 === 0);




  const [currentDate, setCurrentDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');

  const startDay = startOfMonth.day(); // Day index (0-6) of 1st of month
  const daysInMonth = currentDate.daysInMonth();

  const prevMonthDays = startOfMonth.subtract(1, 'month').daysInMonth();

  const prevMonthStart = prevMonthDays - startDay + 1;

  const daysArray = [];

  // Fill in previous month days
  for (let i = prevMonthStart; i <= prevMonthDays; i++) {
    daysArray.push({ day: i, currentMonth: false });
  }

  // Fill in current month days
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push({ day: i, currentMonth: true });
  }

  // Fill in next month days to complete full weeks
  const totalCells = Math.ceil(daysArray.length / 7) * 7;
  const nextMonthDays = totalCells - daysArray.length;

  for (let i = 1; i <= nextMonthDays; i++) {
    daysArray.push({ day: i, currentMonth: false });
  }

  const weeks = [];
  for (let i = 0; i < daysArray.length; i += 7) {
    weeks.push(daysArray.slice(i, i + 7));
  }

  const goToPrevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const goToNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));


  // id
  function getRemainingDaysInYear(date) {
  const endOfYear = new Date(date.getFullYear(), 11, 31);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.ceil((endOfYear - date) / oneDay);
}

function getWeekNumber(date) {
  const firstJan = new Date(date.getFullYear(), 0, 1);
  const pastDays = (date - firstJan) / (1000 * 60 * 60 * 24);
  return Math.ceil((pastDays + firstJan.getDay() + 1) / 7);
}

function getWeekStartEnd(date) {
  const day = date.getDay(); // 0 = Sunday
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - day);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return { startOfWeek, endOfWeek };
}

function getMonthNumber(date) {
  return date.getMonth() + 1; // January = 1
}

function formatDateString(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

  const [info, setInfo] = useState({});

  useEffect(() => {
    const today = new Date();
    const remainingDays = getRemainingDaysInYear(today);
    const weekNumber = getWeekNumber(today);
    const { startOfWeek, endOfWeek } = getWeekStartEnd(today);
    const monthNumber = getMonthNumber(today);

    setInfo({
      today,
      remainingDays,
      weekNumber,
      startOfWeek,
      endOfWeek,
      monthNumber,
    });
  }, []);
  
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
        {/* <form className="row" onSubmit={handleSubmit}> */}
          <div className="w-full mx-auto p-4 lg:p-8 md:p-8 input_form rounded-lg  space-y-6 mb-3">
            {formError && (
              <p className="text-red-500 text-lg font-semibold w-full">
                {formError}
              </p>
            )}
            
         <div className="lg:w-[80%] md:w-[80%] w-full mx-auto text-center">

            <div className="w-full flex justify-center">
              <div className="w-20">
                <div className="article-thumbnail article-thumbnail-spaceless">
                  <img
                    src="/images/r_days.png"
                    alt="icon for a calendar with one day highlighted red"
                    width="80"
                    height="auto"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
            <h2 className="mt-3 text-sm date_today">{data?.payload?.tech_lang_keys['1']}</h2>
            <p className="text-xl mt-2 mb-1 mt-[20px]">
              <span className="text-sm my-5 date_today1">{now.format('dddd, MMMM D, YYYY')}</span>
            </p>
            <h2 id="time" className="text-lg font-medium text-blue-600">{now.format('HH:mm:ss')}</h2>
            <div id="gmt" className="mt-2 text-sm text-gray-500">GMT {now.format('Z')}</div>
            <div className="w-full mt-3">
              <div className="lg:w-[80%] md:w-[80%] w-full mx-auto">
                <div className="calendar bg-[#ffffff] rounded-lg overflow-hidden">
                
                  <div className="grid grid-cols-7 text-center font-medium text-sm bg-gray-200">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                      <div key={day} className="py-2">{day}</div>
                    ))}
                  </div>
                  <div className="days p-2 text-sm">
                    <div className="w-full max-w-md mx-auto">
                      {/* Header */}
                      <div className="flex justify-between items-center mb-3">
                        <button onClick={goToPrevMonth} className="text-xl px-2">◀</button>
                        <h2 className="text-lg font-semibold text-blue-600">
                          {currentDate.format('MMMM YYYY')}
                        </h2>
                        <button onClick={goToNextMonth} className="text-xl px-2">▶</button>
                      </div>
                      {/* Weekdays */}
                      <div className="grid grid-cols-7 text-center font-semibold text-gray-600">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                          <div key={day} className="py-1">{day}</div>
                        ))}
                      </div>
                      {/* Dates */}
                      <div className="grid grid-cols-7 text-center mt-1">
                        {weeks.map((week, wIdx) => (
                          <React.Fragment key={wIdx}>
                            {week.map((dayObj, dIdx) => (
                              <div
                                key={dIdx}
                                className={`py-2 border border-gray-100 ${
                                  dayObj.currentMonth ? 'text-black' : 'text-gray-400'
                                }`}
                              >
                                {dayObj.day}
                              </div>
                            ))}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="display-selected mt-3 text-blue-600 font-medium">
                  <p className="selected">{now.format('dddd, MMMM D')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-[80%] md:w-[80%] w-full mx-auto mt-5">
            <p className="text-base mt-3 text-left">
              {data?.payload?.tech_lang_keys['2']}, {now.format('MMMM Do')}, {data?.payload?.tech_lang_keys['3']}{' '}
              <strong className="text-blue-500">{now.dayOfYear?.() || now.diff(dayjs(now.format('YYYY-01-01')), 'day') + 1}</strong>{' '}
              {data?.payload?.tech_lang_keys['4']} {isLeapYear ? '366 is a leap year' : '365 is not a leap year'}{' '}
              {data?.payload?.tech_lang_keys['5']} {now.year()}.
            </p>
          <div id="date-info" className="text-base elementrySteps mt-4 text-left">
            <p className="mt-1">
              There are <strong className="text-blue">{info.remainingDays}</strong> days remaining in this year{' '}
              <strong className="text-blue">{info.today?.getFullYear()}</strong>.
            </p>
            <p className="mt-1">
              The current week number: {info.weekNumber} (of 52)
            </p>
            <p className="mt-1">
              The current week:{' '}
              <strong className="text-blue">
                {info.startOfWeek && formatDateString(info.startOfWeek)} –{' '}
                {info.endOfWeek && formatDateString(info.endOfWeek)}
              </strong>
            </p>
            <p className="mt-1">
              The year <strong className="text-blue">{info.today?.getFullYear()}</strong> has 52 weeks.
            </p>
            <p className="mt-1">
              Today's month number is:
              <strong className="text-blue"> {info.monthNumber} </strong>
            </p>
          </div>
          </div>



          </div>
          {calculateWhattodayLoading ? (
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
                <div className="w-full mx-auto p-4 lg:p-8 md:p-8 result_calculator rounded-lg space-y-6 result">
                  <div>
                    <ResultActions lang={data?.payload?.tech_lang_keys} />
                    
                    
                  </div>
                </div>
              </>
            )
          )}
        {/* </form> */}
        {result && (
          <CalculatorFeedback calName={data?.payload?.tech_calculator_title} />
        )}
    </Calculator>
  );
};

export default WhatIsTodaysDate;
