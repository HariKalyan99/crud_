import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const blogStore = createContext({
    postList: [],
    addPost: () => {},
    deletePost: () => {},
    editPost: () => {},
    sideDisplay: () => {},
    authenticate: () => {},
    getAuthenticate: "",
    side: "",
    signUp: () => {},
    login: () => {}
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
    const [getAuthenticate, setAuthenticate] = useState("signup");
    // const [postList, setPostList] = useState([]);
  
    const [postList, dispatchPostListFn] = useReducer(pureReducerFn, [])
    const [getNewPosts, setNewPosts] = useState("");
    const [getEditPosts, setEditPosts] = useState("");
    const [getEditId, setEditId] = useState("");
    const [getSignUp, setSignUp] = useState("");
    const [getLogin, setLogin] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      let controller = new AbortController();
      let { signal } = controller;
      let fetchPostList = async () => {
        try {
          const { data } = await axios.get("http://127.0.0.1:8081/api/posts/allPosts", {
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
          console.log(post)
          const { data } = await axios.post("http://127.0.0.1:8081/api/posts/add", {
            ...post,
          });
          
          console.log(data)
        //   setPostList([data, ...postList]);
        dispatchPostListFn({
            type: "ADD_POSTS",
            payload: {data},
        })
          sideDisplay("dashboard");
          navigate("/dashboard")

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

    useEffect(() => {
      const addUser = async(user) => {
        try {
          await axios.post('http://127.0.0.1:8081/api/auth/signup', {
            ...user
          })
          authenticate("login")
          navigate("/login");
        } catch (error) {
          console.log("Error in addUser useEffect", error)
        }
      }

      if(getSignUp.fullname?.length){
        addUser(getSignUp)
      }
    }, [getSignUp])
  
    const sideDisplay = (val) => {
      setSide(val);
    };
  
    const addPost = (post) => {
      let newPost = {
        userId: Number(post.userId),
        title: post.title,
        body: post.body,
        reactions: {
          likes: Number(post.likes),
          dislikes: Number(post.dislikes),
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


    const authenticate = (val) => {
      setAuthenticate(val)
    }


    const signUp = (user) => {
      setSignUp(user);
    }

    const login = (user) => {
      setLogin(user)
    }


    return (
      <blogStore.Provider value={{ postList,authenticate, getAuthenticate,sideDisplay, addPost, deletePost, editPost, side, signUp,login }}>
        {children}
      </blogStore.Provider>
    )
  }
  
  export default BlogstoreProvider