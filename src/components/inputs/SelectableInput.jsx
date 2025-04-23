import "./input.css";

const SelectableInput = ({
  className,
  labelTitle,
  labelText,
  name,
  availableValues,
  selectedValue,
}) => {
  return (
    <div className={className}>
      <label title={labelTitle}>{labelText}</label>
      <select name={name} defaultValue={selectedValue}>
        {availableValues?.map((opt) => {
          return (
            <option key={opt} value={opt}>
              {opt}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectableInput;
