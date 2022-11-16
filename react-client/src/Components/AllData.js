import { useState, useEffect, useContext } from "react";
import { Card } from "./Context";
// import { UserContext } from "../App";

function AllData() {
  // const { users } = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch all users from Express API
    fetch("/users/readAll")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }, []);

  function userAccounts(data) {
    if (data.length > 0) {
      const userElement = data.map((user, index) => (
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

      return userElement;
    }
  }

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
          {userAccounts(data)}
        </table>
      }
    />
  );
}

export default AllData;

// Lesson learned - 1) struggled with handling the data type of the response from express server -> removed json.stringify 2) couldn't figure out why rendering twice -> tried useRef but finally checked for when the array was filled up on the 2nd render to do map method
// LEFT OFF HERE! 1) Implement account type and number 2) DON'T FORGET TO REBUILD REACT ONCE FIGURE OUT
