
import React from 'react';
import "./dashboard.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Widget from "../../components/widgets/Widget"
import MetaData from '../../components/layout/Metadata';
import TransitionAlerts from '../../components/AlertComponent/AlertBox';
import AlertPopup from '../../components/AlertPopup/Alertpopup';
import { getHomeSummary } from '../../actions/summeryAction';
import { clearErrors } from '../../actions/buildingAction';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react'
import Loader from '../../components/layout/loader/Loader';
import Widget2 from '../../components/widget2/widget2';
import FilterRooms from '../../components/filterRoomReport/filterRoomReport';
import UserFilter from '../../components/SearchUserFilter/searchUserFilter';




const Dashboard = () => {


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
  const { loading, error, summaryHome } = useSelector((state) => state.summaryContent);
  
  
  const [list, setList] = useState([]);
  
  
  const link=`/summery/summeryhome`
  useEffect(() => {
    dispatch(getHomeSummary(link));
  }, [dispatch]);
  
  useEffect(() => {
    if(error){
      console.log("checking alertopen :",alertOpen);
      handleShowAlert("error", "Error Occured:", error)
      console.log(error);
      console.log("Ask for clering errors");
      dispatch(clearErrors())
    }
    if (summaryHome) {
      console.log(summaryHome);
      setList(summaryHome);
    }
  }, [summaryHome,error]);
  
  return (
    <>
    <MetaData title="Home"/>
    {
      loading ? (<Loader/>):(   
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar/>
        <TransitionAlerts alert="Welcome to Digital Occupancy Map , IIT Jodhpur,Rajasthan"/>
        <TransitionAlerts alert="Click on Plan Option from Sidebar to access Map"/>
        
        <div className="widgets">
          <Widget type="users" dataCount={summaryHome?.UserCount}/>
          <Widget type="buildings" dataCount={summaryHome?.BuildingCount} />
          <Widget type="rooms" dataCount={summaryHome?.RoomCount} />
        </div>
        <div className="widgets">
          <Widget2 type="hostels" dataCount={summaryHome?.result?.Hostel}/>
          <Widget2 type="departments" dataCount={summaryHome?.result?.Department}/>
          <Widget2 type="academic_buildings"  dataCount={summaryHome?.result?.Academic} />  
        </div>
        <div className="widgets">
          <Widget2 type="berms" dataCount={summaryHome?.result?.Berm} />
          <Widget2 type="admin_block"  dataCount={summaryHome?.result?.Adminblock} />
          <Widget2 type="residential_quarters" dataCount={summaryHome?.result?.Residentialquarter} />
        </div>       
      </div>
    </div>
    )
  }     

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
  )
}

export default Dashboard


