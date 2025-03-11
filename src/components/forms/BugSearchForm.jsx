import Button from "../buttons/Button.jsx";
import AssignedToInput from "../inputs/AssignedToInput.jsx";
import CreatedOnInput from "../inputs/CreatedOnInput.jsx";
import PrioritySeachInput from "../inputs/PriorityInput.jsx";
import SearchBugIdInput from "../inputs/SearchBugIdInput.jsx";
import StatusInput from "../inputs/StatusInput.jsx";
import TitleInput from "../inputs/TitleInput.jsx";

import "./bugSearchForm.css";

const BugSearchForm = () => {
  return (
    <form method="post">
      <ul className="search-input-container">
        <SearchBugIdInput />
        <PrioritySeachInput selectedValue="" />
        <StatusInput selectedValue="" />
        <AssignedToInput selectedValue="" availableValues={[]} />
        <TitleInput />
        <div className="search-input">
          <CreatedOnInput />
          <fieldset>
            <legend>Date filter options:</legend>
            <div className="radio-btn-container">
              <label htmlFor="filterChoice1">Before</label>
              <input
                type="radio"
                id="filterChoice1"
                name="DateFilterOption"
                value="<"
              />

              <label htmlFor="filterChoice1">Before Incl</label>
              <input
                type="radio"
                id="filterChoice2"
                name="DateFilterOption"
                value="<="
              />

              <label htmlFor="filterChoice1">On</label>
              <input
                type="radio"
                id="filterChoice3"
                name="DateFilterOption"
                value="="
              />

              <label htmlFor="filterChoice1">After Incl</label>
              <input
                type="radio"
                id="filterChoice4"
                name="DateFilterOption"
                value=">="
              />

              <label htmlFor="filterChoice1">After</label>
              <input
                type="radio"
                id="filterChoice5"
                name="DateFilterOption"
                value=">"
              />
            </div>
          </fieldset>
        </div>
      </ul>
      <div className="btn-container">
        <Button type="button" className="submit-btn">
          Search
        </Button>
        <Button className="submit-btn">Reset</Button>
      </div>
    </form>
  );
};

export default BugSearchForm;
