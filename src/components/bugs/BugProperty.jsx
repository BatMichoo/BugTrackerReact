const BugProperty = ({ className, labelText, content }) => {
  return (
    <div className={className}>
      <span>{labelText}</span>
      <p>{content}</p>
    </div>
  );
};

export default BugProperty;
