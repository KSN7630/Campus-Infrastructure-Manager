// Launchpage.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./launchpage.scss";

const Launchpage = () => {
  return (
    <div className="launchpage-container">
      <div className="tilak">
        <div className="logo">
          <Link to="/">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxwWGdrlES5DAScYlgoPvshSD15NeqWbIhK0bq86gozg&s" alt="IIT Jodhpur Logo" />

          </Link>
        </div>
        <div className="menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><a href="https://iitj.ac.in/infra/index.php?id=permanent_campus">Campus</a></li>
            <li><Link to="/login">Login</Link></li>
            <li><a href="https://iitj.ac.in/infra/offices/index.php?id=office_of_infrastructure_engineering">Office of Infrastructure</a></li>
          </ul>
        </div>
      </div>
      <div className="content">
        <div className="background-image">
          <div className="overlay">
            <h1 className="title">Office of Estate</h1>
            <h2 className="subtitle">IIT Jodhpur</h2>
          </div>
        </div>
        <div className="about-section">
          <h2>About InfrastructureManager</h2>
          <p>Discover InfrastructureManager: Optimize your Space</p>
          <p>At InfrastructureManager, we streamline every aspect of institutional infrastructure management. From hostel accommodations to office space allocations, classroom schedules, and amenity provisions, we offer a comprehensive solution tailored to educational institutions.</p>
          <p>Our platform simplifies complex tasks, providing administrators, faculty, and students with a centralized hub for all their needs. With intuitive interfaces and powerful features, we optimize resource utilization, enhance operational efficiency, and elevate the overall experience.</p>
          <p>Driven by innovation and a commitment to excellence, InfrastructureManager redefines infrastructure management standards. Join us in transforming how institutions manage facilities and create environments conducive to growth and success.</p>
        </div>
      </div>
      <div className="footer">
        <div className="footer-content">
          <div className="contact-info">
          <h3 style={{ color: "Yellow" }}>OIE IITJ</h3>
            <p style={{ color: "white" }}>Indian Institute of Technology Jodhpur</p>
            <p style={{ color: "white" }}>NH 62 Nagaur Road, Karwar 342030, Jodhpur District</p>
          </div>
          <div className="quick-links">
            <h3 style={{ color: "Yellow" }}>Quick Links</h3>
            <ul>
              <li><a href="https://iitj.ac.in/infra/offices/index.php?id=office_of_infrastructure_engineering">OIE Website</a></li>
              <li><a href="https://iitj.ac.in/students/index.php?id=facilities">Infrastructural Amenities</a></li>
              <li><a href="http://172.16.100.162/">Photo Gallery</a></li>
            </ul>
          </div>
          <div className="external-links">
            <h3 style={{ color: "Yellow" }}>External Links</h3>
            <ul>
              <li><a href="https://iitj.ac.in/">IIT Jodhpur</a></li>
              <li><a href="https://www.youtube.com/watch?v=5DUzpFXyK8U&ab_channel=IITJodhpur">Glimpse of Campus</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Launchpage;
