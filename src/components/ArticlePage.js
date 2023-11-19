import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeEmojiList } from "../utils";

function ArticlePage() {
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [post, setPost] = useState(null);

  const url = `http://localhost:4000/posts/${id}`;

  useEffect(() => {
    setIsLoaded(false);
    fetch(url)
      .then((response) => response.json())
      .then((postData) => {
        setPost(postData);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching post data:", error);
        setIsLoaded(true); // Assuming setIsLoaded to true on error
      });
  }, [url]);

  const [pageTitle, setPageTitle] = useState("Underreacted");
  useEffect(() => {
    if (post) {
      setPageTitle(`Underreacted | ${post.title}`);
    }
  }, [post]);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  if (!isLoaded) return <h3>Loading...</h3>;

  const { minutes, title, date, preview } = post;
  const emojis = makeEmojiList(minutes);

  return (
    <article>
      <h3>{title}</h3>
      <small>
        {date} • {emojis} {minutes} min read
      </small>
      <p>{preview}</p>
    </article>
  );
}

export default ArticlePage;
