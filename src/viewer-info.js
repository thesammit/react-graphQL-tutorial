import UserInfo from "./user-info";
const selectedClass = (userName, selectedUser) => {
  return selectedUser === userName ? "bg-info" : "";
};
const ViewerInfo = ({ userDetails, onUserSelection, selectedUser }) => {
  return (
    <div className="card my-2">
      <div className="card-body position-relative fw-lighter">
        <div className="position-absolute top-0 end-0 me-2">
          Signed in as <strong>{userDetails.login}</strong>
        </div>
        <UserInfo type="hero" user={userDetails} onUserSelection={onUserSelection}/>
        {userDetails.following && (
          <>
            <div className="bg-light ms-1 my-2 px-1 py-2 small rounded-3">
              <h3 className="mt-3">Select 1 of the {userDetails.following.totalCount} following user to show repositories: </h3>
            </div>
            {userDetails.following && (
              <ul className="list-group list-group-flush">
                {userDetails.following?.users.map((user) => (
                  <li className="list-group-item px-0" key={user.id}>
                    <div className={`${selectedClass(user.login, selectedUser)} rounded-3 d-flex align-items-center`}>
                      <UserInfo user={user} selectedUser={selectedUser} />
                      <button onClick={() => onUserSelection(user.login)} className="btn btn-primary mx-2">
                        select
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewerInfo;
