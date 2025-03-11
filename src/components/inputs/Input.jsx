import "./input.css";

const Input = ({ defaultValue, labelTitle, labelText, name, type }) => {
  return (
    <div className="input">
      <label title={labelTitle}>{labelText}</label>
      <input type={type} name={name} defaultValue={defaultValue} min={1} />
    </div>
  );
};

export default Input;
