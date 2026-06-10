const emptyFilters = {
  artist: "",
  location: "",
  yearFrom: "",
  yearTo: "",
};

export { emptyFilters };

export function filterPaintings(paintings, searchQuery, filters) {
  const query = searchQuery.trim().toLowerCase();

  return paintings.filter((painting) => {
    if (query && !painting.title.toLowerCase().includes(query)) {
      return false;
    }

    if (filters.artist && painting.artist !== filters.artist) {
      return false;
    }

    if (filters.location && painting.location !== filters.location) {
      return false;
    }

    const year = Number(painting.year);

    if (filters.yearFrom && year < Number(filters.yearFrom)) {
      return false;
    }

    if (filters.yearTo && year > Number(filters.yearTo)) {
      return false;
    }

    return true;
  });
}
