import { Link, useSearchParams } from "react-router";
import classes from "./BugResultTable.module.css";
import "../buttons/button.css";
import { deleteBug } from "../../utils/bugAPI";

function getStartingItemCount(pageInfo) {
  if (!pageInfo) {
    return 0;
  }

  const startingItemCount =
    1 + (pageInfo.currentPage - 1) * pageInfo.elementsPerPage;

  return startingItemCount;
}

function getItemsOnPageCount(pageInfo) {
  if (!pageInfo) {
    return 0;
  }

  const lastItemNumber = pageInfo.currentPage * pageInfo.elementsPerPage;

  if (pageInfo.totalElementCount < pageInfo.elementsPerPage) {
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

  function changePageOnClick(pageNumber) {
    setSearchParams((prevState) => {
      const newParams = new URLSearchParams(prevState);

      newParams.set("pageInput", pageNumber);

      return newParams;
    });
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
        {resultData &&
          resultData.items &&
          resultData.items.map((b) => {
            return (
              <tr key={b.id} className="item-row">
                <td>{b.id}</td>
                <td>{b.priority}</td>
                <td>{b.status}</td>
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
                  <button
                    className={classes["delete-btn"]}
                    onClick={async () => await deleteOnClick(b.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={7}>
            <div className={classes["footer-content"]}>
              <span>
                {startingItemCount + " - " + itemsOnPage} /{" "}
                {resultData.pageInfo.totalElementCount}
              </span>
              <span>Per page: {resultData.pageInfo.elementsPerPage}</span>
              <span>
                <span
                  className={classes["page-control"]}
                  onClick={
                    resultData?.pageInfo?.hasPrevious
                      ? () =>
                          changePageOnClick(resultData.pageInfo.currentPage - 1)
                      : undefined
                  }
                >
                  {" < "}
                </span>
                <span>{resultData.pageInfo.currentPage}</span>
                {" / "}
                <span>{resultData.pageInfo.pageCount}</span>
                <span
                  className={classes["page-control"]}
                  onClick={
                    resultData?.pageInfo?.hasNext
                      ? () =>
                          changePageOnClick(resultData.pageInfo.currentPage + 1)
                      : undefined
                  }
                >
                  {" > "}
                </span>
              </span>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default BugResultTable;
