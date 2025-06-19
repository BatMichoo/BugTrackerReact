import { Form, useNavigate } from "react-router";
import PrioritySeachInput from "../inputs/PriorityInput";
import AssignedToInput from "../inputs/AssignedToInput";
import TitleInput from "../inputs/TitleInput";
import StatusInput from "../inputs/StatusInput";
import BugButtons from "../bugs/BugButtons";
import classes from "./BugEditForm.module.css";
import { useState } from "react";

const BugEditForm = ({ bug, availableUsers }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(bug.title);
  const [priority, setPriority] = useState(bug.priority);
  const [status, setStatus] = useState(bug.status);
  const [assignedTo, setAssignedTo] = useState(bug.assignedTo?.id || "");
  const [description, setDescription] = useState(bug.description);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handlePriorityChange = (e) => setPriority(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleAssignedToChange = (e) => setAssignedTo(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  function handleOnCancel() {
    navigate(`../${bug.id}`);
  }

  return (
    <Form method="PUT" className={classes["edit-form"]}>
      <h1>Edit bug with Id: {bug.id}</h1>
      <div>
        <TitleInput selectedValue={title} onChange={handleTitleChange} />
        <PrioritySeachInput
          selectedValue={priority}
          onChange={handlePriorityChange}
        />
        <StatusInput selectedValue={status} onChange={handleStatusChange} />
        <AssignedToInput
          availableValues={availableUsers}
          selectedValue={assignedTo}
          onChange={handleAssignedToChange}
        />
        <textarea
          name="Description"
          rows={20}
          cols={100}
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <BugButtons isEditing={true} onCancel={handleOnCancel} />
    </Form>
  );
};

export default BugEditForm;
