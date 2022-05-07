import { useState, useEffect, useMemo } from 'react'
import { User } from './libs/user'
import { Post } from './libs/post'
import { getUserList, getPostListById } from './libs/api'

export default function useUserPostMap() {
  const [users, setUsers] = useState<User[]>([])
  const memorizedUser = useMemo(() => users.map((user) => user), [users]);
  
  const memorizedPostMap = useMemo(() => {
    const userPostMap: Record<string, Post[]> = {};
    // test useMemo is run
    console.log('memorizedPostMap', memorizedUser);
    memorizedUser.forEach((user) => {
      getPostListById(user._id).then((posts) => {
        userPostMap[user._id] = posts;
      });
    });
    return userPostMap;
  }, [memorizedUser]);

  useEffect(() => {
    getUserList()
      .then((usersResponse) => setUsers(usersResponse))
  }, [])

  return {
    memorizedUser,
    memorizedPostMap
  };
}