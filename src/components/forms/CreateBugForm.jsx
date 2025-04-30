import { Form } from "react-router";
import PrioritySeachInput from "../inputs/PriorityInput";
import AssignedToInput from "../inputs/AssignedToInput";
import TitleInput from "../inputs/TitleInput";

const PRESELETED_VALUES = {
  priority: "Normal",
  assignedTo: "",
};

const CreateBugForm = ({ availableUsers }) => {
  return (
    <Form method="POST">
      <div>
        <TitleInput />
        <PrioritySeachInput selectedValue={PRESELETED_VALUES.priority} />
        <AssignedToInput
          availableValues={availableUsers}
          selectedValue={PRESELETED_VALUES.assignedTo}
        />
        <textarea name="Description" rows={10} cols={50} />
      </div>
      <button type="submit">Create</button>
    </Form>
  );
};

export default CreateBugForm;
