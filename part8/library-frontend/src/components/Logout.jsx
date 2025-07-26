import { useApolloClient } from "@apollo/client"

const Logout = ({setToken}) => {
    const client = useApolloClient();
    const submit = () => {
        client.resetStore();
        localStorage.removeItem('library-user-token')
        setToken(null);
    }
  return (
    <button onClick={submit}>Logout</button>
  )
}

export default Logout