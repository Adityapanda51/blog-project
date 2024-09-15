

import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from "axios";

const SingleBlog = () => {
      const {id} = useParams();
    const [blog, setBlog] = useState({});
    useEffect(() => {
        const fetchSingleBlog = async () => {
            const res = await axios.get(`http://localhost:9000/api/v1/get/blog/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` ,
                },
            });
            setBlog(res.data); 
        };
        fetchSingleBlog();
    },[id]);
  const navigate = useNavigate();

  return (
    <>
      <div className="container shadow my-3">
        <div className="col-md-12 d-flex items-center justify-content-center bg-light">
          <div className="row">
            <h1 className="my-3">{blog.title}</h1>
            <img
              src={`http://localhost:9000/${blog.thumbnail}`}
              className="img img-responsive img-rounded my-3"
              alt=""
            />
            <p className="my-3">{blog.description}</p>
          </div>
        </div>
        <div className="text-center">
          <button onClick={() => navigate("/")} className="btn btn-primary my-3">
            Back to Posts
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
