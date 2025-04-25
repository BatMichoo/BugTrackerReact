import AssignedToInput from "../inputs/AssignedToInput.jsx";
import CreatedOnInput from "../inputs/CreatedOnInput.jsx";
import PrioritySeachInput from "../inputs/PriorityInput.jsx";
import SearchBugIdInput from "../inputs/SearchBugIdInput.jsx";
import StatusInput from "../inputs/StatusInput.jsx";
import TitleInput from "../inputs/TitleInput.jsx";
import DateFilterInput from "../inputs/DateFilterInput.jsx";
import classes from "../forms/BugSearchForm.module.css";
import { Form, useSubmit } from "react-router";

const BugSearchForm = ({ users }) => {
  const submit = useSubmit();

  function handleReset() {
    const emptyFormData = new FormData();

    submit(emptyFormData);
  }

  return (
    <Form method="POST">
      <ul className={classes["search-input-container"]}>
        <SearchBugIdInput />
        <PrioritySeachInput selectedValue="" />
        <StatusInput selectedValue="" />
        <AssignedToInput availableValues={users} />
        <TitleInput />
        <CreatedOnInput />
        <DateFilterInput />
      </ul>
      <div className="btn-container">
        <button className="submit-btn">Search</button>
        <button type="reset" className="submit-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </Form>
  );
};

export default BugSearchForm;
