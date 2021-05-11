const query = {
  query: `
  {
    user: viewer {
      name
      login
      avatarUrl
      bio
      company
      email
      repositories(first: 5) {
        list: nodes {
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
      following(first: 10) {
        totalCount
        users: nodes {
          name
          login
          bio
          id
          email
          avatarUrl
        }
      }
    }
    search(query: "user:planetoftheweb sort:updated-desc", type: REPOSITORY, first: 10) {
      repositoryList: nodes {
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
  }
  `,
};

export default query;
