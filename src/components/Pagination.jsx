import { PagNextIcon, PagPrevIcon } from "../icons/Icons";
import { buildPageItems } from "../utils/pagination";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = buildPageItems(totalPages, currentPage);

  return (
    <div className="pag-container">
      <ul className="pag">
        {pages.map((page, index) => {
          if (page.type === "prev") {
            return (
              <li
                key={`prev-${index}`}
                className={`pag-item arrow prev${currentPage === 1 ? " disabled" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <PagPrevIcon />
                </button>
              </li>
            );
          }

          if (page.type === "next") {
            return (
              <li
                key={`next-${index}`}
                className={`pag-item arrow next${currentPage === totalPages ? " disabled" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <PagNextIcon />
                </button>
              </li>
            );
          }

          if (page.type === "dots") {
            return (
              <li key={`dots-${index}`} className="pag-item dots">
                <span>...</span>
              </li>
            );
          }

          return (
            <li
              key={`page-${page.page}`}
              className={`pag-item${currentPage === page.page ? " active" : ""}`}
            >
              <button type="button" onClick={() => onPageChange(page.page)}>
                {page.page}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
