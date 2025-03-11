import Input from "./Input";

const info = {
  type: "number",
  name: "Id",
  labelTitle: "An Id of a bug.",
  labelText: "Id",
};

const SearchBugIdInput = () => {
  return <Input {...info} />;
};

export default SearchBugIdInput;
