const SERVER_ACTION = {
  CHANGE_PATH: "server/CHANGE_PATH",
};

export const changeServerUrl = (index) => {
  return {
    type: SERVER_ACTION.CHANGE_PATH,
    serverUrlIndex: index,
  };
};

const initialState = {
  serverUrlIndex: Number(localStorage.getItem("server-index")) || 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SERVER_ACTION.CHANGE_PATH:
      return {
        serverUrlIndex: action.serverUrlIndex,
      };
    default:
      return state;
  }
};

export default reducer;
