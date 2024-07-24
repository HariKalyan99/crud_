import React, { useContext, useState } from 'react'
import PostCard from './PostCard';
import { blogStore } from '../store/Blogstore';

const Dashboard = () => {



  const {postList,
    deletePost,
    editPost, side, jwt} = useContext(blogStore)
    
if(side === "dashboard" && jwt?.length){
  return (
    <div>
      <div className="album py-5 bg-body-tertiary" >
    <div className="container-fluid">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3" >
        {postList.map((post) => <PostCard key={post._id} editPost={editPost} deletePost={deletePost} post={post}/>)}
      </div>
    </div>
  </div>
    </div>
  )
}
}

export default Dashboard