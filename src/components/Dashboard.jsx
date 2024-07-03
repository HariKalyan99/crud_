import React, { useState } from 'react'
import ReadMore from './ReadMore';

const Dashboard = ({postList}) => {
  

 
  return (
    <div className="album py-5 bg-body-tertiary">
    <div className="container">

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        {postList.map((post) => <div key={post.id} className="col">
          <div className="card shadow-sm">
            <img src="https://blog.logrocket.com/wp-content/uploads/2021/07/dark-mode-react-in-depth-guide.png" alt="blog-img" />
            <div className="card-body">
              <h3 className="card-text">{post.title}</h3>
              <p className="card-text">{<ReadMore body={post.body}/>}</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  {post.tags.map((tag, ind) => <button key={ind} type="button" className="btn btn-sm btn-outline-secondary">{tag}</button>)}
                </div>
                <small className="text-body-secondary">userId: {post.userId}</small>
              </div>
            </div>
          </div>
        </div>)}
      </div>
    </div>
  </div>
  )
}

export default Dashboard