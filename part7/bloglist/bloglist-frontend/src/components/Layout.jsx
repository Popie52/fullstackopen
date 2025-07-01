import { Outlet, Link } from "react-router-dom";

const Layout = ({user, handleLogout}) => {
    return (
        <div>
            <nav>
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