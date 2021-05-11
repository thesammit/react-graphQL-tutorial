import { useCallback, useEffect, useState } from "react";
import github from "./db";
import githubQuery from "./queries/github-query";
import viewerQuery from "./queries/viewer-query";
import RepositoryInfo from "./repository-info";
import SearchBox from "./search-box";
import NavButtons from "./nav-buttons";
import ViewerInfo from "./viewer-info";

const getRepoList = (repoList) => {
  return repoList.map((repo) => repo.repository);
};

const App = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [repoList, setRepoList] = useState(null);
  const [pageCount, setPageCount] = useState(10);
  const [queryString, setQueryString] = useState("");
  const [totalCount, setTotalCount] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const [startCursor, setStartCursor] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [paginationKeyword, setPaginationKeyword] = useState("first");
  const [paginationString, setPaginationString] = useState("");

  const resetPagination = () => {
    setStartCursor(null);
    setEndCursor(null);
    setHasPreviousPage(false);
    setHasNextPage(false);
    setPaginationKeyword("first");
    setPaginationString("");
  };
  const fetchRepositories = useCallback(() => {
    const queryParams = {
      pageCount,
      queryString,
      paginationKeyword,
      paginationString,
      userId: selectedUser,
    };
    const queryText = JSON.stringify(githubQuery(queryParams));

    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: queryText,
    })
      .then((response) => response.json())
      .then((data) => {
        const { search } = data.data;
        let searchedRepositories = getRepoList(search.repositoryList);
        const total = search.repositoryCount;
        const { startCursor: start, endCursor: end, hasNextPage: hasNext, hasPreviousPage: hasPrev } = search.pageInfo;
        setRepoList(searchedRepositories);
        setTotalCount(total);
        setStartCursor(start);
        setEndCursor(end);
        setHasNextPage(hasNext);
        setHasPreviousPage(hasPrev);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [queryString, pageCount, paginationString, paginationKeyword, selectedUser]);

  const fetchUserData = useCallback(() => {
    const queryText = JSON.stringify(viewerQuery);
    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: queryText,
    })
      .then((response) => response.json())
      .then((data) => {
        const { user } = data.data;
        setUserDetails(user);
        setSelectedUser(user.login);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onQueryChange = (newString) => {
    setQueryString(newString);
    resetPagination();
  };
  const onPageLimitChange = (newTotal) => {
    setPageCount(newTotal);
    resetPagination();
  };

  const onPageEvent = (keyword, pageString) => {
    setPaginationKeyword(keyword);
    setPaginationString(pageString);
  };

  const onUserUpdate = (username) => {
    setSelectedUser(username);
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (selectedUser) fetchRepositories();
  }, [fetchRepositories, selectedUser]);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill"></i> Github repositories with GraphQL
      </h1>
      {userDetails && (
        <>
          <ViewerInfo userDetails={userDetails} selectedUser={selectedUser} onUserSelection={onUserUpdate} />
          <SearchBox
            totalCount={totalCount}
            pageCount={pageCount}
            queryString={queryString}
            onQueryChange={onQueryChange}
            onPageLimitChange={onPageLimitChange}
          />
          {repoList && (
            <ul className="list-group list-group-flush">
              {repoList.map((repository) => (
                <RepositoryInfo repository={repository} key={repository.id} />
              ))}
            </ul>
          )}
          <NavButtons start={startCursor} end={endCursor} next={hasNextPage} previous={hasPreviousPage} onPage={onPageEvent} />
        </>
      )}
    </div>
  );
};
export default App;
