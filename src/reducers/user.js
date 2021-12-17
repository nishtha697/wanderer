import userData from "./data/user.json";

const user = (state = userData, action) => {
  switch (action.type) {
    case "get-profile":
      return action.user;

    case "save-profile":
      return action.user;

    default:
      return state;
  }
};

export default user;
