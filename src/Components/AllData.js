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
        <td key={"accountType" + index}>{user.accountType}</td>
        <td key={"accountNumber" + index}>{user.accountNumber}</td>
        <td key={"balance" + index}>
          $
          {user.balance
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </td>
      </tr>
    </tbody>
  ));

  return (
    <Card
      header="User Accounts"
      body={
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Account Type</th>
              <th scope="col">Account #</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          {userElement}
        </table>
      }
    />
  );
}

export default AllData;
