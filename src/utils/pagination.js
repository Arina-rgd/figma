export const ITEMS_PER_PAGE = 6;

export function paginateItems(items, currentPage) {
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  return items.slice(start, start + ITEMS_PER_PAGE);
}

export function getTotalPages(itemsCount) {
  return Math.max(1, Math.ceil(itemsCount / ITEMS_PER_PAGE));
}

export function buildPageItems(totalPages, currentPage) {
  const items = [{ type: "prev" }];

  if (totalPages <= 5) {
    for (let page = 1; page <= totalPages; page += 1) {
      items.push({ type: "page", page });
    }
  } else if (currentPage <= 3) {
    items.push({ type: "page", page: 1 });
    items.push({ type: "page", page: 2 });
    items.push({ type: "page", page: 3 });
    items.push({ type: "dots" });
    items.push({ type: "page", page: totalPages });
  } else if (currentPage >= totalPages - 2) {
    items.push({ type: "page", page: 1 });
    items.push({ type: "dots" });
    items.push({ type: "page", page: totalPages - 2 });
    items.push({ type: "page", page: totalPages - 1 });
    items.push({ type: "page", page: totalPages });
  } else {
    items.push({ type: "page", page: 1 });
    items.push({ type: "dots" });
    items.push({ type: "page", page: currentPage });
    items.push({ type: "dots" });
    items.push({ type: "page", page: totalPages });
  }

  items.push({ type: "next" });

  return items;
}
