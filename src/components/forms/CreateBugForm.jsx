import { Form } from "react-router";
import PrioritySeachInput from "../inputs/PriorityInput";
import AssignedToInput from "../inputs/AssignedToInput";
import TitleInput from "../inputs/TitleInput";
import { useState } from "react";
import { getUserId } from "../../utils/auth";

const CreateBugForm = ({ availableUsers }) => {
  const userId = getUserId();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("1"); // Normal
  const [assignedTo, setAssignedTo] = useState(userId);
  const [description, setDescription] = useState("");

  return (
    <Form method="POST">
      <div>
        <TitleInput
          selectedValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <PrioritySeachInput
          selectedValue={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
        <AssignedToInput
          availableValues={availableUsers}
          selectedValue={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />
        <textarea
          name="Description"
          rows={10}
          cols={50}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please provide a comprehensive description."
          style={{ padding: "0.5em", fontSize: "1.06125em", margin: "1em" }}
        />
      </div>
      <button type="submit">Create</button>
    </Form>
  );
};

export default CreateBugForm;
