import { useState } from "react";

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
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:{" "}
          <input
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
