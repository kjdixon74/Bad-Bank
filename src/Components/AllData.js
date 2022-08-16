import { useContext } from "react";
import { UserContext } from "./Context";

function AllData() {
  const cxt = useContext(UserContext);
  return (
    <h1>
      All Data <br />
      {JSON.stringify(cxt)}
    </h1>
  );
}

export default AllData;
