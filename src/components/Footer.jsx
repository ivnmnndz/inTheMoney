import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

//variables outside component as to not create new vars on rerender
const content = {
  Sitemap: ["Profile", "Trending", "Features"],
  Learn: ["FAQ", "News", "Help"],
};
const contentSections = Object.entries(content);

const Footer = () => {
  return (
    <div className="footer">
      {contentSections.map(([key, value], index) => (
        <div key={index} className="footer-content">
          <h3>{key}</h3>
          {value.map((link, i) => (
            <Link key={i} to={`${link.toLowerCase()}`}>{link}</Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Footer;
