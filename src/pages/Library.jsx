import { Link } from "react-router-dom";

function Library() {
  return (
    <div>
      Update music library here.
      <br />
      <Link to="/">Home</Link>
      <br />
      <h2>2023</h2>
      <label>Album</label>
      <input type="text" />
      <br />
      <label>Artist</label>
      <input type="text" />
      <br />
      <br />
      <button>Save</button>
    </div>
  );
}

export default Library;
