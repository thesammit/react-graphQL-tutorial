const RepositoryInfo = ({ repository }) => {
  let license;

  switch (repository.licenseInfo?.spdxId) {
    case undefined:
      license = (
        <span
          className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-danger"
          style={{ fontSize: ".6em" }}>
          NO LICENSE
        </span>
      );
      break;
    case "NOASSERTION":
      license = (
        <span
          className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-warning"
          style={{ fontSize: ".6em" }}>
          {repository.licenseInfo.spdxId}
        </span>
      );
      break;
    default:
      license = (
        <span
          className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-outline-success"
          style={{ fontSize: ".6em" }}>
          {repository.licenseInfo.spdxId}
        </span>
      );
  }

  return (
    <li className="list-group-item px-0" key={repository.id.toString()}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column">
          <a className="h5 mb-0 text-decoration-none" href={repository.url} target="_blank" rel="noreferrer">
            {repository.name}
          </a>
          <p className="small">{repository.description}</p>
        </div>
        <div className="text-nowrap ms-3">
          {license}
          <span
            className={
              "px-1 py-0 ms-1 d-inline-block btn btn-sm " +
              (repository.viewerSubscription === "SUBSCRIBED"
                ? "btn-success"
                : "btn-outline-secondary")
            }
            style={{ fontSize: ".6em" }}>
            {repository.viewerSubscription}
          </span>
        </div>
      </div>
    </li>
  );
};

export default RepositoryInfo;
