import { useContext, useState } from "react";
import { LoggedInUserContext, Card } from "./Context";

function Logout() {
  const loggedInUser = useContext(LoggedInUserContext);
  const [loggedIn, setLoggedIn] = useState(true);

  function handleLogout() {
    // Confirm user wants to logout
    if (window.confirm("Are you sure you want to logout?")) {
      // Reset user back to default, which will hide Logout in nav bar
      loggedInUser.pop();
      // Hide Logout page
      setLoggedIn(false);
    }
  }

  return loggedIn ? (
    <Card
      bgcolor="light"
      txtcolor="black"
      header={
        loggedInUser.length > 0 && `See you next time, ${loggedInUser[0].name}!`
      }
      body={
        <button type="submit" onClick={handleLogout} id="logoutBtn">
          Logout
        </button>
      }
    />
  ) : (
    <div></div>
  );
}

export default Logout;
