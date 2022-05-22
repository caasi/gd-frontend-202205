import { useState, useRef, useMemo, useCallback } from "react";

import { getUserList, getPostListById } from "./libs/api";
import "./App.css";
import usePromise from "./hooks/use-promise";
import Post from "./components/Posts";
import Users from "./components/Users";
import InputFilter from "./components/InputFilter";
import UsersAndPosts from "./features/user_post/UsersAndPosts";

function App() {
  // const [filter, setFilter] = useState("");
  // const [currentUser, setCurrentUser] = useState<string>();
  // const memoizedUsers = useMemo(() => getUserList(), []);
  // //const memoizedUsers = useCallback(() => getUserList(), []);
  // const memoizedPost = useMemo(() => {
  //   if (!currentUser) {
  //     return Promise.resolve([]);
  //   }
  //   return getPostListById(currentUser);
  // }, [currentUser]);

  // const [users = [], userError, userPending] = usePromise(memoizedUsers);
  // const [posts, postError, postPending] = usePromise(memoizedPost);

  return (
    <div className="App">
      <div className="App-content">
        <h1>Hello Vite + React!</h1>
        <UsersAndPosts />
      </div>
    </div>
  );
}

export default App;
