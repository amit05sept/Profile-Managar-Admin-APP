import { NavLink } from "react-router-dom";
import React from "react";

export default function Navbar() {
  return (
    <div className="links">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/profiles">Profiles</NavLink>
      <NavLink to="/addProfile">Add Profile</NavLink>
    </div>
  );
}
