import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <span>💧🐕 </span>
      <NavLink
        to="/checkins"
        exact
        style={isActive => ({
          color: isActive ? "#031804" : "#105C13"
        })}
        activeStyle={null}
      > Checkins </NavLink>
      &nbsp;|&nbsp;
      <NavLink
        to="/dogs"
        exact
        style={isActive => ({
          color: isActive ? "#031804" : "#105C13"
        })}
        activeStyle={null}
      > Dog Management </NavLink>
    </div>
  )
}

export default NavBar;
