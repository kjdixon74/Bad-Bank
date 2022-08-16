import { useState, useContext } from "react";
import { UserContext, Card } from "./Context";

function Deposit() {
  const [depositAmt, setDepositAmt] = useState("");
  const [disableDeposit, setDisableDeposit] = useState(true);
  const [depositError, setDepositError] = useState("");
  const [showError, setShowError] = useState(false);
  const [accountBalance, setAccountBalance] = useState(0.0);
  const [showForm, setShowForm] = useState(true);

  const cxt = useContext(UserContext);

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
      setDepositError("Error: deposit is not a number.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return false;
    }

    // Check if user's input is a negative number
    if (Number(input) < 0) {
      setDepositError("Error: cannot deposit a negative number.");
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
      bgcolor="primary"
      txtcolor="white"
      header={
        showForm ? "How much would you like to deposit?" : "Congratulations!"
      }
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
              <h5>Your deposit has been successfully received.</h5>
              <button
                type="submit"
                onClick={clearForm}
                className="btn btn-light"
                id="clearDeposit"
              >
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

// Come back after login and logout because need to know what user is logged in, to pull up account data

// Future improvements!
// type="number"
// min="1"
// onChange={(e) => setDeposit(Number(e.currentTarget.value))}
