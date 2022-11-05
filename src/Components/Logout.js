import { useContext, useState } from "react";
import { Card } from "./Context";
import { UserContext } from "../App";

function Logout() {
  const { users, setShowUserName } = useContext(UserContext);

  // Check for a logged in user
  const loggedInUser = users.filter((user) => user.loggedIn === true);

  // If so, show logout button
  const [showButton, setShowButton] = useState(loggedInUser.length > 0);

  const [userName, setUserName] = useState("");
  // const [logoutMessage, setLogoutMessage] = useState("Please log in.");

  function handleLogout() {
    // Confirm user wants to logout
    if (window.confirm("Are you sure you want to log out?")) {
      // Customize goodbye message
      setUserName(loggedInUser[0].name);

      // Set user's status to logged out
      loggedInUser[0].loggedIn = false;

      // Show logout message
      setShowButton("");

      // Toggle back to Login on navbar
      setShowUserName(false);
    }
  }

  return (
    <Card
      header={
        showButton ? "Click below when you are ready to log out." : "Success!"
      }
      body={
        showButton ? (
          <button type="submit" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          `See you next time, ${userName}!`
        )
      }
    />
  );
}

export default Logout;
