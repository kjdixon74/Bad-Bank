import { useState, createContext, useEffect } from "react";
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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users from Express API
    fetch("/users/readAll")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

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
// Lesson learned - moved the fetching all users functionality from AllData to App and incorporated it into UserContext to be accessible to all components; because the user info fetched was all in string data type (except for the boolean loggedIn property), I had to use the Number() method in Deposit, Withdraw, and Transaction to be able to add/subtract properly
// If I were to do this project differently, I wish I incorporated testing because it got tedious making sure my changes did what I intended
