import React, { useEffect, useState } from "react";
import About from "./About";
import ArticleList from "./ArticleList";

function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setIsLoaded(false);
    fetch("http://localhost:4000/posts")
      .then((response) => response.json())
      .then((postsData) => {
        setPosts(postsData);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setIsLoaded(true); // Assuming setIsLoaded to true on error
      });
  }, []);

  useEffect(() => {
    document.title = "Underreacted | Home";
  }, []);

  return (
    <>
      <About />
      {isLoaded ? <ArticleList posts={posts} /> : <h3>Loading...</h3>}
    </>
  );
}

export default HomePage;
