export function sortIssuesByPriority(issues) {
  return [...issues].sort((a, b) => {
    const scoreA = calculatePriorityScore(a);
    const scoreB = calculatePriorityScore(b);
    if (scoreA === scoreB) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return scoreB - scoreA;
  });
}

export function calculatePriorityScore(issue) {
  try {
    const daysSinceCreated = Math.floor(
      (new Date() - new Date(issue.createdAt)) / (1000 * 60 * 60 * 24)
    );
    return issue.severity * 10 + daysSinceCreated * -1 + issue.userDefinedRank;
  } catch (e) {
    return 0;
  }
}
