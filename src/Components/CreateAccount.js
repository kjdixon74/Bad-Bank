import { useState, useContext } from "react";
import { UserContext } from "../App";
import { Card } from "./Context";
import Form from "./Form";

function CreateForm(props) {
  const { users, setUsers } = useContext(UserContext);

  // Set React state variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disableCreate, setDisableCreate] = useState(true);

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
      <Form
        createAccount={true}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        disable={disableCreate}
        setDisable={setDisableCreate}
        btnName="Create Account"
        handleClick={handleCreate}
      />
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
