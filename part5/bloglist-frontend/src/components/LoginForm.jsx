const LoginForm = ({
  username,
  password,
  handleUsername,
  handlePassword,
  handleSubmit,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username:{" "}
          <input
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => handleUsername(target.value)}
          />
        </div>
        <div>
          password:{" "}
          <input
            type="password"
            name="password"
            value={password}
            onChange={({ target }) => handlePassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
