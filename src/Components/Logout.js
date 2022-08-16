import { useContext } from "react";
import { UserContext, CurrentUserContext } from "./Context";

function Logout() {
  const cxt = useContext(UserContext);
  const { currentUser } = useContext(CurrentUserContext);

  return <h1>Logout</h1>;
}

export default Logout;
