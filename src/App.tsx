import { useState, useEffect, useCallback, ChangeEventHandler, RefObject, InputHTMLAttributes, useMemo } from 'react'
import { User } from './libs/user'
import { Post } from './libs/post'
import { getUserList, getPostListById } from './libs/api'
import './App.css'

const SearchTextField = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type="text"
      placeholder="filter"
      {...props}
    />
  );
};

function App() {
  const [filter, setFilter] = useState('')
  const [currentUser, setCurrentUser] = useState<string>()
  const [users, setUsers] = useState<User[]>([])

  const memorizedUserIds = useMemo(() => users.map((user) => user._id), [users]);

  const memorizedPostMap = useMemo(() => {
    const userPostMap: Record<string, Post[]> = {};
    // test useMemo is run
    console.log('memorizedPostMap', memorizedUserIds);
    memorizedUserIds.forEach((id) => {
      getPostListById(id).then((posts) => {
        userPostMap[id] = posts;
      });
    });
    return userPostMap;
  }, [memorizedUserIds]);

  const UserList = useCallback(() => {
    const List = users
    .filter((user) => new RegExp(filter, 'i').test(user.name))
    .map((user) => (
      <li key={`${user._id}`}>
        <a
          href="#"
          onClick={(evt) => {
            evt.preventDefault()
            setCurrentUser(user._id)
          }}>
          {user.name}
        </a>
        &nbsp;
        {user.description}
      </li>
    ))

    return (
      <ul>
        {List}
      </ul>
    );
  }, [users, filter]);

  const PostList = useCallback(() => {
    if (!currentUser || !memorizedPostMap[currentUser] || memorizedPostMap[currentUser].length === 0) return <p>No posts</p>;
    const posts = memorizedPostMap[currentUser];
    return (
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            {post.content}
          </li>
        ))}
      </ul>
    );
  }, [currentUser, memorizedPostMap]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setFilter(event.target.value);
    setCurrentUser(undefined);
  }, []);

  useEffect(() => {
    getUserList()
      .then((users) => setUsers(users))
  }, [])

  return (
    <div className="App">
      <div className="App-content">
        <h1>Hello Vite + React!</h1>
        <section>
          <h2>Users</h2>
          <SearchTextField value={filter} onChange={handleChange} />
          {UserList()}
        </section>
        <section>
          <h2>Posts</h2>
          {PostList()}
        </section>
      </div>
    </div>
  )
}

export default App
