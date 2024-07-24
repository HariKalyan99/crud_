import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const blogStore = createContext({
    postList: [],
    addPost: () => {},
    deletePost: () => {},
    editPost: () => {},
    sideDisplay: () => {},
    side: "",
    signUp: () => {},
    login: () => {},
    jwt: "",
    loginLogout: () => {}
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
    const [getSignUp, setSignUp] = useState("");
    const [getLogin, setLogin] = useState("");
    const [jwt, setJwt] = useState("");
    const [invoke, setInvoke] = useState("")
    const navigate = useNavigate();


   
  
    useEffect(() => {
      let controller = new AbortController();
      let { signal } = controller;
      let fetchPostList = async () => {
        try {
          const { data } = await axios.get("http://localhost:8081/api/posts/allPosts", {
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
          
          const { data } = await axios.post("http://localhost:8081/api/posts/add", {
            ...post,
          });
          
          console.log(data)
        //   setPostList([data, ...postList]); unauthorized token not provided
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
            `http://localhost:8081/posts/${prevId}`,
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
            `http://localhost:8081/posts/${id}`
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
          await axios.post('http://localhost:8081/api/auth/signup', {
            ...user
          })
          navigate("/login");
        } catch (error) {
          console.log("Error in addUser useEffect", error)
        }
      }

      if(getSignUp.fullname?.length){
        addUser(getSignUp)
      }
    }, [getSignUp])

    useEffect(() => {
      const postLogin = async(user) => {
        try {
          const {data} = await axios.post('http://localhost:8081/api/auth/login', {
            ...user
          })
          localStorage.setItem('token', JSON.stringify(data.token))
          loginLogout("login")        
        } catch (error) {
          console.log("Error in addUser useEffect", error)
        }
      }

      if(getLogin.username?.length){
        postLogin(getLogin)
      }
    }, [getLogin])

    useEffect(() => {
      if(invoke == "login"){
        
        setJwt(localStorage.getItem('token'));
        navigate("/createpost")  
      }else{
        localStorage.clear();
        setJwt("")
        navigate("/")
      }
    }, [invoke])


  
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




    const signUp = (user) => {
      setSignUp(user);
    }

    const login = (user) => {
      setLogin(user)
    }
    const loginLogout = (val) => {
      setInvoke(val)
    }

    return (
      <blogStore.Provider value={{ postList,sideDisplay, addPost, deletePost, editPost, side, signUp,login, loginLogout, jwt }}>
        {children}
      </blogStore.Provider>
    )
  }
  
  export default BlogstoreProvider