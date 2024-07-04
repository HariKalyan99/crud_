import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import CreatePost from "./components/CreatePost";
import axios from "axios";

function App() {
  const [side, setSide] = useState("home");
  const [postList, setPostList] = useState([]);


  const [getNewPosts, setNewPosts] = useState("");

  useEffect(() => {
    let controller = new AbortController();
    let { signal } = controller;
    let fetchPostList = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/posts", {
          signal,
        });
        setPostList(data);
      } catch (error) {
        console.log("Error", error);
      }
    };

    fetchPostList();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const postFetchAdd = async(post) => {
      try {
        const {data} = await axios.post('http://localhost:8000/posts', {
          ...post
        })

        console.log(data)
      } catch (error) {
        console.log("Error", error)
      }
    }

    if(getNewPosts.title?.length){
      postFetchAdd(getNewPosts);
    }

  }, [getNewPosts])

  // useEffect(() => {
  //   const putFetchEdit = async(data) => {
  //     try {
  //       const {data} = await axios.put('http://localhost:8000/posts', {
  //         ...data, views: 100,
  //       })

  //       console.log(data)
  //     } catch (error) {
  //       console.log("Error", error)
  //     }
  //   }

  //   putFetchEdit();

  // }, [])

  // useEffect(() => {
  //   const delFetchRemove = async(data) => {
  //     try {
  //       const {data} = await axios.delete('http://localhost:8000/posts', {
  //         ...data, views: 100,
  //       })

  //       console.log(data)
  //     } catch (error) {
  //       console.log("Error", error)
  //     }
  //   }

  //   delFetchRemove();

  // }, [])
  const sideDisplay = (val) => {
    setSide(val);
  };

  const addPost = (post) => {
    let newPost = {
      userId: post.userId,
      title: post.title,
      body: post.body,
      reactions: {
        likes: post.likes,
      dislikes: post.dislikes,
      },
      tags: post.tags,
      views: 100
    }
    setNewPosts(newPost);
  };

  const deletePost = (id) => {
    console.log(id);
  };

  const editPost = (newPost, prevId) => {
    console.log(newPost, prevId);
  };


  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <Sidebar sideDisplay={sideDisplay} side={side} />
        {side === "home" ? (
          <CreatePost addPost={addPost} />
        ) : (
          <Dashboard
            deletePost={deletePost}
            editPost={editPost}
            postList={postList}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
