import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [ input, setInput ] = useState({
        email : "",
        password : "",
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9000/api/v1/user/login", input);
            alert(res.data.message);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.name);
            navigate("/");
        } catch (error) {
            alert(error.response.data.message)
        }
    }
  return (
    <div className="container shadow mt-5 p-4">
      <h2 className="text-center my-3">Login Here</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="loginEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={(e) => setInput({...input, [e.target.name] : e.target.value })}
                className="form-control"
                id="loginEmail"
                placeholder="Enter Email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="loginPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={(e) => setInput({...input, [e.target.name] : e.target.value })}
                className="form-control"
                id="loginPassword"
                placeholder="Enter Password"
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
