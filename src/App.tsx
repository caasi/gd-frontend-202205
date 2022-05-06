import { useState, useEffect, useCallback, ChangeEventHandler, RefObject, InputHTMLAttributes } from 'react'
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
  // const inputRef = useRef<HTMLInputElement>(null)
  const [filter, setFilter] = useState('')
  const [currentUser, setCurrentUser] = useState<string>()
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<Post[]>([])

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
    if (posts.length === 0) return <p>No posts</p>;
    return (
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            {post.content}
          </li>
        ))}
      </ul>
    );
  }, [posts]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setFilter(event.target.value);
    setCurrentUser(undefined);
    setPosts([]);
  }, []);

  useEffect(() => {
    getUserList()
      .then((users) => setUsers(users))
  })
  useEffect(() => {
    if (currentUser) {
      getPostListById(currentUser)
        .then((posts) => setPosts(posts))
    }
  }, [currentUser])

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
