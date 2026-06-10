import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Gallery from "./components/Gallery";
import Pagination from "./components/Pagination";
import FilterOverlay from "./components/FilterOverlay";
import { useTheme } from "./hooks/useTheme";
import { usePaintings } from "./hooks/usePaintings";
import { emptyFilters, filterPaintings } from "./utils/filterPaintings";
import { getFilterOptions } from "./utils/filterOptions";
import { getTotalPages, paginateItems } from "./utils/pagination";

export default function App() {
  const { toggleTheme } = useTheme();
  const { paintings, isLoading, error } = usePaintings();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(emptyFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPaintings = useMemo(
    () => filterPaintings(paintings, searchQuery, filters),
    [paintings, searchQuery, filters]
  );

  const filterOptions = useMemo(() => getFilterOptions(paintings), [paintings]);

  const totalPages = getTotalPages(filteredPaintings.length);
  const visiblePaintings = paginateItems(filteredPaintings, currentPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <>
      <Header onToggleTheme={toggleTheme} />
      <main>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenFilter={() => setIsFilterOpen(true)}
        />
        {isLoading && <div className="container">Loading...</div>}
        {error && <div className="container">{error}</div>}
        {!isLoading && !error && <Gallery paintings={visiblePaintings} />}
        {!isLoading && !error && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>
      <FilterOverlay
        isOpen={isFilterOpen}
        filters={filters}
        filterOptions={filterOptions}
        onClose={() => setIsFilterOpen(false)}
        onApply={setFilters}
        onClear={() => setFilters(emptyFilters)}
      />
    </>
  );
}
