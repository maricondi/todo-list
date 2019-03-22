import React, {Component} from 'react';
import { Menu, Icon, Button, Layout } from "antd";
import {
  withRouter
} from 'react-router-dom';
const { Header } = Layout;



class MenuComponent extends Component {
  state = {
    collapsed: false
  };

  toggleCollapsed = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    return (
      <Header>
        <div style={{ width: 256 }}>
          <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            inlineCollapsed={this.state.collapsed}
          >
            <Menu.Item key="1">
              <Icon type="home" />
              <span onClick={() => this.props.history.push('/')} >Home</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="menu" />
              <span onClick={() => this.props.history.push('/task-list')}>My tasks</span>
            </Menu.Item>

          </Menu>
        </div>
      </Header>
    );
  }
}

export default withRouter(MenuComponent);
