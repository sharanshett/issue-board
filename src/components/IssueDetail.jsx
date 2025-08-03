import { useEffect, useState } from "react";
import { useRouter } from "../context/RouterContext.jsx";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";

import { calculatePriorityScore } from "../utils/priority.js";

import INITIAL_ISSUES from "../data/issues.json";

const getRecentIssues = () => {
  try {
    const stored = localStorage.getItem("recentIssues");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
};

const addRecentIssue = (issue) => {
  try {
    const recent = getRecentIssues();
    const filtered = recent.filter((r) => r.id !== issue.id);
    const updated = [issue, ...filtered].slice(0, 5);
    localStorage.setItem("recentIssues", JSON.stringify(updated));
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }
};

export function IssueDetail() {
  const { params, navigate } = useRouter();
  const { colors } = useTheme();
  const { canMarkResolved } = useUser();
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    const foundIssue = INITIAL_ISSUES.find(
      (i) => i.id.toString() === params.id
    );
    if (foundIssue) {
      setIssue(foundIssue);
      addRecentIssue(foundIssue);
    }
  }, [params.id]);

  const handleMarkAsResolved = () => {
    if (!canMarkResolved()) {
      alert("You do not have permission to mark issues as resolved");
      return;
    }
    setIssue((prev) => ({ ...prev, status: "done" }));
    alert("Issue marked as resolved");
  };

  if (!issue) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: colors.background,
          padding: "40px 20px",
          color: colors.text,
          textAlign: "center",
        }}
      >
        <h2>Issue not found</h2>
        <button
          onClick={() => navigate("/board")}
          style={{
            marginTop: "16px",
            padding: "8px 16px",
            backgroundColor: colors.primary,
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Back to Board
        </button>
      </div>
    );
  }

  const priorityScore = calculatePriorityScore(issue);
  const daysSinceCreated = Math.floor(
    (new Date() - new Date(issue.createdAt)) / (1000 * 60 * 60 * 24)
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.background,
        padding: "40px 20px",
        color: colors.text,
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <button
          onClick={() => navigate("/board")}
          style={{
            marginBottom: "20px",
            padding: "8px 16px",
            backgroundColor: "transparent",
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          ← Back to Board
        </button>

        <div
          style={{
            backgroundColor: colors.surface,
            borderRadius: "12px",
            padding: "32px",
            border: `1px solid ${colors.border}`,
            boxShadow: colors.shadow,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "24px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "14px",
                  color: colors.textSecondary,
                  marginBottom: "8px",
                }}
              >
                Issue #{issue.id}
              </div>
              <h1
                style={{
                  margin: "0 0 16px 0",
                  fontSize: "28px",
                  fontWeight: "700",
                }}
              >
                {issue.title}
              </h1>
            </div>

            {canMarkResolved() && issue.status !== "done" && (
              <button
                onClick={handleMarkAsResolved}
                style={{
                  padding: "10px 20px",
                  backgroundColor: colors.success,
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Mark as Resolved
              </button>
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                padding: "16px",
                backgroundColor: colors.background,
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: colors.textSecondary,
                  marginBottom: "4px",
                }}
              >
                Status
              </div>
              <div style={{ fontSize: "14px", fontWeight: "600" }}>
                {issue.status.toUpperCase()}
              </div>
            </div>

            <div
              style={{
                padding: "16px",
                backgroundColor: colors.background,
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: colors.textSecondary,
                  marginBottom: "4px",
                }}
              >
                Assignee
              </div>
              <div style={{ fontSize: "14px", fontWeight: "600" }}>
                {issue.assignee}
              </div>
            </div>

            <div
              style={{
                padding: "16px",
                backgroundColor: colors.background,
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: colors.textSecondary,
                  marginBottom: "4px",
                }}
              >
                Priority
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                {issue.priority}
              </div>
            </div>

            <div
              style={{
                padding: "16px",
                backgroundColor: colors.background,
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: colors.textSecondary,
                  marginBottom: "4px",
                }}
              >
                Severity
              </div>
              <div style={{ fontSize: "14px", fontWeight: "600" }}>
                {issue.severity}/4
              </div>
            </div>

            <div
              style={{
                padding: "16px",
                backgroundColor: colors.background,
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: colors.textSecondary,
                  marginBottom: "4px",
                }}
              >
                Priority Score
              </div>
              <div style={{ fontSize: "14px", fontWeight: "600" }}>
                {priorityScore}
              </div>
            </div>

            <div
              style={{
                padding: "16px",
                backgroundColor: colors.background,
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: colors.textSecondary,
                  marginBottom: "4px",
                }}
              >
                Age
              </div>
              <div style={{ fontSize: "14px", fontWeight: "600" }}>
                {daysSinceCreated} days
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ margin: "0 0 12px 0", fontSize: "18px" }}>
              Description
            </h3>
            <p
              style={{
                margin: 0,
                lineHeight: "1.6",
                color: colors.textSecondary,
              }}
            >
              {issue.description}
            </p>
          </div>

          <div>
            <h3 style={{ margin: "0 0 12px 0", fontSize: "18px" }}>Tags</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {issue.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "4px 12px",
                    backgroundColor: colors.primary,
                    color: "white",
                    borderRadius: "16px",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
