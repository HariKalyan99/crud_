import { createContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";
import CreatePost from "../components/CreatePost";
import axios from "axios";

export const blogStore = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  editPost: () => {},
  sideDisplay: () => {},
  side: "",
});

function App() {
  const [side, setSide] = useState("home");
  const [postList, setPostList] = useState([]);

  const [getNewPosts, setNewPosts] = useState("");
  const [getEditPosts, setEditPosts] = useState("");
  const [getEditId, setEditId] = useState("");

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
    const postFetchAdd = async (post) => {
      try {
        const { data } = await axios.post("http://localhost:8000/posts", {
          ...post,
        });

        setPostList([data, ...postList]);
        sideDisplay("dashboard")
      } catch (error) {
        console.log("Error", error);
      }
    };

    if (getNewPosts.title?.length) {
      postFetchAdd(getNewPosts);
    }
  }, [getNewPosts]);

  useEffect(() => {
    const putFetchEdit = async ({
      userId,
      title,
      body,
      reactions,
      tags,
      prevId,
    }) => {
      try {
        const { data } = await axios.put(
          `http://localhost:8000/posts/${prevId}`,
          {
            userId,
            title,
            body,
            reactions,
            tags,
            views: 100,
          }
        );
        let filteredList = postList.filter(x => x.id?.toString() !== prevId?.toString());
        setPostList([data ,...filteredList])
      } catch (error) {
        console.log("Error", error);
      }
    };

    if (getEditPosts.title?.length) {
      putFetchEdit(getEditPosts);
    }
  }, [getEditPosts]);

  useEffect(() => {
    const delFetchRemove = async (id) => {
      try {
        const { data } = await axios.delete(
          `http://localhost:8000/posts/${id}`
        );
        setPostList(postList.filter(x => x.id?.toString() !== id?.toString()))
      } catch (error) {
        console.log("Error", error);
      }
    };

    if (getEditId?.length) {
      delFetchRemove(getEditId);
    }
  }, [getEditId]);

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
      views: 100,
    };
    setNewPosts(newPost);
  };

  const deletePost = (id) => {
    setEditId(id);
  };

  const editPost = (editPost) => {
    setEditPosts(editPost);
  };

  return (
    <blogStore.Provider
      value={{ postList, sideDisplay, addPost, deletePost, editPost, side }}
    >
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        {side === "home" ? <CreatePost /> : <Dashboard />}
      </div>
      <Footer />
    </blogStore.Provider>
  );
}

export default App;
