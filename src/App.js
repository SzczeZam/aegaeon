import React, { useEffect, useState } from "react";
import Search from "./components/Search";

function App() {
  const [result, setResult] = useState("default");
  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <div>
      <Search setResult={setResult} />
    </div>
  );
}

export default App;
