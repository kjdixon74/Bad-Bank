import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar";
import Home from "./Components/Home";
import CreateAccount from "./Components/CreateAccount";
import Login from "./Components/Login";
import Deposit from "./Components/Deposit";
import Withdraw from "./Components/Withdraw";
import AllData from "./Components/AllData";
import Logout from "./Components/Logout";
import "./App.css";

// Create a routing mechanism, reference component that was written, & provide paths for where the components should be loaded

export const UserContext = createContext(null);

function App() {
  const [users, setUsers] = useState([
    {
      name: "kat",
      email: "kat@mit.edu",
      password: "secret",
      balance: 100,
      loggedIn: false,
    },
  ]);

  return (
    <BrowserRouter>
      <NavBar />
      <UserContext.Provider value={{ users, setUsers }}>
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
    </BrowserRouter>
  );
}

export default App;
