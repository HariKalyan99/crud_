import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import CreatePost from "./components/CreatePost";
import axios from 'axios';

function App() {
  const [side, setSide] = useState("home");
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    let controller = new AbortController();
    let {signal} = controller;
    let fetchPostList = async() => {
      try {
        const {data} = await axios.get('http://localhost:8000/posts', {signal});
        setPostList(data);
      } catch (error) {
        console.log("Error", error)
      }
    }

    fetchPostList()

    return () => {
      controller.abort();
    }
  }, [])

  const sideDisplay = (val) => {
    setSide(val);
  };

  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <Sidebar sideDisplay={sideDisplay} side={side} />
        {side === "home" ? <CreatePost /> : <Dashboard postList={postList}/>}
      </div>
      <Footer />
    </div>
  );
}

export default App;
