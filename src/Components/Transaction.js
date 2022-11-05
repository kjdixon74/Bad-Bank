import handleChange from "./handleChange";

export function Balance(props) {
  return (
    <div>
      Current Account Balance
      <h4>
        $
        {props.balance
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </h4>
    </div>
  );
}

export function Transaction(props) {
  return (
    <>
      Amount
      <input
        type="text"
        placeholder="Enter amount here"
        value={props.amount}
        onChange={(e) =>
          handleChange(e.currentTarget.value, props.setAmount, props.setDisable)
        }
        className="form-control"
      />
      <br />
      <button
        type="submit"
        onClick={props.handleClick}
        disabled={props.disable}
      >
        {props.type}
      </button>
      <br />
    </>
  );
}

export function Success(props) {
  function clearForm() {
    // Reset values back to default
    props.setType("");
    props.setDisable(true);
    props.setShowForm(true);
  }

  return (
    <>
      <h5>
        Your {props.type} has been {props.message}.
      </h5>
      <button type="submit" onClick={clearForm}>
        Make another {props.type}
      </button>
    </>
  );
}
