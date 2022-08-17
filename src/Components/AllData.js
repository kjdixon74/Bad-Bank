import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { UserContext, Card } from "./Context";

function AllData() {
  const cxt = useContext(UserContext);
  const users = cxt.users;

  const userElement = users.map((user, index) => (
    <tbody key={index}>
      <tr>
        <td key={"name" + index}>{user.name}</td>
        <td key={"email" + index}>{user.email}</td>
        <td key={"password" + index}>{user.password}</td>
      </tr>
    </tbody>
  ));

  return (
    <Card
      bgcolor="light"
      txtcolor="black"
      header="User Submissions"
      body={
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
            </tr>
          </thead>
          {userElement}
        </table>
      }
    />
  );
}

export default AllData;
