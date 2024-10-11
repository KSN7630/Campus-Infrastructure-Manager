import React, { useEffect, useState } from "react";
import { hostelColumns } from "../../datatablesource";
import Datatable from "../../components/datatable/Datatable";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./hostel.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";

import MetaData from "../../components/layout/Metadata";

import { clearErrors, getBuilding } from "../../actions/buildingAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/layout/loader/Loader";
import AlertPopup from '../../components/AlertPopup/Alertpopup';

import ExportToCSV from "../../components/dataTocsv/datatocsv";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import New from "../new/New";
import { buildingHostelInputs } from "../../formSource";
import FileUploadComponent from "../connectFile/connectFile";




const Hostel = () => {
  
  const [open,setOpen]=useState(false);
 


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




  const dispatch = useDispatch();
  const { loading, error, buildings } = useSelector((state) => state.buildings);

  
  const location = useLocation();

  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);

  const newPath = path.slice(0, -1).charAt(0).toUpperCase() + path.slice(0, -1).slice(1);
  
  const link=`/building?buildingType=${newPath}`

  useEffect(() => {
    dispatch(getBuilding(link));
  }, [dispatch]);

  useEffect(() => {
    if(error){
      console.log("checking alertopen :",alertOpen);
      handleShowAlert("error", "Error Occured:", error)
      console.log(error);
      console.log("Ask for clering errors");
      dispatch(clearErrors())
    }
    if (buildings) {
      const formattedData = buildings.map((item) => ({
        ...item,
        id: item._id,
        total: item.buildingRooms.length
      }));
      console.log(formattedData);
      setList(formattedData);
    }
  }, [buildings,error]);

  


  const handleDelete = async (id) => {
    try {
      await axios.delete(`building/${id}`);
      setList((prevList) => prevList.filter((item) => item._id !== id));
      handleShowAlert("success", "Done!", "Hostel Deleted Successfully");
    } catch (err) {
      console.error("Error deleting data:", err);
      handleShowAlert("error", "Error Occurred !",
      "Error Occured while deleting Hostel.This may be due to unexpected changes in database.Please refresh page to see changes");
    }
  };


  const downloadPDF = () => {

    if(list && list.length > 0){
    const pdf = new jsPDF();
  
    pdf.text(20, 20, 'Hostel Data - BuildingWise IIT Jodhpur', { fontSize: 20, fontStyle: 'bold' });

    // Convert data to a format suitable for autotable
    let count=1;
    const tableData = list.map(item => [count++,item.buildingName, item.buildingDesc, item.total,item.occupiedRoomsLocked,
      item.occupiedRoomsOpen,item.vacantRooms]);
  
    // Add a table with autotable
    pdf.autoTable({
      startY: 30,
      head: [['Id','Building Name', 'Description', 'Total Rooms','Occupied and Locked','Occupied and Open','Vacant']],
      body: tableData,
    });
  
    pdf.save('hostel_data.pdf');

  }
  else{
    handleShowAlert("error", "Sorry !", "Data not available");
  }
  };
  return (
    <>
    <MetaData title="Hostels"/>
    <>
    {
      loading ? (<Loader/>):(
      <div className="hostel-page">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="datatable-container">
          <div className="heading">
              <h1 className="titleColor">Hostels</h1>
              {/* {list && <ExportToCSV data={list?list:[]} headers={hostelColumns(handleDelete)} filename="Hostel_Perticular.csv" />} */}
              {list && <FileUploadComponent linkData="/building" placingOfData="#"/>}  
          </div>
          <div className="heading">
              <button className="buttonStyle" onClick={()=>{setOpen(true)}}>Add New Room</button> 
              <button className="buttonStyle" onClick={() => downloadPDF()}>Download Detail Summary</button> 
          </div>
          <Datatable
            columns={hostelColumns(handleDelete)}
            rows={list}
          />
        </div>
      </div>
   </div>
    )
    } 
      
      {open && (
        <New inputs={buildingHostelInputs} title="Add New Hostel" Part="Hostel" link="/building" setOpen={setOpen}/>
      )}

      {/* Conditionally render the AlertPopup component */}
      {alertOpen && (
        <AlertPopup
          open={alertOpen}
          onClose={handleCloseAlert}
          severity={alertSeverity}
          title={alertTitle}
          message={alertMessage}
        />
      )}
    </>
    </>
  );
};

export default Hostel;
