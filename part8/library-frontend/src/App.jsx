import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";

import { Route, Routes, Link } from "react-router-dom";
import Recommendations from "./components/Recommendations";
const App = () => {
  const [token, setToken] = useState(null);
  const styleLinks = {
    padding: '10px',
    display: 'flex',
    gap: '10px',
  }
  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    font: 900
  }

  if(!token) {
    return (
        <LoginForm setToken={setToken}/>
    )
  }

  

  return (
    <div>
      <div style={styleLinks}>
        <Link style={linkStyle} to="/" >authors</Link>
        <Link to="/books" style={linkStyle}>books</Link>
        <Link to="/addBook" style={linkStyle}>add book</Link>
        <Link to="/recommend" style={linkStyle}>recommendations</Link>
        <Logout setToken={setToken}/>
      </div>

      <Routes>
        <Route path="/" element={ <Authors /> } />
        <Route path="/books" element={<Books  />} /> 
        <Route path="/addBook" element={<NewBook  />} /> 
        <Route path="/recommend" element={ <Recommendations/> } />
      </Routes>
    </div>
  );
};

export default App;
