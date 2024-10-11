import React, { useEffect, useState }  from "react";
import { academicroomColumns } from "../../datatablesource";
import Datatable from "../../components/datatable/Datatable";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./academicparticular.scss";
import {roomInputsAcademic } from "../../formSource";
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



const AcademicParticular = () => {

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
      // console.log("checking alertopen :",alertOpen);
      handleShowAlert("error", "Error Occured:", error)
      // console.log(error);
      // console.log("Ask for clering errors");
      dispatch(clearErrors());
    }
    if (rooms) {
      // console.log("RoomData",rooms)
      setList(rooms.roomData);
      setBuildingData(rooms.buildingData);
      setSummaryObj(rooms.roomTitleCount);
      setOccupancyCountData(rooms.occupancyCount);
    }
  }, [rooms]);


  const handleDelete = async (id,path) => {
    try {
      // console.log("Path:",path);
      let roomdeletelink=`/rooms/${id}/${path}`
      // console.log("Room Delete Link ",roomdeletelink);
      await axios.delete(roomdeletelink);
      setList((prevList) => prevList.filter((item) => item._id !== id));
      handleShowAlert("success", "Done!", "Room Deleted Successfully and Room Record has been removed from occupiers data");
    } catch (err) {
      // console.error("Error deleting data:", err);
      handleShowAlert("error", "Error Occured!", err);
  };
}

  const downloadPDF = () => {

    if(buildingData && list && list.length > 0){
      const pdf = new jsPDF();
      pdf.text(20, 20, `${buildingData.buildingName} Academic Building - Room Data , IIT Jodhpur`, { fontSize: 20, fontStyle: 'bold' });

      // Convert data to a format suitable for autotable
      let count=1;
      
      const tableData = list.map(item => [count++,item.buildingName,item.roomNumber+(item.roomDiv==="-"?" ":item.roomDiv),Math.floor(item.roomNumber / 100) - 1,item.roomTitle ,item.roomDesc,
        item.roomStatus]);
    
      // Add a table with autotable
      pdf.autoTable({
        startY: 30,
        head: [['Id','Academic Building Name', 'Room No.','Floor','Room Title','Classroom Capacity/Description','Occupancy Status']],
        body: tableData,
      });
    
      pdf.save(`${buildingData.buildingName}_academic_building_room_detail.pdf`);
    }
    else{
      handleShowAlert("error", "Error Occured!", "Data not available");
    }
  };


  return (
    <>
    <MetaData title="Academic Building-Rooms"/> 
    <>
    {
      loading ? (<Loader/>):(
    <div className="academic-particular-page">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="datatable-container">
          <div className="heading">
               {buildingData && <h1 className="titleColor">{buildingData.buildingName} Academic Rooms</h1> }   
              {/* {rooms.data && <ExportToCSV data={rooms.data?rooms.data:[]} headers={academicroomColumns(handleDelete)} filename="Hostel_Perticular.csv" />}  */}
              {rooms.roomData && <FileUploadComponent linkData={`/rooms/endpoint/dataexel/${path}`} placingOfData="particular"/>} 
        
          </div>
          <div className="heading">
              <button className="buttonStyle" onClick={()=>{setOpen(true)}}>Add New </button> 
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
            columns={academicroomColumns(handleDelete)}
            rows={list?list:[]}
          />
        </div>
      </div>
    </div>  )}

    {open && (
        <New inputs={roomInputsAcademic} title="Add New Room" link={`/rooms/${path}`}  setOpen={setOpen} buildingData={buildingData}/>
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
    };
export default AcademicParticular;
