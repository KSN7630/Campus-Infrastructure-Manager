import React, { useEffect, useState } from "react";
import { userlistColumns, userlistRows } from "../../datatablesource";
import Datatable from "../../components/datatable/Datatable";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./userlist.scss";
import axios from "axios";
import MetaData from "../../components/layout/Metadata";

import { getUsers } from "../../actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/layout/loader/Loader";
import { userInputs } from "../../formSource";
import New from "../new/New";
import FileUploadComponent from "../connectFile/connectFile";



const Userlist = () => {

  const [open,setOpen]=useState(false);

  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.users);
  const handleuserlistClick = (username) => {
    console.log(`Clicked on hostel room: ${username}`);
  };
  
  // const [list, setList] = useState([]);

  
  
  // const link=`/users`
  
  // useEffect(() => {
  //   dispatch(getUsers(link));
  // }, [dispatch]);

  // useEffect(() => {
  //   if (users) {
  //     const formattedData = users.map((item) => ({ ...item, id: item._id }));
  //     console.log(formattedData)
  //     setList(formattedData);
  //   }
  // }, [users]);


  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`users/${id}`);
  //     setList((prevList) => prevList.filter((item) => item._id !== id));
  //   } catch (err) {
  //     console.error("Error deleting data:", err);
  //   }
  // };

  return (
    <>
    <MetaData title="UserList"/>
    {loading ? (<Loader/>):(
    <div className="userlist">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="titleText">
          <h1>User List</h1>
          <button onClick={()=>{setOpen(true)}}>Register New User</button>
          <FileUploadComponent linkData="/auth/register" placingOfData="#"/> 
        </div>
  
          {/* <Datatable
          columns={userlistColumns(handleuserlistClick)}
          rows={list}
          handleDelete={handleDelete}
        />  */}
        </div> 
    </div>)}

    {open && (
        <New inputs={userInputs} title="Register New User" link="/auth/register" setOpen={setOpen} Part={"UserPart"}/>
      )}
    </>
  );
};

export default Userlist;
