import { ADD_TASK, CHANGE_TASK, DELETE_TASK } from '../action-types/task';


export const dispatchAddTasks = (dispatch, value) => {
  dispatch(addTask(value));
};

export const dispatchChangeTasks = (dispatch, id) => {
  dispatch(changeTask(id));
};

export const dispatchDeleteTasks = (dispatch, id) => {
  dispatch(deleteTask(id));
};

const addTask = value => ({
  type: ADD_TASK,
  payload: value
});

const changeTask = value => ({
  type: CHANGE_TASK,
  payload: value
});

const deleteTask = value => ({
  type: DELETE_TASK,
  payload: value
});
