import React, { useContext } from 'react'
import { blogStore } from '../routes/App'

const Sidebar = () => {

  const {side, sideDisplay} = useContext(blogStore);
  return (
    <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{"width": "280px"}}>
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <svg class="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
      <span class="fs-4">Sidebar</span>
    </a>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item" onClick={() => sideDisplay("home")}>
        <a href="#" class={`nav-link text-white ${side === "home" && 'active'}`} aria-current="page">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
          Home
        </a>
      </li>
      <li onClick={() => sideDisplay("dashboard")}>
        <a href="#" class={`nav-link text-white ${side === "dashboard" && 'active'}`}>
          <svg class="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
          Dashboard
        </a>
      </li>
    </ul>
    <hr />
    
  </div>
  )
}

export default Sidebar