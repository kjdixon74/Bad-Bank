import { useContext } from "react";
import { UserContext, Card } from "./Context";

function AllData() {
  const cxt = useContext(UserContext);
  const users = cxt.users;

  const userElement = users.map((user, index) => (
    <ul className="list-group list-group-flush" key={index}>
      <li className="list-group-item" key={"user" + { index }}>
        User: {index + 1}
      </li>
      <li className="list-group-item" key={"name" + { index }}>
        Name: {user.name}
      </li>
      <li className="list-group-item" key={"email" + { index }}>
        Email: {user.email}
      </li>
      <li className="list-group-item" key={"password" + { index }}>
        Password: {user.password}
      </li>
      <li className="list-group-item" key={"balance" + { index }}>
        Balance: ${user.balance}
      </li>
      <br />
    </ul>
  ));

  return (
    <Card
      bgcolor="light"
      txtcolor="black"
      header="User Submissions"
      body={
        <div
          className="card"
          style={{
            width: "15rem",
            color: "white",
            backgroundColor: "rgb(107, 128, 104)",
          }}
        >
          <div className="card-header">Users</div>
          {userElement}
        </div>
      }
    />
  );
}

export default AllData;
