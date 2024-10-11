import React, { useEffect, useState } from "react";
import { departmentColumns } from "../../datatablesource";
import Datatable from "../../components/datatable/Datatable";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./department.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MetaData from "../../components/layout/Metadata";
import { clearErrors, getBuilding } from "../../actions/buildingAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/layout/loader/Loader";
import AlertPopup from '../../components/AlertPopup/Alertpopup';
import { buildingDepartmentInputs } from "../../formSource";
import New from "../new/New";

import ExportToCSV from "../../components/dataTocsv/datatocsv";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import FileUploadComponent from "../connectFile/connectFile";

const Department = () => {

  const downloadPDF = () => {
    if(list && list.length > 0){
    const pdf = new jsPDF();
  
    pdf.text(20, 20, 'Departmentwise Data-IIT Jodhpur', { fontSize: 20, fontStyle: 'bold' });

    // Convert data to a format suitable for autotable
    let count=1;
    const tableData = list.map(item => [count++,item.buildingName, item.buildingDesc, item.total,item.occupiedRoomsLocked,
      item.occupiedRoomsOpen,item.vacantRooms]);
  
    // Add a table with autotable
    pdf.autoTable({
      startY: 30,
      head: [['Id','Department Name', 'Description', 'Total Rooms','Occupied and Locked','Occupied and Open','Vacant']],
      body: tableData,
    });
  
    pdf.save('department_data.pdf');
  }
  else{
    handleShowAlert("error", "Sorry !", "Data not available");
  }
  };

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
      handleShowAlert("success", "Done!", "Department Deleted Successfully");
    } catch (err) {
      console.error("Error deleting data:", err);
    }
  };


  return (
    <>
    <MetaData title="Departmental Buildings"/>
    <>
    {
      loading ? (<Loader/>):(
    <div className="department-page">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="datatable-container">
        <div className="heading">
              <h1 className="titleColor">Departments</h1>  
              {list && <FileUploadComponent linkData="/building" placingOfData="#"/>} 
              {/* {list && <ExportToCSV data={list?list:[]} headers={departmentColumns(handleDelete)} filename="Hostel_Perticular.csv" />}  */}
          </div>
          <div className="heading">  
              <button className="buttonStyle" onClick={()=>{setOpen(true)}}>Add New Department</button> 
              <button className="buttonStyle" onClick={() => downloadPDF()}>Download Detail Summary</button> 
          </div>  
          <Datatable
            columns={departmentColumns(handleDelete)}
            rows={list}
          />
        </div>
      </div>
    </div>)}

    {open && (
        <New inputs={buildingDepartmentInputs} title="Add New Department" link="/building" Part="Department" setOpen={setOpen}/>
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

export default Department;
