import React, { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

const InstructorChart = ({ courses }) => {
  const [currChart, setCurrChart] = useState("Students");

  // function to generate random color
  const getRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  // create data for displayinh students info chart
  const studentsChartData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  // create data for displayinh income info chart
  const incomeChartData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  // create options
  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-col justify-center gap-4 bg-richblack-800 rounded-lg p-6">
      <div className=" text-richblack-5 font-bold text-xl">Visualize</div>
      <div className="flex items-center gap-9">
        <button
          className={` py-1 px-3 rounded-sm
            ${
              currChart === "Students"
                ? "bg-richblack-600 transition-all duration-300 bg-opacity-50 text-yellow-50 font-bold"
                : "font-bold text-yellow-400"
            }
        `}
          onClick={() => setCurrChart("Students")}
        >
          Students
        </button>
        <button
          className={`py-1 px-3 rounded-sm
            ${
              currChart === "Income"
                ? "bg-richblack-600 transition-all duration-300 bg-opacity-50 text-yellow-50 font-bold"
                : "font-bold text-yellow-400"
            }
        `}
          onClick={() => setCurrChart("Income")}
        >
          Income
        </button>
      </div>
      <div className="w-full flex justify-center">
        <Pie
          data={currChart === "Students" ? studentsChartData : incomeChartData}
          style={{ width: "100%" }}
          options={options}
        />
      </div>
    </div>
  );
};

export default InstructorChart;
