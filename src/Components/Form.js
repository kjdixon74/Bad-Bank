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
