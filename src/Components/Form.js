function Form(props) {
  function handleChange(inputValue) {
    // Disable button if all fields are blank
    inputValue ? props.setDisable(false) : props.setDisable(true);
  }

  return (
    <>
      {props.createAccount && (
        <>
          Name
          <input
            type="text"
            placeholder="Enter name here"
            value={props.name}
            onChange={(e) => {
              props.setName(e.currentTarget.value);
              handleChange(e.currentTarget.value);
            }}
            className="form-control"
          />
          <br />
        </>
      )}
      Email
      <input
        type="email"
        placeholder="Enter email address here"
        value={props.email}
        onChange={(e) => {
          props.setEmail(e.currentTarget.value);
          handleChange(e.currentTarget.value);
        }}
        className="form-control"
      />
      <br />
      Password
      <input
        type="password"
        placeholder="Enter password here"
        value={props.password}
        onChange={(e) => {
          props.setPassword(e.currentTarget.value);
          handleChange(e.currentTarget.value);
        }}
        className="form-control"
      />
      <br />
      {props.createAccount && (
        <>
          Role
          <select
            name="role"
            className="form-control"
            value={props.role}
            onChange={(e) => {
              props.setRole(e.currentTarget.value);
              handleChange(e.currentTarget.value);
            }}
          >
            <option value="">--Choose role here--</option>
            <option value="Bank Employee">Bank Employee</option>
            <option value="Customer">Customer</option>
          </select>
          <br />
        </>
      )}
      {props.createAccount && (
        <>
          Account Type
          <select
            name="type"
            className="form-control"
            value={props.accountType}
            onChange={(e) => {
              props.setAccountType(e.currentTarget.value);
              handleChange(e.currentTarget.value);
            }}
          >
            <option value="">--Choose account type here--</option>
            <option value="Checking">Checking</option>
            <option value="Savings">Savings</option>
          </select>
          <br />
        </>
      )}
      <button
        type="submit"
        onClick={props.handleClick}
        disabled={props.disable}
      >
        {props.btnName}
      </button>
      <br />
    </>
  );
}

export default Form;
