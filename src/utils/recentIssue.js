export function getRecentIssues() {
  try {
    const stored = localStorage.getItem("recentIssues");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

export function addRecentIssue(issue) {
  try {
    const recent = getRecentIssues();
    const filtered = recent.filter((r) => r.id !== issue.id);
    const updated = [issue, ...filtered].slice(0, 5);
    localStorage.setItem("recentIssues", JSON.stringify(updated));
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }
}
