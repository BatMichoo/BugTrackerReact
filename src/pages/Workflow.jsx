import BugSearchForm from "../components/forms/BugSearchForm.jsx";
import { Link, redirect, useLoaderData } from "react-router";
import BugResultTable from "../components/tables/BugResultTable.jsx";
import { getBugs } from "../utils/bugAPI.js";
import { getUsers } from "../utils/userAPI.js";
import { createFilters, FILTER_SEPARATORS } from "../utils/bugFilterFactory.js";

import "../components/buttons/button.css";

const WorkflowPage = () => {
  const loaderData = useLoaderData();
  return (
    <div className="work-container">
      <div className="search-container">
        <h2>Search bugs</h2>
        <BugSearchForm
          users={loaderData.users}
          filters={loaderData.bugs.filters}
        />
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
  const pageInput = url.searchParams.get("pageInput");
  const pageSizeInput = url.searchParams.get("pageSizeInput");

  let queryString = "";

  if (filter && filter !== "") {
    queryString += `?filter=${filter}`;
  }

  if (!filter && pageInput) {
    queryString += `?pageInput=${pageInput}`;
  } else if (pageInput) {
    queryString += `&pageInput=${pageInput}`;
  }

  if (!filter && !pageInput && pageSizeInput) {
    queryString += `?pageSizeInput=${pageSizeInput}`;
  } else if (pageSizeInput) {
    queryString += `&pageSizeInput=${pageSizeInput}`;
  }

  const bugResponse = await getBugs(queryString);
  const userResponse = await getUsers();

  const pageData = {
    bugs: bugResponse,
    users: userResponse,
  };

  return pageData;
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  let dateInput = formData.get("CreatedOn");

  if (dateInput) {
    dateInput += FILTER_SEPARATORS.keyValue + formData.get("date-filters");
  }

  const seachQuery = {
    id: formData.get("Id"),
    priority: formData.get("Priority"),
    status: formData.get("Status"),
    assignedTo: formData.get("AssignedTo"),
    title: formData.get("Title"),
    createdOn: dateInput,
  };

  const filters = createFilters(seachQuery);

  return redirect(`?filter=${filters}`);
};
