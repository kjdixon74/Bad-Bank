import { useContext, useState } from "react";
import { UserContext, Card } from "./Context";

function Logout() {
  const cxt = useContext(UserContext);
  const users = cxt.users;
  // Check for a logged in user
  const currentUser = users.filter((user) => user.loggedIn === true);
  // If so, set user as logged in
  const [loggedInUser, setLoggedInUser] = useState(
    currentUser.length > 0 ? currentUser[0] : ""
  );
  const [logoutMessage, setLogoutMessage] = useState("Please log in.");

  function handleLogout() {
    // Confirm user wants to logout
    if (window.confirm("Are you sure you want to log out?")) {
      if (currentUser.length > 0) {
        // Set user's status to logged out
        currentUser[0].loggedIn = false;
      }

      // Goodbye message
      setLogoutMessage(`See you next time, ${currentUser[0].name}!`);

      // Hide logout page
      setLoggedInUser("");
    }
  }

  return loggedInUser ? (
    <Card
      bgcolor="light"
      txtcolor="black"
      header="Click below when you are ready to log out."
      body={
        <button type="submit" onClick={handleLogout} id="logoutBtn">
          Logout
        </button>
      }
    />
  ) : (
    <h4>{logoutMessage}</h4>
  );
}

export default Logout;
