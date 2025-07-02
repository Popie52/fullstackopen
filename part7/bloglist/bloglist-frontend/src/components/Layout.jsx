import { Outlet, Link } from "react-router-dom";

const lemma = {
    backgroundColor: "lightgrey",
    padding: 8
}

const Layout = ({user, handleLogout}) => {
    return (
        <div>
            <nav style={lemma}>
                <Link to='/'>home</Link> | <Link to="/users" >users</Link> {" | "}
                {user.username} logged in.{" "}
                <button onClick={handleLogout}>logout</button>
            </nav>
            <hr />
            <h2>blog App</h2>
            <Outlet />
        </div>
    )
}

export default Layout;