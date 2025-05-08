import { Link, useSearchParams } from "react-router";
import classes from "./BugResultTable.module.css";
import "../buttons/button.css";
import { deleteBug } from "../../utils/bugAPI";
import PageSizeInput from "../inputs/PageSizeInput";
import { PRIORITY_COLORS, STATUS_COLORS } from "../../utils/colors.js";
import { PRIORITY_MAPPING, STATUS_MAPPING } from "../../utils/bugEnums.js";
import { getPermissions } from "../../utils/auth.js";

function getStartingItemCount(pageInfo) {
  if (pageInfo.currentPage == 0) {
    return 0;
  }

  const startingItemCount =
    1 + (pageInfo.currentPage - 1) * pageInfo.elementsPerPage;

  return startingItemCount;
}

function getItemsOnPageCount(pageInfo) {
  if (pageInfo.totalElementCount == 0) {
    return 0;
  }

  const lastItemNumber = pageInfo.currentPage * pageInfo.elementsPerPage;

  if (pageInfo.totalElementCount < pageInfo.elementsPerPage) {
    return pageInfo.totalElementCount;
  } else if (lastItemNumber > pageInfo.totalElementCount) {
    return pageInfo.totalElementCount;
  }

  return lastItemNumber;
}

async function deleteOnClick(bugId) {
  const confirm = window.confirm("Are you sure you want to delete?");

  if (confirm) {
    const success = await deleteBug(bugId);

    if (success) {
      window.alert("Successfully delted!");
    }
  }

  window.location.reload();
}

const BugResultTable = ({ resultData }) => {
  const startingItemCount = getStartingItemCount(resultData?.pageInfo);
  const itemsOnPage = getItemsOnPageCount(resultData?.pageInfo);

  const [searchParams, setSearchParams] = useSearchParams();
  const canDelete = getPermissions().find((p) => p == "Delete");

  function changePageOnClick(pageNumber) {
    setSearchParams((prevState) => {
      const newParams = new URLSearchParams(prevState);

      newParams.set("pageInput", pageNumber);

      return newParams;
    });
  }

  function updatePageSizeOnChange(event) {
    const pageSize = event.target.value;

    if (searchParams.get("pageSizeInput") !== pageSize) {
      setSearchParams((prevState) => {
        const newParams = new URLSearchParams(prevState);

        newParams.set("pageSizeInput", pageSize);

        return newParams;
      });
    }
  }

  return (
    <table className={classes["item-table"]}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Title</th>
          <th>Created By</th>
          <th>Assigned To</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {resultData && resultData.pageInfo.totalElementCount == 0 ? (
          <tr>
            <td colSpan={7}>No Results.</td>
          </tr>
        ) : (
          resultData &&
          resultData.items &&
          resultData.items.map((b) => {
            return (
              <tr key={b.id} className="item-row">
                <td>{b.id}</td>
                <td>
                  <span
                    className={classes.badge}
                    style={{
                      backgroundColor:
                        PRIORITY_COLORS[PRIORITY_MAPPING[b.priority]],
                    }}
                  >
                    {PRIORITY_MAPPING[b.priority]}
                  </span>
                </td>
                <td>
                  <span
                    className={classes.badge}
                    style={{
                      backgroundColor: STATUS_COLORS[STATUS_MAPPING[b.status]],
                    }}
                  >
                    {STATUS_MAPPING[b.status]}
                  </span>
                </td>
                <td>{b.title}</td>
                <td>{b.createdBy.name}</td>
                <td>{b.assignedTo?.name}</td>
                <td className={classes["actions-container"]}>
                  <Link to={"bugs/" + b.id}>Open</Link>
                  <Link
                    to={"bugs/" + b.id + "/edit"}
                    className={classes["edit-btn"]}
                  >
                    Edit
                  </Link>
                  {canDelete ? (
                    <button
                      className={classes["delete-btn"]}
                      onClick={async () => await deleteOnClick(b.id)}
                    >
                      Delete
                    </button>
                  ) : undefined}
                </td>
              </tr>
            );
          })
        )}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={7}>
            <div className={classes["footer-content"]}>
              <span>
                {startingItemCount + " - " + itemsOnPage} /{" "}
                {resultData.pageInfo.totalElementCount}
              </span>
              <span>
                Per page:{" "}
                <PageSizeInput
                  selectedValue={resultData.pageInfo.elementsPerPage}
                  onChange={updatePageSizeOnChange}
                />
              </span>
              <span>
                {resultData?.pageInfo?.hasPrevious ? (
                  <span
                    className={classes["page-control"]}
                    onClick={() =>
                      changePageOnClick(resultData.pageInfo.currentPage - 1)
                    }
                  >
                    {" << "}
                  </span>
                ) : undefined}
                <span>{resultData.pageInfo.currentPage}</span>
                {" / "}
                <span>{resultData.pageInfo.pageCount}</span>
                {resultData?.pageInfo?.hasNext ? (
                  <span
                    className={classes["page-control"]}
                    onClick={() =>
                      changePageOnClick(resultData.pageInfo.currentPage + 1)
                    }
                  >
                    {" >> "}
                  </span>
                ) : undefined}
              </span>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default BugResultTable;
