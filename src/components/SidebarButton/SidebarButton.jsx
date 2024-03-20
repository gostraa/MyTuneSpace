import React from "react";
import "./sidebarButton.css";
import { Link, useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
export default function SidebarButton({ title, to, icon }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to}>
      <div className={isActive ? "btn-body active" : "btn-body"}>
        <IconContext.Provider value={{ size: "24px", className: "btn-icon" }}>
          {icon}
          <p className="btn-title">{title}</p>
        </IconContext.Provider>
      </div>
    </Link>
  );
}
