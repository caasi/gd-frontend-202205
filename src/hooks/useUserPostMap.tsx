import { useMemo } from 'react'
import { User } from '../libs/user'
import { Post } from '../libs/post'
import { getUserList, getPostListById } from '../libs/api'
import usePromise from './use-promise'

export default function useUserPostMap() {
  // get user list by usePromise
  const memorizedGetUserListPromise = useMemo(() => getUserList(), []);
  const [users,,] = usePromise<User[]>(memorizedGetUserListPromise);

  // get post list by usePromise
  const memorizedGetUserPostsPromise = useMemo(() => {
    if (users) {
      const promises = users.map((user) => getPostListById(user._id));
      return Promise.all(promises);
    }
    return undefined;
  }, [users]);
  const [posts,,] = usePromise<Post[][]>(memorizedGetUserPostsPromise);

  return useMemo(() => {
    const userPostMap: Record<string, Post[]> = {};

    // early return when posts not ready
    if (users && !posts) {
      return {
        memorizedUsers: users,
        memorizedPosts: {}
      };
    }

    if (users && posts) {
      // assign posts to object by user array index
      users.forEach((user, idx) => {
        userPostMap[user._id] = posts[idx];
      });

      return {
        memorizedUsers: users,
        memorizedPosts: userPostMap
      };
    }

    return {
      memorizedUsers: [],
      memorizedPosts: {}
    };
  }, [users, posts]);
}