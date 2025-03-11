import Input from "./Input";

const props = {
  type: "text",
  name: "Title",
  labelTitle: "A title of a bug.",
  labelText: "Title",
};

const TitleInput = () => {
  return <Input {...props} />;
};

export default TitleInput;
