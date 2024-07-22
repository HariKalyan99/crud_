import React, { useContext, useRef } from "react";
import { blogStore } from "../../store/Blogstore";

const Signup = () => {


const {signUp} = useContext(blogStore)
  const refUsername = useRef("");
  const refFullname = useRef("");
  const refEmail = useRef("");
  const refPassword = useRef("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const Username = refUsername.current.value;
const Fullname = refFullname.current.value;
const Email = refEmail.current.value;
const Password = refPassword.current.value;
    signUp({username: Username, fullname: Fullname, email: Email, password: Password})
//     refUsername.current.value = ""
// refFullname.current.value = ""
// refEmail.current.value = ""
// refPassword.current.value = ""
  };
  return (
    <div className="h-100 w-100 d-flex justify-content-center">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-100 h-100 d-flex flex-column justify-content-center align-items-center m-5"
      >
        <div className="d-flex flex-column">
          <label id="username">
            <span className="fw-bold fs-2">Username</span>
          </label>
          <input
            type="text"
            placeholder="Username"
            ref={refUsername}
            required
          />
        </div>
        <div className="d-flex flex-column">
          <label id="fullname">
            <span className="fw-bold fs-2">Fullname</span>
          </label>
          <input
            type="text"
            placeholder="fullname"
            ref={refFullname}
            required
          />
        </div>

        <div className="d-flex flex-column">
          <label id="email">
            <span className="fw-bold fs-2">Email</span>
          </label>
          <input type="email" placeholder="email" ref={refEmail} required />
        </div>

        <div className="d-flex flex-column">
          <label id="password">
            <span className="fw-bold fs-2">Password</span>
          </label>
          <input
            type="text"
            placeholder="password"
            ref={refPassword}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
