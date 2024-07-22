import React, { useContext } from 'react'
import { blogStore } from '../store/Blogstore';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  const {side, sideDisplay} = useContext(blogStore);
  return (
    <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{"width": "240px"}}>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item" onClick={() => sideDisplay("home")}>
        <Link to={"/createpost"} class={`nav-link text-white ${side === "home" && 'active'}`} aria-current="page">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
          Home
        </Link>
      </li>
      <li onClick={() => sideDisplay("dashboard")}>
        <Link to={"/dashboard"} class={`nav-link text-white ${side === "dashboard" && 'active'}`}>
          <svg class="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
          Dashboard
        </Link>
      </li>
    </ul>
    <hr />
    
  </div>
  )
}

export default Sidebar