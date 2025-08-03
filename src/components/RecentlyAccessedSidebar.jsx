import { useEffect, useState } from "react";
import { useRouter } from "../context/RouterContext.jsx";
import { useTheme } from "../context/ThemeContext";

import { getRecentIssues } from "../utils/recentIssue.js";

export function RecentlyAccessedSidebar() {
  const [recentIssues, setRecentIssues] = useState([]);
  const { colors } = useTheme();
  const { navigate } = useRouter();

  useEffect(() => {
    setRecentIssues(getRecentIssues());
  }, []);

  const handleIssueClick = (issue) => {
    navigate(`/issue/${issue.id}`);
  };

  return (
    <div
      style={{
        width: "280px",
        maxWidth: "280px",
        flexShrink: 0,
        backgroundColor: colors.surface,
        borderRadius: "12px",
        padding: "20px",
        height: "fit-content",
        border: `1px solid ${colors.border}`,
        boxShadow: colors.shadow,
      }}
    >
      <h3
        style={{
          margin: "0 0 16px 0",
          fontSize: "16px",
          fontWeight: "bold",
          color: colors.text,
        }}
      >
        🕐 Recently Accessed
      </h3>

      <div>
        {recentIssues.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              color: colors.textSecondary,
              fontSize: "14px",
            }}
          >
            No recent issues yet. Click on an issue to add it here.
          </div>
        ) : (
          recentIssues.map((issue) => (
            <div
              key={issue.id}
              onClick={() => handleIssueClick(issue)}
              style={{
                padding: "12px",
                borderRadius: "6px",
                marginBottom: "8px",
                cursor: "pointer",
                border: `1px solid ${colors.border}`,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = colors.background;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: colors.text,
                  marginBottom: "4px",
                }}
              >
                #{issue.id}{" "}
                {issue.title.length > 30
                  ? `${issue.title.substring(0, 30)}...`
                  : issue.title}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: colors.textSecondary,
                }}
              >
                {issue.assignee} • {issue.priority}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
