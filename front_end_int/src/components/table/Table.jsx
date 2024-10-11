import React from "react";
import "./table.scss"; // Import your custom styles
import { PieChart } from "react-minimal-pie-chart";
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
const TableBox = ({ title, dataObj ,count}) => {
  const datapiechart = Object.entries(dataObj).map(([label, value], index) => ({
    title: label,
    value: value,
    color: getRandomColor(),
  }));

  return (
    <div className="data-box">
      <div className="title">{title}</div>
      <div className="down">
        
        <div className="left">
          <div className="count">{`Total : ${count}`}</div>   
          {Object.entries(dataObj).map(([label, value], index) => (
            <div key={index} className="count">{`${label}: ${value}`}</div>
          ))}
        </div>
        <div className="right">
          <div className="chartDiv">
            <PieChart
              data={datapiechart}
              startAngle={0}
              number
              animate={true}
              animationDuration={500}
              animationEasing={"ease-in"}
              reveal={905}
              radius={50}
              // viewBoxSize={[300, 300]}
              // label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
              label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}%`}
              labelStyle={{
                fontSize: '9px', // Adjust the fontSize as needed
                fill: '#ffff'
              }}
              
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableBox;
