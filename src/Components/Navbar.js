import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    // Style nav bar with Bootstrap
    // Highlight nav bar item when on page with NavLink
    <nav className="navbar navbar-expand-lg">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link hoverable" to="/">
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
          <li className="nav-item">
            <NavLink className="nav-link hoverable" to="/login/">
              Login
              <span className="hoverable__tooltip">Access your account</span>
            </NavLink>
          </li>
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
          <li className="nav-item">
            <NavLink className="nav-link hoverable" to="/logout/">
              Logout
              <span className="hoverable__tooltip">
                Sign out of your account
              </span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link hoverable" to="/alldata/">
              All Data
              <span className="hoverable__tooltip">Track user submissions</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

// Use Navbar for video walkthrough: 1) hightlight - add/remove css class (let React update/handle the DOM) -> NavLink, 2) hover - popup vs. tooltip, Bootstrap, Popper, React Bootstrap, React Tooltip -> CSS and tons of styling
