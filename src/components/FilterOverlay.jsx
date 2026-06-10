import { useEffect, useState } from "react";
import { CloseIcon, DashIcon } from "../icons/Icons";
import { filterGroups } from "../data/filters";
import { emptyFilters } from "../utils/filterPaintings";

function FilterSelect({ placeholder, options, value, onChange }) {
  return (
    <div className="select-container">
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function FilterYears({ yearFrom, yearTo, onYearFromChange, onYearToChange }) {
  return (
    <div className="inputs-years">
      <input
        type="number"
        placeholder="From"
        value={yearFrom}
        onChange={(event) => onYearFromChange(event.target.value)}
      />
      <span className="dash">
        <DashIcon />
      </span>
      <input
        type="number"
        placeholder="To"
        value={yearTo}
        onChange={(event) => onYearToChange(event.target.value)}
      />
    </div>
  );
}

export default function FilterOverlay({
  isOpen,
  filters,
  filterOptions,
  onClose,
  onApply,
  onClear,
}) {
  const [activeGroups, setActiveGroups] = useState([]);
  const [draft, setDraft] = useState(filters);

  useEffect(() => {
    if (isOpen) {
      setDraft(filters);
    }
  }, [isOpen, filters]);

  const toggleGroup = (id) => {
    setActiveGroups((prev) =>
      prev.includes(id) ? prev.filter((groupId) => groupId !== id) : [...prev, id]
    );
  };

  const updateDraft = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    onApply(draft);
    onClose();
  };

  const handleClear = () => {
    setDraft(emptyFilters);
    onClear();
  };

  const getOptions = (field) => {
    if (field === "artist") return filterOptions.artists;
    if (field === "location") return filterOptions.locations;
    return [];
  };

  return (
    <div className={`filter-overlay${isOpen ? " active" : ""}`} id="filterOverlay">
      <div className="filter-header">
        <button type="button" className="close-btn" id="closeFilter" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>
      <div className="filter-content">
        {filterGroups.map((group) => (
          <div
            key={group.id}
            className={`filter-group${activeGroups.includes(group.id) ? " active" : ""}`}
          >
            <div
              className="filter-group-header"
              onClick={() => toggleGroup(group.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  toggleGroup(group.id);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <span>{group.label}</span>
              <span className="toggle-icon" />
            </div>
            <div className="filter-group-body">
              {group.type === "select" && (
                <FilterSelect
                  placeholder={group.placeholder}
                  options={getOptions(group.field)}
                  value={draft[group.field]}
                  onChange={(value) => updateDraft(group.field, value)}
                />
              )}
              {group.type === "years" && (
                <FilterYears
                  yearFrom={draft.yearFrom}
                  yearTo={draft.yearTo}
                  onYearFromChange={(value) => updateDraft("yearFrom", value)}
                  onYearToChange={(value) => updateDraft("yearTo", value)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="filter-footer">
        <span
          className="result-span"
          onClick={handleApply}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleApply();
          }}
          role="button"
          tabIndex={0}
        >
          show the results
        </span>
        <span
          className="clear-span"
          onClick={handleClear}
          onKeyDown={(event) => {
            if (event.key === "Enter") handleClear();
          }}
          role="button"
          tabIndex={0}
        >
          clear
        </span>
      </div>
    </div>
  );
}
