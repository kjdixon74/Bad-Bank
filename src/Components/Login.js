import { useState, useContext } from "react";
import { UserContext, Card } from "./Context";

function Login() {
  const [disableLogin, setDisableLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showError, setShowError] = useState(false);

  const cxt = useContext(UserContext);
  const users = cxt.users;
  // Check for a logged in user
  const currentUser = users.filter((user) => user.loggedIn === true);
  // If so, set user as logged in
  const [loggedInUser, setLoggedInUser] = useState(
    currentUser.length > 0 ? currentUser[0] : ""
  );

  function handleChange(value) {
    // Disable login button if email and password fields are blank
    if (value) {
      setDisableLogin(false);
    } else {
      setDisableLogin(true);
    }
  }

  function validate(field, label) {
    if (!field) {
      // No email or password
      setLoginError(`Error: ${label} required.`);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return false;
    }

    setLoginError("");
    return true;
  }

  function confirmUser(email, password) {
    // Confirm email
    const inputUser = users.filter((user) => user.email === email);

    if (inputUser.length > 0) {
      // Email exists
      if (inputUser[0].password === password) {
        // Password exists
        setLoginError("");
        // Set user's status to logged in
        inputUser[0].loggedIn = true;
        // Set logged in user to current user
        setLoggedInUser(inputUser[0]);
        return true;
      } else {
        // Password does not exist
        setLoginError("Error: incorrect password.");
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        return false;
      }
    } else {
      // Email does not exist
      setLoginError(
        "Error: email does not exist.  Please enter a valid email, or create a new account."
      );
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return false;
    }
  }

  function handleLogin() {
    // Validate email
    if (!validate(email, "email")) return;

    // Validate password
    if (!validate(password, "password")) return;

    // Confirm user exists
    if (!confirmUser(email, password)) return;
  }

  return (
    <Card
      bgcolor="light"
      txtcolor="black"
      header={loggedInUser ? "Success!" : "Login"}
      body={
        <>
          {loggedInUser ? (
            <div id="loginSuccess">Welcome back, {loggedInUser.name}!</div>
          ) : (
            <>
              <div>
                Email
                <input
                  type="email"
                  placeholder="Enter email here"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.currentTarget.value);
                    handleChange(e.currentTarget.value);
                  }}
                  className="form-control"
                  id="loginEmail"
                />
              </div>
              <div>
                Password
                <input
                  type="password"
                  placeholder="Enter password here"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                    handleChange(e.currentTarget.value);
                  }}
                  className="form-control"
                  id="loginPassword"
                />
                {showError && <div>{loginError}</div>}
                <br />
                <button
                  type="submit"
                  onClick={handleLogin}
                  id="loginBtn"
                  disabled={disableLogin}
                >
                  Login
                </button>
              </div>
            </>
          )}
        </>
      }
    />
  );
}

export default Login;
