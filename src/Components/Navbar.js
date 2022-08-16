import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext, CurrentUserContext } from "./Context";

function NavBar() {
  const ctx = useContext(UserContext);
  const { currentUser } = useContext(CurrentUserContext);

  return (
    // Style nav bar with Bootstrap
    // Highlight nav bar item when on page with NavLink
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link hoverable" to="/">
              Bad Bank
              <span className="hoverable__tooltip">Official Home Page</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link hoverable" to="/createaccount/">
              Create Account
              <span className="hoverable__tooltip">Official Way to Join</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link hoverable" to="/login/">
              Login<span className="hoverable__tooltip">Old User</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link hoverable" to="/deposit/">
              Deposit<span className="hoverable__tooltip">Add money</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link hoverable" to="/withdraw/">
              Withdraw
              <span className="hoverable__tooltip">Remove money </span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link hoverable" to="/alldata/">
              All Data<span className="hoverable__tooltip">Hover text</span>
            </NavLink>
          </li>
          {currentUser && (
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/logout/">
                    Logout
                  </NavLink>
                </li>
              </ul>
              Welcome, {""}
              {currentUser.charAt(0).toUpperCase() + currentUser.slice(1)}! {""}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

// Come back to login and logout!
// Come back to Context.js and App.js for routing and cleanup

// Use for videos: hightlight - add/remove css class (let React update/handle the DOM) -> NavLink,
// hover - popup vs. tooltip, Bootstrap, Popper, React Bootstrap, React Tooltip -> CSS and tons of styling
