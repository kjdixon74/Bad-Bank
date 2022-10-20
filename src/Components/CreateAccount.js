import { useState, useContext } from "react";
import { UserContext } from "../App";
import { Card } from "./Context";

function CreateForm(props) {
  const { users, setUsers } = useContext(UserContext);

  // Set React state variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableCreate, setDisableCreate] = useState(true);

  function handleChange(inputValue) {
    // Disable create account button if all fields are blank
    inputValue ? setDisableCreate(false) : setDisableCreate(true);
  }

  function validate(field, label) {
    // Check if any fields are blank
    if (!field) {
      props.setStatus("Error: " + label + " is required.");
      setTimeout(() => props.setStatus(""), 3000);
      return false;
    }

    return true;
  }

  function checkLength(field, label) {
    // Check if password is less than 8 characters
    if (field.length < 8) {
      props.setStatus(
        "Error: " + label + " needs to be at least 8 characters."
      );
      setTimeout(() => props.setStatus(""), 3000);
      return false;
    }

    return true;
  }

  function clearForm() {
    // Reset values back to default
    setName("");
    setEmail("");
    setPassword("");
  }

  function handleCreate() {
    // Validate name, email, password
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    if (!checkLength(password, "password")) return;

    // If validate all fields, create user
    setUsers([
      ...users,
      { name, email, password, balance: 0, loggedIn: false },
    ]);

    // If validate all fields, clear form
    clearForm();

    // If validate all fields, show success message and ability to add another user
    props.setShowForm(false);
  }

  return (
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
      />
      <br />
      <button type="submit" onClick={handleCreate} disabled={disableCreate}>
        Create Account
      </button>
      <br />
    </>
  );
}

function SuccessfulCreation(props) {
  function handleNew() {
    props.setShowForm(true);
  }

  return (
    <>
      <h5>You have successfully created your account.</h5>
      <button type="submit" onClick={handleNew}>
        Add another user
      </button>
    </>
  );
}

function CreateAccount() {
  // Set React state variables
  const [showForm, setShowForm] = useState(true);
  const [status, setStatus] = useState("");

  return (
    <Card
      header={
        showForm
          ? "Please fill out the fields below to create an account."
          : "Congratulations!"
      }
      body={
        showForm ? (
          <CreateForm setShowForm={setShowForm} setStatus={setStatus} />
        ) : (
          <SuccessfulCreation setShowForm={setShowForm} />
        )
      }
      status={status}
    />
  );
}

export default CreateAccount;
