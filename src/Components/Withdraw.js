import { useContext } from "react";
import { UserContext } from "./Context";

function Withdraw() {
  const cxt = useContext(UserContext);

  return (
    <h1>
      Withdraw
      <br />
      {JSON.stringify(cxt)}
    </h1>
  );
}

export default Withdraw;
