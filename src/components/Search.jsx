import { useState } from "react";
import api from "../util/api";

function Search(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const setResult = props.setResult;
  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log();

    const data = api.run(e);
    return await setResult(data);
  };

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>
          Address Search:
          <textarea value={searchTerm} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Search;
