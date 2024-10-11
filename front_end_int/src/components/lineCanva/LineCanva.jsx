import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { CanvasJS, CanvasJSChart } from 'canvasjs-react-charts';
import "./LineCanva.css"
const LineChart = () => {
  const [data, setData] = useState([]);
  const [selectedRange, setSelectedRange] = useState('7');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/statistics/getTestOccupancyData?startDate=${getStartDate(selectedRange).toISOString()}&endDate=${new Date().toISOString()}`);
        const occupancyData = response.data;

        if (Array.isArray(occupancyData) && occupancyData.length > 0) {
          setData(occupancyData);
        } else {
          console.error('Invalid occupancy data format:', occupancyData);
          setData([]);
        }
      } catch (error) {
        console.error('Error fetching occupancy data:', error);
        // Handle error as needed (e.g., show an error message to the user)
        setData([]);
      }
    };

    fetchData();
  }, [selectedRange]);

  const getStartDate = (range) => {
    const currentDate = new Date();
    switch (range) {
      case '7':
        return new Date(currentDate.setDate(currentDate.getDate() - 7));
      case '14':
        return new Date(currentDate.setDate(currentDate.getDate() - 14));
      case '28':
        return new Date(currentDate.setDate(currentDate.getDate() - 28));
      case '90':
        return new Date(currentDate.setMonth(currentDate.getMonth() - 3));
      case '180':
        return new Date(currentDate.setMonth(currentDate.getMonth() - 6));
      case '365':
        return new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));
      default:
        return new Date(currentDate.setDate(currentDate.getDate() - 7)); // Default to last 7 days
    }
  };

  const options = {
    animationEnabled: true,
    title: {
      text: 'Occupancy Data Chart',
    },
    axisX: {
      valueFormatString: 'DD/MM',
    },
    axisY: {
      title: 'Occupied Rooms',
    },
    data: [
      {
        type: 'line',
        xValueFormatString: 'DD/MM/YYYY',
        yValueFormatString: '#,##0',
        toolTipContent: 'Date: {x}<br>Occupancy: {y}', // Customize tooltip content
        dataPoints: data.map((d) => ({
          x: new Date(d.date),
          y: d.occupiedAndOpenRooms,
        })),
      },
    ],
  };

  return (
    <div>
      <h2>Occupancy Data Chart</h2>
      <div>
        <label>Select Time Range:</label>
        <select value={selectedRange} onChange={(e) => setSelectedRange(e.target.value)}>
          <option value="7">Last 7 days</option>
          <option value="14">Last 14 days</option>
          <option value="28">Last 28 days</option>
          <option value="90">Last 3 months</option>
          <option value="180">Last 6 months</option>
          <option value="365">Last 1 year</option>
        </select>
      </div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default LineChart;


