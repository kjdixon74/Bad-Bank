import { useState, useContext } from "react";
import { UserContext, Card } from "./Context";

function CreateAccount() {
  // Set React state variables
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableCreate, setDisableCreate] = useState(true);

  const cxt = useContext(UserContext);

  function handleChange(value) {
    // Disable create account button if all fields are blank
    if (value) {
      setDisableCreate(false);
    } else {
      setDisableCreate(true);
    }
  }

  function validate(field, label) {
    // Check if any fields are blank
    if (!field) {
      setStatus("Error: " + label + " is required.");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }

    return true;
  }

  function checkPasswordLength(field, label) {
    // Check is password is less than 8 characters
    if (field.length < 8) {
      setStatus("Error: " + label + " needs to be at least 8 characters.");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }

    return true;
  }

  function handleCreate() {
    // console.log(name, email, password);

    // Validate name, email, password
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    if (!checkPasswordLength(password, "password")) return;

    // If validate all fields, create user
    cxt.users.push({ name, email, password, balance: 0, loggedIn: false });

    // If validate all fields, show success message and ability to add another user
    setShow(false);
  }

  function clearForm() {
    // Reset values back to default
    setShow(true);
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <Card
      bgcolor="light"
      txtcolor="black"
      header={
        show
          ? "Please fill out the fields below to create an account."
          : "Congratulations!"
      }
      body={
        show ? (
          <>
            Name
            <input
              type="text"
              placeholder="Enter name here"
              value={name}
              onChange={(e) => {
                setName(e.currentTarget.value);
                handleChange(e.currentTarget.value);
              }}
              className="form-control"
              id="createName"
            />
            <br />
            Email
            <input
              type="email"
              placeholder="Enter email address here"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
                handleChange(e.currentTarget.value);
              }}
              className="form-control"
              id="createEmail"
            />
            <br />
            Password (8 character minimum)
            <input
              type="password"
              placeholder="Enter password here"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
                handleChange(e.currentTarget.value);
              }}
              className="form-control"
              id="createPassword"
            />
            <br />
            <button
              type="submit"
              onClick={handleCreate}
              id="createBtn"
              disabled={disableCreate}
            >
              Create Account
            </button>
            <br />
          </>
        ) : (
          <>
            <h5>You have successfully created your account.</h5>
            <button type="submit" onClick={clearForm} id="clearBtn">
              Add another user
            </button>
          </>
        )
      }
      status={status}
    />
  );
}

export default CreateAccount;
