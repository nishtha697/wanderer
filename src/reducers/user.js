<<<<<<< HEAD
import userData from './data/user.json';

const user = (state = userData, action) => {
    switch (action.type) {

        case 'get-profile':
            return action.user;
            break;


        case 'save-profile':
            return action.user;
            break;

        default:
            return (state);
    }
};

export default user;

=======
import userData from "./data/user.json";

const user = (state = userData, action) => {
  switch (action.type) {
    case "get-profile":
      return action.user;
      break;

    case "save-profile":
      return action.user;
      break;

    default:
      return state;
  }
};

export default user;
>>>>>>> a8cd7d5cd149ca596f7c6f2d9467e747e08a9301
