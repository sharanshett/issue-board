import { useState, useEffect, useMemo } from "react";
import { useToast } from "../hooks/useToast.jsx";
import { SearchAndFilters } from "./SearchAndFilters.jsx";
import { ThemeToggle } from "./ThemeToggle.jsx";
import Toast from "./Toast.jsx";
import { UserSwitcher } from "./UserSwitcher.jsx";
import { RecentlyAccessedSidebar } from "./RecentlyAccessedSidebar.jsx";

import { Column } from "./Column.jsx";

import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
import { useRouter } from "../context/RouterContext.jsx";

import { sortIssuesByPriority } from "../utils/priority.js";
import { addRecentIssue } from "../utils/recentIssue.js";

import INITIAL_ISSUES from "../data/issues.json";

const COLUMNS = [
  { id: "backlog", title: "BACKLOG" },
  { id: "in-progress", title: "IN PROGRESS" },
  { id: "done", title: "DONE" },
];

export function Board() {
  const [issues, setIssues] = useState(INITIAL_ISSUES);
  const [searchTerm, setSearchTerm] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOver, setDraggedOver] = useState(null);
  const [lastSync, setLastSync] = useState(new Date());

  const { colors } = useTheme();
  const { currentUser, canDragDrop } = useUser();
  const { navigate } = useRouter();
  const { toasts, addToast, removeToast } = useToast();

  // Polling
  useEffect(() => {
    const interval = setInterval(() => {
      setLastSync(new Date());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Filter and sort issues
  const filteredAndSortedIssues = useMemo(() => {
    let filtered = issues.filter((issue) => {
      const matchesSearch =
        !searchTerm ||
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesAssignee =
        !assigneeFilter || issue.assignee === assigneeFilter;
      const matchesSeverity =
        !severityFilter || issue.severity.toString() === severityFilter;

      return matchesSearch && matchesAssignee && matchesSeverity;
    });

    return sortIssuesByPriority(filtered);
  }, [issues, searchTerm, assigneeFilter, severityFilter]);

  // Group issues by status
  const issuesByStatus = useMemo(() => {
    return COLUMNS.reduce((acc, column) => {
      acc[column.id] = filteredAndSortedIssues.filter(
        (issue) => issue.status === column.id
      );
      return acc;
    }, {});
  }, [filteredAndSortedIssues]);

  // Clear filters function
  const clearFilters = () => {
    setSearchTerm("");
    setAssigneeFilter("");
    setSeverityFilter("");
  };

  // Drag and Drop handlers
  const handleDragStart = (e, item) => {
    if (!canDragDrop()) return;
    setDraggedItem(item);
  };

  const handleDragOver = (e, columnId) => {
    if (!canDragDrop()) return;
    e.preventDefault();
    setDraggedOver(columnId);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOver(null);
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    if (
      !draggedItem ||
      !targetStatus ||
      draggedItem.status === targetStatus ||
      !canDragDrop()
    ) {
      handleDragEnd();
      return;
    }

    const previousState = { ...draggedItem };
    const targetColumn = COLUMNS.find((col) => col.id === targetStatus);

    // Optimistic update
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === draggedItem.id ? { ...issue, status: targetStatus } : issue
      )
    );

    // Add undo toast
    const undoAction = {
      label: "Undo",
      execute: () => {
        setIssues((prev) =>
          prev.map((issue) =>
            issue.id === draggedItem.id ? previousState : issue
          )
        );
      },
    };

    addToast(
      `Moved "${draggedItem.title}" to ${targetColumn.title}`,
      "success",
      undoAction
    );
    handleDragEnd();
  };

  const handleIssueClick = (issue) => {
    addRecentIssue(issue);
    navigate(`/issue/${issue.id}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: colors.background,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: colors.text,
            margin: 0,
          }}
        >
          Issue Board
        </h1>

        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <div style={{ fontSize: "12px", color: colors.textSecondary }}>
            Last sync: {lastSync.toLocaleTimeString()}
          </div>
          <UserSwitcher />
          <ThemeToggle />
        </div>
      </div>

      {/* Status Banner */}
      <div
        style={{
          textAlign: "center",
          padding: "16px 20px",
          backgroundColor: colors.success + "20",
          border: `1px solid ${colors.success}40`,
          color: colors.text,
          borderRadius: 0,
        }}
      >
        <strong>✅ Board is working!</strong> Showing{" "}
        {filteredAndSortedIssues.length} issues across {COLUMNS.length} columns.
        <br />
        <small style={{ color: colors.textSecondary }}>
          Logged in as {currentUser.avatar} <strong>{currentUser.name}</strong>{" "}
          ({currentUser.role})
          {canDragDrop()
            ? " - You can drag & drop issues"
            : " - Read-only access"}
        </small>
      </div>

      {/* Permission Banner for Contributors */}
      {!canDragDrop() && (
        <div
          style={{
            textAlign: "center",
            padding: "12px 20px",
            backgroundColor: colors.warning + "20",
            border: `1px solid ${colors.warning}40`,
            color: colors.text,
          }}
        >
          🔒 <strong>Read-only mode:</strong> Switch to Alice (admin) to enable
          drag & drop functionality
        </div>
      )}

      {/* COMPLETE SEARCH AND FILTERS SECTION */}
      <SearchAndFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        assigneeFilter={assigneeFilter}
        setAssigneeFilter={setAssigneeFilter}
        severityFilter={severityFilter}
        setSeverityFilter={setSeverityFilter}
        onClearFilters={clearFilters}
        colors={colors}
      />

      {/* Main Content */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          gap: "20px",
          alignItems: "flex-start",
          overflow: "auto",
          minHeight: "calc(100vh - 250px)",
        }}
      >
        {/* Board Columns Container */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flex: "1",
            minWidth: 0,
            overflow: "visible",
          }}
        >
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              issues={issuesByStatus[column.id] || []}
              searchTerm={searchTerm}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onIssueClick={handleIssueClick}
              draggedOver={draggedOver}
            />
          ))}
        </div>

        {/* Recently Accessed Sidebar */}
        <RecentlyAccessedSidebar />
      </div>

      {/* Toast Container */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onRemove={removeToast}
            onAction={(action) => {
              action.execute();
              removeToast(toast.id);
            }}
            colors={colors}
          />
        ))}
      </div>
    </div>
  );
}
