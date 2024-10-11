// import React from "react";

// const Map = () => {
//   return (
//     <a href="https://shift.org.in/project/iit-jodhpur/5.jpg" className="image-link">
//       <img src="https://shift.org.in/project/iit-jodhpur/5.jpg" alt="Image" />
//     </a>
//   );
// };

// export default Map;



import React from "react";
import "./map.css"
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Map = () => {
  return (
    <Link to="https://shift.org.in/project/iit-jodhpur/5.jpg" className="image-link">
      <img src="https://shift.org.in/project/iit-jodhpur/5.jpg" alt="Image" />
    </Link>
  );
};

export default Map;

