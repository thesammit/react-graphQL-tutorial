const viewerQuery = {
  query: `
  {
    user: viewer {
      name
      login
      avatarUrl
      bio
      company
      email
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
  }
  `,
};

export default viewerQuery;
