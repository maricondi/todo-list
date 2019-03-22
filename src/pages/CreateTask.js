import React, {Component} from 'react';
import { Modal, Input, Select, Button, DatePicker } from "antd";
import Proptypes from 'prop-types';
import moment from "moment";

const Option = Select.Option;

class CreateTask extends Component {
  propTypes = {
    editable: Proptypes.bool
  };

  defaultProps = {
    editable: false
  };

  state = {
    type: 'success',
    content: '',
    date: ''
  };


  onChange = (type, value) => {
  this.setState({ [type]: value });
};


  render() {
    const { visible, onCancel, onCreateTask, taskDate, id, editable, onEditTask } = this.props;
    const { type, content, date } = this.state;

    const title = !editable ? `Create a new task - ${taskDate}` : 'Edit task';
    const lblSubmit = editable ? 'Edit' : 'Add';


    const taskStorage = JSON.parse(localStorage.getItem('task')) ? JSON.parse(localStorage.getItem('task')) : '';

    const editableDate = editable ? (
      <div style={{display: 'flex', justifyContent: 'left', marginTop: '10px'}}>
        <div style={{marginTop: '5px', flexBasis: '15%'}}>Date:</div>
        <DatePicker style={{flexBasis: '80%'}} placeholder={taskStorage.date} onChange={event => this.onChange('date', moment(event).format('DD/MM/YYYY'))}/>
      </div>
    ) : null;

    const params = {
      id: taskStorage.id,
      type: type ? type : taskStorage.type,
      content: content ? content : taskStorage.content,
      date: date ? date : taskStorage.date
    };

    const btnDisabled = editable ? false : !content;
    const submitAction = editable ? () => onEditTask(params) : () => onCreateTask(type, content, taskDate);

    return (
      <div style={{margin: '20px 20px 20px 300px'}}>
        <Modal
          title={title}
          visible={visible}
          onCancel={onCancel}
          onOk={() => onCreateTask(type, content, taskDate)}
          footer={[
            <div key={id}>
              <Button onClick={onCancel}>Close</Button>
              <Button type={'primary'} disabled={btnDisabled} onClick={submitAction}>{lblSubmit}</Button>
            </div>
          ]}
        >
          <div style={{display: 'flex', justifyContent: 'left'}}>
            <div style={{marginTop: '5px', flexBasis: '15%'}}>Priority:</div>
            <Select style={{width: '200px'}} defaultValue={'success'}
                    onChange={value => this.onChange('type', value)}>
              <Option value={'success'}>Low priority</Option>
              <Option value={'warning'}>Medium priority</Option>
              <Option value={'error'}>High priority</Option>
            </Select>
          </div>

          <div style={{display: 'flex', justifyContent: 'left', marginTop: '10px'}}>
            <div style={{marginTop: '5px', flexBasis: '15%'}}>Content:</div>
            <Input style={{flexBasis: '80%'}} placeholder={taskStorage.content}  onChange={event => this.onChange('content', event.target.value)}/>
          </div>
          {editableDate}
        </Modal>
      </div>
    );
  }
}

export default CreateTask;
