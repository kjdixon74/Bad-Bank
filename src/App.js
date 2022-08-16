import { useContext, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import { UserContext, CurrentUserContext } from "./Components/Context";
import NavBar from "./Components/Navbar";
import Home from "./Components/Home";
import CreateAccount from "./Components/CreateAccount";
import Login from "./Components/Login";
import Deposit from "./Components/Deposit";
import Withdraw from "./Components/Withdraw";
import AllData from "./Components/AllData";
import Logout from "./Components/Logout";

// Create a routing mechanism, reference component that was written, & provide paths for where the components should be loaded

function App() {
  useContext(UserContext);
  useContext(CurrentUserContext);

  const [currentUser, setCurrentUser] = useState("");

  return (
    <HashRouter>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <NavBar />
        <br />
        <UserContext.Provider
          value={{
            users: [
              {
                name: "kat",
                email: "kat@mit.edu",
                password: "secret",
                balance: 100,
              },
            ],
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createaccount/" element={<CreateAccount />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/deposit/" element={<Deposit />} />
            <Route path="/withdraw/" element={<Withdraw />} />
            <Route path="/alldata/" element={<AllData />} />
            <Route path="/logout/" element={<Logout />} />
          </Routes>
        </UserContext.Provider>
      </CurrentUserContext.Provider>
    </HashRouter>
  );
}

export default App;