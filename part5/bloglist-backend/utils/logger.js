const info = (...msg) => {
  if (process.env.NODE_ENV !== "test") console.log(...msg);
};

const error = (...msg) => {
  if (process.env.NODE_ENV !== "test") console.log(...msg);
};

export default { info, error };
