import React from "react";
import { Post } from "../libs/post";
interface IPostProp {
  posts: Post[];
}

export default function Posts({ posts }: IPostProp) {
  return (
    <section>
      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>No posts</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>{post.content}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
