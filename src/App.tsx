import { useState, useEffect, useMemo } from 'react'
import { User } from './libs/user'
import { getUserList, getPostListById } from './libs/api'
import usePromise  from './hooks/usePromise'
import './App.css'

function App() {
  const [filter, setFilter] = useState('')
  const [currentUser, setCurrentUser] = useState<string>()
  const [users, setUsers] = useState<User[]>([])
  const postListPromise = useMemo(() => {
    if (!currentUser) return Promise.resolve([]);
    return getPostListById(currentUser)
  }, [currentUser])

  const [postList = [], , isLoading] = usePromise(postListPromise)
  useEffect(() => {
    getUserList()
      .then((users) => setUsers(users))
  })

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
              setFilter(event.target.value)
            }}
          />
          <ul>
            {users
              .filter((user) => new RegExp(filter, 'i').test(user.name))
              .map((user) => (
                <li key={user._id}>
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
            }
          </ul>
        </section>
        <section>
          <h2>Posts</h2>
          {postList.length === 0
            ? <p>No posts</p>
            :isLoading
              ? <p>isLoading</p>
            : <ul>
              {postList.map((post) => (
                <li key={post._id}>
                  {post.content}
                </li>
              ))}
            </ul>
          }
        </section>
      </div>
    </div>
  )
}

export default App
