import { useState } from "react";
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handle = async (e) => {
    e.preventDefault();

    await handleSubmit(username, password);

    setPassword("");
    setUsername("");
  };

  return (
    <div>
      <form onSubmit={handle}>
        <div>
          username:{" "}
          <input
            type="text"
            name="username"
            value={username}
            data-testid='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:{" "}
          <input
            type="password"
            name="password"
            value={password}
            data-testid='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm;
