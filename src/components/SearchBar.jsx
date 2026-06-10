import { FilterIcon, SearchIcon } from "../icons/Icons";

export default function SearchBar({ searchQuery, onSearchChange, onOpenFilter }) {
  return (
    <div className="container">
      <div className="search">
        <SearchIcon />
        <input
          type="text"
          placeholder="Painting title"
          className="search-input"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
      <div className="icon-btn">
        <button type="button" id="openFilter" onClick={onOpenFilter}>
          <FilterIcon />
        </button>
      </div>
    </div>
  );
}
