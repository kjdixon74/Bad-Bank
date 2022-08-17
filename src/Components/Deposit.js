import { useState } from "react";
import { Card } from "./Context";

function Deposit() {
  const [depositAmt, setDepositAmt] = useState("");
  const [disableDeposit, setDisableDeposit] = useState(true);
  const [depositError, setDepositError] = useState("");
  const [showError, setShowError] = useState(false);
  const [accountBalance, setAccountBalance] = useState(0);
  const [showForm, setShowForm] = useState(true);

  function handleChange(value) {
    // Update deposit value with user's input
    setDepositAmt(value);

    // Disable deposit button if no amount is input
    if (value) {
      setDisableDeposit(false);
    } else {
      setDisableDeposit(true);
    }
  }

  function validate(input) {
    // Check if user's input is NaN
    if (isNaN(input)) {
      setDepositError("Error: deposit amount is not a number.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return false;
    }

    // Check if user's input is a negative number
    if (Number(input) < 0) {
      setDepositError("Error: cannot deposit a negative amount.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return false;
    }

    // Check if user's input is zero
    if (Number(input) === 0) {
      setDepositError("Error: cannot deposit $0.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return false;
    }

    setDepositError("");
    return true;
  }

  function handleDeposit() {
    // Validate deposit
    if (!validate(depositAmt)) {
      return;
    }

    // Convert deposit to a number, add to account balance, and update account balance
    setAccountBalance(Number(depositAmt) + accountBalance);

    // Show success message
    setShowForm(false);
  }

  function clearForm() {
    // Reset values back to default
    setDepositAmt("");
    setDisableDeposit(true);
    setShowForm(true);
  }

  return (
    <Card
      bgcolor="light"
      txtcolor="black"
      header={showForm ? "How much would you like to deposit?" : "Success!"}
      body={
        <>
          <div>Current Account Balance</div>
          <h4 id="depositAcctBal">${accountBalance.toFixed(2)}</h4>
          <br />
          {showForm ? (
            <>
              <div>Amount</div>
              <input
                type="text"
                value={depositAmt}
                onChange={(e) => handleChange(e.currentTarget.value)}
                className="form-control"
                id="depositAmt"
              />
              {showError && <div>{depositError}</div>}
              <br />
              <button
                type="submit"
                onClick={handleDeposit}
                disabled={disableDeposit}
                id="depositBtn"
              >
                Deposit
              </button>
            </>
          ) : (
            <>
              <h5>Your deposit has been received.</h5>
              <button type="submit" onClick={clearForm} id="clearDeposit">
                Make another deposit
              </button>
            </>
          )}
        </>
      }
    />
  );
}

export default Deposit;
