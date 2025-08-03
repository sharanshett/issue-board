export function getRecentIssues() {
  try {
    const stored = localStorage.getItem("recentIssues");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addRecentIssue(issue) {
  try {
    const recent = getRecentIssues();
    const filtered = recent.filter((i) => i.id !== issue.id);
    const updated = [issue, ...filtered].slice(0, 5);
    localStorage.setItem("recentIssues", JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("recentIssuesUpdated"));
  } catch {}
}
