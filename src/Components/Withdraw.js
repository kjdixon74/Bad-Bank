import { useState, useContext } from "react";
import { UserContext, Card } from "./Context";

function Withdraw() {
  const [withdrawAmt, setWithdrawAmt] = useState("");
  const [disableWithdraw, setDisableWithdraw] = useState(true);
  const [withdrawError, setWithdrawError] = useState("");
  const [showError, setShowError] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const cxt = useContext(UserContext);
  const users = cxt.users;
  // Check for a logged in user
  const currentUser = users.filter((user) => user.loggedIn === true);
  // If so, show user's account balance
  const [accountBalance, setAccountBalance] = useState(
    currentUser.length > 0 ? currentUser[0].balance : 0
  );

  function handleChange(value) {
    // Update withdraw value with user's input
    setWithdrawAmt(value);

    // Disable withdraw button if no amount is input
    if (value) {
      setDisableWithdraw(false);
    } else {
      setDisableWithdraw(true);
    }
  }

  function validate(input) {
    // Check if user's input is NaN
    if (isNaN(input)) {
      setWithdrawError("Error: withdraw amount is not a number.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return false;
    }

    // Check if user's input exceeds account balance
    if (Number(input) > accountBalance) {
      setWithdrawError("Error: cannot withdraw more than account balance.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return false;
    }

    // Check if user's input is a negative number
    if (Number(input) < 0) {
      setWithdrawError("Error: cannot withdraw a negative amount.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return false;
    }

    // Check if user's input is zero
    if (Number(input) === 0) {
      setWithdrawError("Error: cannot withdraw $0.");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return false;
    }

    setWithdrawError("");
    return true;
  }

  function handleWithdraw() {
    // Validate withdraw
    if (!validate(withdrawAmt)) {
      return;
    }

    // Convert withdraw to a number, add to account balance, and update account balance
    setAccountBalance(accountBalance - Number(withdrawAmt));

    // Update account balance for logged in user
    if (currentUser.length > 0) {
      currentUser[0].balance = accountBalance - Number(withdrawAmt);
    }

    // Show success message
    setShowForm(false);
  }

  function clearForm() {
    // Reset values back to default
    setWithdrawAmt("");
    setDisableWithdraw(true);
    setShowForm(true);
  }

  return (
    <>
      {currentUser.length > 0 ? (
        <Card
          bgcolor="light"
          txtcolor="black"
          header={
            showForm ? "How much would you like to withdraw?" : "Success!"
          }
          body={
            <>
              <div>Current Account Balance</div>
              <h4 id="withdrawAcctBal">
                $
                {accountBalance
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </h4>
              <br />
              {showForm ? (
                <>
                  <div>Amount</div>
                  <input
                    type="text"
                    value={withdrawAmt}
                    onChange={(e) => handleChange(e.currentTarget.value)}
                    className="form-control"
                    id="withdrawAmt"
                  />
                  {showError && <div>{withdrawError}</div>}
                  <br />
                  <button
                    type="submit"
                    onClick={handleWithdraw}
                    disabled={disableWithdraw}
                    id="withdrawBtn"
                  >
                    Withdraw
                  </button>
                </>
              ) : (
                <>
                  <h5>Your withdraw has been processed.</h5>
                  <button type="submit" onClick={clearForm} id="clearWithdraw">
                    Make another withdraw
                  </button>
                </>
              )}
            </>
          }
        />
      ) : (
        <h4>Please log in.</h4>
      )}
    </>
  );
}

export default Withdraw;
