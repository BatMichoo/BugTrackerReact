import { Link } from "react-router";
import classes from "./BugResultTable.module.css";
import "../buttons/button.css";

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

const BugResultTable = ({ resultData }) => {
  const startingItemCount = getStartingItemCount(resultData?.pageInfo);
  const itemsOnPage = getItemsOnPageCount(resultData?.pageInfo);
  return (
    <table className={classes["item-table"]}>
      <thead className={classes["item-table-head"]}>
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
                  <button className={classes["delete-btn"]}>Delete</button>
                </td>
              </tr>
            );
          })}
      </tbody>
      <tfoot className="item-table-foot">
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>{startingItemCount + " - " + itemsOnPage}</td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default BugResultTable;
