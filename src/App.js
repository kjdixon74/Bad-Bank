import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar";
import Home from "./Components/Home";
import CreateAccount from "./Components/CreateAccount";
import Login from "./Components/Login";
import Deposit from "./Components/Deposit";
import Withdraw from "./Components/Withdraw";
import AllData from "./Components/AllData";
import Profile from "./Components/Profile";
import Logout from "./Components/Logout";
import "./App.css";

// Create a context to share user information across relevant components
export const UserContext = createContext(null);

function App() {
  const [users, setUsers] = useState([
    {
      name: "kat",
      email: "kat@mit.edu",
      password: "secret",
      role: "Bank Employee",
      accountType: "Checking",
      accountNumber: 5729014782,
      balance: 100,
      loggedIn: false,
    },
  ]);

  const [showUserName, setShowUserName] = useState(false);

  // Create routing, reference components that were written, & provide paths for where the components should be loaded

  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{ users, setUsers, showUserName, setShowUserName }}
      >
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createaccount/" element={<CreateAccount />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/deposit/" element={<Deposit />} />
          <Route path="/withdraw/" element={<Withdraw />} />
          <Route path="/alldata/" element={<AllData />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/logout/" element={<Logout />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;

// Video refactor - front end modifications - routing - HashRouter -> BrowserRouter, remove Link, add Routes
