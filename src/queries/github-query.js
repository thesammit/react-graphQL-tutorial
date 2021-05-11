const githubQuery = ({pageCount, queryString, paginationKeyword, paginationString, userId}) => {
  return {
    query: `
  {
    search(query:"${queryString} user:${userId} sort:updated-desc", type: REPOSITORY, ${paginationKeyword}: ${pageCount}, ${paginationString}) {
      repositoryCount
      repositoryList: edges {
        cursor
        repository: node {
          ... on Repository {
            id
            name
            description
            url
            viewerSubscription
            licenseInfo {
              spdxId
              url
            }
          }
        }
      }
      pageInfo{
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
        endCursor
      }
    }
  }
  `,
  };
};

export default githubQuery;
