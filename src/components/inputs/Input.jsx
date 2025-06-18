const Input = ({ className, labelTitle, labelText, children, ...props }) => {
  return (
    <div className={className}>
      <label htmlFor={props.name} title={labelTitle}>
        {labelText}
      </label>
      <input {...props} id={props.name} />
      {children}
    </div>
  );
};
export default Input;
