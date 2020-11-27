const graphqlQuery = `
  query myGithubProfile($repos_count:Int!) {
    viewer {
      name
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
      avatarUrl
      login
      bio
    }
  }
`;
module.exports = graphqlQuery;
