import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import styled from "styled-components";
import { useSelector } from "react-redux";
const Chart = () => {
  const usersPerMonth = useSelector((state) => state.usersPerMonth);


  const perShapeGradient = {
    x1: 0,
    y1: 1,
    x2: 0,
    y2: 0,
  };
  const options = {
    chart: {
      backgroundColor: "rgba(245, 246, 247, 1)",
      type: "column",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      crosshair: true,
    },
    yAxis: {
      //   min: 0,
      title: {
        text: "",
      },
    },
    series: [
      {
        name: "Signin",
        data: usersPerMonth,
      },
    ],
    colors: [
      {
        linearGradient: perShapeGradient,
        stops: [
          [0, "rgba(57, 181, 74, 1)"],
          [1, "rgba(191, 215, 50, 1)"],
        ],
      },
    ],
    legend: {
      enabled: false,
    },
  };

  return (
    <>
      <ChartContainer>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </ChartContainer>
    </>
  );
};

const ChartContainer = styled.div`
  height: 320px;
  width: 1000px;

  @media only screen and (max-width: 1400px) {
    width: 750px !important;
    height: 300px !important;
  }

  @media only screen and (max-width: 1080px) {
    width: 520px !important;
    height: 300px !important;
  }

  @media only screen and (max-width: 700px) {
    width: 300px !important;
  }
`;

export default Chart;
