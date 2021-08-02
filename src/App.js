import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import ResultsCard from "./components/ResultsCard";

function App() {
  const [data, setData] = useState([]);
  const [result, setResult] = useState("default");

  return (
    <div>
      <Search setResult={setResult} />
      <ResultsCard result={result} setData={setData} />
    </div>
  );
}

export default App;
