
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Register = () => {

    const navigate = useNavigate();

    const [ input,setInput ] = useState({
        username : "",
        email : "",
        password : "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9000/api/v1/user/register", input);
            alert(res.data.message);
            navigate("/login");
        } catch (error) {
            alert(error.response.data.message);
        }
    };
  return (
    <div className="container shadow mt-5 p-4">
      <h2 className="text-center my-3">Sign Up Here</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="username"
                value={input.username}
                onChange={(e) => setInput({...input, [e.target.name] : e.target.value })}
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Enter Name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput2" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={(e) => setInput({...input, [e.target.name] : e.target.value })}
                className="form-control"
                id="formGroupExampleInput2"
                placeholder="Enter Email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput3" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={(e) => setInput({...input, [e.target.name] : e.target.value })}
                className="form-control"
                id="formGroupExampleInput3"
                placeholder="Enter Password"
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary btn-block">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
