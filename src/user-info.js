const UserInfo = ({ user, type = "child", onUserSelection }) => {
  const isHero = type === "hero";
  return (
    <div className={`${type} position-relative d-flex justify-content-start align-items-center flex-grow-1`}>
      <img src={user.avatarUrl} className="img-thumbnail image m-1 me-3" alt={user.name} />
      <div className="item">
        <div className={isHero ? "fs-2" : "fs-4"}>
          <strong>{isHero ? `Welcome, ${user.name}` : `${user.name} (${user.login})`}</strong>
        </div>
        <div>{user.bio}</div>
        <div>{user.company}</div>
        <div>{user.email}</div>
        {user.following && <div>Following: {user.following.totalCount}</div>}
      </div>
      {isHero && <div className="position-absolute bottom-0 end-0">
        <button onClick={() => onUserSelection(user.login)} className="btn btn-sm btn-secondary">Show my repositories</button>
      </div>}
    </div>
  );
};

export default UserInfo;
