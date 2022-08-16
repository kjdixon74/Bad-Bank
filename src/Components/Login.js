import { useState, useContext } from "react";
import { UserContext, CurrentUserContext, Card } from "./Context";

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showEmail, setShowEmail] = useState(true);
  const [showEmailBtn, setShowEmailBtn] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [showError, setShowError] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const cxt = useContext(UserContext);
  const { setCurrentUser } = useContext(CurrentUserContext);

  function validateEmail() {
    if (!userEmail) {
      // No email
      setShowEmailBtn(true);
      setEmailError("Please enter email.");
      setShowError(true);
      setShowPassword(false);
      return;
    }

    cxt.users.forEach((user) => {
      if (user.email === userEmail) {
        // Email exists
        setShowEmailBtn(false);
        setEmailError("");
        setShowError(false);
        setShowPassword(true);
      } else {
        // Email does not exist
        setShowEmailBtn(true);
        setEmailError(
          "User does not exist.  Please enter a valid email, or create a new account."
        );
        setShowError(true);
        setShowPassword(false);
      }
    });
  }

  function validatePassword() {
    // No password
    if (!userPassword) {
      setPasswordError("Please enter password.");
      return;
    }

    // Check if password matches username
    cxt.users.forEach((user) => {
      // Get right user
      if (user.email === userEmail) {
        // Right password
        if (user.password === userPassword) {
          setPasswordError("");
          setShowEmail(false);
          setShowPassword(false);
          setCurrentUser(user.name);
        } else {
          // Wrong password
          setPasswordError(
            "Incorrect password. Please enter correct password."
          );
        }
      }
    });
  }

  return (
    <Card
      bgcolor="primary"
      txtcolor="white"
      header="Login"
      body={
        <>
          {showEmail ? (
            <div>
              Email
              <input
                type="email"
                placeholder="Enter email here"
                value={userEmail}
                onChange={(e) => setUserEmail(e.currentTarget.value)}
                className="form-control"
                id="loginEmail"
              />
            </div>
          ) : (
            <div id="loginSuccess" style={{ color: "yellow" }}>
              Success!
            </div>
          )}
          {showEmailBtn && (
            <button type="submit" onClick={validateEmail} id="loginEmailBtn">
              Submit
            </button>
          )}
          {showError && (
            <div id="loginEmailError" style={{ color: "red" }}>
              {emailError}
            </div>
          )}
          {showPassword && (
            <div>
              Password
              <input
                type="password"
                placeholder="Enter password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.currentTarget.value)}
                className="form-control"
                id="loginPassword"
              />
              <div id="loginPasswordError" style={{ color: "red" }}>
                {passwordError}
              </div>
              <button
                type="submit"
                onClick={validatePassword}
                id="loginPasswordBtn"
              >
                Login
              </button>
            </div>
          )}
        </>
      }
    />
  );
}

// Future improvements
// Figure out why page is reloading at beginning and fix
// Do I have to reset login values back to default once successfully logged in? UI is reset when I click a new tab and React state variables appear to reset.
// Don't allow user to log back in unless logged out
// Add ability to log out
// When log out, will need to clear current user context

export default Login;
