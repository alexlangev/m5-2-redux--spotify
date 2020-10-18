import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect, } from 'react-router-dom';

import GlobalStyles from "./GlobalStyles";
import ArtistRoute from '../AristRoute/ArtistRoute';
import {requestAccessToken, receiveAccessToken, receiveAccessTokenError} from '../../actions';

const DEFAULT_ARTIST_ID = '6XYvaoDGE0VmRt83Jss9Sn';

const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(requestAccessToken());

    fetch('/spotify_access_token')
    .then((res) => res.json())
    .then((json) => {
      dispatch(receiveAccessToken(json.access_token));
    })
    .catch((err) => {
      console.error(err);
      dispatch(receiveAccessTokenError());
    });
  }, []);

  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path='/artists/:id'>
            <ArtistRoute />
          </Route>
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`}/>
        </Switch>
      </Router>
    </>
  );
};

export default App;
