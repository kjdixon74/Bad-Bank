import { useState, useContext } from "react";
import { UserContext, CurrentUserContext, Card } from "./Context";

function Login() {
  const [showForm, setShowForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showError, setShowError] = useState(false);

  const cxt = useContext(UserContext);
  const { setCurrentUser } = useContext(CurrentUserContext);

  function validateEmail(email) {
    console.log(email);
    if (!email) {
      // No email
      console.log("no email");
      setLoginError("Error: email required.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      setLoginError("");
      return false;
    }

    cxt.users.forEach((user) => {
      if (user.email === email) {
        // Email exists
        setLoginError("");
        return true;
      } else {
        // Email does not exist
        setLoginError(
          "Error: user does not exist.  Please enter a valid email, or create a new account."
        );
        setShowError(true);
        setTimeout(() => setShowError(false), 3000);
        return false;
      }
    });
  }

  function validatePassword(password) {
    // No password
    if (!password) {
      setLoginError("Error: password required.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return false;
    }

    // // Check if password matches username
    // cxt.users.forEach((user) => {
    //   // Get right user
    //   if (user.email === email) {
    //     // Right password
    //     if (user.password === password) {
    //       setPasswordError("");
    //       setShowEmail(false);
    //       setShowPassword(false);
    //       setCurrentUser(user.name);
    //     } else {
    //       // Wrong password
    //       setPasswordError(
    //         "Incorrect password. Please enter correct password."
    //       );
    //     }
    //   }
    // });

    setLoginError("");
    return true;
  }

  function handleLogin(email, password) {
    console.log(email, password);
    // Validate email
    if (!validateEmail(email)) {
      console.log(validateEmail(email));
      return;
    }
    console.log("email validated");
    // Validate password
    if (!validatePassword(password)) {
      return;
    }

    // Show success message
    setShowForm(false);
  }

  return (
    <Card
      bgcolor="light"
      txtcolor="black"
      header={showForm ? "Login" : "Success!"}
      body={
        <>
          {showForm ? (
            <>
              <div>
                Email
                <input
                  type="email"
                  placeholder="Enter email here"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
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
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  className="form-control"
                  id="loginPassword"
                />
                {showError && <div>{loginError}</div>}
                <br />
                <button
                  type="submit"
                  onClick={() => handleLogin(email, password)}
                  id="loginPasswordBtn"
                >
                  Login
                </button>
              </div>
            </>
          ) : (
            <div id="loginSuccess">Welcome back, Username!</div>
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

// Don't forget to say welcome back to the user's name
