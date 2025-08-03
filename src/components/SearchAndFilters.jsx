const ASSIGNEES = [
  "John Doe",
  "Jane Smith",
  "Bob Wilson",
  "Alice Brown",
  "Charlie Davis",
  "Eva Green",
  "Frank Miller",
  "Grace Lee",
];
const SEVERITY_LEVELS = [
  { value: 4, label: "Critical" },
  { value: 3, label: "High" },
  { value: 2, label: "Medium" },
  { value: 1, label: "Low" },
];

export function SearchAndFilters({
  searchTerm,
  setSearchTerm,
  assigneeFilter,
  setAssigneeFilter,
  severityFilter,
  setSeverityFilter,
  onClearFilters,
  colors,
}) {
  const hasFilters = searchTerm || assigneeFilter || severityFilter;

  return (
    <div
      style={{
        padding: "20px",
        borderBottom: `1px solid ${colors.border}`,
        backgroundColor: colors.surface,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Search Input */}
        <input
          type="text"
          placeholder="🔍 Search by title or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: "1",
            minWidth: "280px",
            padding: "10px 16px",
            borderRadius: "8px",
            border: `2px solid ${colors.border}`,
            backgroundColor: colors.background,
            color: colors.text,
            fontSize: "14px",
            fontFamily: "inherit",
          }}
        />

        {/* Assignee Filter */}
        <select
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: `2px solid ${colors.border}`,
            backgroundColor: colors.background,
            color: colors.text,
            fontSize: "14px",
            minWidth: "160px",
            fontFamily: "inherit",
          }}
        >
          <option value="">All Assignees</option>
          {ASSIGNEES.map((assignee) => (
            <option key={assignee} value={assignee}>
              {assignee}
            </option>
          ))}
        </select>

        {/* Severity Filter */}
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: `2px solid ${colors.border}`,
            backgroundColor: colors.background,
            color: colors.text,
            fontSize: "14px",
            minWidth: "140px",
            fontFamily: "inherit",
          }}
        >
          <option value="">All Severities</option>
          {SEVERITY_LEVELS.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>

        {/* Clear Filters Button */}
        {hasFilters && (
          <button
            onClick={onClearFilters}
            style={{
              padding: "10px 20px",
              borderRadius: "8px",
              border: `2px solid ${colors.warning}`,
              backgroundColor: colors.warning,
              color: "white",
              fontSize: "14px",
              cursor: "pointer",
              fontWeight: "600",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
            Clear Filters
          </button>
        )}

        {/* Filter Status */}
        {hasFilters && (
          <div
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              backgroundColor: colors.info + "20",
              border: `1px solid ${colors.info}40`,
              color: colors.text,
              fontSize: "12px",
            }}
          >
            {[
              searchTerm && `Search: "${searchTerm}"`,
              assigneeFilter && `Assignee: ${assigneeFilter}`,
              severityFilter &&
                `Severity: ${
                  SEVERITY_LEVELS.find(
                    (s) => s.value.toString() === severityFilter
                  )?.label
                }`,
            ]
              .filter(Boolean)
              .join(" • ")}
          </div>
        )}
      </div>
    </div>
  );
}
