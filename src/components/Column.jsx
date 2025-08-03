import IssueCard from "./IssueCard";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";

export function Column({
  column,
  issues,
  searchTerm,
  onDrop,
  onDragOver,
  onDragStart,
  onDragEnd,
  onIssueClick,
  draggedOver,
}) {
  const { colors } = useTheme();
  const { canDragDrop } = useUser();

  return (
    <div
      onDragOver={(e) => {
        if (canDragDrop() && onDragOver) {
          e.preventDefault();
          onDragOver(e, column.id);
        }
      }}
      onDrop={(e) => {
        if (canDragDrop() && onDrop) {
          e.preventDefault();
          onDrop(e, column.id);
        }
      }}
      style={{
        backgroundColor: colors.surface,
        borderRadius: "12px",
        padding: "20px",
        minHeight: "600px",
        width: "320px",
        maxWidth: "320px",
        flexShrink: 0,
        border: `1px solid ${
          draggedOver === column.id ? colors.primary : colors.border
        }`,
        boxShadow: colors.shadow,
        transition: "all 0.2s ease",
      }}
    >
      <h3
        style={{
          margin: "0 0 20px 0",
          fontSize: "18px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: colors.text,
        }}
      >
        {column.title}
        <span
          style={{
            backgroundColor: colors.primary,
            color: "white",
            borderRadius: "16px",
            padding: "4px 12px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {issues.length}
        </span>
      </h3>

      <div>
        {issues.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: colors.textSecondary,
              border: `2px dashed ${colors.border}`,
              borderRadius: "8px",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
            <p style={{ margin: "0 0 8px 0", fontWeight: "600" }}>No issues</p>
            <small style={{ fontSize: "12px" }}>
              {column.id === "backlog"
                ? "Add new issues to get started"
                : column.id === "in-progress"
                ? "Move issues here when you start working"
                : "Completed issues will appear here"}
            </small>
          </div>
        ) : (
          issues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              searchTerm={searchTerm}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onClick={onIssueClick}
            />
          ))
        )}
      </div>
    </div>
  );
}
