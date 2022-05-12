import { useState, useEffect, useMemo, useRef } from "react";
import { User } from "./libs/user";
import { Post } from "./libs/post";

import { getUserList, getPostListById } from "./libs/api";
import usePromise from "./hooks/usePromise";
import useCancelablePromise from "./hooks/useCancelablePromise";
import "./App.css";

const userListPromise = getUserList();

function App() {
  const [filter, setFilter] = useState("");
  const [currentUser, setCurrentUser] = useState<User["_id"] | "">("");
  const [userList = []] = usePromise<User[]>(userListPromise);
  const [userPost = [], postError, postPending] = useCancelablePromise(
    getPostListById,
    currentUser
  );

  const posts = postPending ? (
    <p>isLoading</p>
  ) : userPost && userPost.length === 0 ? (
    <p>No posts</p>
  ) : (
    <ul>
      {userPost.map((post) => (
        <li key={post._id}>{post.content}</li>
      ))}
    </ul>
  );

  return (
    <div className="App">
      <div className="App-content">
        <h1>Hello Vite + React!</h1>
        <section>
          <h2>Users</h2>
          <input
            type="text"
            placeholder="filter"
            value={filter}
            onChange={(event) => {
              setFilter(event.target.value);
            }}
          />
          <ul>
            {userList
              .filter((user) => new RegExp(filter, "i").test(user.name))
              .map((user) => (
                <li key={user._id}>
                  <a
                    href="#"
                    onClick={(evt) => {
                      evt.preventDefault();
                      setCurrentUser(user._id);
                    }}
                  >
                    {user.name}
                  </a>
                  &nbsp;
                  {user.description}
                </li>
              ))}
          </ul>
        </section>
        <section>
          <h2>Posts</h2>
          {posts}
          <div>{typeof postError === "string" && postError}</div>
        </section>
      </div>
    </div>
  );
}

export default App;
