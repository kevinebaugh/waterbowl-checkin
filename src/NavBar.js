import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <NavLink
        to="/checkins"
        exact
        style={isActive => ({
          color: isActive ? "purple" : "pink"
        })}
        activeStyle={null}
      > Checkins </NavLink>
      <NavLink
        to="/dogs"
        exact
        style={null}
        activeStyle={null}
      > Dog Management </NavLink>
    </div>
  )
}

export default NavBar;
