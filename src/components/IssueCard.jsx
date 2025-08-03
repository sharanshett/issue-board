import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";

import { calculatePriorityScore } from "../utils/priority.js";

export default function IssueCard({
  issue,
  searchTerm,
  onDragStart,
  onDragEnd,
  onClick,
}) {
  const { colors } = useTheme();
  const { canDragDrop } = useUser();
  const [isDragging, setIsDragging] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return colors.error;
      case "high":
        return colors.warning;
      case "medium":
        return colors.info;
      case "low":
        return colors.success;
      default:
        return colors.textSecondary;
    }
  };

  const priorityScore = calculatePriorityScore(issue);

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span
          key={index}
          style={{
            backgroundColor: "#ffeb3b",
            color: "#000",
            padding: "2px",
            borderRadius: "2px",
          }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      draggable={canDragDrop()}
      onClick={() => onClick && onClick(issue)}
      onDragStart={(e) => {
        if (canDragDrop() && onDragStart) {
          setIsDragging(true);
          onDragStart(e, issue);
        }
      }}
      onDragEnd={(e) => {
        setIsDragging(false);
        if (onDragEnd) onDragEnd(e);
      }}
      style={{
        backgroundColor: colors.cardBackground,
        border: `1px solid ${colors.border}`,
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        boxShadow: colors.shadow,
        cursor: onClick ? "pointer" : canDragDrop() ? "grab" : "default",
        opacity: isDragging ? 0.5 : 1,
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (!isDragging) {
          e.currentTarget.style.transform = "translateY(-2px)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragging) {
          e.currentTarget.style.transform = "translateY(0px)";
        }
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            color: colors.textSecondary,
            fontWeight: "600",
          }}
        >
          #{issue.id}
        </span>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <span style={{ fontSize: "10px", color: colors.textSecondary }}>
            Score: {priorityScore}
          </span>
          <span
            style={{
              fontSize: "10px",
              padding: "4px 8px",
              borderRadius: "12px",
              backgroundColor: getPriorityColor(issue.priority),
              color: "white",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {issue.priority}
          </span>
        </div>
      </div>

      <h4
        style={{
          margin: "0 0 8px 0",
          fontSize: "14px",
          fontWeight: "600",
          color: colors.text,
          lineHeight: "1.3",
        }}
      >
        {highlightText(issue.title, searchTerm)}
      </h4>

      <p
        style={{
          margin: "0 0 12px 0",
          fontSize: "12px",
          color: colors.textSecondary,
          lineHeight: "1.3",
        }}
      >
        {issue.description.length > 100
          ? `${issue.description.substring(0, 100)}...`
          : issue.description}
      </p>

      <div style={{ marginBottom: "8px" }}>
        {issue.tags.map((tag) => (
          <span
            key={tag}
            style={{
              display: "inline-block",
              fontSize: "10px",
              padding: "2px 6px",
              borderRadius: "4px",
              backgroundColor: colors.border,
              color: colors.textSecondary,
              marginRight: "4px",
              marginBottom: "4px",
            }}
          >
            {highlightText(tag, searchTerm)}
          </span>
        ))}
      </div>

      <div
        style={{
          fontSize: "12px",
          color: colors.textSecondary,
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <span>👤</span> {issue.assignee}
      </div>

      {!canDragDrop() && (
        <div
          style={{
            marginTop: "8px",
            fontSize: "10px",
            color: colors.textSecondary,
            fontStyle: "italic",
          }}
        >
          🔒 Read-only access
        </div>
      )}
    </div>
  );
}
