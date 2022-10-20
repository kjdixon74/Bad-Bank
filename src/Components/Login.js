import { useState, useContext } from "react";
import { Card } from "./Context";
import { UserContext } from "../App";

function Form(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableLogin, setDisableLogin] = useState(true);

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
      props.setLoginError(`Error: ${label} required.`);
      props.setShowError(true);
      setTimeout(() => props.setShowError(false), 3000);
      return false;
    }

    props.setLoginError("");
    return true;
  }

  function confirmUser(email, password) {
    // Confirm email
    const inputUser = props.users.filter((user) => user.email === email);

    if (inputUser.length > 0) {
      // Email exists
      if (inputUser[0].password === password) {
        // Password exists
        props.setLoginError("");
        // Set user's status to logged in
        inputUser[0].loggedIn = true;
        // Set logged in user to current user
        props.setLoggedInUser(inputUser[0]);
        return true;
      } else {
        // Password does not exist
        props.setLoginError("Error: incorrect password.");
        props.setShowError(true);
        setTimeout(() => props.setShowError(false), 3000);
        return false;
      }
    } else {
      // Email does not exist
      props.setLoginError(
        "Error: email does not exist.  Please enter a valid email, or create a new account."
      );
      props.setShowError(true);
      setTimeout(() => props.setShowError(false), 3000);
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
    <>
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
      />
      <br />
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
      />
      <br />
      <button type="submit" onClick={handleLogin} disabled={disableLogin}>
        Login
      </button>
    </>
  );
}

function Login() {
  // Is it better to use setUsers?
  const { users } = useContext(UserContext);

  // Check for a logged in user
  const currentUser = users.filter((user) => user.loggedIn === true);
  // If so, set user as logged in
  const [loggedInUser, setLoggedInUser] = useState(
    currentUser.length > 0 ? currentUser[0] : ""
  );

  const [loginError, setLoginError] = useState("");
  const [showError, setShowError] = useState(false);

  return (
    <Card
      header={loggedInUser ? "Success!" : "Login"}
      body={
        <>
          {loggedInUser ? (
            <div>Welcome back, {loggedInUser.name}!</div>
          ) : (
            <Form
              users={users}
              setLoggedInUser={setLoggedInUser}
              setloginError={setLoginError}
              setShowError={setShowError}
            />
          )}
        </>
      }
      status={showError && <div>{loginError}</div>}
    />
  );
}

export default Login;
