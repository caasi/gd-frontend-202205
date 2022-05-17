import React from "react";
import { User } from "../libs/user";

interface IUserProp {
  user: User;
  setCurrentUser: (userId: string) => void;
}
export default function Users({ user, setCurrentUser }: IUserProp) {
  return (
    <li>
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
  );
}
