import React from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

// destructure props
const Users = ({ users, loading }) => {
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

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Users;
