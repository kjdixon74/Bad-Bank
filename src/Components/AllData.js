import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { Card } from "./Context";
import { UserContext } from "../App";

function AllData() {
  const { users } = useContext(UserContext);

  const userElement = users.map((user, index) => (
    <tbody key={index}>
      <tr>
        <td key={"name" + index}>{user.name}</td>
        <td key={"email" + index}>{user.email}</td>
        <td key={"password" + index}>{user.password}</td>
        <td key={"balance" + index}>
          $
          {user.balance
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </td>
        <td key={"loggedIn" + index}>{user.loggedIn.toString()}</td>
      </tr>
    </tbody>
  ));

  return (
    <Card
      header="User Submissions"
      body={
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Balance</th>
              <th scope="col">Login</th>
            </tr>
          </thead>
          {userElement}
        </table>
      }
    />
  );
}

export default AllData;
