import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, } from 'react-router-dom';

import GlobalStyles from "./GlobalStyles";
import ArtistRoute from '../AristRoute/ArtistRoute';

const DEFAULT_ARTIST_ID = '6XYvaoDGE0VmRt83Jss9Sn';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path='/artists/:id'>
            <ArtistRoute />
          </Route>
          <Redirect to={`/artist/${DEFAULT_ARTIST_ID}`}/>
        </Switch>
      </Router>
    </>
  );
};

export default App;
