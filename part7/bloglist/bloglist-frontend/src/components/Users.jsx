import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initializeUsers } from "../reducers/userReducer";
import { Link } from "react-router-dom";

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    useEffect(() => {
        dispatch(initializeUsers());
    }, [dispatch]);

    if(!users) return null;
    // console.log(users);

    return(
        <div>
            <h2>Users</h2>
            <table cellPadding="4">
                <thead>
                    <tr>
                    <th></th>
                    <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>

                {users.map(user => 
                (
                    <tr key={user.id}>
                    <td>
                        <Link to={`/users/${user.id}`}>
                        {user.username}
                        </Link>
                        </td>
                    <td>{user.blogs.length || 0}</td>
                </tr>
                )
            )}
            </tbody>

            </table>
        </div>
    )
}

export default Users;