import AssignedToInput from "../inputs/AssignedToInput.jsx";
import CreatedOnInput from "../inputs/CreatedOnInput.jsx";
import PrioritySeachInput from "../inputs/PriorityInput.jsx";
import SearchBugIdInput from "../inputs/SearchBugIdInput.jsx";
import StatusInput from "../inputs/StatusInput.jsx";
import TitleInput from "../inputs/TitleInput.jsx";
import DateFilterInput from "../inputs/DateFilterInput.jsx";
import classes from "../forms/BugSearchForm.module.css";
import { Form, useSearchParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreatedByInput from "../inputs/CreatedByInput.jsx";
import { useEffect, useState } from "react";

const BugSearchForm = ({ filters, users }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = useState(filters?.id ?? "");
  const [priority, setPriority] = useState(filters?.priority ?? "");
  const [status, setStatus] = useState(filters?.status ?? "");
  const [assignedTo, setAssignedTo] = useState(filters?.assignedTo ?? "");
  const [createdBy, setCreatedBy] = useState(filters?.createdBy ?? "");
  const [title, setTitle] = useState(filters?.title ?? "");

  const [createdOn, setCreatedOn] = useState(() => {
    const dateParts = filters?.createdOn?.split("_") ?? [];
    return {
      date: dateParts[0] ?? "",
      opts: dateParts[1] ?? "",
    };
  });

  useEffect(() => {
    setId(() => filters?.id ?? "");
    setPriority(filters?.priority ?? "");
    setStatus(filters?.status ?? "");
    setAssignedTo(() => filters?.assignedTo ?? "");
    setCreatedBy(filters?.createdBy ?? "");
    setTitle(filters?.title ?? "");

    if (filters?.createdOn) {
      const dateParts = filters?.createdOn?.split("_") ?? [];
      setCreatedOn({
        date: dateParts[0] ?? "",
        opts: dateParts[1] ?? "",
      });
    }
  }, [filters]);

  function handleReset() {
    if (searchParams.size != 0) {
      setId("");
      setPriority("");
      setStatus("");
      setAssignedTo("");
      setCreatedBy("");
      setTitle("");
      setCreatedOn({ date: "", opts: "" });
      setSearchParams(new URLSearchParams());
    }
  }

  return (
    <Form method="POST">
      <div className={classes["search-input-container"]}>
        <SearchBugIdInput
          selectedValue={id}
          onChange={(e) => setId(e.target.value)}
        />
        <PrioritySeachInput
          selectedValue={priority}
          onChange={(e) => setPriority(e.target.value)}
        />
        <StatusInput
          selectedValue={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <AssignedToInput
          availableValues={users}
          selectedValue={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />
        <CreatedByInput
          availableValues={users}
          selectedValue={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
        />
        <TitleInput
          selectedValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <CreatedOnInput
          selectedValue={createdOn.date}
          onChange={(e) =>
            setCreatedOn((prev) => {
              return { ...prev, date: e.target.value ?? "" };
            })
          }
        />
        <DateFilterInput
          selectedValue={createdOn.opts}
          onChange={(e) =>
            setCreatedOn((prev) => {
              return { ...prev, opts: e.target.value };
            })
          }
        />
      </div>
      <div className="btn-container">
        <button className={classes["submit-btn"]}>Search</button>
        <button type="button" onClick={handleReset}>
          <FontAwesomeIcon icon="arrow-right-rotate" />
        </button>
      </div>
    </Form>
  );
};

export default BugSearchForm;
