const Input = ({
  className,
  labelTitle,
  labelText,
  children,
  value,
  ...props
}) => {
  return (
    <div className={className}>
      <label title={labelTitle}>{labelText}</label>
      <input {...props} defaultValue={value} />
      {children}
    </div>
  );
};
export default Input;
