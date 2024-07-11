import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";

export const blogStore = createContext({
    postList: [],
    addPost: () => {},
    deletePost: () => {},
    editPost: () => {},
    sideDisplay: () => {},
    side: "",
  });

  function pureReducerFn(currentState, action){
    let newPostList = currentState;
    if(action.type === "INITIAL_POSTS"){
        newPostList = action.payload.data;
    }else if(action.type === "ADD_POSTS"){
        newPostList = [action.payload.data, ...currentState]
    }else if(action.type === "DELETE_POSTS"){
        newPostList = currentState.filter(x => x.id?.toString() !== action.payload.id?.toString())
    }else if(action.type === "EDIT_POSTS"){
        let filteredList = currentState.filter(x => x.id?.toString() !== action.payload.prevId?.toString());
        newPostList = [action.payload.data, ...filteredList]
    }
    return newPostList;
  }

  
  const BlogstoreProvider = ({children}) => {
    const [side, setSide] = useState("home");
    // const [postList, setPostList] = useState([]);
  
    const [postList, dispatchPostListFn] = useReducer(pureReducerFn, [])
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
        //   setPostList(data);
        dispatchPostListFn({
            type: "INITIAL_POSTS",
            payload: {data},
        })
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
  
        //   setPostList([data, ...postList]);
        dispatchPostListFn({
            type: "ADD_POSTS",
            payload: {data},
        })
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
        //   let filteredList = postList.filter(x => x.id?.toString() !== prevId?.toString());
        //   setPostList([data ,...filteredList])
        dispatchPostListFn({
            type: "EDIT_POSTS",
            payload: {data, prevId},
        })
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
        //   setPostList(postList.filter(x => x.id?.toString() !== id?.toString()))
        dispatchPostListFn({
            type: "DELETE_POSTS",
            payload: {id},
        })
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
      <blogStore.Provider value={{ postList, sideDisplay, addPost, deletePost, editPost, side }}>
        {children}
      </blogStore.Provider>
    )
  }
  
  export default BlogstoreProvider