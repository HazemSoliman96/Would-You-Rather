import { useState, Fragment, useEffect } from 'react';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { InitialData } from '../actions/shared';

import Menu from './Menu';
import Footer from './Footer';

import QuestionList from './QuestionList';
import QuestionNew from './QuestionNew';
import QuestionView from './QuestionView';
import LeaderBoard from './LeaderBoard';
import Login from './Login';
import Logout from './Logout';
import PageNotFound from './PageNotFound';

function App(props) {
  const [Index, setIndex] = useState(0);

  const handleTabChange = ({ activeIndex }) => {
    setIndex(activeIndex);
  };

  const resetIndexToZero = () => {
    setIndex(0);
  };

  const history = useHistory()

  useEffect(() => {
    const { InitialData } = props;
    InitialData();
  },[props]);

    const { User } = props;
    console.log(User)
    if (!User) {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Login} />
          </Switch>
        </BrowserRouter>
      );
    }

    return (
      <BrowserRouter>
        <Fragment>
          <Menu />
          <div className="ui main text container" style={{ margin: '5em' }}>
            <Switch>
              <Route
                path="/"
                exact
                render={() => {
                  return (
                    <QuestionList
                      handleTabChange={handleTabChange}
                      activeIndex={Index}
                    />
                  );
                }}
              />
              <Route
                path="/add"
                render={() => {
                  return (
                    <QuestionNew
                      resetActiveIndexToZero={resetIndexToZero}
                      history={history}
                    />
                  );
                }}
              />
              <Route path="/questions/:question_id" component={QuestionView} />
              <Route path="/leaderboard" component={LeaderBoard} />
              <Route path="/logout" component={Logout} />
              <Route path="/404" component={PageNotFound} />
              <Route path="/" component={PageNotFound} />
            </Switch>
          </div>
          <Footer />
        </Fragment>
      </BrowserRouter>
    );
  }

const mapStateToProps = (state) => {
  const { User } = state;
  return { User };
};

export default connect(mapStateToProps, { InitialData })(App);
