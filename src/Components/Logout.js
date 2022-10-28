import { useContext, useState } from "react";
import { Card } from "./Context";
import { UserContext } from "../App";

function Logout() {
  const { users, setShowUserName } = useContext(UserContext);

  // Check for a logged in user
  const loggedInUser = users.filter((user) => user.loggedIn === true);
  // If so, set user as logged in LEFT OFF HERE!
  const [showButton, setLoggedInUser] = useState(
    loggedInUser.length > 0 ? loggedInUser[0] : ""
  );
  const [logoutMessage, setLogoutMessage] = useState("Please log in.");

  function handleLogout() {
    // Confirm user wants to logout
    if (window.confirm("Are you sure you want to log out?")) {
      if (loggedInUser.length > 0) {
        // Set user's status to logged out
        loggedInUser[0].loggedIn = false;
      }

      // Goodbye message
      setLogoutMessage(`See you next time, ${loggedInUser[0].name}!`);

      // Hide logout page
      setLoggedInUser("");

      // COME BACK TO!
      setShowUserName(false);
    }
  }

  return showButton ? (
    <Card
      header="Click below when you are ready to log out."
      body={
        <button type="submit" onClick={handleLogout}>
          Logout
        </button>
      }
    />
  ) : (
    <h4>{logoutMessage}</h4>
  );
}

export default Logout;
