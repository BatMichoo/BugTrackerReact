const BugProperty = ({ className, labelText, content }) => {
  return (
    <p className={className}>
      <label>{labelText}</label>
      <span>{content}</span>
    </p>
  );
};

export default BugProperty;
