import { ADD_TASK, CHANGE_TASK, DELETE_TASK } from '../action-types/task';

const initialState = {
  taskList: []
};

export const task = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        taskList: [
          ...state.taskList,
          ...action.payload
        ]
      };
    case CHANGE_TASK:
      return {
        ...state,
        taskList: action.payload
      };
    default:
      return state;
  }
};
