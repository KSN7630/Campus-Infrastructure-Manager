
import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import './statsComponent.css'; // You can create a separate CSS file for styling
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS for styling
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select'; // Import Select component
import MenuItem from '@mui/material/MenuItem'; // Import MenuItem component

import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getStatData } from '../../actions/statAction';
import Loader from '../layout/loader/Loader';
import AlertPopup from '../AlertPopup/Alertpopup';

const OccupancyChart = ({ className }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedRange, setSelectedRange] = useState('7'); // Default range

  const [err, setErr] = useState(null);
  const [dateRangeMethod, setDateRangeMethod] = useState('lastXDays'); // 'lastXDays' or 'customDates'
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 7); // Default start date is 7 days ago

  const chartRef = useRef();

  const dispatch = useDispatch();
  const { loading, error, statdata } = useSelector((state) => state.statContent);

 //Alert Notification usestate and function starts
 const [alertOpen, setAlertOpen] = useState(false);
 const [alertSeverity, setAlertSeverity] = useState("error"); // Default severity
 const [alertTitle, setAlertTitle] = useState("Error Occurred");
 const [alertMessage, setAlertMessage] = useState("");

 const handleShowAlert = (severity, title, message) => {
   setAlertSeverity(severity);
   setAlertTitle(title);
   setAlertMessage(message);
   setAlertOpen(true);
 };
 const handleCloseAlert = () => {
   setAlertOpen(false);
 };
 //Alert Notification usestate and functions ends
 useEffect(() => {
  if(error){
    console.log("checking alertopen :",alertOpen);
    handleShowAlert("error", "Error Occured:", error)
    console.log(error);
    console.log("Ask for clering errors");
    dispatch(clearErrors())
  }
}, [error]); 
 
  const updateDateRange = () => {
    if (dateRangeMethod === 'lastXDays') {
      // Update start and end dates based on selected range
      const currentDate = new Date();
      const newStartDate = new Date(currentDate);
      newStartDate.setDate(currentDate.getDate() - parseInt(selectedRange));
      setStartDate(newStartDate);
      setEndDate(currentDate);
    }

    // Fetch data based on selected date range (startDate and endDate)
    fetchData();
  };

  const fetchData = async () => {
    if (startDate && endDate) {
      let link = `/statistics/getTestOccupancyData?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
      dispatch(getStatData(link));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (startDate && endDate) {
        let link = `/statistics/getTestOccupancyData?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
        dispatch(getStatData(link));
      }
    };
    fetchData();
  }, [dispatch, startDate, endDate]);

  useEffect(() => {
    d3.select(chartRef.current).selectAll('*').remove();

    if (statdata && statdata.length > 0) {
      const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const svg = d3.select(chartRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const xScale = d3.scaleTime()
        .domain([d3.min(statdata, d => new Date(d.date)), d3.max(statdata, d => new Date(d.date))])
        .range([0, width]);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(statdata, d => d.occupiedAndOpenRooms)])
        .range([height, 0]);

      const line = d3.line()
        .x(d => xScale(new Date(d.date)))
        .y(d => yScale(d.occupiedAndOpenRooms));

      svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b %d')));

      svg.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(yScale));

      svg.append('path')
        .datum(statdata)
        .attr('fill', 'none')
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .transition()
        .duration(1000)
        .attr('d', line);

        svg.selectAll('.dot')
        .data(statdata)
        .enter().append('circle')
        .attr('class', 'dot')
        .attr('cx', d => xScale(new Date(d.date)))
        .attr('cy', d => yScale(d.occupiedAndOpenRooms))
        .attr('r', 2.5)


        .on('mouseover', (event, d) => {
          const tooltip = d3.select('.tooltip'); // Select the tooltip element
    
          tooltip.transition()
            .duration(200)
            .style('opacity', 0.9);
          tooltip.html(`<strong>Date:</strong> ${d.date}<br/><strong>Occupied Rooms:</strong> ${d.occupiedAndOpenRooms}`)
            .style('left', (xScale(new Date(d.date)) + margin.left) + 'px') // Adjust left position based on xScale and margin
            .style('top', (yScale(d.occupiedAndOpenRooms) + margin.top) + 'px'); // Adjust top position based on yScale and margin
        })
        .on('mouseout', () => {
          const tooltip = d3.select('.tooltip'); // Select the tooltip element
    
          tooltip.transition()
            .duration(500)
            .style('opacity', 0);
        });}
  }, [statdata]);

  useEffect(() => {
    // Handle the selected range change and set the start and end dates accordingly
    const currentDate = new Date();
    switch (selectedRange) {
      case '7':
        setEndDate(currentDate);
        setStartDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000)); // Last 7 days
        break;
      case '15':
        setEndDate(currentDate);
        setStartDate(new Date(currentDate.getTime() - 15 * 24 * 60 * 60 * 1000)); // Last 15 days
        break;
      case '28':
        setEndDate(currentDate);
        setStartDate(new Date(currentDate.getTime() - 28 * 24 * 60 * 60 * 1000)); // Last 28 days
        break;
      case '3':
        setEndDate(currentDate);
        setStartDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate())); // Last 3 months
        break;
      case '6':
        setEndDate(currentDate);
        setStartDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate())); // Last 6 months
        break;
      case '12':
        setEndDate(currentDate);
        setStartDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 12, currentDate.getDate())); // Last 12 months
        break;
      default:
        break;
    }
  }, [selectedRange]);

  // Set the initial date range to the last 7 days
  useEffect(() => {
    setSelectedRange('7');
    const currentDate = new Date();
    setEndDate(currentDate);
    setStartDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000)); // Last 7 days
  }, []);
  // Initialize default date range on component mount
  useEffect(() => {
    setSelectedRange('7');
    const currentDate = new Date();
    setEndDate(currentDate);
    setStartDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
  }, []);

  // JSX for rendering
  return (
    <>
    {loading ? <Loader/>:
    <div className={`occupancy-chart-container ${className}`}>
    <h2>Occupancy Data Chart</h2>
    <div className="radio-container">
      <div className="radio-group">
        <RadioGroup
          aria-label="date-range-method"
          name="date-range-method"
          value={dateRangeMethod}
          onChange={(e) => setDateRangeMethod(e.target.value)}
        >
          <FormControlLabel
            value="lastXDays"
            control={<Radio />}
            label="Last X Days"
          />
          <FormControlLabel
            value="customDates"
            control={<Radio />}
            label="Custom Dates"
          />
        </RadioGroup>
      </div>
      <div className="select-container">
        {dateRangeMethod === 'lastXDays' && (
          <div className="select-dropdown">
            <Select
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
            >
              <MenuItem value="7">7 days</MenuItem>
              <MenuItem value="15">15 days</MenuItem>
              <MenuItem value="28">28 days</MenuItem>
              <MenuItem value="3">3 months</MenuItem>
              <MenuItem value="6">6 months</MenuItem>
              <MenuItem value="12">12 months</MenuItem>
            </Select>
          </div>
        )}
        {dateRangeMethod === 'customDates' && (
          <div className="date-picker">
            <div className="date-row">
              <div className="date-field">
                <label>Select Start Date:</label>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
              </div>
              <div className="date-field">
                <label>Select End Date:</label>
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
              </div>
            </div>
            <Button variant="outlined" onClick={() => updateDateRange()}>
              Apply
            </Button>
          </div>
        )}
      </div>
    </div>

    {loading ? (
      <Loader />
    ) : error ? (
      <div className="err-message">{error}</div>
    ) : (
      <div>
        <svg ref={chartRef}></svg>
      </div>
    )}
    {/* Tooltip Element */}
    <div className="tooltip"></div>
    {alertOpen && (
      <AlertPopup
        open={alertOpen}
        onClose={handleCloseAlert}
        severity={alertSeverity}
        title={alertTitle}
        message={alertMessage}
      />
    )}
  </div>}
    
    </>
  );
};

export default OccupancyChart
