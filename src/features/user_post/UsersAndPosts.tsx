import React, { useMemo, useState } from "react";
import InputFilter from "../../components/InputFilter";
import useUserPost from "./useUserPost";

export default function UsersAndPosts() {
  const [filter, setFilter] = useState("");
  const [currentUser, setCurrentUser] = useState<string>();
  const { userState, postState } = useUserPost(currentUser);
  return (
    <>
      <section>
        <h2>Users</h2>
        <InputFilter placeholder="filter" onChangeFunc={setFilter} />
        <ul>
          {userState.users !== undefined &&
            userState.users
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
        {postState.posts != undefined && postState.posts.length === 0 ? (
          <p>No posts</p>
        ) : (
          <ul>
            {postState.posts != undefined &&
              postState.posts.map((post) => (
                <li key={post._id}>{post.content}</li>
              ))}
          </ul>
        )}
      </section>
    </>
  );
}