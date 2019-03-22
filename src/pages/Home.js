import React, { Component } from 'react';
import {Layout } from "antd";
import Schedule from '../components/Schedule';
import MyTasks from './MyTasks';
import Menu from '../layout/MenuComponent';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

const { Content } = Layout;

class Home extends Component {

  render() {
    return(
      <Router>
        <Layout>
          <Menu/>
          <Content>
            <Switch>
              <Route exact path={'/'} component={Schedule}/>
              <Route exact path={'/task-list'} component={MyTasks} />
            </Switch>
          </Content>
        </Layout>
      </Router>
    );
  }
}

export default Home;

