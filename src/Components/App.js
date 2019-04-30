import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import QuestionDetails from './QuestionDetails';
import NewQuestion from './NewQuestion';

const App = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/question/:id' component={QuestionDetails} />
            <Route path='/new-question' component={NewQuestion} />
        </Switch>
    </Router>
);
  
  export default App;