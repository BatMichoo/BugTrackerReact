import { Link } from "react-router";

const BugResultTable = ({ resultData }) => {
  return (
    <table className="item-table">
      <thead className="item-table-head">
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
                <td>
                  <div className="actions-container">
                    <Link to={"bugs/" + b.id}>Open</Link>
                    <button className="delete-btn">Delete</button>
                  </div>
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
          <td>
            {1 +
              (resultData && resultData.pageInfo?.currentPage - 1) *
                resultData && resultData.pageInfo?.elementsPerPage}
            {" - "}
            {resultData &&
              resultData.pageInfo?.currentPage *
                resultData.pageInfo?.elementsPerPage}
          </td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default BugResultTable;
