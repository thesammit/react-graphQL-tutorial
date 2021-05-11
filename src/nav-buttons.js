const NavButtons = ({
  start, end, next, previous, onPage
}) => {
  return (
    <div className="d-flex justify-content-end my-2">
      {previous && (
        <button
          className="btn mx-1 btn btn-primary bi bi-arrow-left"
          onClick={() => onPage("last", `before: "${start}"`)}></button>
      )}
      {next && (
        <button
          className="btn mx-1 btn btn-primary bi bi-arrow-right"
          onClick={() => onPage("first", `after: "${end}"`)}></button>
      )}
    </div>
  );
}

export default NavButtons;