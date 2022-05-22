import { useMemo, useState } from "react";
import usePromise from "../../hooks/use-promise";
import { getPostListById, getUserList } from "../../libs/api";
import { Post } from "../../libs/post";
import { User } from "../../libs/user";

const useUserPost = (currentUser: string | undefined) => {
  const memoizedUsers = useMemo(() => getUserList(), []);
  const memoizedPost = useMemo(() => {
    if (!currentUser) {
      return Promise.resolve([]);
    }
    return getPostListById(currentUser);
  }, [currentUser]);
  const [users, userError, userPending] = usePromise(memoizedUsers);
  const [posts, postError, postPending] = usePromise(memoizedPost);
  return {
    userState: { users, userError, userPending },
    postState: { posts, postError, postPending },
  };
};

export default useUserPost;
