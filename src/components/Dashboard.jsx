import React, { useState } from 'react'
import PostCard from './PostCard';

const Dashboard = ({postList,
  deletePost,
  editPost}) => {
  

 
  return (
    <div className="album py-5 bg-body-tertiary" >
    <div className="container-fluid">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" >
        {postList.map((post) => <PostCard key={post.id} editPost={editPost} deletePost={deletePost} post={post}/>)}
      </div>
    </div>
  </div>
  )
}

export default Dashboard