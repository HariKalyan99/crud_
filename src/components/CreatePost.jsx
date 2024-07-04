import React, { useRef } from 'react'

const CreatePost = ({addPost}) => {


  const userIdRef = useRef("");
  const titleRef = useRef("");
  const bodyRef = useRef("");
  const likesRef = useRef("");
  const disLikesRef = useRef("");
  const tagsRef = useRef("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = userIdRef.current.value;
const title = titleRef.current.value;
const body = bodyRef.current.value;
const likes = likesRef.current.value;
const dislikes = disLikesRef.current.value;
const tags = tagsRef.current.value.split(",");
    addPost({userId,
      title,
      body,
      tags, likes, dislikes})

//     userIdRef.current.value = ""
// titleRef.current.value = ""
// bodyRef.current.value = ""
// reactionsRef.current.value = ""
// tagsRef.current.value = ""
  }
  return (
    <form className='d-flex flex-column justify-content-center align-items-center gap-3 w-100 m-5' onSubmit={(e) => handleSubmit(e)}>
        <label id='userId'>User Id</label>
        <input type="number" placeholder='type...'className='w-75 p-2' ref={userIdRef}/>

        
        <label id='title'>Title</label>
        <input type="text" placeholder='type...'className='w-75 p-2' ref={titleRef}/>

        
        <label id='body'>Body</label>
        <textarea type="text"  rows={4} placeholder='type...'className='w-75 p-2' ref={bodyRef}/>


        <label id='reactions'>Likes</label>
        <input type="number" placeholder='type...'className='w-75 p-2' ref={likesRef}/>

        <label id='reactions'>DisLikes</label>
        <input type="number" placeholder='type...'className='w-75 p-2' ref={disLikesRef}/>


        
        <label id='tags'>Tags</label>
        <input type="text" placeholder='type...'className='w-75 p-2' ref={tagsRef}/>

        <button type='submit' className='btn btn-success'>Add Post</button>
    </form>
  )
}

export default CreatePost