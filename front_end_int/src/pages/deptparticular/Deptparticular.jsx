import React, { useEffect, useState } from "react";
import { departmentroomColumns } from "../../datatablesource";
import Datatable from "../../components/datatable/Datatable";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./deptparticular.scss";
import {roomInputsDepartment } from "../../formSource";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MetaData from "../../components/layout/Metadata";
import { getRoom ,clearErrors} from "../../actions/buildingAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/layout/loader/Loader";

import ExportToCSV from "../../components/dataTocsv/datatocsv";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import New from "../new/New";
import TableBox from "../../components/table/Table";
import AlertPopup from '../../components/AlertPopup/Alertpopup';
import FileUploadComponent from "../connectFile/connectFile";

const DepartmentParticular = () => {
  
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


  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const link=`/building/${path}/roomInfo`

  const [list, setList] = useState([]);
  const [buildingData,setBuildingData]=useState([]);
  const [summaryObj,setSummaryObj]=useState({});
  const [occupancyCountData,setOccupancyCountData]=useState({});
  
  const dispatch = useDispatch();
  const { loading, error, rooms } = useSelector((state) => state.rooms);
  useEffect(() => {
    dispatch(getRoom(link));
  }, [dispatch]);

  useEffect(() => {
    if(error){
      handleShowAlert("error", "Error Occured:", error)
      dispatch(clearErrors());
    }
    if (rooms) {
      setList(rooms.roomData);
      setBuildingData(rooms.buildingData);
      setSummaryObj(rooms.roomTitleCount);
      setOccupancyCountData(rooms.occupancyCount);
    }
  }, [rooms]);



  const handleDelete = async (id,path) => {
    try {
      let roomdeletelink=`/rooms/${id}/${path}`
      await axios.delete(roomdeletelink);
      setList((prevList) => prevList.filter((item) => item._id !== id));
      handleShowAlert("success", "Done!", "Room Deleted Successfully and Room Record has been removed from occupiers data");
    } catch (err) {
      handleShowAlert("error", "Error Occured!", err);
    }
  };

  const downloadPDF = () => {
    
    if(buildingData && list && list.length > 0){
      const pdf = new jsPDF();
      pdf.text(20, 20, `${buildingData.buildingName} Department - Classroom/Office/Lab Data , IIT Jodhpur`, { fontSize: 20, fontStyle: 'bold' });

      // Convert data to a format suitable for autotable
      let count=1;
      
      const tableData = list.map(item => [count++,item.buildingName,  item.roomNumber+(item.roomDiv==="-"?" ":item.roomDiv), Math.floor(item.roomNumber / 100) - 1,
        item.roomTitle,
        item.roomDesc,item.roomStatus]);
    
      // Add a table with autotable
      pdf.autoTable({
        startY: 30,
        head: [['Id','Department Name', 'Office/Classroom/Lab No.', 'Floor','Office/Lab/Classroom Title','Office/Lab/Classroom Description','Occupancy Status']],
        body: tableData,
      });
    
      pdf.save(`${buildingData.buildingName}_department_room_detail.pdf`);
    } 
    else{
      handleShowAlert("error", "Error Occured!", "Data not available");
    } 
  };

  return (
    <>
    <MetaData title="Departmental Buildings-Rooms"/>
    <>
    {
      loading ? (<Loader/>):(
    <div className="dept-particular-page">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="datatable-container">
          <div className="heading">
              {buildingData && <h1 className="titleColor">{buildingData.buildingName} Department </h1> }    
              {/* {rooms.data && <ExportToCSV data={rooms.data?rooms.data:[]} headers={departmentroomColumns(handleDelete)} filename="department_Perticular.csv" />}  */}
              {rooms.roomData && <FileUploadComponent linkData={`/rooms/endpoint/dataexel/${path}`} placingOfData="particular"/>} 
          </div>

          <div className="heading">
              <button className="buttonStyle" onClick={()=>{setOpen(true)}}>Add New Room</button> 
              <button className="buttonStyle" onClick={() => downloadPDF()}>Download Detail Summary</button> 
          </div>

          {rooms.roomTitleCount && rooms.occupancyCount && (
            <div className="table-box-container">
              <TableBox title="Room Type Summary" dataObj={rooms.roomTitleCount} count={rooms.roomData.length} />
              <TableBox title="Occupancy Summary" dataObj={rooms.occupancyCount} count={rooms.roomData.length} />
              {/* <TableBox title="Quantity Summary" dataObj={occupancyCountData} count={list.length} /> */}
            </div>
          )}
          <Datatable
            columns={departmentroomColumns(handleDelete)}
            rows={list?list:[]}
          />
        </div>
      </div>
    </div>)}
    {open && (
        <New inputs={roomInputsDepartment} title="Add New Room" link={`/rooms/${path}`} setOpen={setOpen}  buildingData={buildingData}/>
        )}

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
}
export default DepartmentParticular;
