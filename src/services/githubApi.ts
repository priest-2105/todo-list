interface GitHubRepoInfo {
  [key: string]: any;
}

export const fetchGitHubInfo = async (): Promise<{
  repoData: GitHubRepoInfo;
  branchData: GitHubRepoInfo;
}> => {
  const username = "priest-2105";
  const repo = "todo-list";
  const branch = "main";
  try {
    const [repoResponse, branchResponse] = await Promise.all([
      fetch(`https://api.github.com/repos/${username}/${repo}`),
      fetch(`https://api.github.com/repos/${username}/${repo}/branches/${branch}`),
    ]);

    if (repoResponse.ok && branchResponse.ok) {
      const [repoData, branchData] = await Promise.all([
        repoResponse.json(),
        branchResponse.json(),
      ]);

      return { repoData, branchData };
    } else {
      throw new Error("Failed to fetch repository information");
    }
  } catch (error) {
    console.error(error);
    return { repoData: {}, branchData: {} };
  }
};
