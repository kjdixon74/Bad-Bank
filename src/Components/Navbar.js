import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";

// Style nav bar with Bootstrap
function NavBar() {
  const { users, showUserName } = useContext(UserContext);

  const loggedInUser = users.filter((user) => user.loggedIn === true);
  const bankEmployee = loggedInUser.filter(
    (user) => user.role === "Bank Employee"
  );

  return (
    // Highlight nav bar item when on page with NavLink
    <nav className="navbar navbar-expand-lg">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="navbar-brand nav-link hoverable" to="/">
              Bad Bank
              <span className="hoverable__tooltip">Official home page</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link hoverable" to="/createaccount/">
              Create Account
              <span className="hoverable__tooltip">Official way to join</span>
            </NavLink>
          </li>
          {showUserName ? (
            <li className="nav-item">
              <NavLink className="nav-link hoverable" to="/logout/">
                Logout
                <span className="hoverable__tooltip">
                  Sign out of your account
                </span>
              </NavLink>
            </li>
          ) : (
            <li className="nav-item">
              <NavLink className="nav-link hoverable" to="/login/">
                Login
                <span className="hoverable__tooltip">Access your account</span>
              </NavLink>
            </li>
          )}
          {showUserName && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link hoverable" to="/deposit/">
                  Deposit
                  <span className="hoverable__tooltip">
                    Add money to your account
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link hoverable" to="/withdraw/">
                  Withdraw
                  <span className="hoverable__tooltip">
                    Remove money from your account
                  </span>
                </NavLink>
              </li>
            </>
          )}
          {bankEmployee.length > 0 && (
            <li className="nav-item">
              <NavLink className="nav-link hoverable" to="/alldata/">
                All Data
                <span className="hoverable__tooltip">Track user accounts</span>
              </NavLink>
            </li>
          )}
          {showUserName && (
            <li className="nav-item dropdown">
              <button
                type="button"
                className="nav-link dropdown-toggle username"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {loggedInUser[0].name}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <NavLink className="dropdown-item hoverable" to="/profile/">
                    Profile
                    <span className="hoverable__tooltip">
                      View your account details
                    </span>
                  </NavLink>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

// Use Navbar for video walkthrough: 1) hightlight - add/remove css class (let React update/handle the DOM) -> NavLink, 2) hover - popup vs. tooltip, Bootstrap, Popper, React Bootstrap, React Tooltip -> CSS and tons of styling

// Video refactor - front end modifications - 1) toggle between login and logout 2) add Profile for logged in user to view account details

// Video refactor - authentication - 1) only bank employees are allowed to view All Data 2) only show users' deposit, withdraw, transfer, and profile when logged in

// LEFT OFF HERE - 1) Refactor deposit, withdraw (see context.js)  2) Money transfer between users 3) Transaction component for deposit, withdraw, and transfer? 4) Add OAuth2 authentication
