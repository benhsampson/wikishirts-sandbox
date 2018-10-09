import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import ImageCombination from './pages/ImageCombination';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/image-combine" component={ImageCombination} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
