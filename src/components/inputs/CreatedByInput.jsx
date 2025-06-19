import classes from "../forms/BugSearchForm.module.css";

const PROPERTIES = {
  labelTitle: "An user assigned to a bug.",
  labelText: "Created By",
  name: "CreatedBy",
  className: classes.input,
};

const CreatedByInput = ({ selectedValue, availableValues, onChange }) => {
  return (
    <div className={PROPERTIES.className}>
      <label htmlFor={PROPERTIES.name} title={PROPERTIES.labelTitle}>
        {PROPERTIES.labelText}
      </label>
      <select
        id={PROPERTIES.name}
        name={PROPERTIES.name}
        value={selectedValue}
        onChange={onChange}
      >
        <option value="">N/A</option>
        {availableValues?.map((user) => {
          return (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CreatedByInput;
