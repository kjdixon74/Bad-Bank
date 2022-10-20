import { useState, useContext } from "react";
import { Card } from "./Context";
import { UserContext } from "../App";
import Form from "./Form";

function LoginForm(props) {
  // Set React state variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableLogin, setDisableLogin] = useState(true);

  function validate(field, label) {
    // Check if any fields are blank
    if (!field) {
      // No email or password
      props.setStatus("Error: " + label + " is required.");
      setTimeout(() => props.setStatus(""), 3000);
      return false;
    }

    return true;
  }

  function confirmUser(email, password) {
    // Confirm email
    const inputUser = props.users.filter((user) => user.email === email);

    if (inputUser.length > 0) {
      // Email exists
      if (inputUser[0].password === password) {
        // Password exists
        props.setStatus("");
        // Set user's status to logged in
        inputUser[0].loggedIn = true;
        // Set logged in user to current user
        props.setLoggedInUser(inputUser[0]);
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
    // Validate email
    if (!validate(email, "email")) return;

    // Validate password
    if (!validate(password, "password")) return;

    // Confirm user exists
    if (!confirmUser(email, password)) return;
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
  // Is it better to use setUsers?
  const { users } = useContext(UserContext);

  // Check for a logged in user
  const currentUser = users.filter((user) => user.loggedIn === true);
  console.log(currentUser);
  // If so, set user as logged in
  const [loggedInUser, setLoggedInUser] = useState(
    currentUser.length > 0 ? currentUser[0] : ""
  );

  const [status, setStatus] = useState("");

  return (
    <Card
      header={loggedInUser ? "Success!" : "Login"}
      body={
        <>
          {loggedInUser ? (
            <div>Welcome back, {loggedInUser.name}!</div>
          ) : (
            <LoginForm
              users={users}
              setLoggedInUser={setLoggedInUser}
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
