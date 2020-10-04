import React from "react";

export default function Pagination({
  onPaginationClick,
  page,
  resultSize,
  totalPages,
}) {
  return (
    <div>
      <h2>Pagination</h2>
      <div>
        <button type="button" onClick={() => onPaginationClick(1)}>
          {"<<"}
        </button>
        <button type="button" onClick={() => onPaginationClick(page - 1)}>
          {"<"}
        </button>

        <button type="button" onClick={() => onPaginationClick(page)}>
          {page}
        </button>

        <button type="button" onClick={() => onPaginationClick(page + 1)}>
          {">"}
        </button>
        {resultSize && page !== totalPages && (
          <button type="button" onClick={() => onPaginationClick(totalPages)}>
            {">>"}
          </button>
        )}
      </div>
    </div>
  );
}
