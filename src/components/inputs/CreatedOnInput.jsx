import Input from "./Input";

const props = {
  type: "date",
  name: "CreatedOn",
  labelTitle: "A date of creation of a bug.",
  labelText: "Created On",
};

const CreatedOnInput = ({ children }) => {
  return <Input {...props}>{children}</Input>;
};

export default CreatedOnInput;
