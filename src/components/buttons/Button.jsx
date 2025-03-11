import "./button.css";

const Button = ({ onClick, children, ...props }) => {
  return (
    <button {...props} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
