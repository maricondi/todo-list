import React, {Component} from 'react';
import { connect } from "react-redux";
import { Table, Divider, Tag, Button } from 'antd';
import {dispatchAddTasks, dispatchChangeTasks, dispatchDeleteTasks} from '../redux/actions/task';
import CreateTask from './CreateTask';

class MyTasks extends Component {
  state = {
    visible: false,
  };

  componentDidMount() {
    const { changeTask } = this.props;
    changeTask(JSON.parse(localStorage.getItem('taskList')));
  }

  handleOpenModal = (id) => {
    const taskObj = JSON.parse(localStorage.getItem('taskList'));

    taskObj.map(task => {
      if(task.id == id) {
        const taskTemplate = {
          id: task.id,
          type: task.type,
          content: task.content,
          date: task.date
        };
        localStorage.setItem('task', JSON.stringify(taskTemplate));
      }
    });

    this.setState({ visible: true });
  };

  handleEditTask = (params) => {
    const { changeTask } = this.props;
    localStorage.setItem('task', JSON.stringify(params));
    const taskStorage = JSON.parse(localStorage.getItem('task'));
    const taskStorageList = JSON.parse(localStorage.getItem('taskList'));
    let editedTaskList = [];

    editedTaskList.push(taskStorage);

    taskStorageList.map(task => {
      if(task.id !== taskStorage.id) {
        const newEditedTask = {
          id: task.id,
          type: task.type,
          content: task.content,
          date: task.date
        };
        editedTaskList.push(newEditedTask);
      }
    });

    localStorage.setItem('taskList', JSON.stringify(editedTaskList));
    changeTask(editedTaskList);
    this.handleCloseModal();
  };

  handleCloseModal = () => {
    this.setState({ visible: false });
    localStorage.removeItem('task');
  };

  handleDeleteTask = (id) => {
    const { changeTask } = this.props;
    const taskObj = JSON.parse(localStorage.getItem('taskList'));
    let newTaskList = [];

    taskObj.map(task => {
      if(task.id !== id) {
        newTaskList.push(task);
      }
    });

    localStorage.removeItem('taskList');
    localStorage.setItem('taskList', JSON.stringify(newTaskList));
    changeTask(newTaskList);
  };

  render() {

    const columns = [{
        title: 'Type',
        dataIndex: 'type',
        key: 'type'
      },
      {
        title: 'Content',
        dataIndex: 'content',
        key: 'content'
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date'
      },
      {
        title: 'Actions',
        dateIndex: '',
        key: '',
        render: (record) => (
          <div>
            <Button onClick={() => this.handleOpenModal(record.id)}>Edit</Button>
            <Button type={'danger'} onClick={() => this.handleDeleteTask(record.id)}>Delete</Button>
          </div>
        )
      }];

    const { taskList } = this.props;
    const { visible, id } = this.state;


    return (
      <div style={{ margin: '20px 20px 20px 320px' }}>
        <div style={{ marginLeft: '40%', marginBottom: '10px', fontSize: '20px' }}>Task List</div>
        <Table columns={columns} dataSource={taskList} />
        <CreateTask visible={visible} id={id} onCancel={this.handleCloseModal} onEditTask={this.handleEditTask} editable={true} />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  taskList: store.task.taskList
});

const mapDispatchToProps = dispatch => ({
  addTask: dispatchAddTasks.bind(null, dispatch),
  changeTask: dispatchChangeTasks.bind(null, dispatch),
  deleteTask: dispatchDeleteTasks.bind(null, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(MyTasks);
