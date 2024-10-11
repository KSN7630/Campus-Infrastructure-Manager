import React, { useEffect, useState } from "react";
import { adminblockcolumns } from "../../datatablesource";
import Datatable from "../../components/datatable/Datatable";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./adminBlock.scss";
import { useLocation } from "react-router-dom";
import axios from "axios";

import MetaData from "../../components/layout/Metadata";

import { getBuilding } from "../../actions/buildingAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/layout/loader/Loader";
import { buildingAdminBlockInputs } from "../../formSource";
import New from "../new/New";

import ExportToCSV from "../../components/dataTocsv/datatocsv";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import FileUploadComponent from "../connectFile/connectFile";
import AlertPopup from '../../components/AlertPopup/Alertpopup';

const AdminBlock = () => {

  const [open,setOpen]=useState(false);


  const dispatch = useDispatch();
  const { loading, error, buildings } = useSelector((state) => state.buildings);

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


  const location = useLocation();

  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);

  const newPath = path.slice(0, -1).charAt(0).toUpperCase() + path.slice(0, -1).slice(1);
  console.log(newPath)
  
  const link=`/building?buildingType=${newPath}`
  console.log(link);
  
  useEffect(() => {
    dispatch(getBuilding(link));
  }, [dispatch]);

  useEffect(() => {
    if (buildings) {
      const formattedData = buildings.map((item) => ({
        ...item,
        id: item._id,
        total: item.buildingRooms.length
      }));
      console.log(formattedData)
      setList(formattedData);
    }
  }, [buildings]);


  const handleDelete = async (id) => {
    try {
      // const p=`building/${id}`;
      // console.log(p)
      await axios.delete(`building/${id}`);
      setList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting data:", err);
    }
  };

  const downloadPDF = () => {

    if(list && list.length > 0){
    const pdf = new jsPDF();
  
    pdf.text(20, 20, 'Admin Block Data - IIT Jodhpur', { fontSize: 20, fontStyle: 'bold' });

    // Convert data to a format suitable for autotable
    let count=1;
    const tableData = list.map(item => [count++,item.buildingName, item.buildingDesc, item.total,item.occupiedRoomsLocked,
      item.vacantRooms]);
  
    // Add a table with autotable
    pdf.autoTable({
      startY: 30,
      head: [['Id','Block Name', 'Description', 'Total Offices','Occupied','Vacant']],
      body: tableData,
    });
  
    pdf.save('admin_block_data.pdf');
  }
  else{
    handleShowAlert("error", "Sorry !", "Data not available");
  }
  };

  return (
    <>
    <MetaData title="Admin Block"/>
    <>
    {
      loading ? (<Loader/>):(
    <div className="adminblock-page">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="datatable-container">
          <div className="heading">
              <h1 className="titleColor">Admin Block</h1>    
              {list && <FileUploadComponent linkData="/building" placingOfData="#"/>}  
              {/* {list && <ExportToCSV data={list?list:[]} headers={adminblockcolumns(handleDelete)} filename="admin_block_data.csv" />}  */}
          </div>
          <div className="heading">
              <button className="buttonStyle" onClick={()=>{setOpen(true)}}>Add New Block</button> 
              <button className="buttonStyle" onClick={() => downloadPDF()}>Download Detail Summary</button> 
          </div>
          <Datatable
            columns={adminblockcolumns(handleDelete)}
            rows={list}
            addNewLink="/adminblocks/new"
          />
        </div>
      </div>
    </div>)}

    {open && (
        <New inputs={buildingAdminBlockInputs} title="Add New Block" link="/building" Part="Adminblock" setOpen={setOpen}/>
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

export default AdminBlock;
