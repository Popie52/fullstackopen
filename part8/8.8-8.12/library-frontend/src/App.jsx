// import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Route, Routes, Link } from "react-router-dom";
const App = () => {
  // const [page, setPage] = useState("authors");
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
        {/* <button onClick={() => setPage("authors")}>authors</button> */}
        {/* <button onClick={() => setPage("books")}>books</button> */}
        {/* <button onClick={() => setPage("add")}>add book</button> */}
      </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books  />} /> 
        <Route path="/addBook" element={<NewBook  />} /> 
      </Routes>

      {/* <Authors show={page === "authors"} /> */}

      

      {/* <NewBook show={page === "add"} /> */}
    </div>
  );
};

export default App;
