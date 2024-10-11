// import "./navbar.scss";
// import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";

// const Navbar = () => {
//   const { dispatch } = useContext(DarkModeContext);

//   return (
//     <div className="navbar">
//       <div className="wrapper">
//         <div className="search">
//           <p><strong>Digital Occupancy Map</strong></p>
//         </div>
//         <div className="items">
//           <div className="item">
//             <LanguageOutlinedIcon className="icon" />
//             English
//           </div>
//           <div className="item">
//             <DarkModeOutlinedIcon
//               className="icon"
//               onClick={() => dispatch({ type: "TOGGLE" })}
//             />
//           </div>
//           <div className="item">
//             <img
//               src="https://upload.wikimedia.org/wikipedia/en/thumb/8/81/Indian_Institute_of_Technology_Jodhpur_Logo.svg/1200px-Indian_Institute_of_Technology_Jodhpur_Logo.svg.png"
//               alt=""
//               className="avatar"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
// )};

// export default Navbar;



import "./navbar.scss";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import Menu from "@mui/icons-material/Menu"; 
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const Navbar = (onSidebarToggle) => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
        <div className="message">
          <span className="message-text">Digital Occupancy Map</span>
        </div>
        <div className="items">
        <button className="toggle-sidebar" onClick={onSidebarToggle}>
            <Menu className="icon" /> {/* Use Menu icon */}
          </button>
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="/images/IITJLogoBig.jpg"
              alt=""
              className="avatar"
            />
          </div>
        </div>
    </div>
)};

export default Navbar;
