import React, { useEffect, useState } from "react";
import "./new.scss";
import { useLocation, useParams } from "react-router-dom";
import AlertPopup from '../../components/AlertPopup/Alertpopup';
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/layout/loader/Loader";
import { clearErrors, submitForm } from "../../actions/formAction";




const New = ({ inputs, title ,link ,buildingData,setOpen, Part}) => {

  const dispatch = useDispatch();
  const { loading, error, form } = useSelector((state) => state.formsubmit);

  useEffect(() => {
    if(error){
      console.log("checking alertopen :",alertOpen);
      handleShowAlert("error", "Error Occured:", error)
      console.log(error);
      console.log("Ask for clering errors");
      dispatch(clearErrors())
    }
  }, [error]);
  
  
  
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


  // const [file, setFile] = useState("");
  const { userId } = useParams(); // Get the userId from the route params
  // const location = useLocation(); // Get the current location
  
  const [formValues, setFormValues] = useState({
    isAdmin: false,
    personType: "",
    userName: "",
    fullName: "",
    email: "",
    personDesc: "",
    joiningDate: "",
    leavingDate:"",
    allotedRooms:[],
    prevAllotedRooms:[],
    activityList:[],

    buildingType:Part?Part:buildingData.buildingType,
    buildingDesc:"",
    buildingName:Part?"":buildingData.buildingName,
    buildingRooms:[],

    roomNumber:"",
    roomStatus:"Vacant",
    roomTitle:"",
    roomDesc:"",
    roomCurrOccu:[],
    personOnLeave:[],
    roomPrevOccu:[],
    roomDiv:"-"


  });
  const [showPassword, setShowPassword] = useState(false);

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  //   console.log(e.target.files[0])
  // };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
  
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      ...formValues,
    };
  
    try {
      console.log(link);
      console.log(userId);
      // const updatedLink = link.replace(":id", userId);
      // console.log("updated link", updatedLink);
      console.log("New data ", newData);

      dispatch(submitForm(link, newData));
  
      // If the dispatch is successful, show success alert and close the form
      handleShowAlert("success", "Done!", "Form has been submitted");
      // setOpen(false);
    } catch (err) {
      // If there's an error, show error alert
      handleShowAlert("error", "Error Occurred! ", err);
    }
  };


  return (
    <>
    {
      loading ? (<Loader/>):(
    <div className="new">
        <div className="modal">
          <span className="close" onClick={()=>{setOpen(false)}}>X</span>
          <h1>{title}</h1>
            <form onSubmit={handleSubmit}>
              {inputs.map((input) => (
                <div className="item" key={input.id}>
                  <label className="labelText">{input.label}</label>
                  {input.type === "dropdown" ? (
                    <select
                      id={input.id}
                      value={formValues[input.id]}
                      onChange={handleInputChange}
                    >
                      <option value="">{input.placeholder}</option>
                      {input.options.map((option) => (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : input.type === "textarea" ? (
                    <textarea
                      id={input.id}
                      rows={4}
                      value={formValues[input.id]}
                      onChange={handleInputChange}
                      placeholder={input.placeholder}
                    />
                  ) : input.type === "date" ? (
                    <input
                      type="date"
                      id={input.id}
                      value={formValues[input.id]}
                      onChange={handleInputChange}
                      placeholder={input.placeholder}
                    />
                  ) : input.type === "password" ? (
                    <div className="passwordInput">
                      <input
                        type={showPassword ? "text" : "password"}
                        id={input.id}
                        value={formValues[input.id]}
                        onChange={handleInputChange}
                        placeholder={input.placeholder}
                      />
                      <button
                        type="button"
                        className="passwordToggle"
                        onClick={handleTogglePassword}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  ) : (
                    <input
                      type={input.type}
                      id={input.id}
                      value={formValues[input.id]}
                      onChange={handleInputChange}
                      placeholder={input.placeholder}
                      required={input.required}
                    />
                  )}
                </div>
              ))}
              <button type="submit" onClick={handleSubmit}>Send</button>
            </form>
        </div>
    </div>
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
  );
};

export default New;
