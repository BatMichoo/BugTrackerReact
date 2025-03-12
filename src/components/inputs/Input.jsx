import "./input.css";

const Input = ({ labelTitle, labelText, children, ...props }) => {
  return (
    <div className="input">
      <label title={labelTitle}>{labelText}</label>
      <input min={1} {...props} />
      {children}
    </div>
  );
};

export default Input;
