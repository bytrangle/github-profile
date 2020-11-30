const profileQuery = `
  query myGithubProfile {
    viewer {
      name
      avatarUrl
      login
      bio
    }
  }
`;
const reposQuery = `
  query myRepos($repos_count:Int!) {
    viewer {
      repositories(first: $repos_count, orderBy: {field: PUSHED_AT, direction: DESC}, ownerAffiliations: OWNER) {
        totalCount
        nodes {
          name
          pushedAt
          forkCount
          languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
            nodes {
              name
              color
            }
          }
          stargazerCount
          url
        }
      }
    }
  }
`;
module.exports = { profileQuery, reposQuery };
// module.exports = { profileQuery, reposQuery };
