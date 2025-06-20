import { Form } from "react-router";
import PrioritySeachInput from "../inputs/PriorityInput";
import AssignedToInput from "../inputs/AssignedToInput";
import TitleInput from "../inputs/TitleInput";
import { useState } from "react";

const PRESELETED_VALUES = {
  priority: "Normal",
  assignedTo: "",
};

const CreateBugForm = ({ availableUsers }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(null);
  const [assignedTo, setAssignedTo] = useState(null);
  const [description, setDescription] = useState("");

  return (
    <Form method="POST">
      <div>
        <TitleInput
          selectedValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <PrioritySeachInput
          selectedValue={priority ? priority : PRESELETED_VALUES.priority}
          onChange={(e) => setPriority(e.target.value)}
        />
        <AssignedToInput
          availableValues={availableUsers}
          selectedValue={assignedTo ? assignedTo : PRESELETED_VALUES.assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />
        <textarea
          name="Description"
          rows={10}
          cols={50}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </Form>
  );
};

export default CreateBugForm;
