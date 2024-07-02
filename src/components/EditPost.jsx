import React from 'react'

const EditPost = () => {
  return (
    <form className='d-flex flex-column justify-content-center align-items-center gap-3 w-100 m-5'>
        <label id='userId'>User Id</label>
        <input type="text" placeholder='type...'/>

        
        <label id='title'>Title</label>
        <input type="text" placeholder='type...'/>

        
        <label id='body'>Body</label>
        <input type="text" placeholder='type...'/>


        
        <label id='reactions'>Reactions</label>
        <input type="text" placeholder='type...'/>


        
        <label id='tags'>Tags</label>
        <input type="text" placeholder='type...'/>

        <button type='submit' className='btn btn-success'>Add Post</button>
    </form>
  )
}

export default EditPost