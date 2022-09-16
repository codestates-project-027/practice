import "./App.css";
import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [test, setTest] = useState("");

  const getData = () => {
    api.Test.get().then((data) => {
      setTest(data);
    });
  };

  const postData = () => {
    api.Test.post().then((data) => {
      setTest(data);
    });
  };

  const patchData = () => {
    api.Test.patch().then((data) => {
      setTest(data);
    });
  };

  const deleteData = () => {
    api.Test.delete().then((data) => {
      setTest(data);
    });
  };

  console.log(test);

  return (
    <div className="App">
      <button onClick={getData}>GET</button>
      <button onClick={postData}>POST</button>
      <button onClick={patchData}>PATCH</button>
      <button onClick={deleteData}>DELETE</button>
    </div>
  );
}

export default App;
