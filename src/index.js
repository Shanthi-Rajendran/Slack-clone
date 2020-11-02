import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Switch , Route} from 'react-router-dom';
import Login from './components/Auth/Login/index';
import Register from './components/Auth/Register/index';
import "semantic-ui-css/semantic.min.css";
const Root = () => (
    <Router>
       <Switch>
           <Route path="/" component={App} exact/>
           <Route path="/login" component={Login} />
           <Route path="/register" component={Register} />
       </Switch>
    </Router>
)

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
