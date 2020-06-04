import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import GithubContext from "../../context/github/githubContext";

const Users = () => {
  const githubContext = useContext(GithubContext);

  const { loading, users } = githubContext;

  // if the response data is still loading
  if (loading) {
    // display a spinner gif
    return <Spinner />;
  } else {
    // otherwise, display users
    return (
      <div className='grid-3'>
        {users.map((user) => {
          return <UserItem key={user.id} user={user} />;
        })}
      </div>
    );
  }
};

export default Users;
