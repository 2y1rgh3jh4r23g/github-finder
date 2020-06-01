import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// component to display a single user
const UserItem = ({ user: { login, avatar_url, html_url } }) => {
  return (
    <div>
      <img src={avatar_url} alt='' style={{ width: "60px" }} />
      <h3>{login}</h3>
      <div>
        <Link to={`/user/${login}`}>More</Link>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
