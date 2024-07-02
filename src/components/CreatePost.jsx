import React from 'react'

const CreatePost = () => {
  return (
    <form className='d-flex flex-column justify-content-center align-items-center gap-3 w-100 m-5'>
        <label id='userId'>User Id</label>
        <input type="number" placeholder='type...'className='w-75 p-2'/>

        
        <label id='title'>Title</label>
        <input type="text" placeholder='type...'className='w-75 p-2'/>

        
        <label id='body'>Body</label>
        <textarea type="text"  rows={4} placeholder='type...'className='w-75 p-2'/>


        <label id='reactions'>Reactions</label>
        <input type="number" placeholder='type...'className='w-75 p-2'/>


        
        <label id='tags'>Tags</label>
        <input type="text" placeholder='type...'className='w-75 p-2'/>

        <button type='submit' className='btn btn-success'>Add Post</button>
    </form>
  )
}

export default CreatePost