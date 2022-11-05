import { useState, useContext } from "react";
import { Card } from "./Context";
import { UserContext } from "../App";
import { Balance, Transaction, Success } from "./Transaction";

function Deposit() {
  const [deposit, setDeposit] = useState("");
  const [disableDeposit, setDisableDeposit] = useState(true);
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(true);

  const { users } = useContext(UserContext);

  // Check for a logged in user
  const loggedInUser = users.filter((user) => user.loggedIn === true);

  // If so, show user's account balance
  const [balance, setBalance] = useState(loggedInUser[0].balance);

  function validate(input) {
    // Check if user's input is NaN
    if (isNaN(input)) {
      setStatus("Error: deposit amount is not a number.");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }

    // Check if user's input is a negative number
    if (Number(input) < 0) {
      setStatus("Error: cannot deposit a negative amount.");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }

    // Check if user's input is zero
    if (Number(input) === 0) {
      setStatus("Error: cannot deposit $0.");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }

    setStatus("");
    return true;
  }

  function handleDeposit() {
    // Validate deposit
    if (!validate(deposit)) {
      return;
    }

    // Convert deposit to a number, add to account balance, and update account balance
    setBalance(Number(deposit) + balance);

    // Update account balance for logged in user
    loggedInUser[0].balance = Number(deposit) + balance;

    // Show success message
    setShowForm(false);
  }

  return (
    <Card
      header={showForm ? "How much would you like to deposit?" : "Success!"}
      title={<Balance balance={balance} />}
      body={
        <>
          <br />
          {showForm ? (
            <Transaction
              amount={deposit}
              setAmount={setDeposit}
              setDisable={setDisableDeposit}
              handleClick={handleDeposit}
              disable={disableDeposit}
              type="Deposit"
            />
          ) : (
            <Success
              type="deposit"
              message="received"
              setType={setDeposit}
              setDisable={setDisableDeposit}
              setShowForm={setShowForm}
            />
          )}
        </>
      }
      status={status}
    />
  );
}

export default Deposit;
