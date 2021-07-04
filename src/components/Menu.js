import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';

function Menu(props) {
    const { users, User } = props;
    const { name, avatarURL } = users[User];

    return (
      <div className="ui fixed inverted menu">
        <div className="ui container">
          <div className="item" />
          <NavLink
            to="/"
            exact
            className="header item"
            activeClassName="active"
          >
            <Image
              src="/would-you-rather.png"
              style={{ width: '55px', margin: '5px' }}
            />
            Home
          </NavLink>
          <NavLink to="/add" exact className="item" activeClassName="active">
            New Question
          </NavLink>
          <NavLink
            to="/leaderboard"
            exact
            className="item"
            activeClassName="active"
          >
            Leader Board
          </NavLink>
          <div className="ui right floated item">
            <span style={{ margin: '10px' }}>Hello, {name}</span>
            <img className="ui avatar image" src={avatarURL} alt="" />
          </div>
          <NavLink to="/logout" exact className="item" activeClassName="active">
            Logout
          </NavLink>
        </div>
      </div>
    );
  }

const mapStateToProps = (state) => {
  const { User, users } = state;
  return { User: User, users: users };
};

export default connect(mapStateToProps)(Menu);
