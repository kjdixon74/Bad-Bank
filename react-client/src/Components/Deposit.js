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
  const [balance, setBalance] = useState(Number(loggedInUser[0].balance));

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

  function depositDatabase(balance) {
    const email = loggedInUser[0].email;
    console.log(email, balance);

    const url = `/user/balance/${email}/${balance}`;
    (async () => {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    })();
  }

  function handleDeposit() {
    // Validate deposit
    if (!validate(deposit)) {
      return;
    }

    // Convert deposit to a number, add to account balance, and update account balance
    const updatedAmount = Number(deposit) + balance;
    setBalance(updatedAmount);

    // Update balance in MongoDB
    depositDatabase(updatedAmount);

    // Update account balance for logged in user
    loggedInUser[0].balance = updatedAmount;

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
