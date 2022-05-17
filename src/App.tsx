import { useState, useRef, useMemo } from "react";

import { getUserList, getPostListById } from "./libs/api";
import "./App.css";
import usePromise from "./hooks/use-promise";
import Post from "./components/Posts";
import Users from "./components/Users";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState("");
  const [currentUser, setCurrentUser] = useState<string>();
  const memoizedUsers = useMemo(() => getUserList(), []);
  const memoizedPost = useMemo(() => {
    if (!currentUser) {
      return Promise.resolve([]);
    }
    return getPostListById(currentUser);
  }, [currentUser]);

  const [users, error, pending] = usePromise(memoizedUsers);
  const [posts] = usePromise(memoizedPost);

  return (
    <div className="App">
      <div className="App-content">
        <h1>Hello Vite + React!</h1>
        <section>
          <h2>Users</h2>
          <input
            ref={inputRef}
            type="text"
            placeholder="filter"
            onChange={() => {
              if (inputRef.current) setFilter(inputRef.current.value);
            }}
          />
          <ul>
            {pending && <div>Loading...</div>}
            {users != undefined &&
              users
                .filter((user) => new RegExp(filter, "i").test(user.name))
                .map((user) => (
                  <Users
                    key={user._id}
                    user={user}
                    setCurrentUser={setCurrentUser}
                  />
                ))}
          </ul>
        </section>
        {posts != undefined && <Post posts={posts} />}
      </div>
    </div>
  );
}

export default App;
