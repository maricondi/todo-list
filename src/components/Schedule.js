import React, {Component} from 'react';
import { Calendar, Badge } from "antd";
import { connect } from "react-redux";
import { dispatchAddTasks } from '../redux/actions/task';
import CreateTask from '../pages/CreateTask';
import moment from "moment";

class Schedule extends Component {

  state = {
    visible: false,
    taskDate: ''
  };


  handleCreateTask = (type, content, date) => {
    const { addTask } = this.props;

    const tasks = JSON.parse(localStorage.getItem('taskList'));
    let id = 0;
    tasks ? tasks.map(it => {
      if(id <= it.id) {
        id = it.id + 1;
      }
    }) : id = 1;

    const taskListTemplate = [{
        id,
        type,
        content,
        date
      }];

    addTask(taskListTemplate);

    let localStorageList = [];
    if(JSON.parse(localStorage.getItem('taskList'))){
      localStorageList = JSON.parse(localStorage.getItem('taskList'));
    }
    const taskListTemplateFull = [
      ...localStorageList,
      {
        id,
        type,
        content,
        date
      }];

    localStorage.setItem('taskList', JSON.stringify(taskListTemplateFull));
    this.handleCancel();
  };

  handleOk = (value) => {
    this.setState({ visible: true, taskDate: value });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  dateCellRender = (value) => {
    const taskList = JSON.parse(localStorage.getItem('taskList'));

    return (
      taskList ? taskList.map(task => {
        if(task.date === moment(value.date("DD/MM/YYYY")).format("DD/MM/YYYY")) {
          return(
            <li key={task.id}>
              <Badge status={task.type} text={task.content} />
            </li>
          );
        }
      }):[]
    );
  };

  render() {
    const { visible, taskDate, id } = this.state;

    return (
      <div style={{ margin: '20px 20px 20px 300px' }}>
        <Calendar dateCellRender={this.dateCellRender} onSelect={dateCellRender => this.handleOk(dateCellRender)} />
        <CreateTask
          id={id}
          visible={visible}
          taskDate={moment(taskDate).format("DD/MM/YYYY")}
          onCancel={this.handleCancel}
          onCreateTask={this.handleCreateTask}
          editable={false}
        />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  taskList: store.task.taskList
});

const mapDispatchToProps = dispatch => ({
  addTask: dispatchAddTasks.bind(null, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
