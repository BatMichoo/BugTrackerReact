import "./input.css";

const SelectableInput = ({
  className,
  labelTitle = undefined,
  labelText = undefined,
  name,
  availableValues,
  selectedValue,
  onChange = undefined,
}) => {
  return (
    <div className={className}>
      {labelText && (
        <label title={labelTitle} htmlFor={name}>
          {labelText}
        </label>
      )}
      <select
        id={name}
        name={name}
        defaultValue={selectedValue}
        onChange={onChange}
      >
        {availableValues?.map((opt) => {
          return (
            <option key={opt.value ?? -1} value={opt.value}>
              {opt.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectableInput;
