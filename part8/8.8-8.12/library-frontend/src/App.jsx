import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Route, Routes, Link } from "react-router-dom";
const App = () => {
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

  return (
    <div>
      <div style={styleLinks}>
        <Link style={linkStyle} to="/" >authors</Link>
        <Link to="/books" style={linkStyle}>books</Link>
        <Link to="/addBook" style={linkStyle}>add book</Link>
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books  />} /> 
        <Route path="/addBook" element={<NewBook  />} /> 
      </Routes>
    </div>
  );
};

export default App;
