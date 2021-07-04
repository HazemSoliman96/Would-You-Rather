import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../actions/UserAction';

function Logout(props) {
  useEffect(() => {
    props.setUser(null);
  }, [props]);

  return <div>Log out</div>;
}

export default connect(null, { setUser })(Logout);
