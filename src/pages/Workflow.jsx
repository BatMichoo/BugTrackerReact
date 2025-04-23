import BugSearchForm from "../components/forms/BugSearchForm.jsx";
import { Link, redirect, useLoaderData } from "react-router";
import BugResultTable from "../components/tables/BugResultTable.jsx";
import { createFilters, getBugs } from "../utils/bugAPI.js";
import { getUsers } from "../utils/userAPI.js";

import "../components/buttons/button.css";

const WorkflowPage = () => {
  const loaderData = useLoaderData();
  return (
    <div className="work-container">
      <div className="search-container">
        <h2>Search bugs</h2>
        <BugSearchForm users={loaderData.users} />
      </div>
      <div>
        <Link to="bugs/new" className="create-bug submit-btn">
          Create New
        </Link>
      </div>
      <div className="item-container">
        <BugResultTable resultData={loaderData.bugs} />
      </div>
    </div>
  );
};

export default WorkflowPage;

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const filter = url.searchParams.get("filter");

  let bugResponse;

  if (filter) {
    bugResponse = await getBugs(filter);
  } else {
    bugResponse = await getBugs();
  }

  const userResponse = await getUsers();

  const pageData = {
    bugs: bugResponse,
    users: userResponse,
  };

  return pageData;
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const seachQuery = {
    id: formData.get("Id"),
    priority: formData.get("Priority"),
    status: formData.get("Status"),
    assignedTo: formData.get("AssignedTo"),
    title: formData.get("Title"),
    createdOn: formData.get("CreatedOn") + ";" + formData.get("date-filters"),
  };

  console.log(seachQuery);

  const filters = createFilters(seachQuery);

  console.log(filters);

  return redirect(`?filter=${filters}`);

  const bugs = await getBugs(filters);

  console.log(bugs);
};
