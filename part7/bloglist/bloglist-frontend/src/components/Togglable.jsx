import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef(({label, children}, ref) => {
  const [visible, setVisible] = useState(false);
  const showVisible = { display: visible ? "none" : "" };
  const hideVisible = { display: visible ? "" : "none" };
  const toggleVisibility = () => setVisible(!visible);
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={showVisible}>
        <button onClick={toggleVisibility}>{label}</button>
      </div>
      <div style={hideVisible}>{children}</div>
    </div>
  );
});

Togglable.displayName = `Togglable`

Togglable.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default Togglable;
