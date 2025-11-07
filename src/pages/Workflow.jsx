import BugSearchForm from "../components/forms/BugSearchForm.jsx";
import { Suspense } from "react";
import { Await, Link, redirect, useLoaderData } from "react-router";
import BugResultTable from "../components/tables/BugResultTable.jsx";
import { getBugs } from "../utils/bugAPI.js";
import { getUsers } from "../utils/userAPI.js";
import { createFilters, FILTER_SEPARATORS } from "../utils/bugFilterFactory.js";
import "../components/buttons/button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSearches } from "../utils/savedSearchAPI.js";
import SavedSearch from "../components/searches/SavedSearch.jsx";

const WorkflowPage = () => {
  const loaderData = useLoaderData();
  return (
    <div className="work-container">
      <div className="search-container section">
        <h1>Search bugs</h1>
        <Suspense
          fallback={
            <FontAwesomeIcon icon="spinner" spinPulse size="3x" color="black" />
          }
        >
          <Await resolve={loaderData.bugs}>
            {(resolved) => {
              return (
                <BugSearchForm
                  users={loaderData.users}
                  filters={resolved.filters}
                />
              );
            }}
          </Await>
        </Suspense>
        <SavedSearch searches={loaderData.searches} />
      </div>
      <div>
        <Link to="bugs/new" className="button create-bug">
          <FontAwesomeIcon icon="plus" /> New
        </Link>
      </div>
      <div className="item-container">
        <BugResultTable resultData={loaderData.bugs} />
      </div>
    </div>
  );
};

export default WorkflowPage;

let usersPromise = null;
let searchesPromise = null;

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

  if (!usersPromise) {
    usersPromise = getUsers();
  }
  const users = await usersPromise;

  if (!searchesPromise) {
    searchesPromise = getSearches();
  }

  const searches = await searchesPromise;

  const bugs = getBugs(queryString);

  return {
    bugs,
    users,
    searches,
  };
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
    createdBy: formData.get("CreatedBy"),
    title: formData.get("Title"),
    createdOn: dateInput,
  };

  const filters = createFilters(seachQuery);

  return redirect(filters != "" ? `?filter=${filters}` : "");
};
