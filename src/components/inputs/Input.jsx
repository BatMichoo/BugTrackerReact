const Input = ({ className, labelTitle, labelText, children, ...props }) => {
  return (
    <div className={className}>
      <label title={labelTitle}>{labelText}</label>
      <input {...props} />
      {children}
    </div>
  );
};
export default Input;
