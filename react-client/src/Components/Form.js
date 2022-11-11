import handleChange from "./handleChange";

function Form(props) {
  return (
    <>
      {props.createAccount && (
        <>
          Name
          <input
            type="text"
            placeholder="Enter name here"
            value={props.name}
            onChange={(e) =>
              handleChange(
                e.currentTarget.value,
                props.setName,
                props.setDisable
              )
            }
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
        onChange={(e) =>
          handleChange(e.currentTarget.value, props.setEmail, props.setDisable)
        }
        className="form-control"
      />
      <br />
      Password
      <input
        type="password"
        placeholder="Enter password here"
        value={props.password}
        onChange={(e) =>
          handleChange(
            e.currentTarget.value,
            props.setPassword,
            props.setDisable
          )
        }
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
            onChange={(e) =>
              handleChange(
                e.currentTarget.value,
                props.setRole,
                props.setDisable
              )
            }
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
            onChange={(e) =>
              handleChange(
                e.currentTarget.value,
                props.setAccountType,
                props.setDisable
              )
            }
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

// Video additional feature (new) - added Form & Transaction components and handleChange and validate global functions to abstract/consolidate similarities among Create Account, Login, Deposit, Withdraw
