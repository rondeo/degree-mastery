import React, { Component } from "react";
import BlogPostSnippet from "./BlogPostSnippet";
import Header from "./Header";
import HeaderImage from "./HeaderImage";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import axios from "axios";

class LandingPage extends Component {
  state = {
    blogs: [],
    categories: []
  };

  componentDidMount() {
    var params = this.props.location.pathname.replace("/blogs/", "");
    if (params.includes("/")) {
      var fetchUrl = "http://localhost:8081/api/testblogs";
    } else {
      var fetchUrl = "http://localhost:8081/api/testblogs/" + params;
    }
    axios.get(fetchUrl)
      .then(res => res.data)
      .then(resjson =>
        this.setState({
          blogs: resjson.blogs
        })
      );

    axios.get("http://localhost:8081/api/categories")
      .then(res => res.data)
      .then(resjson =>
        this.setState({
          categories: resjson
        })
      );
  }

  render() {
    return (
      <div>
        <Header />
        <HeaderImage />
        <div className="row background">
          <div className="col xl9 l9 m12 s12">
            <div className="App">
              <div>
                <h1 className="center posts">
                  <strong>Early Grad Syllabus</strong>
                </h1>
              </div>
              <div className="box">
                {this.state.blogs.map(blog => (
                  <BlogPostSnippet
                    key={blog.url}
                    blog={blog}
                    image={this.testImage1}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col xl3 l3 m12 s12">
            <Sidebar categories={this.state.categories} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default LandingPage;
