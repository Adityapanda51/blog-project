import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const res = await axios.get("http://localhost:9000/api/v1/get/allblogs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setBlogs(res.data);
    };
    fetchAllBlogs();
  }, []);

  return (
    <>
      <main className="my-5">
        <div className="container shadow-lg">
          <section className="text-center">
            <h2 className="mb-5 my-3">
              <strong>Latest Posts</strong>
            </h2>
            <div className="row">
              {blogs && blogs.length > 0 ? (
                blogs.map((item) => (
                  <div className="col-lg-4 col-md-12 mb-4" key={item._id}>
                    <div className="card">
                      <div
                        className="bg-image hover-overlay ripple"
                        data-mdb-ripple-color="light"
                      >
                        <img
                          src={`http://localhost:9000/${item.thumbnail}`}
                          className="img-fluid"
                          alt="Homepage img"
                        />
                        <a href="#!">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </a>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.description}</p>
                        <Link to={`/blog/${item._id}`} className="btn btn-primary">
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h2>Loading...</h2>
              )}
            </div>
          </section>
        </div>
      </main>
      <footer className="bg-primary text-lg-start">
        <div
          className="text-center p-3 text-white"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2024 Copyright :
          <a className="text-white mx-2" href="https://mdbootstrap.com/">
            CodeWithAditya
          </a>
        </div>
      </footer>
    </>
  );
};

export default Home;
