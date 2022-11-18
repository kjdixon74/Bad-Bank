import { useState, useContext } from "react";
import { Card } from "./Context";
import { UserContext } from "../App";
import { Balance, Transaction, Success } from "./Transaction";

function Withdraw() {
  const [withdraw, setWithdraw] = useState("");
  const [disableWithdraw, setDisableWithdraw] = useState(true);
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
      setStatus("Error: withdraw amount is not a number.");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }

    // Check if user's input exceeds account balance
    if (Number(input) > balance) {
      setStatus("Error: cannot withdraw more than account balance.");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }

    // Check if user's input is a negative number
    if (Number(input) < 0) {
      setStatus("Error: cannot withdraw a negative amount.");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }

    // Check if user's input is zero
    if (Number(input) === 0) {
      setStatus("Error: cannot withdraw $0.");
      setTimeout(() => setStatus(""), 3000);
      return false;
    }

    setStatus("");
    return true;
  }

  function withdrawDatabase(balance) {
    const email = loggedInUser[0].email;
    console.log(email, balance);

    const url = `/user/balance/${email}/${balance}`;
    (async () => {
      const response = await fetch(url);
      const data = await response.json();
    })();
  }

  function handleWithdraw() {
    // Validate withdraw
    if (!validate(withdraw)) {
      return;
    }

    // Convert withdraw to a number, add to account balance, and update account balance
    const updatedAmount = balance - Number(withdraw);
    setBalance(updatedAmount);

    // Update balance in MongoDB
    withdrawDatabase(updatedAmount);

    // Update account balance for logged in user
    loggedInUser[0].balance = updatedAmount;

    // Show success message
    setShowForm(false);
  }

  return (
    <Card
      header={showForm ? "How much would you like to withdraw?" : "Success!"}
      title={<Balance balance={balance} />}
      body={
        <>
          <br />
          {showForm ? (
            <Transaction
              amount={withdraw}
              setAmount={setWithdraw}
              setDisable={setDisableWithdraw}
              handleClick={handleWithdraw}
              disable={disableWithdraw}
              type="Withdraw"
            />
          ) : (
            <Success
              type="withdraw"
              message="processed"
              setType={setWithdraw}
              setDisable={setDisableWithdraw}
              setShowForm={setShowForm}
            />
          )}
        </>
      }
      status={status}
    />
  );
}

export default Withdraw;
