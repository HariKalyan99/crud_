import React, { useState } from 'react'

const EditPost = ({editDisplayFn, post, editPost}) => {

  const [userId, setUserId] = useState(post.userId);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [likes, setlikes] = useState(post.reactions.likes);
  const [dislikes, setDislikes] = useState(post.reactions.dislikes);
  const [tags, setTags] = useState(post.tags);

  const handleSubmit = (e) => {
    e.preventDefault();
    editPost({userId,
      title,
      body,
      reactions: {
        likes,
      dislikes,
      },
      tags: tags.split(","), prevId: post.id});
      editDisplayFn()
  }
  return (


    <form className='d-flex flex-column justify-content-center align-items-center gap-3 w-100' onSubmit={(e) => handleSubmit(e)}>
        <label id='userId'>User Id</label>
        <input type="text" placeholder='type...' className='p-2 w-75' value={userId} onChange={(e) => setUserId(e.target.value)}/>

        
        <label id='title'>Title</label>
        <input type="text" placeholder='type...' className='p-2 w-75' value={title} onChange={(e) => setTitle(e.target.value)}/>

        
        <label id='body'>Body</label>
        <input type="text" placeholder='type...' className='p-2 w-75' value={body} onChange={(e) => setBody(e.target.value)}/>


       
        <label id='reactions'>Likes</label>
        <input type="number" placeholder='type...'className='w-75 p-2'  value={likes} onChange={(e) => setlikes(e.target.value)}/>


        <label id='reactions'>DisLikes</label>
        <input type="number" placeholder='type...'className='w-75 p-2'  value={dislikes} onChange={(e) => setDislikes(e.target.value)}/>

        
        <label id='tags'>Tags</label>
        <input type="text" placeholder='type...' className='p-2 w-75' value={tags} onChange={(e) => setTags(e.target.value)}/>

        <button type='submit' className='btn btn-success'>Edit Post</button>
        <button type='button' className='btn btn-warning' onClick={() => editDisplayFn()}>Don't Edit</button>
    </form>
  )
}

export default EditPost