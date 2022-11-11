import { useContext } from "react";
import { UserContext } from "../App";
import { Card } from "./Context";

function Profile() {
  const { users } = useContext(UserContext);
  const loggedInUser = users.filter((user) => user.loggedIn === true);
  const { name, email, password, role, accountType, accountNumber, balance } =
    loggedInUser[0];

  return (
    <Card
      header="Account Details"
      body={
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Name: {name}
            <span className="badge bg-light rounded-pill">🖊</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Email: {email}
            <span className="badge bg-light rounded-pill">🖊</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Password: {password}
            <span className="badge bg-light rounded-pill">🖊</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Role: {role}
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Account Type: {accountType}
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Account #: {accountNumber}
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Balance: ${balance}
          </li>
        </ul>
      }
    ></Card>
  );
}

export default Profile;

// Video additional feature (new) - profile page to view account details
