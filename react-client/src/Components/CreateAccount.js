import { useState, useContext } from "react";
import { UserContext } from "../App";
import { Card } from "./Context";
import Form from "./Form";
import validate from "./validate";
import { createUser } from "./authenticate";

function CreateForm(props) {
  const { users, setUsers } = useContext(UserContext);

  // Set React state variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [accountType, setAccountType] = useState("");
  const [disableCreate, setDisableCreate] = useState(true);
  let accountNumber;

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

  function generateAccountNumber() {
    const randomNumber = Math.floor(Math.random() * 10000000000);
    accountNumber = randomNumber;
  }

  function saveAccount() {
    console.log(name, email, password, role, accountType, accountNumber);

    const url = `https://bad-bank-backend-deploy.herokuapp.com/user/create/${name}/${email}/${password}/${role}/${accountType}/${accountNumber}`;
    (async () => {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    })();
  }

  function clearForm() {
    // Reset values back to default
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
    setAccountType("");
    accountNumber = 0;
  }

  function handleCreate() {
    // Validate name, email, password
    if (!validate(name, props.setStatus, "name")) return;
    if (!validate(email, props.setStatus, "email")) return;
    if (!validate(password, props.setStatus, "password")) return;
    if (!validate(role, props.setStatus, "role")) return;
    if (!validate(accountType, props.setStatus, "account type")) return;

    if (!checkLength(password, "password")) return;

    // If validate all fields, create random account number
    generateAccountNumber();

    // If validate all fields, create user
    setUsers([
      ...users,
      {
        name,
        email,
        password,
        role,
        accountType,
        accountNumber,
        balance: 0,
        loggedIn: false,
      },
    ]);

    // If validate all fields, send user account to MongoDB
    saveAccount();

    // If validate all fields, create user in Firebase
    createUser(email, password);

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
        role={role}
        setRole={setRole}
        accountType={accountType}
        setAccountType={setAccountType}
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

// Video additional feature (recommended) - add bank employee and customer roles for different users
// Video additional feature (recommended) - add checking and savings account types
// Video additional feature (recommended) - assign random account numbers to new accounts
