import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  details: null,
  stages: null,
  notifications: [],
  users: [],
  date: null,
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    setProjectDetails: (state, action) => {
      state.details = action.payload;
    },
    setProjectStages: (state, action) => {
      state.stages = action.payload;
    },
    addStage: (state, action) => {
      state.stages = [...state.stages, action.payload];
    },
    updateStage: (state, action) => {
      const { stageIndex, title, description } = action.payload;
      state.stages[stageIndex].title = title;
      state.stages[stageIndex].description = description;
    },
    addTask: (state, action) => {
      const { stageId, task } = action.payload;
      const stageIndex = state.stages.findIndex(
        (stage) => stage._id === stageId,
      );

      if (stageIndex !== -1) {
        state.stages[stageIndex].tasks.push(task);
      }
    },
    updateTask: (state, action) => {
      const { stageIndex, taskIndex, task } = action.payload;

      const addedby = state.details.members.find(
        (item) => item._id === task.addedBy,
      );

      const assignedTo = task.assignedTo.map((assigned) =>
        state.details.members.find((item) => item._id === assigned),
      );

      state.stages[stageIndex].tasks[taskIndex] = {
        ...task,
        assignedTo: assignedTo,
        addedBy: addedby._id,
      };
    },
    deleteTask: (state, action) => {
      const { stageIndex, taskIndex } = action.payload;

      state.stages[stageIndex].tasks.splice(taskIndex, 1);
    },
    addMember: (state, action) => {
      state.details?.members.push(action.payload);
    },
    moveTask: (state, action) => {
      const source = action.payload.source;
      const destination = action.payload.destination;

      const sourceStageIndex = state.stages.findIndex(
        (stage) => stage._id === source.droppableId,
      );
      const destinationStageIndex = state.stages.findIndex(
        (stage) => stage._id === destination.droppableId,
      );

      if (sourceStageIndex !== -1 && destinationStageIndex !== -1) {
        const taskToMove = state.stages[sourceStageIndex].tasks[source.index];

        state.stages[sourceStageIndex].tasks.splice(source.index, 1);

        state.stages[destinationStageIndex].tasks.splice(
          destination.index,
          0,
          taskToMove,
        );
      }
    },
    addComment: (state, action) => {
      const { stageIndex, taskIndex, comment } = action.payload;

      state.stages[stageIndex].tasks[taskIndex].comments.push(comment);
    },
    deleteComment: (state, action) => {
      const { stageIndex, taskIndex, _id } = action.payload;

      const updatedComments = state.stages[stageIndex].tasks[
        taskIndex
      ].comments.filter((comment) => comment._id !== _id);

      state.stages[stageIndex].tasks[taskIndex].comments = updatedComments;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload.reverse();
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
    updateNotificationStatus: (state, action) => {
      const { id, status } = action.payload;

      const notification = state.notifications.find((not) => not._id === id);
      if (notification) {
        notification.status = status;
      }
    },
    deleteNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification._id !== action.payload,
      );
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      if (!state.users.includes(action.payload)) {
        state.users.push(action.payload);
      }
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user !== action.payload);
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const {
  setProjectDetails,
  setProjectStages,
  addStage,
  updateStage,
  addTask,
  updateTask,
  deleteTask,
  addMember,
  moveTask,
  addComment,
  deleteComment,
  setNotifications,
  addNotification,
  updateNotificationStatus,
  deleteNotification,
  setUsers,
  addUser,
  removeUser,
  setDate,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;
