import { useState, useContext } from "react";
import { Card } from "./Context";
import { UserContext } from "../App";
import Form from "./Form";
import validate from "./validate";

function LoginForm(props) {
  // Set React state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableLogin, setDisableLogin] = useState(true);

  let username;

  function authenticate(email, password) {
    // Confirm email
    const inputUser = props.users.filter((user) => user.email === email);

    if (inputUser.length > 0) {
      // Email exists
      if (inputUser[0].password === password) {
        // Password exists
        props.setStatus("");
        // Set user's status to logged in
        inputUser[0].loggedIn = true;
        // Show successful login message
        props.setShowForm(inputUser[0]);
        username = inputUser[0].name;
        return true;
      } else {
        // Password does not exist
        props.setStatus("Error: incorrect password.");
        setTimeout(() => props.setStatus(""), 3000);
        return false;
      }
    } else {
      // Email does not exist
      props.setStatus(
        "Error: email does not exist.  Please enter a valid email, or create a new account."
      );
      setTimeout(() => props.setStatus(""), 3000);
      return false;
    }
  }

  function handleLogin() {
    // Validate email and password
    if (!validate(email, props.setStatus, "email")) return;
    if (!validate(password, props.setStatus, "password")) return;

    // Confirm user exists
    if (!authenticate(email, password)) return;

    // Display username
    document.querySelector(".username").innerHTML = username;
  }

  return (
    <>
      <Form
        createAccount={false}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        disable={disableLogin}
        setDisable={setDisableLogin}
        btnName="Login"
        handleClick={handleLogin}
      />
    </>
  );
}

function Login() {
  const { users } = useContext(UserContext);

  // Check for a logged in user
  const loggedInUser = users.filter((user) => user.loggedIn === true);

  // If none, show login form
  const [showForm, setShowForm] = useState(loggedInUser.length > 0);

  const [status, setStatus] = useState("");

  return (
    <Card
      header={showForm ? "Success!" : "Login"}
      body={
        <>
          {showForm ? (
            <div>Welcome back, {loggedInUser[0].name}!</div>
          ) : (
            <LoginForm
              users={users}
              setShowForm={setShowForm}
              setStatus={setStatus}
            />
          )}
        </>
      }
      status={status}
    />
  );
}

export default Login;
