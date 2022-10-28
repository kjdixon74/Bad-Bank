import { useContext } from "react";
import { UserContext } from "../App";
import { Card } from "./Context";

function Profile() {
  const { users } = useContext(UserContext);

  const loggedInUser = users.filter((user) => user.loggedIn === true);

  return (
    <Card
      header="Account Details"
      body={
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Name: {loggedInUser[0].name}
            <span className="badge bg-light rounded-pill">🖊</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Email: {loggedInUser[0].email}
            <span className="badge bg-light rounded-pill">🖊</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Password: {loggedInUser[0].password}
            <span className="badge bg-light rounded-pill">🖊</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Role: {loggedInUser[0].role}
          </li>
        </ul>
      }
    ></Card>
  );
}

export default Profile;

// Video additional feature (recommended/new) - user profile updates that are persistent/view & edit account details

// Next step: add functionality to change name, email, and password
