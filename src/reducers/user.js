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
