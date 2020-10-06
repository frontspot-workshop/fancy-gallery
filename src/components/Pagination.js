import React from "react";

export default function Pagination({
  onPaginationClick,
  page,
  resultSize,
  totalPages,
}) {
  return (
    <div className="pagination">
      {resultSize && totalPages && (
        <h5 className="pagination__result-wrapper">
          Total: <span className="pagination__result">{resultSize}</span>
          Total pages:{" "}
          <span className="pagination__result"> {totalPages} </span>
        </h5>
      )}
      <div className="pagination__controls">
        <button
          className="btn"
          type="button"
          onClick={() => onPaginationClick(1)}
        >
          {"<<"}
        </button>
        <button
          className="btn"
          type="button"
          onClick={() => onPaginationClick(page - 1)}
        >
          {"<"}
        </button>

        <button
          className="btn"
          type="button"
          onClick={() => onPaginationClick(page)}
        >
          {page}
        </button>

        <button
          className="btn"
          type="button"
          onClick={() => onPaginationClick(page + 1)}
        >
          {">"}
        </button>
        {resultSize && page !== totalPages && (
          <button
            className="btn"
            type="button"
            onClick={() => onPaginationClick(totalPages)}
          >
            {">>"}
          </button>
        )}
      </div>
    </div>
  );
}
