import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [isPatchOn, setIsPatchOn] = useState(false);
  const [patchValue, setPatchValue] = useState("");

  //GET 요청
  const getData = async () => {
    const getResponse = await axios("http://localhost:8080/database", {
      timeout: 2000,
    }) //취소: 2초 지나면 종료: error 로깅
      .catch((err) => console.log(err.message));
    //   console.log(getResponse);
    setData(getResponse.data); //요청-응답데이터: 기본적으로 JSON 타입
  };
  {
    console.log(3);
  }
  //POST 요청
  const postData = async () => {
    //전송시 JSON 문자열 자동처리
    const body = {
      id: Math.floor(Math.random() * 10 ** 3),
      title: value,
    };

    await axios.post("http://localhost:8080/database", body).catch((err) => {
      console.log(err.message);
    }); //2xx가 아닐 경우 promise reject
    //   .catch(err=>{
    //     if (err.response){
    //       const {status, config} = err.response;

    //       if (status === 404){console.log(`404: not found`)}

    //       if (status === 500){console.log('server error')}
    //     }
    //     else if (err.request){console.log('Error', err.message)}
    //     else {console.log('Error', err.message)}
    //   })

    setData((prev) => [...prev, body]);
  };

  // const postData = async () => { //전송시 JSON 문자열 자동처리
  //     const post = {
  //         headers: {
  //             "Content-Type": "application/json",
  //           },
  //           data: {
  //             id: Math.floor(Math.random()*(10**3)),
  //             title: value,
  //           }

  //     }

  //     await axios.post('http://localhost:8080/database', post)
  //     setData(prev => [...prev, post.data])
  //   }

  const deleteData = async (id) => {
    await axios.delete(`http://localhost:8080/database/${id}`);
    setData((prev) => prev.filter((e) => e.id !== id));
  };

  const updateData = async (id) => {
    await axios.patch(`http://localhost:8080/database/${id}`, { title: value });
    //onChangeHandler

    setData((prev) => {
      return prev;
    });
  };

  const onPatchHandler = (e) => {
    setPatchValue(e.target.value);
  };

  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    getData();
  }, [data]);

  return (
    <div className="container">
      <div className="box">
        <h1 className="title">check api</h1>
        <p className="count">data length : {data.length}</p>
        <>
          <div className="box2">
            <input
              className="input"
              type="text"
              value={value}
              onChange={onChangeHandler}
            />
            <button onClick={postData}>POST</button>
          </div>
        </>
        {data.map((e) => (
          <div key={e.id} data={e}>
            {`id:${e.id}, title:${e.title}`}
            <button onClick={() => deleteData(e.id)}>delete</button>
            <button onClick={() => updateData(e.id)}>update</button>
            {
              //isPatchOn? <input type="text" key={e.id} value={patchValue} onChange={onPatchHandler}></input>: null
            }
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
